const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err);
  })

};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productid;
  Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedprice = req.body.price;
  const updatedimageUrl = req.body.imageUrl;
  const updateddescription = req.body.description;
  // const updatedProduct = new Product(prodId, updatedtitle, updatedimageUrl, updateddescription, updatedprice);
  // updatedProduct.save();
  Product.findByPk(prodId).then(product => {
    product.title = updatedtitle,
      product.price = updatedprice,
      product.description = updateddescription
    product.imageUrl = updatedimageUrl
    return product.save();
  }).then(() => { res.redirect('/admin/products') }).catch(err => {
    console.log(err);
  })

};

exports.postDeleteProduct = (req, res, next) => {
  const DeleteId = req.body.deleteId;
  Product.findByPk(DeleteId).then(
    product => {
      return product.destroy();
    }
  ).then(() => {
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  })
}


exports.getProducts = (req, res, next) => {
  Product.findAll().then(
    (rows) => {
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    }
  ).catch(err => {
    console.log(err);
  })
};