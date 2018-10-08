from rest_framework.response import Response

from .cache import api_cache


class ListCacheMixin(object):
    """
    List a queryset.
    """

    def list(self, request, *args, **kwargs):
        filter_queryset = self.filter_queryset(self.get_queryset())
        queryset = api_cache.app(self.serializer_class, 'list', filter_queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
