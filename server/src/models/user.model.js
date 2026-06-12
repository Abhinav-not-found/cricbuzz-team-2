const mognoose = require('mongoose')
const ROLES = require('../constants/model.constant')
const { boolean } = require('zod')
const { default: mongoose } = require('mongoose')

const userSchema = new mognoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
}
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel