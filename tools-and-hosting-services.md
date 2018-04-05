**Postman**

We used Postman to make API calls to scrape data from other websites so we could fill out our own website. We also used Postman to document our own API. We made a new API documentation on Postman and added all the different requests a user can make using our API. After planning out the requests for our API on Postman, we then used our Postman API Documentation to write the API Documentation on GitBook. We used Bootstrap as the CSS framework. We also used Python and Flask to implement the Web framework, and our website is hosted using AWS.

**AWS Server Hosting**

We hosted our site using Amazon Web Services \(AWS\), on an Ubuntu server we created with an elastic IP address. We issue commands to this server via SSH, and built a virtual environment that runs Docker. Using Docker, we are able to run our applications using Flask as our web framework.

**RDB Database Hosting**

We hosted our MySQL database using the Relation Database service also offered on the Amazon Web Services platform. We created this database to store our information in easily accessible tables, which we are able to query for said information using the SQLAlchemy library in Python. We can also use the Windows GUI utility, MySQL Workbench to easily manage tables. This tool makes creating tables, columns, and updating entries much faster than simply sending queries to do so.

**Testing**

To test our various frameworks, we use a variety of tools corresponding the testing of each major component: we created unit tests for Python with the built-in unittest library, tests for JavaScript using Mocha, and a series of tests for our API using the tools provided by Postman \(mentioned above\). Furthermore, to test the GUI of our site, we used Selenium to create acceptance tests which automated the process of clicking around the website to check for broken links and other errors that might appear when the page is used heavily. 

