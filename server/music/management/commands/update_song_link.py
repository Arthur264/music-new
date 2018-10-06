import asyncio
import aiohttp
from django.core.management.base import BaseCommand, CommandError
from music.models import Song
                
class Command(BaseCommand):
    def handle(self, *args, **options):
        loop = asyncio.get_event_loop()
        loop.run_until_complete(self.main())

    async def fetch(self, session, url):
        async with session.head(url) as response:
            return await response.status

    async def main(self, ):
        urls =  Song.objects.values_list('url')
        tasks = [fetch(session, url) for url in urls]
        print(tasks[:10])
        async with aiohttp.ClientSession() as session:
            statuses = await asyncio.gather(*tasks)
            print(status)
        
        