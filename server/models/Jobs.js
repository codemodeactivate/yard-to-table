const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    dateRequested: {
        type: Date,
        required: true
    },
    homeowner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gardener: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plot: {
        type: Schema.Types.ObjectId,
        ref: 'Plot',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'], // 
        required: true,
        default: 'pending'
    },
    // more fields as needed...
    });

const Jobs = model('Jobs', jobSchema);

module.exports = Jobs;
