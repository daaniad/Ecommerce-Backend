let express = require('express');
let cors = require('cors');
const { appendFile } = require('fs');
const { response } = require('express');
let app = express();

app.use(cors());

app.get('/', function(request, response){
    response.send('Welcome to Ecommerce');
})

app.get('/productosdestacados', function(request, response){
    const productoUno = {
        nombre: "All Might Silver Age",
        stock: 10,
        precio: 20, };
        
    const productoDos = {
        nombre: "Eve",
        stock: 20,
        precio: 30
    };

    const productoTres = {
        nombre: "Lea",
        stock: 30,
        precio: 20
    };

    const productoCuatro = {
        nombre: "King Mickey",
        stock: 40,
        precio: 20
    };
        
        
        let productos = [productoUno,productoDos, productoTres, productoCuatro];
        response.send(productos)
});

app.listen(8000, function(){
    console.log(`Api listening on port 8000`);
})