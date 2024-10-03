import { readPost } from '../../api/post/read';
import { deletePost } from '../../api/post/delete';
import { setLogoutListener } from '../../ui/global/logout';
import { getIDFromURL } from "../../utilities/urlIDUtils";

setLogoutListener(); 

/**
 * Fetches and renders a single post in the DOM.
 * 
 * This function retrieves the post ID from the URL, fetches the post data using the `readPost` function,
 * and dynamically creates HTML elements to display the post's content, media, author information,
 * and the last updated date. If the logged-in user is the author of the post, edit and delete buttons
 * are displayed to allow post modification.
 * 
 * @async
 * @function renderPost
 * @returns {Promise<void>} A promise that resolves when the post is rendered.
 * 
 * @throws {Error} Logs an error message if fetching the post fails or if the post ID is not found.
 */
async function renderPost() {
    const postID = getIDFromURL('postID');

    if (!postID) {
        console.error('Post ID not found in URL.');
        return;
    }

    try {
        const post = await readPost(postID);

        if (!post) {
            console.error('No post data found');
            return;
        }

        const postContainer = document.getElementById('post-container');

        const title = document.createElement('h1');
        title.id = 'post-title';
        title.textContent = post.title;
        
        const body = document.createElement('p');
        body.id = 'post-body';
        body.textContent = post.body;
        
        const image = document.createElement('div');
        image.id = 'post-image';
        if (post.media) {
            image.style.backgroundImage = `url(${post.media.url})`;
            image.style.backgroundRepeat = 'no-repeat';
            image.style.backgroundSize = 'cover';
            image.style.backgroundPosition = 'center';
        } else {
            image.style.backgroundImage = '';
        }
        
        const authorContainer = document.createElement('div');
        authorContainer.id = 'author-container';
        
        const authorAvatar = document.createElement('img');
        authorAvatar.id = 'author-avatar';
        authorAvatar.src = post.author.avatar.url;
        authorAvatar.alt = post.author.avatar.alt;
        authorAvatar.style.width = '50px';
        authorAvatar.style.height = '50px';
        authorAvatar.style.borderRadius = '50%';
        
        const authorName = document.createElement('p');
        authorName.id = 'author-name';
        authorName.textContent = `Author: ${post.author.name}`;
        
        authorContainer.appendChild(authorAvatar);
        authorContainer.appendChild(authorName);
        
        const dateUpdated = document.createElement('p');
        dateUpdated.id = 'date-updated';
        dateUpdated.textContent = `Last updated: ${new Date(post.updated).toLocaleDateString()}`;

        const loggedInUserName = localStorage.getItem('userName');
        if (loggedInUserName === post.author.name) {
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                window.location.href = `/post/edit/?postID=${post.id}`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                if (confirm("Are you sure you want to delete this post?")) {
                    await deletePost(postID);
                    window.location.href = '/';
                }
            });

            postContainer.appendChild(editButton);
            postContainer.appendChild(deleteButton);
        }

        postContainer.appendChild(title);
        postContainer.appendChild(body);
        postContainer.appendChild(image);
        postContainer.appendChild(authorContainer);
        postContainer.appendChild(dateUpdated);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        const errorMsg = document.createElement('div');
        errorMsg.textContent = error.message;
        document.body.appendChild(errorMsg);
    }
}

renderPost();
