from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class frontend_desktop(TemplateView):
    template = "frontend_desktop/frontend.html"
