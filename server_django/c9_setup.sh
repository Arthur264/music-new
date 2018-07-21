wget https://www.python.org/ftp/python/3.6.3/Python-3.6.3.tgz
tar xvf Python-3.6.3.tgz
cd Python-3.6.3
./configure --enable-optimizations
make -j8
sudo make altinstall
which python3.6
/usr/local/bin/python3.6
sudo ln -fs /usr/local/bin/python3.6 /usr/bin/python
pip install setuptools --upgrade  
pip install pip --upgrade
pip install virtualenv
virtualenv --python $(which python3.6) ~/.virtualenvs/main
source ~/.virtualenvs/main/bin/activate
sudo rm -r -f Python-3.6.3
sudo rm Python-3.6.3.tg


cd /var/lib/dpkg/info/
ls | grep mongo
sudo rm mongo*

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org=3.6.5 mongodb-org-server=3.6.5 mongodb-org-shell=3.6.5 mongodb-org-mongos=3.6.5 mongodb-org-tools=3.6.5
sudo touch /etc/init.d/mongod
sudo apt-get install mongodb-org-server

