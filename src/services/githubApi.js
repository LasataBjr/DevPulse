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

//  Fetch public codebase vaults (We'll use this next!)
export async function getGithubRepos(username) {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=6`);

  if (!response.ok) {
    throw new Error("Could not retrieve repository streams.");
  }

  return response.json(); // Returns the parsed array of repositories
}