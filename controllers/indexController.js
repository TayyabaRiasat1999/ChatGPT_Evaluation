// import the question models from the models folder
const { History_question, Social_Science_question, Computer_Security_question } = require('../models/question');
const matrix_model= require('../models/matrix');
const matrix = require ('../helperFunctions'); // matrix helper function
// let domain = "";
// const history_index = (req, res) => {
//     domain = 'history';
//     res.redirect('/index');
// }
// const social_science_index = (req, res) => {
//     domain = 'social_science';
//     res.redirect('/index');
// }
// const computer_security_index = (req, res) => {
//     domain = 'computer_security';
   
//     res.redirect('/index');
// }
const domain_index = async (req, res) => {
    try {
        let result;
        let domain = req.url.replace('/','');
        if (domain === 'history') {
            result = await History_question.find();
        } else if (domain === 'social_science') {
            result = await Social_Science_question.find();
        } else if (domain === 'computer_security') {
            result = await Computer_Security_question.find();
        } else {
            throw new Error('Invalid domain');
        }
        const { accuracy, response_time } = await matrix(result);
        
         // save in db
        matrix_model.findOneAndUpdate({title:domain},{accuracy: accuracy, response_time: response_time})
            .then((matrixResult)=>{
                res.render('index', { title: domain, domain_title: domain, page_title: domain, questions: result, accuracy: 
                    matrixResult.accuracy, response_time: matrixResult.response_time });
             })
             .catch((err)=>{
                 res.status(404).render('404', {page_title : 'page not found'});
             });

       

    } catch (err) {
        console.error('Error in domain_index:', err);
        res.status(404).render('404', { page_title: '404' });
    }
};
module.exports = {
   
    domain_index
};

