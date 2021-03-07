from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Trip)
admin.site.register(models.UserAccount)
admin.site.register(models.GangMember)
admin.site.register(models.Transaction)