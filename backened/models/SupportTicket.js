const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender:  { type: String, enum: ['customer', 'support'], required: true },
    text:    { type: String, required: true },
    sentAt:  { type: Date, default: Date.now },
  },
  { _id: false }
);

const supportTicketSchema = new mongoose.Schema(
  {
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:      { type: String },        // for guest tickets
    email:     { type: String },
    subject:   { type: String, required: true },
    orderId:   { type: String },        // optional reference
    status:    { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
    priority:  { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    messages:  [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SupportTicket', supportTicketSchema);

