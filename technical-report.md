**Poptopic Technical Report**



**RESTful API:**

Our RESTful API allows users to get information about movies, books, music, and their corresponding topics, which can allow them to get details about what kinds of media are trending or if a certain topic is popular. The allowed HTTP requests are all GET requests, allowing users to get information about these types of media. Since we don't want to allow users to be able to edit the media on the website, there are no PUT or DELETE requests in our API. Users who want to use our API will also need an authorization key before they can use the API. This authorization key is included in a header for every HTTP request.

As shown above in the Models section, each model has several attributes, and users can use our API to extract data about various attributes for each model. The return format of each API request is in JSON, and several examples of the response body can be seen in the API documentation. Every book, song, movie, and topic has its own ID, which allows it to be identified and accessed from the database. If users want to learn more about a certain movie, book, or song, they need to specify the ID for that particular item in the URL of the API request.

For API calls that return a list of multiple objects, users can enter an optional parameter "sort" to specify how they want the list to be sorted. For GET requests that return a list of movies, the "sort" parameter takes the following values:`release_year_asc`, `release_year_desc, title_asc,andtitle_desc`. It defaults to `release_year_desc`, so it sorts the movies by the most recent ones first. For GET requests that return a list of books, the "sort" parameter takes the following values:`author_asc, author_desc, title_asc, title_desc,andrelease_year`. It defaults to sort `byauthor_asc,` so it sorts the books by author in alphabetical order. For GET requests that return a list of songs, the "sort" parameter takes the following values:`release_year, artist_alphabetical,andtitle_alphabetical.I`t defaults to sort by titles alphabetically. Another optional parameter for some of these GET requests is the "page" parameter, which allows users to pick which page they want to query, if there are multiple pages.

**Tools:**

We used Postman to make API calls to scrape data from other websites so we could fill out our own website. We also used Postman to document our own API. We made a new API documentation on Postman and added all the different requests a user can make using our API. After planning out the requests for our API on Postman, we then used our Postman API Documentation to write the API Documentation on GitBook. We used Bootstrap as the CSS framework. We also used Python and Flask to implement the Web framework, and our website is hosted using AWS.

**Hosting:**

We hosted our site using Amazon Web Services \(AWS\), on an Ubuntu server we created with an elastic IP address. We issue commands to this server via SSH, and built a virtual environment that runs Docker. Using Docker, we are able to run our applications using Flask as our web framework.

