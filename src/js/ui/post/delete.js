import { deletePost } from '../../api/post/delete.js';

/**
 * Event handler for deleting a post when the delete button is clicked.
 * 
 * This function confirms with the user if they want to delete the post,
 * and if confirmed, calls the `deletePost` function to perform the deletion.
 * After successful deletion, it redirects the user to the homepage.
 * 
 * @param {Event} event - The event object from the delete button click.
 */
export async function onDeletePost(event) {
    event.preventDefault();
    const postId = event.target.dataset.postId;
    const confirmation = window.confirm("Are you sure you want to delete this post?");
    
    if (confirmation) {
        try {
            await deletePost(postId);
            alert("Post deleted successfully");
            window.location.href = '/'; // Redirect after deletion
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete the post. Please try again later.");
        }
    }
}
