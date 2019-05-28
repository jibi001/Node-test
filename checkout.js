/*******************************
 *                             *
 *      Checkout Module        * 
 *                             *
 *******************************/

 
const fs = require('fs');
const util = require('util');

const logStdout = process.stdout;
//create log  file
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });

/**
 * Error log
 * @param {*} text
 * @param {object} error 
 * @author <jibi>
 */

console.error = function (text, error = null) { //
  logFile.write(util.format(text) + '\n' + error + '\n');
  logStdout.write(util.format(text) + '\n');
};
/**
 * Init product pricing and get product details from json
 * @param {*} pricingRules 
 * @author <jibi>
 */
function Checkout(pricingRules) {
  this.pricingRules = pricingRules;
  this.carts = {}
  this.tempCart = [];
  let rawData = fs.readFileSync('products.json');
  this.productDetails = JSON.parse(rawData);
}

/**
 * Scan cart product
 * @param {*} product 
 * @param {*} quantity default {1}
 * @author <jibi>
 */
Checkout.prototype.scan = function (product, quantity = 1) {
  if (this.carts[product]) { //check product is already exist in cart
    this.carts[product].quantity = this.carts[product].quantity + quantity;
  } else {
    let total = 0;
    this.carts[product] = { quantity, total };
  }
};

/**
 * Calculate subtotal of product
 * @param {*} price 
 * @param {*} quantity 
 * @param {*} offer 
 * @return {object}  quantity, price and total 
 * @author <jibi>
 */
const subtotal = (price, quantity, offer) => {
  var total = 0;
  try {
    if (offer != null && offer.offerType != 'free') {// check is there any offer is available for the product
      if (offer.offerType === 'buyAndGet') {
        if (offer.offerDetails.minOrderQuantity < quantity) {
          let noOfFreeProduct = parseInt(quantity / offer.offerDetails.minOrderQuantity);
          total = price * (quantity - noOfFreeProduct);
        }
      } else if (offer.offerType === 'discount') {
        if (quantity >= offer.offerDetails.minOrderQuantity) {// check discount condition
          total = (price - offer.offerDetails.discountAmount) * quantity;
        }
      }
    }
    if (total == 0) {
      total = quantity * price;
    }
  }
  catch (e) {
    console.error('Something went wrong', e);
  }
  return { quantity, price, total };
}

/**
 * Cart total 
 * @return <number> total 
 * @author <jibi>
 */
Checkout.prototype.total = function () {
  var tempCart = {};
  Object.keys(this.carts).forEach(product => {
    try {
      let quantity = this.carts[product].quantity;
      let offer = this.pricingRules[product] || null;
      if (offer != null && offer.offerType == 'free') {
        let product = offer.offerDetails.product;
        if (this.productDetails[product]) {
          this.carts[product].quantity = this.carts[product].quantity - 1;
          tempCart[product] = subtotal(this.productDetails[product].price, this.carts[product].quantity, offer);
        } else {
          console.log(`Product ${product} not found`);
        }
      }
      if (this.productDetails[product]) {
        tempCart[product] = subtotal(this.productDetails[product].price, quantity, offer);
      } else {
        console.log(`Product ${product} not found`);
      }
    }
    catch (e) {
      console.error('Something went wrong', e);
    }
  });

  // return total for cart product
  return Object.keys(tempCart).reduce((total, product) => {
    return total + tempCart[product].total;
  }, 0).toFixed(2);
};

module.exports = Checkout;