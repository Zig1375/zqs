var zqs = require('./');

console.log("a&b=&c=c=c&d==");
console.log(JSON.stringify(zqs.parse("a&b=&c=c=c&d=="), null, 4));

console.log("\n");
console.log("a=1&b=2&c[]=2&c[4]=5&c[a]=sd");
console.log(JSON.stringify(zqs.parse("a=1&b=2&c[]=2&c[4]=5&c[a]=sd"), null, 4));

console.log("\n");
console.log("a=1&b=2&c[]=2&c[]=5&c[]=sd");
console.log(JSON.stringify(zqs.parse("a=1&b=2&c[]=2&c[]=5&c[]=sd"), null, 4));

console.log("\n");
console.log("a=1&b=2&c[a][]=2&c[a][]=5&c[a][]=sd");
console.log(JSON.stringify(zqs.parse("a=1&b=2&c[a][]=2&c[a][]=5&c[a][]=sd"), null, 4));

console.log("\n");
console.log("a=1&b=2&c[a][b][c][]=2&c[a][b][c][]=5&c[a][b][c][]=sd&c[b]=21&c[]=32");
console.log(JSON.stringify(zqs.parse("a=1&b=2&c[a][b][c][]=2&c[a][b][c][]=5&c[a][b][c][]=sd&c[b]=21&c[]=32"), null, 4));