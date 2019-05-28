

//importing checkout modules
const Checkout = require("./checkout");

const productSku = process.argv.slice(2);

// const pricingRules = {
//     'atv': {

//         'free': {
//             product: null,
//             orderQuantity: null,
//             freeProductQuantity: null,
//         },
//         'discount': {
//             minOrderQuantity: null,
//             discountPercentage: null,
//         },
//         'buyAndGet': {
//             minOrderQuantity: 2,
//             freeProductQuantity: 1
//         },
//     },
// }
const pricingRules = {
    'atv': {
        offerType: 'buyAndGet',
        offerDetails: {
            minOrderQuantity: 2,
            freeProductQuantity: 1
        }
    },
    'ipd': {
        offerType: 'discount',
        offerDetails: {
            minOrderQuantity: 5,
            discountPercentage: 30
        }
    },
    'mbp': {
        mbp: 'free',
        offerDetails: {
            product: 'vga',
            orderQuantity: 1,
            freeProductQuantity: 1,
        }
    }
}

const checkoutObj = new Checkout(pricingRules);
// checkoutObj.scan('atv', 4);
checkoutObj.scan('vga', 1);
checkoutObj.scan('vga', 1);
// checkoutObj.scan('ipd', 5);
checkoutObj.scan('mbp', 1);
// var product = "vga";
// var quantity = 1;
// checkoutObj.scan(product);

// checkoutObj.total();

console.log(checkoutObj.total());
// console.log('myArgs: ', skus);