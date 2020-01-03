from django.db import models, IntegrityError
from django.urls import reverse
from django.utils import timezone

from wagtail.core.fields import RichTextField

from .managers import NoteManager
from taggit.managers import TaggableManager

from users.models import User


class Note(models.Model):
    created = models.DateTimeField(editable=False, blank=True)
    modified = models.DateTimeField(blank=True)

    user = models.ForeignKey(User, related_name="notes", on_delete=models.CASCADE)
    title = RichTextField(blank=True, null=True)
    order = models.IntegerField(default=1)
    starred = models.BooleanField(default=False, null=False, blank=False)

    tags = TaggableManager()
    objects = NoteManager()

    # class Meta:
    #     ordering = ['-modified']

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        super().save()
