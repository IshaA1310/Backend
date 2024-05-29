// 'use strict';
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {type: String, required: true, unique: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     email: {type: String},
//     subscribers: {type: Number, default: 0},
//     subscribedUsers: {type: [String], default: 0},
// }, {timestamps: true});

// module.exports = mongoose.model('User', userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    subscribers: {type: Number, default: 0},
    subscribedUsers: {type: [String], default: 0},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
