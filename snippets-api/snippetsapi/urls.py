from django.conf import settings
from django.urls import path, re_path, include, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter
from .users.views import UserViewSet, UserCreateViewSet, obtain_auth_token
from .snippets.views import SnippetViewSet, SnippetLanguageViewSet, SnippetTagViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'users', UserCreateViewSet)
router.register(r'snippets', SnippetViewSet)
router.register(r'snippet-languages', SnippetLanguageViewSet)
router.register(r'snippet-tags', SnippetTagViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
