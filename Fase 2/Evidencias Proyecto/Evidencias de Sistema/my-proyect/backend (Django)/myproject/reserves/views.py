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

@api_view(['PUT'])
def edit_reserve(request, reserve_id):
    try:
        reserve = Reserve.objects.filter(id=reserve_id).first()
        if not reserve:
            return Response({"error": "Reserva no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReserveSerializer(reserve, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['DELETE'])
def delete_reserve(request, reserve_id):
    try:
        reserve = Reserve.objects.filter(id=reserve_id).first()
        if not reserve:
            return Response({"error": "Reserva no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        reserve.delete()
        return Response({"message": "Reserva eliminada correctamente"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)