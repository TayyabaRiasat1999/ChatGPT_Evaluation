const indexRoutes = require('../routes/indexRoutes');
// import the question models from the models folder
const {History_question,Social_Science_question,Computer_Security_question} = require('../models/question');

// response time
const { performance } = require('perf_hooks');

// requiring openai
const OpenAI = require('openai'); 

// key
const openai = new OpenAI({
  apiKey: '...', // defaults to process.env["OPENAI_API_KEY"]
});

const detail = (req,res) =>{
    let domain = req.url.substring(0, req.url.lastIndexOf('/'));
    let model;
    if(domain=='/history'){
        model=History_question;

    }else if(domain=='/social_science'){
    
    model = Social_Science_question;

    }else if(domain=='/computer_security'){
        model = Computer_Security_question;

    }else{
        res.status(404).render('404', {page_title : 'page not found'});

    }
    
    
    const id = req.params.id;
    model.findById(id)
        .then((result)=>{
            const question = `Question: ${result.question} A ${result.A} B ${result.B} C ${result.C} D ${result.D} . `;
            
            async function main() {
                const startTime = performance.now();
                const completion = await openai.completions.create({
                    model: "text-davinci-003",
                    prompt: question,
                    max_tokens: 255,
                    temperature:0.2,
                });
                const endTime = performance.now();
                const responseTime = endTime - startTime;
              const gpt_answer = (completion.choices[0].text);
              //.replace(/[^A-D]/g, "").charAt(0)
              
              let detail_answer ;
              if (result.answer=='A'){
                detail_answer = result.A;
                
              }else if(result.answer=='B'){
                detail_answer = result.B;
              }else if(result.answer=='C'){
                detail_answer = result.C;
              }else if(result.answer=='D'){
                detail_answer = result.D;
              }else {
                 res.status(404).render('404', {page_title : 'page not found'});
              }
              let acc = 0;
             // console.log((gpt_answer.toLowerCase())," ",(detail_answer.toLowerCase()))
              if(gpt_answer.includes(result.answer) && (gpt_answer.toLowerCase()).includes(detail_answer.toLowerCase())){
                acc = acc + 1;                
              }else if((gpt_answer.toLowerCase()).includes(detail_answer.toLowerCase())){
                acc = acc + 1;  
              }else{}
              model.findByIdAndUpdate(id,{GPT_answer:gpt_answer, response_time: responseTime,accuracy: acc}, {new: true})
                .then((result)=>{
                    model.findById(id)
                        .then((result)=>{
                            res.render('detail',{page_title: 'Question Details', question: result, detail_answer})
                        })
                        .catch((err)=>{
                            res.status(404).render('404', {page_title : 'page not found'});
                        });
                })
                .catch(err=>console.log(err));
            }
            main();
        })
        .catch((err)=>{
            res.status(404).render('404', {page_title : 'page not found'});
        });
}

module.exports = {
    detail
};


