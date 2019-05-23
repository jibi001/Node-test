function Checkout(pricingRules) {
  this.pricingRules = pricingRules;
  this.carts = new Map();
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
  if (this.carts.has(product)) {
    this.carts.set(product, this.carts.get(product) + quantity);
  } else {
    this.carts.set(product, quantity);
  }
};
Checkout.prototype.total = function () {
  let grandTotal = 0;
  this.carts.forEach((quantity, product) => {
    let offer = this.pricingRules[product] || null;
    if (offer != null) {
      if (offer.offerType === 'buyAndGet') {
        let noOfFreeProduct = parseInt(quantity / offer.offerDetails.minOrderQuantity);
        grandTotal += this.productDetails[product].price * (quantity - noOfFreeProduct);
      } else if (offer.offerType === 'discount') {
        if (quantity >= offer.offerDetails.minOrderQuantity) {
          let total = this.productDetails[product].price * quantity;
          total -= (total * offer.offerDetails.discountPercentage) / 100;
          grandTotal += total;
        }
      }
    } else {
      grandTotal += this.productDetails[product].price * quantity;
    }
  });
  return grandTotal;
};

module.exports = Checkout;