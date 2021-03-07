from rest_framework import permissions

class UpdateOwnObject(permissions.BasePermission):
    """ Allow User to Update own Trip object """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return self.user.pk == request.user.pk