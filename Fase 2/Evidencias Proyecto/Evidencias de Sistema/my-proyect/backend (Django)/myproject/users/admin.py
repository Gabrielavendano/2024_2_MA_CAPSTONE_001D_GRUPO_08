from django.contrib import admin
from services.models import Service
from reserves.models import Reserve
from contacts.models import Contact

admin.site.register(Reserve)
admin.site.register(Contact)
admin.site.register(Service)

