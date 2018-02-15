**Poptopic Technical Report**

**Motivation and Uses:**

For our project, we decided to make a website that categorizes books, movies, and music by topic/subject to show related media and correlations between popular media and popular topics. The media makes up a large part of people's lives now and provides a source of entertainment for many of us, no matter how old we are, so we thought it would be interesting to have a way for people to find new books, music, and movies that are currently popular.

It can be used for market research when creating a song/movie/book to see if a topic has been covered in a medium, or to see if a topic is trendy. Users can find different kinds of media based on topics they are interested in. Topics have a number of media links to show how prominent a topic/subject is in media, and possibly in society. For example, a user who is interested in food can look under the topic of food on our Topics page and find different books, songs, and movies about food. The user can then be inspired to look into one of these types of media and find something that would interest them.

**Models:**

There are four models on our website: Movies, Music, Books, and Topics. Each model has its own attributes, which users can get more information about by using our API. The Topics model connects the movies, music, and books together; this can be certain keywords or genres which these types of media have in common. To populate each page, we scraped the APIs of other websites in order to get what movies, music, and books are currently trending. We also wrote a Python program to parse the results of these API calls to get the data that we needed for our website. The grid page for each of these models displays the various movies, books, and music. Users can view movies, music, and books and from there, they can select one that they want to learn more about. When users click on a movie, for example, they will be directed to the page for that specific movie. On that page, they can find links to similar books and music, which share similar topics to this movie.

**Movies:**

For the Movies model, we had several attributes, including the following:

* name
* description
* year of release
* movie trailer \(if available\)
* movie poster \(if no trailer\)
* link\(s\) to movie's topics
* link\(s\) to similar books
* link\(s\) to similar music

**Music:**

For the Music model, we had the following attributes:

* name of song
* artist
* album
* year of release
* song preview
* link\(s\) to song's topics
* link\(s\) to similar movies
* link\(s\) to similar books

**Books:**

For the Books model, we had the following attributes:

* title
* author
* description
* publication year
* image of book cover
* link\(s\) to book's topics
* link\(s\) to similar movies
* link\(s\) to similar music

**Topics:**

For the Topics mode, we had the following attributes:

* name
* basic image for this topic
* link\(s\) to books
* link\(s\) to movies
* link\(s\) to music

**RESTful API:**

Our RESTful API allows users to get information about movies, books, music, and their corresponding topics, which can allow them to get details about what kinds of media are trending or if a certain topic is popular. The allowed HTTP requests are all GET requests, allowing users to get information about these types of media. Since we don't want to allow users to be able to edit the media on the website, there are no PUT or DELETE requests in our API. Users who want to use our API will also need an authorization key before they can use the API. This authorization key is included in a header for every HTTP request.

As shown above in the Models section, each model has several attributes, and users can use our API to extract data about various attributes for each model. The return format of each API request is in JSON, and several examples of the response body can be seen in the API documentation. Every book, song, movie, and topic has its own ID, which allows it to be identified and accessed from the database. If users want to learn more about a certain movie, book, or song, they need to specify the ID for that particular item in the URL of the API request.

For API calls that return a list of multiple objects, users can enter an optional parameter "sort" to specify how they want the list to be sorted. For GET requests that return a list of movies, the "sort" parameter takes the following values:`release_year_asc`, `release_year_desc, title_asc,andtitle_desc`. It defaults to `release_year_desc`, so it sorts the movies by the most recent ones first. For GET requests that return a list of books, the "sort" parameter takes the following values:`author_asc, author_desc, title_asc, title_desc,andrelease_year`. It defaults to sort `byauthor_asc,` so it sorts the books by author in alphabetical order. For GET requests that return a list of songs, the "sort" parameter takes the following values:`release_year, artist_alphabetical,andtitle_alphabetical.I`t defaults to sort by titles alphabetically. Another optional parameter for some of these GET requests is the "page" parameter, which allows users to pick which page they want to query, if there are multiple pages.



**Tools:**

We used Postman to make API calls to scrape data from other websites so we could fill out our own website. We also used Postman to document our own API. We made a new API documentation on Postman and added all the different requests a user can make using our API. After planning out the requests for our API on Postman, we then used our Postman API Documentation to write the API Documentation on GitBook. We used Bootstrap as the CSS framework. We also used Python and Flask to implement the Web framework, and our website is hosted using AWS.

**Hosting:**

We hosted our site using Amazon Web Services \(AWS\), on an Ubuntu server we created with an elastic IP address. We issue commands to this server via SSH, and built a virtual environment that runs Docker. Using Docker, we are able to run our applications using Flask as our web framework.

