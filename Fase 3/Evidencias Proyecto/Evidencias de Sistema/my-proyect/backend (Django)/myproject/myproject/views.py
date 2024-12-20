from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'Login': '/login/',
        'Register': '/register/',
    }
    return Response(api_urls)
