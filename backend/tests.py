from io import StringIO
from unittest import main, TestCase

from TopMedia import *
# from models import *
from GitInfo import *
import requests


class PopTopicTests(TestCase):

        # ======================
        # 	Connection Tests
        # ======================

        # Checks if a GET request gets to the live homepage
    #    def test_site_connection(self):
    #        r = requests.get('http://poptopic.org')
    #        self.assertEqual(r.status_code, 200)

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

    def test_get_topic_id(self):
        topic = "topic name"
        topic_id = TopicEntity.get_topic_id(topic)

        self.assertTrue(isinstance(topic_id, str))
        self.assertTrue(len(topic_id) < 25)
        self.assertEqual(topic_id, TopicEntity.get_topic_id(topic))

    def test_remove_non_ascii(self):
        self.assertEqual(remove_non_ascii("hello-there!"), "hello-there!")
        self.assertEqual(remove_non_ascii(""), "")
        self.assertEqual(remove_non_ascii("who a֍re you?"), "who are you?")

    def test_extract_movie_info(self):
        dic = {
            "title": "hello",
            "id": "abc",
            "overview": "some text",
            "release_date": "2018",
            "poster_path": "www.hello.com",
            "genre_ids": []}

        response = extract_movie_info(dic, {})

        self.assertTrue(isinstance(response, Movie))

        self.assertEqual(response.name, "hello")
        self.assertEqual(response.description, "some text")
        self.assertEqual(response.release, "2018")

    def test_get_topics(self):
        dic = {
            "title": "hello",
            "id": "abc",
            "overview": "some text",
            "release_date": "2018",
            "poster_path": "www.hello.com",
            "genre_ids": [
                0,
                1]}

        movie = extract_movie_info(dic, {0: "topic_1", 1: "topic_2"})

        self.assertEqual(set(get_topics({"id": movie})), set(
            ["topic_1", "topic_2"]))

        # ======================
        # 	GitInfo.py Tests
        # ======================

    def test_get_defaults(self):
        self.assertTrue(get_default_count())
        self.assertEqual(len(get_default_count()), 5)

    def test_get_commits_count(self):
        counts = get_commits_count()
        self.assertTrue(isinstance(counts, dict))
        self.assertEqual(len(counts), 6)

    def test_get_issues_count(self):
        counts = get_issues_count()
        self.assertTrue(isinstance(counts, dict))
        self.assertEqual(len(counts), 6)


if __name__ == "__main__":
    main()
