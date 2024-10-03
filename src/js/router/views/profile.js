import { authGuard } from "../../utilities/authGuard";
import { readProfile } from "../../api/profile/read";
import { readPostsByUser } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";

authGuard();
setLogoutListener();

const profileContainer = document.getElementById("profile-container");
const postsContainer = document.getElementById("posts-container");

/**
 * Fetches and renders the user's profile.
 * 
 * This function fetches the profile data from the API based on the current 
 * user's username, which is retrieved from localStorage. It then clears the 
 * `profileContainer` and populates it with the user's name, email, and avatar 
 * (if available). If an error occurs during the profile fetching process, an 
 * error message is displayed instead.
 * 
 * @async
 * @function renderProfile
 * @returns {Promise<void>} Resolves when the profile is successfully rendered.
 * @throws Will log an error if the network request fails or the profile data is unavailable.
 */
async function renderProfile() {
    try {
        const userName = localStorage.getItem('userName'); // Get the logged-in user's username

        if (userName) {
            // Fetch profile and posts data
            const profile = await readProfile(userName); // Fetch profile data for the logged-in user
            const postsData = await readPostsByUser(12, 1, null, userName); // Fetch posts for the logged-in user

            profileContainer.innerHTML = '';

            const nameElement = document.createElement('h2');
            nameElement.textContent = `Name: ${profile.data.name}`;

            const emailElement = document.createElement('p');
            emailElement.textContent = `Email: ${profile.data.email}`;

            // Add fallback handling for avatar
            if (profile.data.avatar && profile.data.avatar.url) {
                const avatarElement = document.createElement('img');
                avatarElement.src = profile.data.avatar.url;
                avatarElement.alt = profile.data.avatar.alt || `${profile.data.name}'s Avatar`;
                avatarElement.width = 100;
                profileContainer.appendChild(avatarElement);
            } else {
                //Add a fallback avatar image
                const fallbackAvatar = document.createElement('img');
                fallbackAvatar.src = 'https://via.placeholder.com/100';
                fallbackAvatar.alt = 'Default Avatar';
                fallbackAvatar.width = 100;
                profileContainer.appendChild(fallbackAvatar);
            }

            profileContainer.appendChild(nameElement);
            profileContainer.appendChild(emailElement);

            postsContainer.innerHTML = '';

            postsData.data.forEach(post => {
                const postMedia = post.media 
                    ? `<img class="post-media" src="${post.media.url}" alt="${post.media.alt || 'Post media'}">`
                    : '<img class="post-media" src="https://via.placeholder.com/600x400" alt="Default post media">'; // Fallback media

                const postElement = document.createElement('div');
                postElement.classList.add('post');

                postElement.innerHTML = `
                    <div class="post-body-container">
                        <a href="/post/?postID=${post.id}" data-postID="${post.id}">
                            ${postMedia}
                            <h2 class="post-title">${post.title}</h2>
                            <p class="post-body">${post.body}</p>
                         </a>
                    </div>
                    `;

                postsContainer.appendChild(postElement);
            });

        } else {
            console.error('User not logged in');
        }
    } catch (error) {
        console.error('Error fetching profile or posts:', error);
        profileContainer.innerHTML = '<p>Error loading profile. Please try again later.</p>';
        postsContainer.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

renderProfile();
