import { updatePost } from '../../api/post/update.js';

/**
 * Handles the form submission event for updating a post.
 * 
 * This function prevents the default form submission behavior,
 * collects the updated data from the form fields, and calls the
 * `updatePost` API function to send the updated data to the server.
 * It also handles success and error notifications to the user.
 * 
 * @async
 * @function onUpdatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the update process completes.
 */
export async function onUpdatePost(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const imageUrl = document.getElementById('media').value.trim();
    const tagsInput = document.getElementById('tags').value.trim();
  
    const params = new URLSearchParams(window.location.search);
    const postID = params.get('postID');
  
    if (!postID) {
      console.error("Post ID is missing from the URL.");
      alert("Unable to update post because the post ID is missing.");
      return;
    }

    const data = {
      title,
      body,
    };
  

    if (tagsInput) {
      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      if (tags.length > 0) {
        data.tags = tags;
      }
    }
  
    if (imageUrl) {
      data.media = {
        url: imageUrl,
      };
    }
  
    try {

      await updatePost(postID, data);
      alert("Post updated successfully!");

      window.location.href = `/post/?postID=${postID}`;
    } catch (error) {
      console.error("Error updating post:", error);
      alert("There was a problem updating your post. Please try again.");
    }
  }
