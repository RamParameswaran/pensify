from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    lookup_url_kwarg = "uuid"
    lookup_field = "uuid"
    # filter_backends = (DjangoFilterBackend, )
    # filter_fields = ('task', )

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by('order')

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            return super().update(request, *args, **kwargs)
        except Http404:
            return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['post'], detail=True)
    def move(self, request, pk):
        """ Move a single Step to a new position """
        obj = self.get_object()
        new_order = request.data.get('order', None)

        # Make sure we received an order
        if new_order is None:
            return Response(
                data={'error': 'No order given'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Make sure our new order is not below one
        if int(new_order) < 1:
            return Response(
                data={'error': 'Order cannot be zero or below'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        Note.objects.move(obj, new_order)

        return Response({'success': True, 'order': new_order})
