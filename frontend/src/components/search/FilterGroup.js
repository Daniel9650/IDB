import Autosuggest from 'react-autosuggest';

const topics = ["Romance",
      "Drama",
      "Mystery",
      "Thriller",
      "Music",
      "Science Fiction",
      "Horror",
      "War",
      "Crime",
      "Family",
      "Animation",
      "Adventure",
      "Comedy",
      "Fantasy"];

const getSuggestions = value => {
   const inputValue = value.trim().toLowerCase();
   const inputLength = inputValue.length;

   return inputLength === 0 ? [] : topics.filter(top =>
      top.name.toLowerCase().slice(0, inputLength) === inputValue);
};
