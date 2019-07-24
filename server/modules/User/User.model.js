import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    role:{
        type:String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    
}, {
    collection: 'user',
    timestamps: true
});

let UserModel = mongoose.model('user', UserSchema);

export default UserModel