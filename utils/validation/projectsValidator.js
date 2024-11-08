const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

exports.createProjectValidate = [
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 5 and 100 characters long"),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 5 and 100 characters long"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters long"),
  validatorMiddleware,
];

exports.getProjectValidate = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateProjectValidate = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters long"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters long"),
  validatorMiddleware,
];

exports.deleteProjectValidate = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
