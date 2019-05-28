

const fs = require('fs');

//importing checkout modules
const Checkout = require("./checkout");

const productSku = process.argv.slice(2);
//load product pricing
let rawData = fs.readFileSync('pricing.json');
const pricingRules = JSON.parse(rawData);

// init Checkout module
const checkoutObj = new Checkout(pricingRules);

//check cart is null or not
if (productSku.length > 0) {
    productSku.forEach(sku => {
        checkoutObj.scan(sku);// scan product
    });
    let total = checkoutObj.total();
    console.log(total);
} else {
    console.log('Please add products as argument');
}

