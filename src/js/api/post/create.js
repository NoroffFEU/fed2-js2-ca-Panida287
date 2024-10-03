import { headers } from '../headers';
import { API_SOCIAL_POSTS } from '../constants';

/**
 * Creates a new post by sending a POST request to the social API.
 * 
 * This function sends the post's title, body, tags, and media to the API, 
 * with optional tags and media. If the request is successful, it will 
 * redirect the user to the homepage and display a success message. 
 * If the request fails, an error message is displayed.
 * 
 * @async
 * @param {Object} postData - An object containing the post data.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body/content of the post.
 * @param {string[]|string} [postData.tags] - Optional tags for the post, can be an array or a single tag.
 * @param {string} [postData.media] - Optional URL of the media (e.g., image) to be included in the post.
 * 
 * @returns {Promise<void>} A promise that resolves if the post is created successfully. 
 * Displays a success message and redirects the user to the homepage. 
 * If an error occurs, it logs the error and displays an error message.
 * 
 * @throws Will throw an error if the network request fails or the server response is not ok.
 */
export async function createPost({ title, body, tags, media }) {
    const myHeaders = await headers();

    const postInput = {
        title,
        body,
    };

    // Add optional tags and media
    if (tags) {
        postInput.tags = Array.isArray(tags) ? tags : [tags];
    }

    if (media) {
        postInput.media = {
            url: media,
            alt: "Image alt text",
        };
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(postInput),
    };

    try {
        const response = await fetch(API_SOCIAL_POSTS, requestOptions);
        const result = await response.json();

        if (response.ok) {
            alert("Post created successfully");
            window.location.assign("/");
        } else {
            console.error(result);
            alert("Post could not be created: " + result.message);
        }
    } catch (error) {
        console.error("Error while creating post:", error);
        alert("Failed to create the post. Please try again later.");
    }
}
