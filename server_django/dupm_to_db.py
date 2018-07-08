import json
from music.models import Song, Artist
import os
print(os.getcwd())
artict = {}
with open("artist.json", 'r') as parser_artist:
    for i,k in enumerate(parser_artist):
        data = json.loads(k)
        new_artict = Artict(name= data['name'], image=data['image'])
        new_artict.save()
        artict[data['id']] = new_artict.pk
        break
    
print('artict', artict)
# with open("song.json", 'r') as parser_songs:
#     for i,k in enumerate(parser_songs):
#         print("tet", json.loads(k))
#         if i == 10:
#             break
        
#     parser_songs.close()