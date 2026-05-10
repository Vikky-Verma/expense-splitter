from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Expense(models.Model):
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_by = models.ForeignKey(User, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='shared_expenses')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title