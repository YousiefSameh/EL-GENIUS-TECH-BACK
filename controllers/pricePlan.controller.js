// controllers/pricePlanController.js
const PricePlan = require("../models/pricePlan.model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 *  @desc    get all Plans
 *  @route   /api/plans
 *  @method  GET
 *  @access  public
 */
exports.getAllPlans = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const plans = await PricePlan.find({}).skip(skip).limit(limit);

  res.json({
    results: plans.length,
    page,
    data: plans,
  });
});

/**
 *  @desc    create a new Plans
 *  @route   /api/plans
 *  @method  POST
 *  @access  private
 */
exports.createPlan = asyncHandler(async (req, res) => {
  const newPlan = new PricePlan(req.body);
  await newPlan.save();
  res.status(201).json(newPlan);
});

/**
 *  @desc    get one Plans
 *  @route   /api/plans/:id
 *  @method  GET
 *  @access  public
 */
exports.getPlanById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const plan = await PricePlan.findById(id);

  if (!plan) {
    return next(new ApiError(`no plan this id ${id}`, 400));
  }

  res.json(plan);
});

/**
 *  @desc    update Plans
 *  @route   /api/plans/:id
 *  @method  PUT
 *  @access  private
 */
exports.updatePlan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedPlan = await PricePlan.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPlan) {
    return next(new ApiError(`no plan this id ${id}`, 400));
  }
  res.json(updatedPlan);
});

/**
 *  @desc    delete Plans
 *  @route   /api/plans/:id
 *  @method  DELETE
 *  @access  private
 */
exports.deletePlan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const plan = await PricePlan.findByIdAndDelete(id);

  if (!plan) {
    return next(new ApiError(`no plan this id ${id}`, 400));
  }

  res.status(204).json({ message: "price plan deleted successfully" });
});
