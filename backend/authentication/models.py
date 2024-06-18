from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, firstName, lastName, grade, className, is_active, role, notifications, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email = self.normalize_email(email),
            firstName = firstName,
            lastName = lastName,
            grade = grade,
            className = className,
            is_active = is_active,
            role = role,
            notifications = notifications
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self, email, firstName, lastName, grade, className, is_active, role, notifications, password):
        user = self.create_user(
            email = email,
            firstName = firstName,
            lastName = lastName,
            grade = grade,
            className = className,
            is_active = is_active,
            role = role,
            notifications = notifications,
            password = password
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=200, null=False, unique=True)
    is_active = models.BooleanField(default=False)
    firstName = models.CharField(max_length=200, null=False)
    lastName = models.CharField(max_length=200, null=False)
    grade = models.IntegerField(null=False)
    className = models.CharField(max_length=1, null=False)
    notifications = models.BooleanField(default=False)
    role = models.CharField(max_length=1, default=0)
    # 0 - student; 1 - teacher; 2 - admin

    groups = models.ManyToManyField(
        Group,
        related_name='authentication_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='user',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='authentication_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['firstName', 'lastName', 'grade', 'className', 'is_active', 'notifications', 'role']

    def __str__(self):
        return self.email