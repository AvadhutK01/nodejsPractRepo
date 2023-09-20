const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');
const p = path.join(rootdir, 'data', 'products.json');
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return cb([]);
        }
        try {
            const products = JSON.parse(data);
            cb(products);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            cb([]);
        }
    });
}
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};
