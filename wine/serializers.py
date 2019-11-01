

from rest_framework import serializers
from .models import Wine

class WineSerializers(serializers.ModelSerializer):
	class Meta:
	    model = Wine
	    fields = ('id', 'month', 'city', 'region', "group_rates", "rates",
	    		'value', 'price', 'province', 'region', 'variety', 'winery', 'sort_by')

