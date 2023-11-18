const createTask = (req, res) => {
  try {
    const { newTask } = req.body;
    console.log(newTask);

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json("Internal System Error");
  }
};

module.exports = { createTask };
