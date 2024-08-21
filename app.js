// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const Doctor = require('./models/Doctor'); // Importing the Doctor model
// const Patient = require('./models/Patient'); // Importing the Patient model

// const app = express();
// const PORT = 3000;

// // MongoDB Atlas connection
// mongoose.connect('mongodb+srv://gedeladileep21csd:CVHZSyzMj9geI359@cluster0.b9yak.mongodb.net/PBL?retryWrites=true&w=majority&appName=Cluster0', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch((error) => console.error('MongoDB connection error:', error));

// // Set EJS as templating engine
// app.set('view engine', 'ejs');

// // Middleware to parse request bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Serve static files from the public folder
// app.use(express.static('public'));

// // Routes
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/doctor-register', (req, res) => {
//     res.render('doctor-register');
// });

// app.get('/patient-register', (req, res) => {
//     res.render('patient-register');
// });

// app.get('/doctor-login', (req, res) => {
//     res.render('doctor-login');
// });

// app.get('/patient-login', (req, res) => {
//     res.render('patient-login');
// });

// // Handle doctor registration (from the form submission)
// app.post('/api/doctor/register', async (req, res) => {
//     const { firstName, lastName, email, phone, specialty, password, confirmPassword } = req.body;
  
//     // Basic validation
//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }
  
//     try {
//         const newDoctor = new Doctor({ firstName, lastName, email, phone, specialty, password });
//         const result = await newDoctor.save(); // Save the doctor to the database
//         res.status(200).json({ message: 'Registration successful', result });
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving data', error });
//         console.error('Error saving data:', error);
//     }
// });

// // Handle patient registration (from the form submission)
// app.post('/api/patient/register', async (req, res) => {
//     const { firstName, lastName, email, phone, address, gender, password, confirmPassword } = req.body;
  
//     // Basic validation
//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }
  
//     try {
//         const newPatient = new Patient({ firstName, lastName, email, phone, address, gender, password });
//         const result = await newPatient.save(); // Save the patient to the database
//         res.status(200).json({ message: 'Registration successful', result });
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving data', error });
//         console.error('Error saving data:', error);
//     }
// });

// // Handle doctor login (from the form submission)
// app.post('/api/doctor/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const doctor = await Doctor.findOne({ email, password });

//         if (!doctor) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Redirect to the details page with the doctor's data
//         res.render('doctor-details', { doctor });
//     } catch (error) {
//         res.status(500).json({ message: 'Error during login', error });
//         console.error('Error during login:', error);
//     }
// });

// // Handle patient login (from the form submission)
// app.post('/api/patient/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const patient = await Patient.findOne({ email, password });

//         if (!patient) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Redirect to the details page with the patient's data
//         res.render('patient-details', { patient });
//     } catch (error) {
//         res.status(500).json({ message: 'Error during login', error });
//         console.error('Error during login:', error);
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');

const app = express();
const PORT = 3000;

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://gedeladileep21csd:CVHZSyzMj9geI359@cluster0.b9yak.mongodb.net/PBL?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Serve static files from the public folder
app.use(express.static('public'));

// Middleware to check login status
app.use((req, res, next) => {
    res.locals.isDoctor = req.session.isDoctor || false;
    res.locals.isPatient = req.session.isPatient || false;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/doctor-register', (req, res) => {
    res.render('doctor-register');
});

app.get('/patient-register', (req, res) => {
    res.render('patient-register');
});

app.get('/doctor-login', (req, res) => {
    res.render('doctor-login');
});

app.get('/patient-login', (req, res) => {
    res.render('patient-login');
});

// Handle doctor registration
app.post('/api/doctor/register', async (req, res) => {
    const { firstName, lastName, email, phone, specialty, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const newDoctor = new Doctor({ firstName, lastName, email, phone, specialty, password });
        const result = await newDoctor.save();
        res.status(200).json({ message: 'Registration successful', result });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
        console.error('Error saving data:', error);
    }
});

// Handle patient registration
app.post('/api/patient/register', async (req, res) => {
    const { firstName, lastName, email, phone, address, gender, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const newPatient = new Patient({ firstName, lastName, email, phone, address, gender, password });
        const result = await newPatient.save();
        res.status(200).json({ message: 'Registration successful', result });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
        console.error('Error saving data:', error);
    }
});

// Handle doctor login
app.post('/api/doctor/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email, password });

        if (!doctor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.isDoctor = true;
        req.session.isPatient = false;
        res.render('doctor-details', { doctor });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
        console.error('Error during login:', error);
    }
});

// Handle patient login
app.post('/api/patient/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findOne({ email, password });

        if (!patient) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.isDoctor = false;
        req.session.isPatient = true;
        res.render('patient-details', { patient });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
        console.error('Error during login:', error);
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
