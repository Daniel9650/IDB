
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

# get the search textbox
topic_nav = driver.find_element_by_name("q")
topic_nav.submit()

# get the list of elements which are displayed after the search
# currently on result page using find_elements_by_class_name  method
lists= driver.find_elements_by_class_name("r")

# get the number of elements found
print ("Found " + str(len(lists)) + "searches:")

# iterate through each element and print the text that is
# name of the search

i=0
for listitem in lists:
   print (listitem)
   i=i+1
   if(i>10):
      break

# close the browser window
driver.quit()
