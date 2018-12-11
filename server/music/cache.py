import json

from django.core.cache import cache
from core.cache import AbstractCache

from app.config import config


class Cache(AbstractCache):
    timeout = getattr(config, 'DEFAULT_CACHE_TIMEOUT', {})

    def add(self, serializer, method, queryset):
        cache_name = self.make_params(serializer, method)
        if cache_name in cache:
            return self.get(cache_name)

        cache.set(cache_name, queryset, self.timeout)
        return queryset

    def remove(self, cache_name):
        return cache.delete(cache_name)

    def get(self, cache_name):
        return cache.get(cache_name)

    def make_params(self, serializer, method):
        params = {
            "serializer": {
                "name": serializer.__name__,
                "method": method,
                "page": None
            },
        }
        config_params = self.format_params(params)
        return config.SERIALIZER_CACHE_KEY_FORMAT.format(**config_params)

    @staticmethod
    def format_params(params):
        for k, v in params.items():
            if isinstance(v, dict):
                params[k] = json.dumps(v)
        return params


api_cache = Cache()
