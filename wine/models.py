from django.db import models

class Wine(models.Model):
    region = models.CharField(max_length=150, db_index=True)
    city = models.CharField(max_length=150, db_index=True)
    office = models.CharField(max_length=150, db_index=True)
    # slug = models.SlugField(max_length=150, unique=True)  #unique True - автоматическая индексация
    # body = models.TextField(blank=True, db_index=True)
    # tags = models.ManyToManyField('Tag', blank=True, related_name='posts')
    # date_pub = models.DateTimeField(auto_now_add=True)
    group_rates = models.CharField(max_length=50, db_index=True)
    rates = models.CharField(max_length=150, db_index=True)
    value = models.IntegerField(db_index=True)
    month = models.DateField(max_length=50, db_index=True)

    def __str__(self):
        return self.city



