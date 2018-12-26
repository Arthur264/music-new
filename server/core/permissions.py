from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminUserOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_superuser or request.user.is_staff


class IsAdminOrIsSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff or request.user.is_superuser
