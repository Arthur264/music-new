from django.utils.cache import add_never_cache_headers
from user.models import User


class DisableBrowserCacheMiddleware(object):
    
    @staticmethod
    def process_response(_, response):
        add_never_cache_headers(response)
        return response


class LastUserIP(object):
    def process_response(self, request, response):
        if request.user.is_authenticated():
            user_ip = self.get_client_ip(request)
            User.objects.get(user=request.user).update(last_ip=user_ip)
            
        return response
            
    @staticmethod
    def get_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[-1].strip()
        
        return request.META.get('REMOTE_ADDR')
