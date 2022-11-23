let express = require("express");
let cors = require("cors");
let app = express();


const productoUno = {
    id: 1,
    nombre: "All Might Silver Age",
    stock: 20,
    precio: 25,
    picture: "/Imágenes/POP/All-Might-no-bg.png",
    description: "Relive the best part of the saga with Axel!",
}

const productoDos = {
    id: 2,
    nombre: "Riku",
    stock: 30,
    precio: 30,
    picture: "/Imágenes/POP/riku-removebg-preview.png",
    description: "Relive the best part of the saga with Axel!",
}

const productoTres = {
    id: 3,
    nombre: "Axel",
    picture: "/Imágenes/POP/axel-removebg-preview.png",
    description: "Relive the best part of the saga with Axel!",
}

const productoCuatro = {
    id: 4,
    nombre: "King Mickey",
    stock: 40,
    precio: 35,
    picture: "/Imágenes/POP/mickey-removebg-preview.png",
    description: "Relive the best part of the saga with Axel!",
}

const productoCinco = {
    id: 5,
    nombre: "Deku battle academia uniform",
    stock: 20,
    precio: 27,
    picture: "/Imágenes/POP/deku-no-bg.png",
    description: "Relive the best part of the saga with Axel!",
}
const productos = [productoUno, productoDos, productoTres, productoCuatro, productoCinco];

const usuarioUno = {
 email : "daniel@gmail.com",
password : "12345",
}

const usuarioDos = {
    email : "d@d.com",
   password : "12345",
   }

const usuarios = [usuarioUno, usuarioDos]


app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
    response.send("Welcome to Ecommerce");
});

app.get("/productosdestacados", function (request, response) {
    
    response.send(productos);
});

app.get("/detalles", function (request, response) {
    
    response.send(detalle);
});


app.get("/productosdestacados/:id", function (request, response) {
    const productoId = request.params.id;

    for (i = 0; i < productos.length; i++) {
        if (productoId == productos[i].id) {
            response.send(productos[i]);
        }
    }

});


app.post("/login", function (request, response) {

    const email = request.body.email;
    const password = request.body.password;

    console.log(email, password);

    for (let usuario of usuarios) {
        if (email === usuario.email && password === usuario.password) {
            response.status(200).send();
        }

    }

    response.status(401).send();

});

app.post("/signin", function (request, response){

})

app.listen(8000, function() {
    console.log("API ready to listen");
});