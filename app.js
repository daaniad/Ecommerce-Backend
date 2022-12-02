let express = require("express");
let cors = require("cors");
let mysql = require ('mysql');
const {MongoClient} = require('mongodb');
const { response } = require("express");
let app = express();



/**
 * Constantes
 */
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


/**
 * MySQL
 */
let connection = mysql.createConnection({host: "localhost",
    user: "root",
    password: "creuhnbvrvbDEGGH7",
    database: "basedatosproyecto"});

    function conectar() {
        connection.connect (function(error) {
            if (error) {
                console.log(`No se ha podido conectar a MySQL ${error}`);
                return;
            }

            console.log(`Conectado a MySQL`);
            
        });
    }

    conectar();


    function query (query, params) {
        connection.query(query, params, function (error, results, fields) {
            if (error) {
                console.log(`Error al ejecutar la query ${error}`);
                return; 
            }

            response.send(results);
        });
    }


/**
 * MongoDB
 */

const mongoClient = new MongoClient('mongodb://127.0.0.1:27017');
function ejecutarQueryMongo(collection, filtro, orden, 
    callbackPorDocumento, callback, error) {
    mongoClient.db("ecommerce")
        .collection(collection)
        .find(filtro)
        .sort(orden)
        .forEach(callbackPorDocumento)
        .then(callback)
        .catch(error);
}




/**
 * Servicios API
 */

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
    response.send("Welcome to Ecommerce");
});

app.get("/productosdestacados", function (request, response) {
    
    response.send(productos);
});

app.get("/productos/:id", function (request, response) {
    const productId = request.params.id
    connection.connect(function(error) {
        if (error) {
            console.log(`no es posible conectarse al servidor ${error}`);

            return;
        }
        console.log(`Connected to MySQL`);
    });

    connection.query('select * from productos where productos.id = ?', [productId], function(error, results, fields) {
        if (error) {
            console.log(`Se ha producido un error al ejecutar la query: ${error}`);

            return;
        }
        console.log(results);
        response.send(results);
    }) /*Símbolo de ? es para indicar una variable cuyo valor no sabemos y vamos a indicar entre corchetes. En caso de poner más de uno, hay que poner el valor en orden dentro de los corchetes*/



    /*connection.end(function(error) {
        if (error) {
            console.log(`no se ha podido cerrar la conexión ${error}`);

            return;
        }
        console.log(`Conexión cerrada con MySQL`);
    })*/
    
    
});


app.post("/loggin/", function (request, response) {
    const email = request.body.email;
    const password = request.body.password;
    connection.connect(function(error) {
   
        if (error) {
            console.log(`no es posible conectarse al servidor ${error}`);

            return;
        }
        console.log(`Connected to MySQL`);
    });

    connection.query('select * from usuarios where email = ? and password = ? ', [email, password], function(error, results, fields) {
        if (error) {
            console.log(`Se ha producido un error al ejecutar la query: ${error}`);

            return;
        }

        if (results.length > 0) {
            response.status(200).send();
        }
        else if (results.length <= 0){
            response.status(401).send(); 
        }
        console.log(results);

    })
       
    });

    app.post("/signup/", function (request, response) {
        const nombre = request.body.nombre;
        const apellidos = request.body.apellidos;
        const email = request.body.email;
        const password = request.body.password;
        const telefono = request.body.telefono;
        connection.connect(function(error) {
       
            if (error) {
                console.log(`no es posible conectarse al servidor ${error}`);
    
                return;
            }
            console.log(`Connected to MySQL`);
        });
    
        connection.query('insert into usuarios (nombre, apellidos, email, password, telefono) values (?, ?, ?, ?, ?) ', 
        [nombre,apellidos, email, password, telefono], function(error, results, fields) {
            if (error) {
                console.log(`Se ha producido un error al ejecutar la query: ${error}`);
    
                response.status(400).send();
            }

            connection.query("select * from usuarios where email = ?", [email], function(error, results, fields) {
                if (error) {
                    console.log(`se ha producido un error al ejecutar la query: ${error}`);
                    response.status(400).send();
                }
            });

            response.send(results)
            console.log(results);
           
        }) 



    
    
    
});

