from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Expense
from .serializers import UserSerializer, ExpenseSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class =  ExpenseSerializer


@api_view(['GET'])
def balances(request):
    expenses = Expense.objects.all()

    result = {}

    for expense in expenses:
        amount = float(expense.amount)

        participants = expense.participants.all()

        if not participants.exists():
            continue

        split_amount = amount / participants.count()

        payer = expense.paid_by.name

        result[payer] = (
            result.get(payer, 0) + amount
        )

        for user in participants:
            result[user.name] = (
                result.get(user.name, 0)
                - split_amount
            )

    return Response(result)