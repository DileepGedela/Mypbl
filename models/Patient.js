const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: 'PatientRegister' }); // Specify the collection name here

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
