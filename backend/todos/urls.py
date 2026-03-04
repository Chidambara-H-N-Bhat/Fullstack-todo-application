from django.urls import path
from .views import todo_list, todo_detail, register_user

urlpatterns = [
    path("register/", register_user),
    path("todos/", todo_list),
    path("todos/<int:id>/", todo_detail),
    
]
