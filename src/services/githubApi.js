// src/services/githubApi.js
const BASE_URL = "https://api.github.com";

//  Fetch clean profile metadata
export async function getGithubUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    throw new Error("Target developer parameter not found in registries.");
  }

  return response.json(); // Returns the parsed user object data
}

// Fetches public codebases (sorted by most recently updated, limiting to 100 items)
export async function getGithubRepos(username) {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`);

  if (!response.ok) {
    throw new Error("Could not retrieve repository streams.");
  }

  return response.json(); // Returns the parsed array of repositories
}