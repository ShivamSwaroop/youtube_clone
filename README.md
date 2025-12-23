## YouTube Clone – MERN Stack Capstone Project ##

A full-stack YouTube-like video streaming platform built using the MERN stack (MongoDB, Express, React, Node.js).

## Features Implemented

* Authentication

User registration

User login with JWT authentication

Persistent login using localStorage

Protected routes (like, comment, upload, delete)

* Channel System

Logged-in users can create their own channel

Each user can have only one channel

 Channel page shows:

Channel name & description

All videos uploaded by the channel owner

Only the channel owner can:

Upload videos

Delete their videos

* Video Management

Upload video with:

Title

Description

Category

Thumbnail URL

Video URL

View videos on home page

Delete own videos

View individual video player page

* Like /  Dislike System

Like and dislike buttons on video page

User can either like or dislike, not both

Clicking like removes dislike and vice versa

Like/dislike stored per video per user

* Comments

Logged-in users can add comments

Comments are saved in MongoDB

Comments displayed below the video

Each comment is linked to the user who posted it

* Video Recommendations

While watching a video:

Recommended videos appear on the right side

Recommendations exclude the currently playing video

Based on same category (simple logic)

* Navigation & UI

Static sidebar with:

Expand / collapse (no routing logic)

Header with:

Search bar

Signin / Logout

My Channel button

* Filtering & Search

Filter videos by category (React, Node, MongoDB, etc.)

Search videos by title

Combined filtering (category + search)

# Tech Stack

Frontend

React (Vite)

React Router DOM

Axios

Context API (AuthContext)

Backend

Node.js

Express.js

MongoDB (local)

Mongoose

JWT Authentication

bcrypt.js

# Installation & Setup
* Clone the Repository
git clone https://github.com/ShivamSwaroop/youtube_clone.git
cd youtube-clone

* Backend Setup
cd backend
npm install


* Create a .env file:

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/youtube_clone

JWT_SECRET=your_secret_key


* Start MongoDB locally:

mongod


* Run backend:

npm run dev

* Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

* Seed Data 

To populate sample videos:

cd backend
node seed.js

# API Endpoints Overview
Auth

POST /api/auth/register

POST /api/auth/login

Channel

POST /api/channels

GET /api/channels/me

Videos

GET /api/videos

GET /api/videos/:id

POST /api/videos

DELETE /api/videos/:id

POST /api/videos/:id/like

POST /api/videos/:id/dislike

POST /api/videos/:id/comment

GET /api/videos/:id/recommendations


* Author

Shivam Swaroop Dubey
