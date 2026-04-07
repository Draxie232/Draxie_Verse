const Message = require('../models/Message');

// 1. Get the Inbox List (Latest message from each person)
exports.getInbox = async (req, res) => {
  try {
    const { email } = req.params;
    
    // Find all messages where you are either the sender or receiver
    const messages = await Message.find({
      $or: [{ senderEmail: email }, { receiverEmail: email }]
    }).sort({ createdAt: -1 }); // Newest first

    // Group them by the "other" person to create the inbox list
    const inboxMap = new Map();
    
    messages.forEach(msg => {
      const otherEmail = msg.senderEmail === email ? msg.receiverEmail : msg.senderEmail;
      
      if (!inboxMap.has(otherEmail)) {
        inboxMap.set(otherEmail, {
          id: msg._id,
          user: otherEmail.split('@')[0],
          email: otherEmail,
          message: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: !msg.read && msg.receiverEmail === email 
        });
      }
    });

    res.json({ inbox: Array.from(inboxMap.values()) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
};

// 2. Get full chat history with a specific person
exports.getChatHistory = async (req, res) => {
  try {
    const { email1, email2 } = req.params;
    
    const messages = await Message.find({
      $or: [
        { senderEmail: email1, receiverEmail: email2 },
        { senderEmail: email2, receiverEmail: email1 }
      ]
    }).sort({ createdAt: 1 }); // Oldest first for chat display

    // Format them for the frontend
    const formattedMessages = messages.map(msg => ({
      sender: msg.senderEmail,
      receiver: msg.receiverEmail,
      text: msg.content,
      time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    res.json({ messages: formattedMessages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};