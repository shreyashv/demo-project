const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);

// mongodb.connect('mongodb+srv://user:user@cluster0.80yhv.mongodb.net/shop?retryWrites=true&w=majority')
// .then(client => {
//   console.log('connected');
//   client.close();
// })
// .catch(err => {
//   console.log(err);
// });

app.listen(3100);
