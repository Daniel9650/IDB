from io import StringIO
from unittest import main, TestCase

from app import app

from TopMedia import *
from models import *
from GitInfo import *
import requests

class PopTopicTests(TestCase):

# ======================
# 	Connection Tests
# ======================

# Checks if a GET request gets to the live homepage
def test_site_connection(self):
	r = requests.get('http://poptopic.org')
	assertTrue(r.status_code, 200)

# Checks if a GET request gets to the API
def test_api_connection(self):
	r = requests.get('http://api.poptopic.org')
	assertTrue(r.status_code, 200)

# Check connection to a model page
def test_model_connection(self):
	r = requests.get('http://poptopic/movies.org')
	assertTrue(r.status_code, 200)

# ======================
# 	TopMedia.py Tests
# ======================

#def test_top_media_1(self):

# ======================
# 	GitInfo.py Tests
# ======================

# Checks dictionary is not empty
def test_get_defaults(self):
	assertTrue(get_default_count())


if __name__ == "__main__" :
    main()