Problem Solving Approach:
The frontend provides a user-friendly interface for interacting with the blog system:
Signup/Login Forms: Forms use controlled components and validate user input.
Dashboard: Displays user-specific blog posts and allows creating/editing/deleting.
Google reCAPTCHA v2: Integrated using react-google-recaptcha for the signup form.
API Communication: Axios is used to securely interact with the backend, including sending the CAPTCHA token.

ChatGPT:
  - Guided integration of Google reCAPTCHA in both frontend and backend.
  - Helped with writing secure API endpoints and validating tokens.
  - Provided suggestions for code structure and error handling.

setup instructions:
To set up your full-stack blog system project, start by cloning both the frontend and backend repositories to your local machine.
First, navigate to the backend directory. Run npm install to install the necessary dependencies, which include express, cors, bcrypt, 
jsonwebtoken, and mysql2. Create a .env file in the root of the backend folder and add your configuration variables such as PORT, JWT_SECRET,
FRONTEND_URL, RECAPTCHA_SECRET_KEY, and your database credentials. Ensure your MySQL database is set up with the required tables (users, posts, etc.). 
Once configuration is done, start the backend server using node server.js or npm start.
Next, move to the frontend setup. Navigate to the frontend folder and run npm install to install dependencies like axios,
react-router-dom, react-google-recaptcha, and Bootstrap for styling. Create a .env file in the frontend root and include your 
Google reCAPTCHA site key using REACT_APP_RECAPTCHA_SITE_KEY=your_site_key. Make sure the site key matches the one registered in 
your Google reCAPTCHA console and includes localhost as an allowed domain for development. Once done, start the frontend server using 
npm start, which will launch the React app at http://localhost:3000.
With both servers running, you can now access the full application. The homepage will list public blog posts with summaries.
Registered users can sign up using a secure CAPTCHA-protected form, log in, and navigate to their dashboard where they can 
create, edit, or delete their posts. The rich text editor allows for well-formatted blog content, and only the original authors
are authorized to modify their entries. The application supports searching blog posts by title or content from the frontend interface. 
A consistent navigation bar provides access to the home page, post creation, user posts, and authentication routes.
