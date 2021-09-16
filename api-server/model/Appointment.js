const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    appointmentTime: Date,
    vaccine: {
        type: String,
        enum: ["covaxin", "covishield"]
    },
    bookingTime: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ["BOOKED", "COMPLETED", "CANCELLED", "REJECTED"]
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = {
    newAppointment: function (appointmentData) {
        return new Promise((resolve, reject) => {
            const appointment = new Appointment({
                ...appointmentData
            });
            appointment.save(function (error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            })
        })
    },
    updateAppointmentStatus: function (id, status) {
        return new Promise(function (resolve, reject) {
            Appointment.findByIdAndUpdate(id, { status }, function (error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            })
        })
    },
    getAllAppointments: function () {
        return new Promise((resolve, reject) => {
            Appointment.find(function (error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            })
        })
    },
    getAppointmentDetailsById: function (appointmentId) {
        return new Promise((resolve, reject) => {
            Appointment.findById(appointmentId, function (error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            })
        })
    },
    getAllAppointmentByUser: function (userId) {
        return new Promise((resolve, reject) => {
            Appointment.find({ userId }).populate('userId').populate('hospitalId').exec(function (error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        });
    }
}