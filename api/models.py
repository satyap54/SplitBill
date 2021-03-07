from django.db import models
from django.contrib.auth.models import(
	AbstractBaseUser, 
	PermissionsMixin,
	BaseUserManager,
)
from django.conf import settings

# Create your models here.


class UserAccountManager(BaseUserManager):
	def create_user(self, email, name, password = None):
		if(not email):
			raise ValueError("User must have an email id")

		email = self.normalize_email(email)
		user = self.model(email = email, name = name)

		user.set_password(password)
		user.save()

		return user

	def create_superuser(self, email, name, password):
		"""Create and save a new superuser with given details"""
		user = self.create_user(email, name, password)

		user.is_superuser = True # This field is provided by default in PermissionMixin
		user.is_staff = True
		user.save(using = self.db)

		return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(max_length=255, unique=True)
	name = models.CharField(max_length=255)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	objects = UserAccountManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['name']

	def get_full_name(self):
		return self.name

	def get_short_name(self):
		return self.name

	def __str__(self):
		return self.email


class Trip(models.Model):
	name = models.CharField(max_length=20)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class GangMember(models.Model):
	name =  models.CharField(max_length=20)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	room_id = models.ForeignKey(Trip, on_delete=models.CASCADE)


class Transaction(models.Model):
	gang_member_name = models.ForeignKey(GangMember, on_delete=models.CASCADE)
	place_of_payment = models.CharField(max_length=20, null=True)
	amount = models.FloatField()
	date_of_payment = models.DateField(auto_now=False, auto_now_add=False, null=True)
	description = models.CharField(max_length=50, null=True)

	room_id = models.ForeignKey(Trip, on_delete=models.CASCADE)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)