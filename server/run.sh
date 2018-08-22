source ~/.virtualenvs/vent/bin/activate
sudo mysql-ctl start
sudo kill -9 $(lsof -t -i:8081)
python manage.py runserver $IP:8081