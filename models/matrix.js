// 1) require mongoose
const { isNumber } = require('lodash');
const mongoose = require('mongoose');

// 2) use schema from mongoose
const Schema = mongoose.Schema;

// 3) define the Schema 
const matrixSchema = new Schema({
    title:{type: String,required: true},
    accuracy:{type: Number,required: true},
    response_time:{type: Number,required: true}
},{timestamps: true});

// 4) create models
const matrix = mongoose.model('matrix',matrixSchema); //model for matrix
// export the matrix module
module.exports = matrix;


