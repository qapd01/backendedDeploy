const ActivityModel = require('../../models/activity');

const responseSuccess = (req, res, data) => res.status(200).json({
  message: 'success',
  result: data
});

module.exports = {
  async getAggregate(req, res) {
    console.log(req.query.date)
    const newDate = new Date(req.query.date)
    const aggregate = await ActivityModel.aggregate(
      [{ $match: { $and: [{ "date": newDate }, { "userEmail": req.user.email }] } },
      {
        $group: {
          _id: [{ day: "$date" }],
          total_duration: { $sum: "$duration" },
          total_calories: { $sum: "$calories" },
        }
      }
      ],
    )
    responseSuccess(req, res, aggregate);
  }
}

