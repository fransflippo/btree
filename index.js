let prompt = require('prompt-sync')();
let BTree = require("./btree.js");
console.log("BTree application");
console.log("Adding data to btree...");
let countries = new BTree();
countries.put("South Africa", "Pretoria");
countries.put("Botswana", "Gabarone");
countries.put("United Kingdom", "London");
countries.put("Germany", "Berlin");
countries.put("France", "Paris");
countries.put("Greece", "Athens");
countries.put("Egypt", "Cairo");
countries.put("United States", "Washington DC");
countries.put("Zimbabwe", "Harare");
countries.put("Mozambique", "Maputo");
countries.put("Zambia", "Lusaka");
console.log("Data added. Tree depth is " + countries.depth());
countries.print();

console.log("Enter the name of a country and I'll tell you the capital\nor\nadd a new entry with Country:Capital, e.g. Spain:Madrid");
var input = prompt("> ");
while (input !== "" && input != null) {
    if (input.indexOf(":") === -1) {
        console.log("The capital of " + input + " is " + countries.get(input));
    } else {
        let p = input.indexOf(":");
        let country = input.substring(0, p);
        let capital = input.substring(p + 1, input.length);
        countries.put(country, capital);
        countries.print();
    }
    input = prompt("> ");
}
