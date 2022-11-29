const numeros = [1, 7, 3, 8, 12, 2];

function bubblesort(array) {

    for (let j = 0; j < array.length / 2; j++) {
        // de izquierda a derecha
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                let temporal = array[i + 1];

                array[i + 1] = array[i];
                array[i] = temporal;
            }
        }

        // derecha a izquierda (i = 5 hasta i = 0)
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] < array[i - 1]) {
                let temporal = array[i - 1];

                array[i - 1] = array[i];
                array[i] = temporal;
            }
        }
    }

    return array;
}

console.log(numeros);
console.log(bubblesort(numeros));