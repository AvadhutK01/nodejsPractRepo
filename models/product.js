const Cart = require('./cart');
const db = require('../util/database');



module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {

    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("INSERT INTO products (product_name, price, description, imageUrl) VALUES (?,?,?,?)", [this.title, this.price, this.description, this.imageUrl]);
  }
  deleteproductbyID() {
    return db.execute('delete from products where product_id=?', [this.id]);
  }
  static fetchAll() {
    return db.execute('select * from products');
  }
  static findbyId(id) {
    // console.log(id)
    return db.execute('select * from products where product_id=?', [id]);
  }
};
