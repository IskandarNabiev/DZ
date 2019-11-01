
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import WineSerializers
from .models import Wine
from .pagination import StandardResultsSetPagination

def WineList(request):
    return render(request, "wine.html", {})

class WineListing(ListAPIView):
    # set the pagination and serializer class

    pagination_class = StandardResultsSetPagination
    serializer_class = WineSerializers

    def get_queryset(self):
        # filter the queryset based on the filters applied

        queryList = Wine.objects.all()
        city = self.request.query_params.get('city', None)
        group_rates = self.request.query_params.get('variety', None)
        province = self.request.query_params.get('province', None)
        region = self.request.query_params.get('region', None)
        sort_by = self.request.query_params.get('sort_by', None)

        if city:
            queryList = queryList.filter(city = city)
        if group_rates:
            queryList = queryList.filter(variety = variety)
        if province:
            queryList = queryList.filter(province = province)
        if region:
            queryList = queryList.filter(region = region)

            # sort it if applied on based on price/points

        if sort_by == "price":
            queryList = queryList.order_by("price")
        elif sort_by == "points":
            queryList = queryList.order_by("points")
        return queryList


def getCity(request):
    # get all the countreis from the database excluding
    # null and blank values

    if request.method == "GET" and request.is_ajax():
        countries = Wine.objects.exclude(city__isnull=True). \
            exclude(city__exact='').order_by('city').values_list('city').distinct()
        countries = [i[0] for i in list(countries)]
        data = {
            "countries": countries,
        }
        return JsonResponse(data, status = 200)


def getvariety(request):
    if request.method == "GET" and request.is_ajax():
        # get all the varities from the database excluding
        # null and blank values

        variety = Wine.objects.exclude(variety__isnull=True). \
            exclude(variety__exact='').order_by('variety').values_list('variety').distinct()
        variety = [i[0] for i in list(variety)]
        data = {
            "variety": variety,
        }
        return JsonResponse(data, status = 200)


def getProvince(request):
    # get the provinces for given city from the
    # database excluding null and blank values

    if request.method == "GET" and request.is_ajax():
        city = request.GET.get('city')
        province = Wine.objects.filter(city = city). \
            exclude(province__isnull=True).exclude(province__exact=''). \
            order_by('province').values_list('province').distinct()
        province = [i[0] for i in list(province)]
        data = {
            "province": province,
        }
        return JsonResponse(data, status = 200)


def getRegion(request):
    # get the regions for given province from the
    # database excluding null and blank values

    if request.method == "GET" and request.is_ajax():
        province = request.GET.get('province')
        region = Wine.objects.filter(province = province). \
            exclude(region__isnull=True).exclude(region__exact='').values_list('region').distinct()
        region = [i[0] for i in list(region)]
        data = {
            "region": region,
        }
        return JsonResponse(data, status = 200)


