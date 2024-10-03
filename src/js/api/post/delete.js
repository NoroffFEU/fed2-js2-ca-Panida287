import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Deletes a post by sending a DELETE request to the social API.
 * 
 * This function sends a DELETE request to the API to remove the specified post.
 * It returns a promise that resolves if the deletion is successful.
 * 
 * @async
 * @param {number|string} postId - The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post is deleted successfully.
 * @throws Will throw an error if the network request fails or the server response is not ok.
 */
export async function deletePost(postId) {
    const myHeaders = await headers();

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };

    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, requestOptions);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the post.');
    }
}
