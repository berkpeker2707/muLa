const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('image', imageSchema);