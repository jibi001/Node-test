function Checkout(pricingRules) {
  this.pricingRules = pricingRules;
  this.carts = {}
  this.productDetails = {
    ipd: {
      name: 'Super iPad',
      price: 549.99
    },
    atv: {
      name: 'Apple TV',
      price: 109.50
    },
    mbp: {
      name: 'Apple TV',
      price: 399.99
    },
    vga: {
      name: 'VGA adapter',
      price: 30.00
    }
  }
}

Checkout.prototype.scan = function (product, quantity = 1) {
  const total = 0;
  if (this.carts[product]) {
    this.carts[product].quantity = this.carts[product].quantity + quantity;
  } else {
    this.carts[product] = { quantity, total };
  }
};
Checkout.prototype.total = function () {
  let grandTotal = 0;

  const allowed = ['item1', 'item3'];

  return Object.keys(this.carts)
    .filter((obj, key) => {

    // .reduce((obj, key) => {

      console.log(key);
      console.log(obj);
      // return {
      //   ...obj,
      //   [key]: raw[key]
      // };
    }, {});


  return this.carts.filter((product) => {
    // this.carts[product].total = 10;
    console.log(this.carts);
    // return this.carts[product];
    // // let quantity = this.carts[product].quantity;
    // // let offer = this.pricingRules[product] || null;
    // // if (offer != null) {
    // //   if (offer.offerType === 'buyAndGet') {
    // //     let noOfFreeProduct = parseInt(quantity / offer.offerDetails.minOrderQuantity);
    // //     product.total = this.productDetails[product].price * (quantity - noOfFreeProduct);
    // //   } else if (offer.offerType === 'discount') {
    // //     if (quantity >= offer.offerDetails.minOrderQuantity) {
    // //       let total = this.productDetails[product].price * quantity;
    // //       total -= (total * offer.offerDetails.discountPercentage) / 100;
    // //       product.total = total;
    // //     }
    // //   }
    // } else {
    //   product.total = this.productDetails[product].price * quantity;
    // }
  });
  return this.carts;
};

module.exports = Checkout;