const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


// Connect to the MongoDB database
async function initDB(){
    await mongoose.connect('mongodb://127.0.0.1:27017/sky_visit');
}

// Define a schema for your data
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String
});

// Create a model based on the schema
const User = mongoose.model('users', userSchema);

async function getUser() {
    try {
        // Query the database to get data
        const users = await User.findOne({});
        console.log('Users in the database:');
        console.log(users);
        return users;
    } catch (error) {
        console.error('Error retrieving data:', error);
    } finally {
        // Close the connection when done

    }
}

//console.log(getUser());

app.get('/getUser', async (req, res) => {

    var user = await getUser();
    res.send(user);
});

app.post('/validateUser', (req, res) => {
    res.send('Hello, World!');
});

app.post('/signup', async (req, res) => {
    // Extract user details from the request body
    const { userName, email, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({
            userName: userName,
            email: email,
            password: password,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        console.log('User signed up:', savedUser);
        res.send('User signed up successfully');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Error signing up user');
    }
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Call the function and wait for it to complete
     getUser();
     const PORT = 3000;
     app.listen(PORT, async () => {
        initDB();

         console.log(`Server is running at http://localhost:${PORT}/`);
     });