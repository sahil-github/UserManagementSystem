// backend/controllers/notificationController.js
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// @desc    Send email notifications to selected users
// @route   POST /api/notifications/send
// @access  Public
const sendNotification = async (req, res, next) => {
  try {
    const { userIds, subject, message } = req.body;

    // Validate input
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Please select at least one user' });
    }

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    // Fetch users by IDs
    const users = await User.find({ _id: { $in: userIds } });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Send emails to all selected users
    const emailPromises = users.map(user =>
      sendEmail({
        to: user.email,
        subject: subject,
        text: message,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Hello ${user.name},</h2>
            <p style="color: #555; line-height: 1.6;">${message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              This is an automated notification from User Management System.
            </p>
          </div>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);

    // Count successful and failed emails
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    res.status(200).json({
      success: true,
      message: `Notifications sent successfully to ${successful} user(s)`,
      stats: {
        total: users.length,
        successful,
        failed,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendNotification,
};