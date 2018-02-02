"use strict";
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

let Product = require('./product');
let Category = require('./category');

class ProductController {
  constructor() {
    // nothing to do here
  }

  static get(request, response) {
    try {
      if (request.params.id == undefined) {
        Product.find({}, (error, products) => {
          if (error) {
            response.status(500).send('server error while fetching products');
          }
          response.status(200).send(products);
        });
      } else {
        Product.findById(request.params.id, (error, products) => {
          if (error) {
            response.status(500).send('server error while fetching products');
          }
          response.status(200).send(products);
        });
      }
    } catch (error) {
      console.log(`ProductController::get:${error.message}`);
      response.status(500).send('server error');
    }
  }

  static getByCategory(request, response){
    try{
      if(request.params.category_id != undefined ){
        Product.find({categories: request.params.category_id}, (error, products) => {
          if(error){
            return response.status(500).send('server error while fetching products');
          }
          response.status(200).send(products);
        });
      }
      else{
        Product.find({}, (error, products) => {
          if(error){
            return response.status(500).send('server error while fetching products');
          }
          response.status(200).send(products);
        });
      }
    }catch(error){
      console.log(`ProductController::getByCategory:${error.message}`);
    }
  }

  static post(request, response) {
    try {
      let create_query = {
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        categories: request.body.categories
      };
      Product.create(create_query, (error, product) => {
        if (error) {
          return response.status(500).send('server error while creating product');
        }
        response.status(200).send(product);
      })
    } catch (error) {
      console.log(`ProductController::post:${error.message}`);
    }
  }

  static put(request, response) {
    try {
      let options = {
        upsert: true,
        new: true
      };
      let query = {};
      for (let key in request.body) {
        if (key == 'categories') {
          query['$addToSet'] = {
            [key]: {
              $each: JSON.parse(request.body[key])
            }
          };
        } else {
          query['$set'] = {
            [key]: request.body[key]
          };
        }
      }
      console.log(query);
      Product.findByIdAndUpdate(
        request.params.id,
        query,
        options,
        (error, product) => {
          if (error) {
            return response.status(500).send('server error while updating product');
          }
          response.status(200).send(product);
        });

    } catch (error) {
      console.log(`ProductController::put:${error.message}`);
    }
  }
}

class CategoryController {
  constructor() {
    // nothing to do here yet
  }
  static get(request, response) {
    try {
      if (request.params.id == undefined) {
        Category.find({}, (error, categories) => {
          if (error) {

            response.status(500).send('server error while fetching categories');
          }
          response.status(200).send(categories);
        });
      } else {
        Category.findById(request.params.id, (error, categories) => {
          if (error) {

            response.status(500).send('server error while fetching categories');
          }
          response.status(200).send(categories);
        });
      }
    } catch (error) {
      console.log(`CategoryController::get:${error.message}`);
      response.status(500).send('server error');
    }
  }

  static post(request, response) {
    try {
      Category.create({
        name: request.body.name,
        child_categories: request.body.child_categories
      }, (error, category) => {
        if (error) {
          response.status(500).send('server error while creating category');
        }
        response.status(200).send(category);
      });
    } catch (error) {
      console.log(`CategoryController::post:${error.message}`);
      response.status(500).send('server error');
    }
  }

  static put(request, response) {
    try {
      let options = {
        upsert: true,
        new: true
      };
      let query = {};
      console.log(request.body);
      for (let key in request.body) {
        if (key == 'child_categories') {
          query['$addToSet'] = {
            [key]: {
              $each: JSON.parse(request.body[key])
            }
          };
        } else {
          query['$set'] = {
            [key]: request.body[key]
          };
        }
      }
      console.log(query);
      Category.findByIdAndUpdate(
        request.params.id,
        query,
        options,
        (error, category) => {
          console.log(error);
          if (error) {
            return response.status(500).send('server error while updating category');
          }
          response.status(200).send(category);
        }
      );
    } catch (error) {
      console.log(`CategoryController::put:${error.message}`);
      response.status(500).send(`server error`);
    }
  }
}

// product url mappings
router.get('/product', (request, response) => ProductController.get(request, response));
router.get('/product/:id', (request, response) => ProductController.get(request, response));
router.get('/product_by_category/:category_id', (request, response) => ProductController.getByCategory(request, response));
router.post('/product', (request, response) => ProductController.post(request, response));
router.put('/product/:id', (request, response) => ProductController.put(request, response));

// category url mappings
router.get('/category', (request, response) => CategoryController.get(request, response));
router.get('/category/:id', (request, response) => CategoryController.get(request, response));
router.post('/category', (request, response) => CategoryController.post(request, response));
router.put('/category/:id', (request, response) => CategoryController.put(request, response));

module.exports = router;
