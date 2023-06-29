import { Product } from '../models/product.model.js';

export function create(req, res) {
  if (!req.body.name) {
    res.status(400).send({ message: 'name cannot be empty!' });
    return;
  }

  const product = new Product({
    batchNumber: req.body.batchNumber,
    name: req.body.name,
    farmName: req.body.farmName,
    farmOriginLocation: req.body.farmOriginLocation,
    destination: req.body.destination,
    isCertified: req.body.isCertified ? req.body.isCertified : false,
    storageSensorData: req.body.storageSensorData,
  });

  product
    .save(product)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Failed to create the product.',
      });
    });
}

export function findAll(req, res) {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

  Product.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Failed to retrieve the products.',
      });
      console.error(err);
    });
}

export function findAllCertified(_req, res) {
  Product.find({ isCertified: true })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Failed to retrieve certified products.',
      });
    });
}

export function findOne(req, res) {
  if (!req.body.id) {
    res.status(400).send({ message: 'id cannot be empty!' });
    return;
  }

  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Product with id ${id} not found!` });
      else
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: `Failed to retrieve Product with id ${id}` });
      console.error(err);
    });
}

export function update(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: 'Product data in request body cannot be empty!',
    });
  }

  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Failed to update product with id ${id}. Might not exist`,
        });
      } else {
        res.send({ message: 'Product updated successfully.' });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed to update product with id ${id}.`,
      });
      console.error(err);
    })
}

export function remove(req, res) {
  if (!req.body.id) {
    res.status(400).send({ message: 'id cannot be empty!' });
    return;
  }

  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Failed to delete product with id ${id}, not found!`
        });
      } else {
        res.send({
          message: 'Product was deleted successfully!',
        });
      }
    });
}

