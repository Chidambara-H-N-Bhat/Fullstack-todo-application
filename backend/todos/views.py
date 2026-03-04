from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Todo



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def todo_list(request):

    if request.method == "GET":
        todos = Todo.objects.filter(user=request.user).values()
        return Response(list(todos))

    if request.method == "POST":
        title = request.data.get("title", "").strip()

        if not title:
            return Response(
                {"error": "Title cannot be empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        todo = Todo.objects.create(
            user=request.user,
            title=title
        )

        return Response({
            "id": todo.id,
            "title": todo.title,
            "completed": todo.completed,
            "created_at": todo.created_at
        }, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def todo_detail(request, id):

    try:
        todo = Todo.objects.get(id=id, user=request.user)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=404)

    if request.method == "PUT":
        title = request.data.get("title", "").strip()

        if not title:
            return Response(
                {"error": "Title cannot be empty"},
                status=400
            )

        todo.title = title
        todo.save()

        return Response({
            "id": todo.id,
            "title": todo.title,
            "completed": todo.completed,
            "created_at": todo.created_at
        })

    if request.method == "DELETE":
        todo.delete()
        return Response({"message": "Deleted successfully"}, status=204)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        password=password
    )

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED
    )

