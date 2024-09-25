const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const detailRoutes = require('./routes/detailRoutes');
const overallPerformanceRoutes = require('./routes/overallPerformanceRoutes');
// requring database
const { default: mongoose } = require('mongoose');
// express app
const app = express();
// setting middleware for static files
app.use(express.static('public'));
// connect with database
dbURI = "mongodb://localhost:27017/ChatGPT_Evaluation";
mongoose.connect(dbURI)
    .then((result)=>{
        // listen for requests
        app.listen(3000);
    })
    .catch(err=>console.log(err));
//  register view engine
app.set('view engine', 'ejs');
// redirecting home page
app.use(overallPerformanceRoutes);
// domain routes
app.use(indexRoutes);
// details routes
app.use(detailRoutes);
// 404 page 
app.use((req,res)=>{
    res.status(404).render('404', {page_title : 'page not found'});
})




