const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

app.post('/getAdmin',(req,res) => {
const {id} = req.query;
    if(id !== 'marksuckerberg69')     
       res.send({message: "101"});
    else
       res.send({message: "OK"});
 
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});
