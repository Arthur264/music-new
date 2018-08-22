wget https://www.python.org/ftp/python/3.6.3/Python-3.6.3.tgz
tar xvf Python-3.6.3.tgz
cd Python-3.6.3
./configure --enable-optimizations
make
sudo make altinstall
which python3.6
sudo ln -fs /usr/local/bin/python3.6 /usr/bin/python
pip install setuptools --upgrade  
pip install pip --upgrade
pip install virtualenv
virtualenv --python $(which python3.6) ~/.virtualenvs/vent
source ~/.virtualenvs/vent/bin/activate
sudo rm -r -f Python-3.6.3
sudo rm Python-3.6.3.tgz
sudo apt-get install python-psycopg2