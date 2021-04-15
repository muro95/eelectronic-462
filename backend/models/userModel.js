import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true}
}, {
    //add two filed (create and edit), so have a timestamp for creating a record and last update
    timestamps: true 
});
const User = mongoose.model('User', userSchema);
export default User;
