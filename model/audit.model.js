const mongoose = require('mongoose');
const { Schema } = mongoose;

const auditSchema = new Schema({
    operation: {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    before: {
        type: Schema.Types.Mixed,
        default: null
    },
    after: {
        type: Schema.Types.Mixed,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;