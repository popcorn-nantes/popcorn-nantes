const search = document.getElementById("search");
let searchIndex = null;

fetch("/api/search-index.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    searchIndex = data;
  });

search.addEventListener("input", (event) => {
  if (searchIndex) {
    let value = event.target.value;
    if (value.length > 0) {
      let results = searchPersons(searchIndex, value);
      const searchResults = document.getElementById("search-results");
      document.getElementById("persons").style.display = "none";
      searchResults.style.display = "flex";
      searchResults.innerHTML = results
        .map((person) => document.getElementById(person.id).outerHTML)
        .join("");
    } else {
      document.getElementById("persons").style.display = "flex";
      document.getElementById("search-results").style.display = "none";
    }
  }
});

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
