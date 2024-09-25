const indexRoutes = require('../routes/indexRoutes');
// import the question models from the models folder
const {History_question,Social_Science_question,Computer_Security_question} = require('../models/question');
const matrix_model= require('../models/matrix');
const matrix = require ('../helperFunctions'); 
// response time
const { performance } = require('perf_hooks');
// requiring openai
const OpenAI = require('openai'); 
// key
const openai = new OpenAI({
  apiKey: '...', 
  // defaults to process.env["OPENAI_API_KEY"]
});
const backslash_route = (req,res)=>{
    res.redirect('/home');
}
const getOverallMatrix = async (req,res) => {
    try{
        const datas = await History_question.aggregate(
            [
                {$unionWith:"social_sciences"},
                { $unionWith: "computer_securities" },
                { $project: { accuracy: "$accuracy", response_time:"$response_time"} }
            ]
        );
        const { accuracy, response_time} = await matrix(datas);
        // save in db
        matrix_model.findOneAndUpdate({title:'overall'}, { accuracy: accuracy, response_time: response_time }, {new:true})
        .then((result)=>{
            matrix_model.find()
                .then((matrixResult)=>{
                    res.render('home',{title:'Home Page', page_title:'Home Page', results:matrixResult})
                })
                .catch((err)=>{
                    res.status(404).render('404', {page_title : 'page not found'});
                }) 
        })
        .catch((err)=>{
            res.status(404).render('404', {page_title : 'page not found'});
        });

    }catch (error){
        console.log(error);
    }
}
module.exports = {   
    getOverallMatrix,
    backslash_route
};

