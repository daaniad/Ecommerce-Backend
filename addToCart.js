function welcome() {
    console.log('Welcome, website loaded successfully!');
//     let cont= document.getElementById("cont");
// la id cont está en el div de logo

// cont.innerHTML = "<p>Vaya tela</p>";
}


// window.alert("text to show")

function addToCart () {
    let basketNumber = document.getElementById("basketNumber");
    let amount = parseInt(basketNumber.innerHTML);
    basketNumber.innerHTML = `${++amount}`;
}

function logIn () {
    const user = "Daniel" //document.getElementById("credentials").value;
    const password ="12345" //document.getElementById("pass").value;
    let wUser = document.getElementById("credentials").value;
    let wPassword = document.getElementById("sigIn").value;
    // let credentials = document.getElementById("credentials")

    if (user === wUser && password === wPassword) {
       
        
        //wUser.innerHTML = `<span>Logged in successfully, welcome</span>`
    }
    else {

        const elements = document.getElementsByClassName("errorUser"); //getElementsByClassName devuelve un array, 
        //por eso hacemos un for, para igualar elements a la posición del array que contenga la clase que queremos modificar.

        for (i = 0; i<elements.length; i++) {
            if (elements[i].id === "wUser") {
                elements[i].style.display = "flex";
            }
        }

        // for (i = 0; i<elements.length; i++) { Ponerlo para el fallo en el registro
        //     if (elements[i].id === "wUser") {
        //         elements[i].style.display = "flex";
        //     }
        // }


        // wUser.innerHTML = `<span>Invalid User</span>` Estas dos líneas son para hacerlo modificando el HTML para introducir
        // el mensaje que queramos, y no para hacerlo por clases
        // wPassword.innerHTML = `<span>Invalid Password</span>`
    }
    console.log(user, password);
}