from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reserve
from .serializers import ReserveSerializer

@api_view(['POST'])
def create_reserve(request):
    serializer = ReserveSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Servicio creado exitosamente"}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_reserves(request):
    reserves = Reserve.objects.all()
    serializer = ReserveSerializer(reserves, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_reserves_by_id(request, user_id):
    reserves = Reserve.objects.filter(user_id=user_id )
    serializer = ReserveSerializer(reserves, many=True)
    return Response(serializer.data)
