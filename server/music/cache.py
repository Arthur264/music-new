from django.core.cache import cache 
from app.config import config

class Cache(object):
    timeout = getattr(config, 'DEFAULT_CACHE_TIMEOUT', {})
    
    def add(self, serializer, method, queryset):
        cache_name = self.get_params(serializer, method)
        if cache_name in cache:
            return self.get(cache_name)
        cache.set(cache_name, queryset, self.timeout)
        return queryset
    
    def remove(self, cache_name):
        return cache.delete(cache_name)
    
    def get(self, cache_name):
        return cache.get(cache_name)
    
    @staticmethod
    def get_params(serializer, method):
        params = {
            "serializer_name": serializer.__name__,
            "method": method
        }
        return config.SERIALIZER_CACHE_KEY_FORMAT.format(**params) 
    
api_cache = Cache()