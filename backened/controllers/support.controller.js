const SupportTicket = require('../models/SupportTicket');

exports.createTicket = async (req, res, next) => {
  try {
    const { subject, message, orderId, name, email } = req.body;

    const ticket = await SupportTicket.create({
      user:    req.user?._id,
      name:    req.user?.name || name,
      email:   req.user?.email || email,
      subject,
      orderId,
      messages: [{ sender: 'customer', text: message }],
    });

    res.status(201).json({ success: true, ticket });
  } catch (err) {
    next(err);
  }
};

exports.getMyTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, tickets });
  } catch (err) {
    next(err);
  }
};

exports.addMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found.' });
    if (String(ticket.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorised.' });
    }

    const sender = req.user.role === 'admin' ? 'support' : 'customer';
    ticket.messages.push({ sender, text });
    if (ticket.status === 'closed') ticket.status = 'open';
    await ticket.save();

    res.json({ success: true, ticket });
  } catch (err) {
    next(err);
  }
};

