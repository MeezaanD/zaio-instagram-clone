import { auth, db } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const authForm = document.getElementById("auth");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");
const userSection = document.getElementById("userSection");
const feed = document.getElementById("feed");
const profileUsername = document.getElementById("profile-username");

function getRelativeTime(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const value = Math.floor(seconds / secondsInUnit);
        if (value >= 1) return `${value}${unit[0]} ago`;
    }

    return "Just now";
}

document.getElementById("signupBtn").onclick = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log("Signup successful");
    } catch (error) {
        console.error("Signup error:", error.message);
        alert(error.message);
    }
};

document.getElementById("loginBtn").onclick = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("Login successful");
    } catch (error) {
        console.error("Login error:", error.message);
        alert(error.message);
    }
};

logoutBtn.onclick = async () => {
    try {
        await signOut(auth);
        console.log("Logged out");
    } catch (error) {
        console.error("Logout error:", error.message);
        alert(error.message);
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        authForm?.style?.setProperty("display", "none");
        userSection?.style?.setProperty("display", "block");
        if (profileUsername) profileUsername.textContent = user.email.split("@")[0];

        const profileImageURL = user.photoURL || "assets/profile-logo.jpeg";

        const leftProfile = document.getElementById("leftProfileSection");
        const leftProfilePic = document.getElementById("leftProfilePic");
        if (leftProfile && leftProfilePic) {
            leftProfile.style.display = "flex";
            leftProfilePic.src = profileImageURL;
        }

        const rightProfile = document.getElementById("rightProfileSection");
        const rightProfilePic = document.getElementById("rightProfilePic");
        const userEmail = document.getElementById("userEmail");
        if (rightProfile && rightProfilePic && userEmail) {
            rightProfile.style.display = "flex";
            rightProfilePic.src = profileImageURL;
            userEmail.textContent = user.email;
        }

        const profileLink = document.getElementById("profileLink");
        if (profileLink) profileLink.style.display = "none";

        loadFeed();
    } else {
        console.log("User is logged out");
        authForm?.style?.setProperty("display", "block");
        userSection?.style?.setProperty("display", "none");
        userInfo.textContent = "";
        if (profileUsername) profileUsername.textContent = "Guest";
        if (feed) feed.innerHTML = "";

        document
            .getElementById("leftProfileSection")
            ?.style?.setProperty("display", "none");
        document
            .getElementById("rightProfileSection")
            ?.style?.setProperty("display", "none");

        const profileLink = document.getElementById("profileLink");
        if (profileLink) {
            profileLink.style.display = "flex";
            profileLink.innerHTML = `<i class="far fa-user"></i> Profile`;
        }
    }
});

function loadFeed() {
    const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );
    onSnapshot(postsQuery, (snapshot) => {
        if (!feed) return;

        feed.innerHTML = "";

        snapshot.forEach((doc) => {
            const post = doc.data();
            const username = post.username || post.email?.split("@")[0] || "user";
            const createdAt = post.createdAt?.toDate();
            const relativeTime = createdAt ? getRelativeTime(createdAt) : "Just now";

            const postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.innerHTML = `
                <div class="post-header">
                    <div class="post-header-left">
                        <img src="${post.profilePhoto}" alt="Profile">
                        <span class="post-username">${username}</span>
                        <span class="post-time">• ${relativeTime}</span>
                    </div>
                    <div class="post-more">⋯</div>
                </div>
                <img class="post-image" src="${
                    post.imageUrl ||
                    "https://source.unsplash.com/random/600x600/?city"
                }" alt="Post" sizes="(max-width: 500px) 100vw, 468px">
                <div class="post-actions">
                    <div class="post-actions-left">
                        <i class="far fa-heart"></i>
                        <i class="far fa-comment"></i>
                        <i class="far fa-paper-plane"></i>
                    </div>
                    <div class="post-actions-right">
                        <i class="far fa-bookmark"></i>
                    </div>
                </div>
                <div class="post-caption">
                    <span class="post-caption-username">${username}</span>
                    ${post.caption || ""}
                </div>
                <div class="post-comment-box">
                    <input class="post-comment-input" type="text" placeholder="Add a comment...">
                </div>
            `;

            feed.appendChild(postDiv);
        });
    });
}

const isLoggedIn = true;
const profileLink = document.getElementById("profileLink");

if (isLoggedIn) {
    profileLink.innerHTML = `
        <img src="assets/profile-logo.jpeg" alt="Profile" style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover; margin-right: 8px;" />
        Profile
    `;
}
