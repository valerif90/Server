const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { update } = require('../models/message');

const Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find()
       .select('messageText id created')
       .exec()
       .then(docs => {
     const response = {
         count: docs.length,
         messages: docs.map(doc => {
             return {
                messageText: doc.messageText,                
                _id: doc._id,
                created: doc.created
             }
         })
     };
     res.status(200).json(response);
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
});



router.post('/', (req, res, next) => {
    const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        messageText: req.body.messageText,
        created: (new Date()).toLocaleString('en-US', { timeZone: 'Europe/Moscow' })
    });
    message.save()
        .then(result => {
        console.log(result);
            res.status(201).json({
                message: 'Message created',
                createdMessage: result
            });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:messageId', (req, res, next) => {
   const _id = req.params.messageId;
   Message.findById(_id)
       .exec()
       .then(doc => {
           console.log('From database', doc);
           if (doc) {
               res.status(200).json(doc);
           } else {
               res.status(404).json({message: 'No valid entry found for provided ID'});
           }
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({error: err});
       });
   });

router.patch('/:messageId', (req, res, next) => {
    const _id = req.params.messageId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Message.update({_id: _id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:messageId', (req, res, next) => {
    const _id = req.params.messageId;
    Message.remove({_id: _id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;