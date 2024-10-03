/**
 * Registers a new user by sending a POST request to the registration API.
 * 
 * This function constructs the request body based on the provided 
 * user data (including optional bio, avatar, and banner) and sends it to 
 * the registration endpoint.
 * 
 * @async
 * @param {Object} userData - The user data object containing registration details.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user's account.
 * @param {string} [userData.bio] - Optional bio for the user's profile.
 * @param {string} [userData.banner] - Optional URL for the user's profile banner image.
 * @param {string} [userData.avatar] - Optional URL for the user's profile avatar image.
 * 
 * @returns {Promise<Object>} A promise that resolves with the server's response in JSON format.
 * @throws Will throw an error if the fetch request fails.
 */

import { API_AUTH_REGISTER } from "../constants";

export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const userInput = {
    
    name, 
    email, 
    password, 
  };

  if (bio) {
    userInput.bio = bio;
  }

  if (avatar) {
    userInput.avatar = {
      url: avatar,
      alt: "Avatar alt text",
    };
  }

  if (banner) {
    userInput.banner = {
      url: banner, 
      alt: "Banner alt text",
    };
  }

  return fetch(API_AUTH_REGISTER, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(userInput),
  })
  .then((response) => response.json())
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.error('Error:', error);
    throw error;
  });
}
