const { pingService } = require("../services");

const getPing = (req, res) => {
  try {
    const payload = pingService.getPing();
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json("Internal System Error");
  }
};

module.exports = {
  getPing,
};
