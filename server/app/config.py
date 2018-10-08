from django.conf import settings

from app.api_settings import DEFAULTS


class Config(object):
    """
    A settings object, that allows API settings to be accessed as properties.
    For example:
        from rest_framework_cache.settings import api_settings
        print(api_settings.DEFAULT_CACHE_TIMEOUT)
    """

    def __init__(self, defaults=None):
        self.defaults = defaults
        self.settings = getattr(settings, 'REST_FRAMEWORK', {})

    def __getattr__(self, attr):
        if attr not in self.defaults and attr not in self.settings:
            raise AttributeError("Invalid API setting: '%s'" % attr)
        return self.settings.get(attr, self.defaults[attr])


config = Config(DEFAULTS)
