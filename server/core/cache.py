import abc


class AbstractCache(object):

    @abc.abstractclassmethod
    def add(cls, serializer, method, queryset):
        pass

    @abc.abstractclassmethod
    def remove(cls, cache_name):
        pass

    @abc.abstractclassmethod
    def get(cls, cache_name):
        pass

    @abc.abstractclassmethod
    def make_params(cls, serializer, method):
        pass
