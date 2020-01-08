from django.db import models, IntegrityError
from django.urls import reverse
from django.utils import timezone
from django.contrib.postgres.fields import JSONField

from wagtail.core.fields import RichTextField

from .managers import NoteManager
from taggit.managers import TaggableManager

from users.models import User


class Note(models.Model):
    user = models.ForeignKey(User, related_name="notes", on_delete=models.CASCADE)

    created = models.DateTimeField(editable=False, blank=True)
    modified = models.DateTimeField(blank=True)
    uuid = models.CharField(max_length=32, null=True, blank=True)
    order = models.IntegerField(default=1)

    topic = models.CharField(max_length=255, blank=True, null=True)

    title = models.CharField(max_length=255, blank=True, null=True)
    contentState = JSONField(blank=True, null=True)
    plain_text = models.TextField(blank=True, null=True)
    starred = models.BooleanField(default=False, null=False, blank=False)

    tags = TaggableManager(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        super().save()
