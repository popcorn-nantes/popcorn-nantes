const axios = require("axios");

module.exports = {
  fetchProfiles,
};

const profiles = {
  "alvin-berthelot":
    "https://tender-mayer-69d113.netlify.app/.netlify/functions/popcorn",
};

async function getProfile(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchProfiles() {
  return Promise.all(
    Object.keys(profiles).map((slug) => getProfile(profiles[slug]))
  );
}