app.post("/orders", function (request, response) {
    let total = request.body.total;
    let productos = request.body.productos;
    
    connection.connect(function(error) {
   
        if (error) {
            console.log(`no es posible conectarse al servidor ${error}`);

            return;
        }
        console.log(`Connected to MySQL`);
    });


    connection.query('insert into pedidos (usuarioid, direccionid, tarjetaid, estado, total, tipoPago) values (?, ?, ?, ?, ?, ?) ', 
    ["1", "1", "1", "not shipped", total, 'tarjeta'], function(error, results, fields) {
        if (error) {
            console.log(`Se ha producido un error al ejecutar la query: ${error}`);

            response.status(400).send();
        }
        for (p of productos) {
            let productoId = p.productoid;
            let cantidad = p.cantidad;
            let precio = p.precio;
        
        connection.query('insert into detallepedido (pedidoid, productoid, cantidad, precio, opinionid) values (?, ?, ?, ?, ?)',
        [results.insertId, productoId, cantidad, precio, "1"], function(error, resulsts, fields) {
            if (error) {
                console.log(`no es posible conectarse al servidor ${error}`);
                
                response.status(400).send();
            }
            
        });
        console.log(productoId);
    }
        console.log(results);
       
    });

    
    response.send(resulsts);
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

});


app.get('/producto', function(request, response){
    let products = [];
     mongoClient.db('ecommerce')
    .collection('producto')
    .find()
    .forEach((producto) => products.push({id:producto._id, nombre:producto.nombre, 
        precio:producto.precio, stock:producto.stock}))
    .then(() => response.send(products))
    .catch(() => response.status(400).send)

    
    
});


app.get('/pedido', function(request, response) {
    let pedidos = [];
    ejecutarQueryMongo('pedidos', {}, {cantidad: 1}, 
    (pedido) => //{
     //for (i =0; i < pedidos.pedido.length; i++ ) {
        pedidos.push(pedido),
    //}
   // }, 
    () =>response.send(pedidos), 
    () => response.status(400).send);
});


app.get('/productodestacados', function(request, response){
    let products = [];
     mongoClient.db('ecommerce')
    .collection('producto')
    .find()
    .forEach((producto) => products.push({id:producto._id, nombre:producto.nombre, 
        precio:producto.precio, stock:producto.stock}))
    .then(() => response.send(products))
    .catch(() => response.status(400).send)

    
    
});


app.post("/loginfetch/", function (request, response) {
    const email = request.body.email;
    const password = request.body.password;
    connection.connect(function(error) {
   
        if (error) {
            console.log(`no es posible conectarse al servidor ${error}`);

            return;
        }
        console.log(`Connected to MySQL`);
    });

    connection.query('select * from usuarios where email = ? and password = ? ', [email, password], function(error, results, fields) {
        if (error) {
            console.log(`Se ha producido un error al ejecutar la query: ${error}`);

            return;
        }

        if (results.length > 0) {
            response.status(200).send();
        }
        else if (results.length <= 0){
            response.status(401).send(); 
        }
        console.log(results);

    })
       
    });


    


app.listen(8000, function() {
    console.log("API ready to listen");
});

/* Primer query de mongo
mongoClient.connect().then(function() {
    mongoClient.db('ecommerce')
    .collection('usuario').find()
    .forEach((usuario) => console.log(usuario))
.catch(function(error) {
    console.log(`Error: cannot connect to MongoDB ${error}`);
})
}) */

/*Primera funcion mongo

    ejecutarQueryMongo('pedidos', {}, {}, 
    (pedido) => console.log(pedido), 
    () =>console.log('ok'), 
    () => console.log('error'));
    */




