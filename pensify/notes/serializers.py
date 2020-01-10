from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

from .models import Note


class NoteSerializer(TaggitSerializer, serializers.ModelSerializer):
    # tags = TagListSerializerField()

    class Meta:
        model = Note
        fields = ['uuid', 'created', 'modified', 'topic', 'title', 'order', 'starred', 'contentState', 'plain_text'
                  #   'tags'
                  ]
        read_only_fields = ['modified', 'order']
