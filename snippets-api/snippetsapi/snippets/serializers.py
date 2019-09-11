from rest_framework import serializers
from .models import Snippet, SnippetLanguage, SnippetTag

class SnippetSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()

    def get_author_username(self, obj):
        return obj.author.username

    class Meta:
        model = Snippet
        fields = ('id',
                  'title',
                  'snippet',
                  'language',
                  'author',
                  'author_username',
                  'tags',
                  'created',
                  'updated',)
        read_only_fields = ('id', 'author_username', 'author', 'created', 'updated',)


class SnippetLanguageSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = SnippetLanguage
        fields = ('id', 'name', 'prism_code', 'count',)
        read_only_fields = ('id', 'count',)

    def get_count(self, obj):
        return obj.snippets.all().count()


class SnippetTagSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = SnippetTag
        fields = ('tag', 'description', 'created', 'count',)
        read_only_fields = ('created',)

    def get_count(self, obj):
        return obj.snippets.all().count()
