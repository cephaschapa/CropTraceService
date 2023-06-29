import { Product } from '../models/product.model.js';
import { fetchUserByToken } from './auth.controller.js';

export async function create(req, res) {
  let user;
  try {
    user = await fetchUserByToken(req);
  } catch(err) {
    console.log(err);
    res.status(401).send({ message: 'User not authenticated! ' + err });
    return;
  }

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
    user: user._id,
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

export async function findAllByUser(req, res) {
  let user;
  try {
    user = await fetchUserByToken(req);
  } catch(err) {
    return res.status(401).send({ message: 'User not authenticated! ' + err });
  }

  Product.find({ user: user._id })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Failed to retrieve user\'s products.',
      });
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
  if (!req.params.id) {
    res.status(400).send({ message: 'id cannot be empty!' });
    return;
  }

  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Product with id ${id} not found!` });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Failed to retrieve Product with id ${id}` });
      console.error(err);
    });
}

export async function update(req, res) {
  let user;
  try {
    user = await fetchUserByToken(req);
  } catch(err) {
    return res.status(401).send({ message: 'User not authenticated! ' + err });
  }

  if (!req.body) {
    return res.status(400).send({
      message: 'Product data in request body cannot be empty!',
    });
  }

  const id = req.params.id;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send({
      message: `Failed to update product with id ${id}. Might not exist`,
    });
  } else if (!product.user || !product.user.equals(user._id)) {
    return res.status(401).send({
      message: `You don't own this product, unable to edit!`,
    });
  }

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
    });
}

export async function remove(req, res) {
  let user;
  try {
    user = await fetchUserByToken(req);
  } catch(err) {
    return res.status(401).send({ message: 'User not authenticated! ' + err });
  }

  if (!req.params.id) {
    res.status(400).send({ message: 'id cannot be empty!' });
    return;
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send({
      message: `Failed to update product with id ${id}. Might not exist`,
    });
  } else if (!product.user || !product.user.equals(user._id)) {
    return res.status(401).send({
      message: `You don't own this product, unable to delete!`,
    });
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

export async function addSensorData(req, res) {
  let user;
  try {
    user = await fetchUserByToken(req);
  } catch(err) {
    return res.status(401).send({ message: 'User not authenticated! ' + err });
  }

  if (!req.params.id) {
    res.status(400).send({ message: 'id cannot be empty!' });
    return;
  }

  if (!req.body) {
    res.status(400).send({ message: 'Sensor data has to be provided in request body' });
    return;
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send({
      message: `Failed to add sensor data for product with id ${id}. Might not exist`,
    });
  } else if (!product.user || !product.user.equals(user._id)) {
    return res.status(401).send({
      message: `You don't own this product, unable to add sensor data!`,
    });
  }

  const sensorData = req.body;
  sensorData.date = new Date();
  if (!product.storageSensorData) {
    product.storageSensorData = [];
  }
  product.storageSensorData.push(sensorData);

  Product.findByIdAndUpdate(req.params.id, product, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Failed to add sensor data to product with id ${id}. Might not exist`,
        });
      } else {
        res.send({ message: 'Sensor data added to product successfully.' });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed to add sensor data to product with id ${id}.`,
      });
      console.error(err);
    });
}

