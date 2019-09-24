'use strict';

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li>${responseJson[i].name}</li>
      <li>${responseJson[i].html_url}</li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(url, maxResults=10) {
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const url = `https://api.github.com/users/${searchTerm}/repos`
    const maxResults = $('#js-max-results').val();
    getRepos(url, maxResults);
  });
}

$(watchForm);