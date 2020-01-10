from django.db import models, transaction
from django.db.models import F, Max


class NoteManager(models.Manager):
    """ Manager to encapsulate bits of business logic """

    def move(self, obj, new_order):
        """ Move an object to a new order position 

        Example usage: Note.objects.move(note_obj_3, 5) 
        """

        qs = self.get_queryset()

        with transaction.atomic():
            if obj.order > int(new_order):
                qs.filter(
                    user=obj.user,
                    topic=obj.topic,
                    order__lt=obj.order,
                    order__gte=new_order,
                ).exclude(
                    pk=obj.pk
                ).update(
                    order=F('order') + 1,
                )
            else:
                qs.filter(
                    user=obj.user,
                    topic=obj.topic,
                    order__lte=new_order,
                    order__gt=obj.order,
                ).exclude(
                    pk=obj.pk,
                ).update(
                    order=F('order') - 1,
                )

            obj.order = new_order
            obj.save()

    def create(self, **kwargs):
        instance = self.model(**kwargs)

        with transaction.atomic():
            # Get our current max order number
            results = self.filter(
                user=instance.user,
                topic=instance.topic

            ).aggregate(
                Max('order')
            )

            # Increment and use it for our new object
            current_order = results['order__max']
            if current_order is None:
                current_order = 0

            value = current_order + 1
            instance.order = value
            instance.save()

            return instance
