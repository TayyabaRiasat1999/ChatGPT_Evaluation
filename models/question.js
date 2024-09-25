// 1) require mongoose
const { isNumber } = require('lodash');
const mongoose = require('mongoose');

// 2) use schema from mongoose
const Schema = mongoose.Schema;

// 3) define the Schema 
const questionSchema = new Schema({
    
    accuracy:{type: Number,required: true},
    question:{type: String,required: true},
    A:{type: String,required: true},
    B:{type: String,required: true},
    C:{type: String,required: true},
    D:{type: String,required: true},
    answer:{type: String,required: true},
    GPT_answer:{type: String,required: true},
    response_time:{type: Number,required: true}
},{timestamps: true});

// 4) create models
const History_question = mongoose.model('History',questionSchema); //model for history
const Social_Science_question = mongoose.model('Social_Science',questionSchema); //model for Social_Science
const Computer_Security_question = mongoose.model('Computer_Security',questionSchema); //model for Computer_Security
// export the question module
module.exports = {
    History_question,
    Social_Science_question,
    Computer_Security_question
};

