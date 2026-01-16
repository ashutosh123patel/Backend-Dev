
const fs = require("fs");

fs.readFile("exer1Input.txt", "utf-8", (err, data) => {
    if (err) return;

    const words = data.trim().split(/\s+/);
    const count = words.length;

    fs.writeFile("exer1Output.txt", `Word Count: ${count}`, () => {});
});


