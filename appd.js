let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());

app.get("/", function (request, response) {
    response.send("Welcome to Ecommerce");
});

app.get("/detalle", function (request, response) {
    const productoUno = {
        nombre: "All Might Silver Age",
        stock: 20,
        precio: 25,
    }

    const productoDos = {
        nombre: "Riku",
        stock: 30,
        precio: 30,
    }

    const productoTres = {
        nombre: "King Mickey",
        stock: 40,
        precio: 35,
    }

    const productoCuatro = {
        nombre: "Deku battle academia uniform",
        stock: 20,
        precio: 27,
    }
    const productos = [productoUno, productoDos, productoTres, productoCuatro];
    response.send(productos);
});

app.post("/login", function (request, response) {

});

app.post("/signin", function (request, response){

})

app.listen(8000, function() {
    console.log("API ready to receive incoming calls");
});