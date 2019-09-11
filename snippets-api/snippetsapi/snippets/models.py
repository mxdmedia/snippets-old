import uuid

from django.db import models
from django.utils.encoding import python_2_unicode_compatible

from snippetsapi.users.models import User


@python_2_unicode_compatible
class SnippetLanguage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    prism_code = models.CharField(max_length=64)

    def __str__(self):
        return self.name

@python_2_unicode_compatible
class SnippetTag(models.Model):
    tag = models.SlugField(primary_key=True, max_length=32)
    description = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tag


@python_2_unicode_compatible
class Snippet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    snippet = models.TextField()
    language = models.ForeignKey(SnippetLanguage, on_delete=models.CASCADE, related_name='snippets')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(SnippetTag, related_name='snippets')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created']
