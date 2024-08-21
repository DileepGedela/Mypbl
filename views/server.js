// index.js or server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Doctor = require('./models/Doctor');

const app = express();
const port = 4000;

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://gedeladileep21csd:CVHZSyzMj9geI359@cluster0.b9yak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle doctor registration
app.post('/api/doctor/register', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, specialty, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        const newDoctor = new Doctor({ firstName, lastName, email, phone, specialty, password });
        await newDoctor.save();
        res.status(201).send('Doctor registered successfully');
    } catch (error) {
        res.status(500).send('Error registering doctor: ' + error.message);
    }
});

// Serve static files (like styles.css)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
