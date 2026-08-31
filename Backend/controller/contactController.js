import Contact from '../model/contactModel.js';

// 1. Submit a Contact Inquiry (Public)
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! Our team will respond shortly.',
      contact: newContact,
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};

// 2. Get All Contact Inquiries (Admin Only)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Failed to fetch contact inquiries.' });
  }
};

// 3. Reply to a Contact Message (Admin Only)
export const replyMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ message: 'Reply message text is required.' });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found.' });
    }

    contact.replyMessage = replyMessage.trim();
    contact.status = 'replied';
    contact.repliedAt = new Date();

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Reply recorded successfully!',
      contact,
    });
  } catch (error) {
    console.error('Error replying to contact message:', error);
    res.status(500).json({ message: 'Failed to record reply.' });
  }
};

// 4. Delete a Contact Message (Admin Only)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: 'Failed to delete message.' });
  }
};
