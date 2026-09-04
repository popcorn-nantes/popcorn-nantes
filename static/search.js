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

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_'\u2019.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchPersons(searchIndex, text) {
  const terms = normalize(text).split(" ").filter(Boolean);
  if (terms.length === 0) return [];

  let persons = searchIndex.filter((person) => {
    const keywords = person.keywords.map(normalize);
    person._exactMatch = keywords.some(
      (keyword) => keyword === terms.join(" ")
    );
    // every term of the query must be found in at least one keyword,
    // so "bastien thomas" or "thomas bastien" both match.
    return terms.every((term) =>
      keywords.some((keyword) => keyword.indexOf(term) > -1)
    );
  });
  persons = persons.sort((a, b) => {
    return b._exactMatch - a._exactMatch;
  });
  return persons;
}
