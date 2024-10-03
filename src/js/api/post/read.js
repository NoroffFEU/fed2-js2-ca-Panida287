import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";
import { getIDFromURL } from "../../utilities/urlIDUtils";
;
/**
 * Fetches a list of posts
 *
 * @param {number} [limit=12] - The number of posts to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @returns {Promise<Object>} A promise that resolves to an object containing posts and pagination info.
 * @throws Will throw an error if the network request fails.
 */

export async function readPosts(limit = 12, page = 1,) {
    const myHeaders = await headers();
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
  
    try {
      const response = await fetch(API_SOCIAL_POSTS+`?limit=${limit}&page=${page}&_author=true`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result; 
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

/**
 * Fetches a post by its ID.
 *
 * @param {string} postId - The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post data.
 */

export async function readPost() {
    const postId = getIDFromURL('postID');
    const myHeaders = await headers();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}?_author=true`, requestOptions);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('API Response:', result);
        return result.data;
    } 
    catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

/**
 * Fetches posts created by a specific user, with optional pagination and tag filtering.
 *
 * @param {number} [limit=12] - The number of posts to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {string} [tag] - An optional tag to filter the posts by.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's posts.
 * @throws Will throw an error if the network request fails.
 */
export async function readPostsByUser(limit = 12, page = 1, tag = null, username) {
    const myHeaders = await headers();

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, {
            method: "GET",
            headers: myHeaders,
        });
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            console.error(result);
            throw new Error(`Failed to fetch posts: ${result.message}`);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

