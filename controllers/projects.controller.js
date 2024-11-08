const Projects = require("../models/projects.model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const fs = require("fs");
const { cloudinaryUploadImage } = require("../utils/cloudinary");


/**
 * @desc  Create a new product
 * @route   /api/products/
 * @method  POST
 * @access  private (only admin)
 */
exports.createProject = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("No file provided", 400)); // إرسال رسالة خطأ إذا لم يتم رفع ملف
  }

  try {
    const upload = await cloudinaryUploadImage(req.file.buffer, req.file.originalname);

    const uploadedImage = {
      url: upload.secure_url,
      publicId: upload.public_id,
    };

    req.body.image = uploadedImage; 

    const project = await Projects.create(req.body);

    res.status(201).json({
      message: "Project created successfully",
      data: project, 
    });
  } catch (error) {
    console.log("Error creating project:", error);
    return next(new ApiError("Error creating project", 500));
  }
});



/**
 * @desc  Get all Projects
 * @route   /api/Projects/
 * @method  GET
 * @access  public
 */
exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await Projects.find({})
  res.json({ results: projects.length , data: projects });
});

/**
 * @desc  Get one projects
 * @route   /api/projects/:id
 * @method  GET
 * @access  public
 */
exports.getProjectsById = asyncHandler(async (req, res , next) => {
  const projects = await Projects.findById(req.params.id);

  if (!projects) {
    return next(new ApiError(`No project for this id ${id}`, 404))
  }

  res.json({data: projects});
});

/**
 * @desc     update projects
 * @route   /api/projects/:id
 * @method  PUT
 * @access  private (only admin)
 */
exports.updateProjects = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateProjects = await Projects.findByIdAndUpdate({_id : id}, req.body, {
    new: true
  });

  if (!updateProjects) {
    return next(new ApiError(`No project for this id ${id}`, 404))
  }

  res.json({ message: "Projects updated successfully", data: updateProjects });
});

/**
 * @desc     delete Projects
 * @route   /api/projects/:id
 * @method  DELETE
 * @access  private (only admin)
 */
exports.deleteProjects = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const projects = await Projects.findByIdAndDelete({_id : id});
  if (!projects) {
    return next(new ApiError(`No project for this id ${id}`, 404))
  }
  res.json({ message: "Projects deleted successfully" });
})
