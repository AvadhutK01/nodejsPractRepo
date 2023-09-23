const Product = require('../models/product');
const cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
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
  Product.findbyId(productId, product => {
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
  })
}
exports.postCart = (req, res, next) => {
  const prodId = req.body.productid;
  Product.findbyId(prodId, (product) => {
    cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}