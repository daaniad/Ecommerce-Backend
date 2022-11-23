let express = require('express');
let cors = require('cors');
const { appendFile } = require('fs');
const { response } = require('express');
let app = express();

app.use(cors());

app.get('/', function(request, response){
    response.send('Welcome to Ecommerce');
})

app.get('/detalles', function(request, response){
    const detalleProducto = {
        nombre: "All Might Silver Age",
        code: "#8795632",
        desc: `Relive the old good times with the number one Hero of all times, 
        All Might Silver Age!`,
        price: 20,
        color: "Yelow, Blue",
        dimension: "10cm, x 10cm, x 10cm"};
        
  
        
        
        let details = [detalleProducto];
        response.send(details)
});

app.listen(8000, function(){
    console.log(`Api listening on port 8000`);
})