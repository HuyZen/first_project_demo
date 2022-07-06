const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canocbeo:duykhung1@cluster0.6fuve.mongodb.net/diennang?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});

const Schema = mongoose.Schema;


const diennangSchema = new Schema({
  V:String,
  A:String
},{
    collection:'t5'
});

const DiennangModel = mongoose.model('t5',diennangSchema)

module.exports = DiennangModel
const accountSchema = new Schema({
  username:String,
  password:String
},{
    collection:'account'
});
const AccountModel = mongoose.model('account', accountSchema)
module.exports = AccountModel
