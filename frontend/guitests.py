import unittest
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class PopTopicGUITests(unittest.TestCase):

    def setUp (self):
        # get path of ChromeDriverServer
        dir = os.path.dirname(__file__)
        chrome_driver_path = dir + "/chromedriver"
        # create a new Chrome session
        self.driver = webdriver.Chrome(chrome_driver_path)
        self.driver.implicitly_wait(20)
        self.driver.maximize_window()
        self.driver.get("http://localhost:3000")

########################### Helper Functions ###################################

    def nav_topics (self):
        driver = self.driver
        topic_link = driver.find_element_by_name("topics-link")
        topic_link.click()
        driver.implicitly_wait(20)
        topic_link_success = driver.find_element_by_name("Topics Title")
        return topic_link_success

    def nav_movies (self):
        driver = self.driver
        movie_link = driver.find_element_by_name("movies-link")
        movie_link.click()
        driver.implicitly_wait(20)
        movie_link_success = driver.find_element_by_name("Movies Title")
        return movie_link_success

    def nav_home (self):
        driver = self.driver
        home_link = driver.find_element_by_name("home-link")
        home_link.click()
        driver.implicitly_wait(20)
        home_link_success = driver.find_element_by_name("trending-topics")
        return home_link_success

    def nav_music (self):
        driver = self.driver
        music_link = driver.find_element_by_name("music-link")
        music_link.click()
        driver.implicitly_wait(20)
        music_link_success = driver.find_element_by_name("Music Title")
        return music_link_success

    def nav_logo (self):
        driver = self.driver
        home_logo_link = driver.find_element_by_name("home-logo-link")
        home_logo_link.click()
        driver.implicitly_wait(20)
        home_logo_link_success = driver.find_element_by_name("trending-topics")
        return home_logo_link_success

    def nav_books (self):
        driver = self.driver
        book_link = driver.find_element_by_name("books-link")
        book_link.click()
        driver.implicitly_wait(20)
        book_link_success = driver.find_element_by_name("Books Title")
        return book_link_success

    def nav_about (self):
        driver = self.driver
        about_link = driver.find_element_by_name("about-link")
        about_link.click()
        driver.implicitly_wait(20)
        about_link_success = driver.find_element_by_name("about-concept")
        return about_link_success

    def related_media (self, type, lower):
        driver = self.driver

        for x in range(1,4):
            name = type + str(x)
            card = driver.find_element_by_name(name)
            card.click()
            driver.implicitly_wait(20)
            instance_name = lower + "-instance-name"
            card_success = driver.find_element_by_name(instance_name)
            driver.back()
            driver.implicitly_wait(20)
            self.assertNotEqual(card_success, None)


    def topic_instance (self, num):
        driver = self.driver
        topic_name = "card" + str(num)
        topic_instance = driver.find_element_by_name(topic_name)
        topic_instance.click()
        driver.implicitly_wait(20)
        instance_success = driver.find_element_by_name("topic-instance-name")
        self.assertNotEqual(instance_success, None)
        self.related_media("Movies", "movie")
        self.related_media("Books", "book")
        self.related_media("Music", "music")

    def movie_instance (self, num):
        driver = self.driver
        movie_name = "card" + str(num)
        movie_instance = driver.find_element_by_name(movie_name)
        movie_instance.click()
        driver.implicitly_wait(20)
        instance_success = driver.find_element_by_name("movie-instance-name")
        self.assertNotEqual(instance_success, None)
        self.related_media("Books", "book")
        self.related_media("Topics", "topic")
        self.related_media("Music", "music")


    def music_instance (self, num):
        driver = self.driver
        music_name = "card" + str(num)
        music_instance = driver.find_element_by_name(music_name)
        music_instance.click()
        driver.implicitly_wait(20)
        instance_success = driver.find_element_by_name("music-instance-name")
        self.assertNotEqual(instance_success, None)
        self.related_media("Books", "book")
        self.related_media("Topics", "topic")
        self.related_media("Movies", "movie")

    def book_instance (self, num):
        driver = self.driver
        book_name = "card" + str(num)
        book_instance = driver.find_element_by_name(book_name)
        book_instance.click()
        driver.implicitly_wait(20)
        instance_success = driver.find_element_by_name("book-instance-name")
        self.assertNotEqual(instance_success, None)
        self.related_media("Music", "music")
        self.related_media("Topics", "topic")
        self.related_media("Movies", "movie")


########################### Navigation Tests ###################################
    def test_nav (self):
        self.assertNotEqual(self.nav_about(), None)
        self.assertNotEqual(self.nav_books(), None)
        self.assertNotEqual(self.nav_logo(), None)
        self.assertNotEqual(self.nav_music(), None)
        self.assertNotEqual(self.nav_home(), None)
        self.assertNotEqual(self.nav_movies(), None)
        self.assertNotEqual(self.nav_topics(), None)

    def test_nav_back_and_forth (self):
        for x in range(0,5):
            self.assertNotEqual(self.nav_about(), None)
            self.assertNotEqual(self.nav_movies(), None)

        for y in range(0,5):
            self.driver.back()
            self.driver.forward()

    def test_nav_same_location (self):
        for x in range(0,10):
            self.assertNotEqual(self.nav_home(), None)

    def test_topic_grid_and_instances (self):
        for w in range(1,9):
            self.nav_topics()
            self.topic_instance(w)

    def test_movie_grid_and_instances (self):
        for x in range(1,9):
            self.nav_movies()
            self.movie_instance(x)

    def test_book_grid_and_instances (self):
        for y in range(1,9):
            self.nav_books()
            self.book_instance(y)

    def test_music_grid_and_instances (self):
        for z in range(1,9):
            self.nav_music()
            self.music_instance(z)

    def test_trending_topics (self):
        driver = self.driver
        success = 1;
        for x in range(1, 4):
            name = "trending" + str(x)
            trending_topic = driver.find_element_by_name(name)
            trending_topic.click()
            driver.implicitly_wait(20)
            topic_success = driver.find_element_by_name("topic-instance-name")
            success = success and self.assertNotEqual(topic_success, None)
            self.nav_home()
        return success

    def test_about_links (self):
        driver = self.driver
        self.nav_about()
        link = driver.find_element_by_name("repo-link")
        link.click()
        driver.implicitly_wait(20)
        link_success = driver.find_element_by_class_name("pagehead-actions")
        self.assertNotEqual(link_success, None)
        driver.back()
        link = driver.find_element_by_name("tech-report-link")
        link.click()
        driver.implicitly_wait(20)
        link_success = driver.find_element_by_class_name("gb-page-inner")
        self.assertNotEqual(link_success, None)
        driver.back()
        link = driver.find_element_by_name("api-link")
        link.click()
        driver.implicitly_wait(20)
        link_success = driver.find_element_by_class_name("BookPage")
        self.assertNotEqual(link_success, None)

    def test_title (self):
        # able to access poptopic.org
        driver = self.driver
        self.assertEqual(driver.title, 'Pop Topic')

    def tearDown (self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
