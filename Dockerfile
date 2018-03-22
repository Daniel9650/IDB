FROM tiangolo/uwsgi-nginx-flask:python3.6 

COPY ./app /app

RUN pip3 install requests

RUN pip3 install sqlalchemy

RUN pip3 install Flask_Restless

RUN pip3 install PyMySQL

RUN pip3 install -U flask-cors