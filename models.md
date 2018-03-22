**Models**

There are four models on our website: Movies, Music, Books, and Topics. Each model has its own attributes, which users can get more information about by using our API. The Topics model connects the movies, music, and books together; this can be certain keywords or genres which these types of media have in common. To populate each page, we scraped the APIs of other websites in order to get what movies, music, and books are currently trending. We also wrote a Python program to parse the results of these API calls to get the data that we needed for our website. The grid page for each of these models displays the various movies, books, and music. Users can view movies, music, and books and from there, they can select one that they want to learn more about. When users click on a movie, for example, they will be directed to the page for that specific movie. On that page, they can find links to similar books and music, which share similar topics to this movie.

**Movies:**

For the Movies model, we had several attributes, including the following:

* movie unique ID number
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

* song unique ID number
* name of song
* artist
* album
* year of release
* song preview \(YouTube\)
* link to album cover photo
* link\(s\) to song's topics
* link\(s\) to similar movies
* link\(s\) to similar books

**Books:**

For the Books model, we had the following attributes:

* book unique ID number
* title
* author\(s\)
* description
* publication year
* image of book cover
* link\(s\) to book's topics
* link\(s\) to similar movies
* link\(s\) to similar music

**Topics:**

For the Topics mode, we had the following attributes:

* topic unique ID number
* name
* basic representative image for this topic
* link\(s\) to books
* link\(s\) to movies
* link\(s\) to music



