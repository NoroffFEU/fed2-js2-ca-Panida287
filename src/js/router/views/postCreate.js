import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.getElementById('create-post-form');

/**
 * Adds a submit event listener to the create post form.
 * 
 * When the form is submitted, the `onCreatePost` function is called to handle the post creation process.
 */
form.addEventListener("submit", onCreatePost);
