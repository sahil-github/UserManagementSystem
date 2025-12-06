// backend/controllers/analyticsController.js
const User = require('../models/User');

// @desc    Get users grouped by location
// @route   GET /api/analytics/users-by-location
// @access  Public
const getUsersByLocation = async (req, res, next) => {
  try {
    // Get total user count
    const totalUsers = await User.countDocuments();

    // Group users by country
    const usersByCountry = await User.aggregate([
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          country: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Group users by state
    const usersByState = await User.aggregate([
      {
        $group: {
          _id: {
            state: '$location.state',
            country: '$location.country',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          state: '$_id.state',
          country: '$_id.country',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Group users by city
    const usersByCity = await User.aggregate([
      {
        $group: {
          _id: {
            city: '$location.city',
            state: '$location.state',
            country: '$location.country',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          city: '$_id.city',
          state: '$_id.state',
          country: '$_id.country',
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        byCountry: usersByCountry,
        byState: usersByState,
        byCity: usersByCity,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersByLocation,
};