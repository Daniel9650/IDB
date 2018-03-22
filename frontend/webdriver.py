
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# get path of ChromeDriverServer
dir = os.path.dirname(__file__)
chrome_driver_path = dir + "/chromedriver"

# create a new Chrome session
driver = webdriver.Chrome(chrome_driver_path)
driver.implicitly_wait(30)
driver.maximize_window()

# navigate to the application home page
driver.get("http://www.poptopic.org")

# close the browser window
driver.quit()
