const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const messageRoutes = require('./api/routes/messages');

mongoose.connect(
    'mongodb+srv://valerif-api:' +
    process.env.MONGO_ATLAS_PW +
    '@api-lpdyq.azure.mongodb.net/<dbname>?retryWrites=true&w=majority', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/users', userRoutes);
app.use('/messages', messageRoutes);


// PAGINATION


        // const page = req.query.page;
        //   const limit = req.query.limit;
        //   const startIndex = (page - 1) * limit;
        //   const endIndex = page * limit;
        //   const result = users.slice(startIndex, endIndex);
        //   res.json(result);


// function paginatedResults() {
//     return async (req, res, next) => {
      
//       const page = parseInt(req.query.page);
//       const limit = parseInt(req.query.limit);
//       const skipIndex = (page - 1) * limit;
//       const results = {};
  
//       try {
//         results.results = await User.find()
//           .sort({ _id: 1 })
//           .limit(limit)
//           .skip(skipIndex)
//           .exec();
//         res.paginatedResults = results;
//         next();
//       } catch (e) {
//         res.status(500).json({ message: "Error Occured" });
//       }
//     };
//   }


              
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
