Modern Contact Book - Full Stack Project
This is my project submission for the Naviotech Solution internship. It’s a full-stack contact management tool that connects a frontend UI to a Node.js backend and a MySQL database.

🛠 Tech I Used

Frontend: HTML5, CSS (Glassmorphism), and Vanilla JavaScript (Fetch API).

Backend: Node.js with Express.js framework.

Database: MySQL (for persistent data storage).

🚀 How to get this running on your machine

1. Database Setup First, you'll need to create the database in MySQL. Open your terminal or MySQL Workbench and run:

SQL
CREATE DATABASE contact_db;
USE contact_db;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
2. Backend Installation Navigate to the project folder and install the necessary packages:

Bash
npm install
3. Configure Connection Open server.js and make sure the database credentials match your local MySQL setup:

Change the user if it's not 'root'.

Enter your MySQL password.

4. Start the Server Run the following command to start the backend:

Bash
node server.js
You should see a message saying "Successfully connected to MySQL Database!"

5. Launch the App Just open index.html in any browser, and you're good to go.

📂 Folder Structure

index.html - The main structure.

style.css - Custom styling for the glassmorphism effect.

script.js - Handles form submission and API calls to the server.

server.js - The Express server and MySQL connection logic.

database.sql - Reference for the SQL table structure.

.gitignore - Prevents node_modules from being uploaded.

📝 My Learning Experience

During this project, I learned how to bridge the gap between a static webpage and a live database. I spent a good amount of time debugging the Fetch requests and ensuring the database IDs were correctly mapped to the frontend rows to avoid "undefined" errors.

Author: Saishree Rajendra Kote 

Internship: Naviotech Solution Pvt. Ltd.