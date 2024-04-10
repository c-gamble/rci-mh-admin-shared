const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    tags: {
        type: [String],
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Boolean,
        default: true
    }
});

export const ProviderModel = mongoose.models.Provider || mongoose.model('Provider', providerSchema);