import { authGuard } from "../../utilities/authGuard";
import { readPost } from '../../api/post/read.js';
import { onUpdatePost } from '../../ui/post/update.js';
import { getIDFromURL } from "../../utilities/urlIDUtils.js";

authGuard();

/**
 * Fetches the existing post data and populates the edit form.
 * 
 * This function uses the post ID from the URL to fetch the current post data.
 * It then fills the form fields with the existing data to allow the user to edit.
 * 
 * @async
 * @function populateForm
 * @returns {Promise<void>} Resolves when the form is populated or if an error occurs.
 */
async function populateForm() {
    const postID = getIDFromURL('postID');
    if (!postID) {
        console.error('Post ID not found in URL.');
        return;
    }

    try {
        const postData = await readPost(postID);
        if (!postData) {
            console.error('Post data not found.');
            return;
        }

        document.getElementById('title').value = postData.title || '';
        document.getElementById('body').value = postData.body || '';
        document.getElementById('tags').value = postData.tags ? postData.tags.join(', ') : '';
        document.getElementById('media').value = postData.media ? postData.media.url : '';
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}

const form = document.getElementById('edit-post-form');

/**
 * Adds a submit event listener to the edit post form.
 * 
 * When the form is submitted, the `onUpdatePost` function is called to handle the post update process.
 */
form.addEventListener('submit', onUpdatePost);

populateForm();
