const router = require('express').Router();
const upload = require("../middlewares/photoUpload.middleware");
const {createProjectValidate , deleteProjectValidate , getProjectValidate , updateProjectValidate} = require('../utils/validation/projectsValidator');

const {
  createProject,
  deleteProjects,
  getProjects,
  getProjectsById,
  updateProjects
} = require('../controllers/projects.controller');

const authControllers = require('../controllers/auth.controller');


router
  .route('/')
  .get(getProjects)
  .post(
    authControllers.protect,
    authControllers.allowedTo('admin', 'manager'),
    upload.single("image"),
    createProjectValidate,
    createProject
  );
router
  .route('/:id')
  .get(getProjectValidate, getProjectsById)
  .put(
    authControllers.protect,
    authControllers.allowedTo('admin', 'manager'),
    updateProjectValidate,
    updateProjects
  )
  .delete(
    authControllers.protect,
    authControllers.allowedTo('admin'),
    deleteProjectValidate,
    deleteProjects
  );

module.exports = router;
