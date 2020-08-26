// const Users = [{
//     id :1,
//     name : 'admin',
//     email : 'admin@gmail.com',
//     password : 'password'
// }];
// module.exports = Users;

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id:{type: Number, unique: true},
    name:{type: String},
    email:{type:String,unique:true},
    password:{type:String}
});
var user = mongoose.model('myuser',userSchema);
module.exports = user;