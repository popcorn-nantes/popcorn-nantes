let searchIndex = null;

fetch("/api/search-index.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    searchIndex = data;
  });

function submitSearch(event) {
  event.preventDefault();
  const search = document.getElementById("search");
  let value = search.value;

  // matomo search tracking
  if (window._paq) {
    window._paq.push([
      "trackSiteSearch",
      // Search keyword searched for
      value,
      // Search category selected in your search engine. If you do not need this, set to false
      false,
      // Number of results on the Search results page. Zero indicates a 'No Result Search Keyword'. Set to false if you don't know
      false,
    ]);
  }

  if (value.length > 0) {
    let results = searchPersons(searchIndex, value);
    const searchResults = document.getElementById("search-results");
    document.getElementById("persons").style.display = "none";
    searchResults.style.display = "flex";
    searchResults.innerHTML = results
      .map((person) => document.getElementById(person.id).outerHTML)
      .join("");
    window.lazyLoadInstance.update();
  } else {
    document.getElementById("persons").style.display = "flex";
    document.getElementById("search-results").style.display = "none";
  }
}

function searchPersons(searchIndex, text) {
  let persons = searchIndex.filter((person) => {
    let match = false;
    person._exactMatch = false;
    let textLowerCased = text.toLowerCase().trim();
    person.keywords.forEach((keyword) => {
      keyword = keyword.toLowerCase();
      if (keyword.indexOf(textLowerCased) > -1) {
        match = true;
        if (textLowerCased.length === keyword.length) {
          person._exactMatch = true;
        }
      }
    });
    return match;
  });
  persons = persons.sort((a, b) => {
    return b._exactMatch - a._exactMatch;
  });
  return persons;
}
