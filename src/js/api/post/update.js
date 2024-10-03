import { API_SOCIAL_POSTS } from "../constants";
import { headers } from '../headers';

/**
 * Updates an existing post by sending a PUT request to the social API.
 * 
 * This function constructs the necessary headers and request body,
 * then sends a PUT request to update the specified post with new data.
 * It does not handle UI updates; it only communicates with the API.
 * 
 * @async
 * @function updatePost
 * @param {number} id - The ID of the post to update.
 * @param {Object} postData - An object containing the updated post data.
 * @param {string} postData.title - The updated title of the post.
 * @param {string} postData.body - The updated content of the post.
 * @param {string[]|string} [postData.tags] - Optional updated tags for the post.
 * @param {string} [postData.media] - Optional URL of the updated media (e.g., image).
 * @returns {Promise<void>} Resolves if the post is updated successfully.
 * @throws Will throw an error if the network request fails or the server response is not ok.
 */
export async function updatePost(postID, data) {
    const myHeaders = await headers();
  
    const response = await fetch(`${API_SOCIAL_POSTS}/${postID}`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }
  
    return response.json();
  }