function sumaPositivosAsync(a) {
    let sum = 0;
    let p = new Promise(function (resolve, reject) {
        for (i = 0; i <= a; i++) {
           let n = Math.floor(Math.random()*100-50);
          sum += n
        }
            if (sum >= 0) {
                resolve(sum);
                 } else {
                    reject("Los numeros indicados no son positivos");
                 }
        
        
         
         
   });
   return p;
}

sumaPositivosAsync(10)
    .then(ok)
    .catch(error);

sumaPositivosAsync(10)
    .then(ok) 
    .catch(error);

function error(err) {
    console.log("Error: ", err);
}
function ok(result) {
    console.log("OK: ", result);
}

console.log("end");