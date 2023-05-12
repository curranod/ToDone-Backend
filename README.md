Backend Readme
This readme provides an overview of the backend implementation of the ToDone application.

Technologies Used
Node.js: A JavaScript runtime environment that allows executing server-side code.
Express.js: A fast and minimalist web application framework for Node.js that simplifies the process of building robust APIs.
MongoDB: A popular NoSQL database used for storing and retrieving data.
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js that provides a convenient way to interact with the database.
JWT (JSON Web Token): A compact, URL-safe means of representing claims to be transferred between two parties.
Bcrypt: A library for hashing and comparing passwords, providing a secure way to store user passwords.
API Endpoints
Register
POST /register: Creates a new user account.
Login
POST /login: Authenticates a user and generates a JWT token for subsequent authorization.
Tasks
POST /:userId/addtasks: Adds a new task for the specified user.
PUT /tasks/:taskId/start: Updates the status of a task to "in-progress".
PUT /:userId/tasks/:taskId: Updates the status of a task for the specified user.
Retrieve User Tasks
GET /tasks/:userId: Retrieves all tasks associated with the specified user.
Authentication
User authentication is implemented using JSON Web Tokens (JWT). Upon successful registration or login, a JWT token is generated and sent to the client. Subsequent requests to protected routes require including the JWT token in the Authorization header.

Error Handling
In case of any server errors, the server will respond with a 500 status code and a corresponding error message.

Security
To ensure secure password storage, the bcrypt library is used to hash user passwords before storing them in the database.

Contributors
[Curran]: https://github.com/curranod
