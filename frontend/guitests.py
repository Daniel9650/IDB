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
        self.driver.implicitly_wait(10)
        self.driver.maximize_window()
        self.driver.get("http://localhost:3000")

    def test_title (self):
        # able to access poptopic.org
        driver = self.driver
        self.assertEqual(driver.title, 'Pop Topic')

    def test_nav_topics (self):
        driver = self.driver
        topic_link = driver.find_element_by_name("topics-link")
        topic_link.click()
        driver.implicitly_wait(10)
        topic_link_success = driver.find_element_by_name("Topics Title")
        self.assertNotEqual(topic_link_success, None)

    def test_nav_movies (self):
        driver = self.driver
        movie_link = driver.find_element_by_name("movies-link")
        movie_link.click()
        driver.implicitly_wait(10)
        movie_link_success = driver.find_element_by_name("Movies Title")
        self.assertNotEqual(movie_link_success, None)

    def test_nav_home (self):
        driver = self.driver
        home_link = driver.find_element_by_name("home-link")
        home_link.click()
        driver.implicitly_wait(10)
        home_link_success = driver.find_element_by_name("trending-topics")
        self.assertNotEqual(home_link_success, None)


    def test_nav_music (self):
        driver = self.driver
        music_link = driver.find_element_by_name("music-link")
        music_link.click()
        driver.implicitly_wait(10)
        music_link_success = driver.find_element_by_name("Music Title")
        self.assertNotEqual(music_link_success, None)

    def test_nav_logo (self):
        driver = self.driver
        home_logo_link = driver.find_element_by_name("home-logo-link")
        home_logo_link.click()
        driver.implicitly_wait(10)
        home_logo_link_success = driver.find_element_by_name("trending-topics")
        self.assertNotEqual(home_logo_link_success, None)


    def test_nav_books (self):
        driver = self.driver
        book_link = driver.find_element_by_name("books-link")
        book_link.click()
        driver.implicitly_wait(10)
        book_link_success = driver.find_element_by_name("Books Title")
        self.assertNotEqual(book_link_success, None)

    def test_nav_about (self):
        driver = self.driver
        about_link = driver.find_element_by_name("about-link")
        about_link.click()
        driver.implicitly_wait(10)
        about_link_success = driver.find_element_by_name("about-concept")
        self.assertNotEqual(about_link_success, None)

    def tearDown (self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
