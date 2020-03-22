from django.contrib.admin import TabularInline
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from .models import Note

User = get_user_model()


class NoteAdmin(admin.ModelAdmin):
    model = Note
    list_display = ["__str__", 'modified']
    readonly_fields = ['created', 'modified', 'order']

    def save_model(self, request, obj, form, change):
        if change:
            obj.save()
        else:
            new_obj = Note.objects.create(**(form.cleaned_data))
            obj.pk = new_obj.pk


admin.site.register(Note, NoteAdmin)
