clean:
	find . -regex '.*\(__pycache__\|\.py[co]\)' -delete
	
migrate:
	find . -regex '.*\(__pycache__\|\.py[co]\)' -delete
	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc"  -delete
	python manage.py flush
	
venv:
	source ~/.virtualenvs/vent/bin/activate
	
	
deps:
	pip install -U -r requirements.txt
	sudo npm install -g loadtest
	sudo apt-get install varnish
	
start:
	sudo mysql-ctl start
	python manage.py runserver $IP:$PORT