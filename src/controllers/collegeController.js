const collegeModel = require("../model/collegeModel");

const createCollege = async function (req, res) {
  try {
    let data = req.body;

    let name = data.name;
    let fullName = data.fullName;
    let logoLink = data.logoLink;
    let isDeleted = data.isDeleted;

    // VALIDATIONS

    // if request body is empty
    if (!data) {
      return res.status(400).send({
        status: false,
        msg: "request body cannot be empty; please enter something!",
      });
    }

    // if name is empty
    if (!name) {
      return res
        .status(400)
        .send({ status: false, msg: "name cannot be empty(required field)" });
    }
    // if name is not unique
    let names = await collegeModel.find({ name: name });
    if (!names) {
      return res
        .status(404)
        .send({ status: false, msg: "name should be unique" });
    }

    // fullName validation
    if (!fullName) {
      return res.status(400).send({
        status: false,
        msg: "fullName cannot be empty(required field)",
      });
    }

    // logoLink validation
    if (!logoLink) {
      return res.status(400).send({
        status: false,
        msg: "logoLink cannot be empty(required field)",
      });
    }

    // if isDeleted is true
    if (isDeleted === "true") {
      return res
        .status(400)
        .send({ status: false, msg: "isDeleted cannot be true" });
    }

    // if all validations passed => college document is created
    let createdCollege = await collegeModel.create(data);
    res.status(201).send({ status: true, msg: createdCollege });
  } catch (err) {
    res.status(500).send({
      status: false,
      msg: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { createCollege };
