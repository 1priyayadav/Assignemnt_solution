const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const validate = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { createTaskSchema, updateTaskSchema } = require('../validations/task.validation');

const router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(validate(createTaskSchema), createTask)
    .get(getTasks);

router.route('/:id')
    .get(getTaskById)
    .put(validate(updateTaskSchema), updateTask)
    .delete(deleteTask);

module.exports = router;
