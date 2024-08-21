const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialty: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: 'DoctorRegister' }); // Specify the collection name here

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
