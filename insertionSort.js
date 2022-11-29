let a = [9, 2, 3, 7, 1,10];
let ea = [];

for (i = 0; i < a.length; i++) {
    if (a[i] < a[i + 1]) {
        ea.push(a[i+1])
    }
}
console.log(ea);