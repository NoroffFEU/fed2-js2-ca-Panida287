import { createPost } from "../../api/post/create";
/**
 * Handles the create post form submission event.
 * 
 * This function prevents the default form submission behavior, collects the input values 
 * for title, body, tags, and media, and sends them to the `createPost` function.
 * If the post is created successfully, the user is redirected to the homepage.
 * 
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the post creation process completes.
 */
export async function onCreatePost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const media = document.getElementById('media').value;

    const postData = {
        title,
        body,
        tags,
        media,
    };

    try {
        await createPost(postData);
    } catch (error) {
        console.error('Error during post creation:', error);
        alert('Failed to create the post. Please try again.');
    }
}
