a = [4, 3, 12, 1, 8, 9]


for (i = 0; i < a.length; i++) {
for (c = 0; c < a.length; c++) {
    if (a[c] > a[c + 1]) {
        let x = a[c + 1];
        a[c + 1] = a[c];
        a[c] = x
    }
}
}
console.log(a);