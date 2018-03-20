from io import StringIO
from unittest import main, TestCase

from TopMedia import *
# from models import *
from GitInfo import *
import requests


class PopTopicTests(TestCase):

<<<<<<< HEAD
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

=======
        # ======================
        # 	Connection Tests
        # ======================

        # Checks if a GET request gets to the live homepage

    def test_site_connection(self):
        r = requests.get('http://poptopic.org')
        self.assertEqual(r.status_code, 200)

        # Checks if a GET request gets to the API
#	def test_api_connection(self):
#		r = requests.get('http://api.poptopic.org')
#		self.assertEqual(r.status_code, 200)

        # Check connection to a model page
#	def test_model_connection(self):
#		r = requests.get('http://poptopic/movies.org')
#		self.assertEqual(r.status_code, 200)

        # ======================
        # 	TopMedia.py Tests
        # ======================

    def test_youtube_finder(self):
        response = get_youtube_url("black panther")
        self.assertTrue(isinstance(response, str))

        # ======================
        # 	GitInfo.py Tests
        # ======================
>>>>>>> 4e84602e7f3283270c59ee46a731e110139b9fe7

        # Checks dictionary is not empty
    def test_get_defaults(self):
        self.assertTrue(get_default_count())


<<<<<<< HEAD
if __name__ == "__main__" :
=======
if __name__ == "__main__":
>>>>>>> 4e84602e7f3283270c59ee46a731e110139b9fe7
    main()
