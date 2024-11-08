// routes/pricePlans.js
const express = require("express");
const router = express.Router();
const pricePlanController = require("../controllers/pricePlan.controller");

const {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} = require("../utils/validation/pricePlans.validator");

const authControllers = require("../controllers/auth.controller");

router
  .route("/")
  .get(pricePlanController.getAllPlans)
  .post(
    authControllers.protect,
    authControllers.allowedTo("admin", "manager"),
    createBrandValidator,
    pricePlanController.createPlan
  );

router
  .route("/:id")
  .get(getBrandValidator ,pricePlanController.getPlanById)
  .put(
    authControllers.protect,
    authControllers.allowedTo("admin", "manager"),
    updateBrandValidator,
    pricePlanController.updatePlan
  )
  .delete(
    authControllers.protect,
    authControllers.allowedTo("admin"),
    deleteBrandValidator,
    pricePlanController.deletePlan
  );

module.exports = router;
