import json
from django.core.management.base import BaseCommand, CommandError
from music.models import Song, Artist

class Command(BaseCommand):
    
    def add_arguments(self, parser):
        parser.add_argument('model_name', nargs='+')

    def handle(self, *args, **options):
        try:
            model = eval(args[0])
            model.objects.all().delete()
        except (NameError,):
            raise NameError("Table not exist.")
            
                