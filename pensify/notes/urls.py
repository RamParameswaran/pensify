from rest_framework import routers

from .views import NoteViewSet

app_name = "notes"

router = routers.SimpleRouter()
router.register(r'notes', NoteViewSet, 'notes')
urlpatterns = router.urls
