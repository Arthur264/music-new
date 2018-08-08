sudo kill -9 $(lsof -t -i:8080)
ng serve  --host 0.0.0.0 --port 8081  --public $C9_HOSTNAME
