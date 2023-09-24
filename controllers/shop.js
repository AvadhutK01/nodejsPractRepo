const Product = require('../models/product');
const cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log(err));;
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render("shop/index", {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getProduct = (req, res, next) => {
  let productId = req.params.productid;
  console.log(productId)
  Product.findbyId(productId).then(([product]) => {
    console.log(product)
    res.render('shop/product-detail', { product: product[0], pageTitle: product[0].product_name, path: '/products' });
  }).catch(err => {
    console.log(err);
  });
}
exports.postCart = (req, res, next) => {
  const prodId = req.body.productid;
  Product.findbyId(prodId, (product) => {
    cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}