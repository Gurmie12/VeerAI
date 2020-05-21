// Load express modules

const express = require('express');
const cors = require('cors');
const app = express();

//Create endpoints for param verification

app.get('/paramchecker/:param', cors(), (req, res) =>{
    //Set the query param to be the passed through string
    const param = req.params.param;

    //Check if the string matches the two key values
    if(param === "Foo" || param === "Bar"){
        res.send({res: true});
    }else{
        res.send({res: false});
    }   
});


//Call app to listen on port 3000 or the enviroment variable and log to the console to verify function
const port = process.env.PORT || 3001
app.listen(port, () =>{
    console.log(`Express REST API is listening on port ${port}`);
});