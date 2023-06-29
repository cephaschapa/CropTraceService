import bcrypt from 'bcrypt';
import { User } from "../models/user.model.js";
import jsonwebtoken from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = 'ThisIsASecretPleaseChangeMeForProd';
const JWT_EXPIRY = '2h'; // keep logged in for 2 hours

export async function signup(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ success: false, message: 'email or password missing!' });
    return;
  }

  const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

  User.create({
    email: req.body.email,
    password: hash,
    name: req.body.name,
  }).then(user => {
    const token = jsonwebtoken.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY },
    );
    res.json({ success: true, token: token });
  }).catch(err => {
    let message = err.message || 'Failed to create account';
    if (err.code === 11000) {
      message = 'User with this email exists already! Try logging in';
    }

    res.status(500).json({ success: false, message });
    console.error(err);
  });
}

export async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ success: false, message: 'email and password required!' });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found!' });
      } else {
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
          res.status(401).json({ success: false, message: 'Wrong password!' });
        } else {
          const token = jsonwebtoken.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY },
          );
          res.json({ success: true, token });
        }
      }
    })
    .catch(err => {
      res.json({ success: false, message: err });
      console.error(err);
    });
}

export function findUser(req, res) {
  if (!req.param.id) {
    res.status(400).json({ message: `Failed to find user with id ${id}` });
    return;
  }

  User.findById(req.param.id)
    .then(user => {
      res.json({ name: user.name });
    })
    .catch(err => {
      res.status(404).json({ message: `User with id ${id} not found!` });
      console.error(err);
    });
}

export function fetchUserByToken(req) {
  return new Promise((resolve, reject) => {
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization;
      let decodedToken;

      try {
        decodedToken = jsonwebtoken.verify(authorization, JWT_SECRET);
      } catch(err) {
        reject('Invalid token');
        return;
      }

      User.findById(decodedToken.id)
        .then(user => resolve(user))
        .catch(_err => reject('Failed to find user!'));
    } else {
      reject('No token found!');
    }
  });
}

export function findAllUsers(_req, res) {
  // TODO admin access control
  User.find()
    .then(users => res.json(users.map(user => ({id: user._id, email: user.email, name: user.name}))))
    .catch(err => {
      res.status(404).json({ message: `Failed to load users!` });
      console.error(err);
    });
}

