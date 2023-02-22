require('dotenv').config();
const connection = require('./db')
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const postRoutes = require('./routes/post');
const activeRoutes = require('./routes/active');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Database Connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

// Routes
app.use("/api/users", signupRoutes);
app.use("/api/auth", loginRoutes);
app.use('/api/post', postRoutes);
app.use('/api/active', activeRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`))

