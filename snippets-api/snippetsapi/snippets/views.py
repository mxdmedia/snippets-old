from collections import OrderedDict

from django.db.models import Count

import django_filters as df
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .permissions import IsAuthorOrReadOnly

from .models import Snippet, SnippetLanguage, SnippetTag
from .serializers import SnippetSerializer, SnippetLanguageSerializer, SnippetTagSerializer
from snippetsapi.users.models import User
from snippetsapi.users.serializers import UserSerializer

class InListFilter(df.Filter):
    """
    filters values from a list comma separated list
    """

    def filter(self, qs, value):
        if value:
            return qs.filter(**{self.field_name+'__in': value.split(',')}).distinct()
        return qs


class SnippetFilterSet(df.FilterSet):
    tags = InListFilter(field_name='tags')
    language = InListFilter(field_name='language')


class InlcudesLimitOffsetPagination(LimitOffsetPagination):
    def get_paginated_response(self, data, include_data):
        if include_data:
            return Response(OrderedDict([
                ('count', self.count),
                ('next', self.get_next_link()),
                ('previous', self.get_previous_link()),
                ('results', data),
                ('include', include_data),
            ]))
        else:
            return Response(OrderedDict([
                ('count', self.count),
                ('next', self.get_next_link()),
                ('previous', self.get_previous_link()),
                ('results', data),
            ]))

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (IsAuthorOrReadOnly,)
    pagination_class = InlcudesLimitOffsetPagination
    filter_class = SnippetFilterSet
    filter_backends = [DjangoFilterBackend]

    def list(self, request, *args, **kwargs):
        include = request.query_params.get('include', None)
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if include is not None:
            includes = include.split(',')
            includes_data = {}
            for entity in includes:
                if entity == 'authors':
                    authors = User.objects.distinct().filter(snippet__in=queryset)
                    authors_serializer = UserSerializer(authors, many=True)
                    includes_data['authors'] = authors_serializer.data
        else:
            includes_data = {}

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data, includes_data)

    def create(self, request, *args, **kwargs):
        # Handle difference between from submitted data, and json data
        data = request.data.copy()
        if type(request.data) is dict:  # JSON data
            tags = request.data['tags']
            if request.user.is_anonymous:
                data['author'] = None
            else:
                data['author'] = request.user.id
        else:                           # Form data
            tags = request.data.getlist('tags')
            if request.user.is_anonymous:
                data['author'] = None
            else:
                data['author'] = request.user.id

        for missing_id in [tag_id for tag_id in tags if not SnippetTag.objects.filter(pk=tag_id).exists()]:
            SnippetTag.objects.create(tag=missing_id)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if type(request.data) is dict:  # JSON data
            tags = request.data['tags']
        else:                           # Form data
            tags = request.data.getlist('tags')

        for missing_id in [tag_id for tag_id in tags if not SnippetTag.objects.filter(pk=tag_id).exists()]:
            SnippetTag.objects.create(tag=missing_id)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def get_paginated_response(self, data, includes):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data, includes)


class SnippetLanguageViewSet(viewsets.ModelViewSet):
    queryset = SnippetLanguage.objects.all()
    serializer_class = SnippetLanguageSerializer
    permission_classes = (AllowAny,)
    pagination_class = None


class SnippetTagViewSet(viewsets.ModelViewSet):
    queryset = SnippetTag.objects.all()
    serializer_class = SnippetTagSerializer
    permission_classes = (AllowAny,)
    pagination_class = LimitOffsetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['tag', 'description']
    ordering_fields = ['tag', 'count']
    ordering = '-count'

    def get_queryset(self):
        return self.queryset.annotate(count=Count('snippets'))
