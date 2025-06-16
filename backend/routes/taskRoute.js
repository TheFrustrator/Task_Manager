import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask
} from '../controllers/taskController.js';

const taskRouter = express.Router();

// ROUTE: /api/tasks
taskRouter.route('/gp')
  .get(authMiddleware, getTask)        // Get all tasks
  .post(authMiddleware, createTask);   // Create a task

// ROUTE: /api/tasks/:id
taskRouter.route('/:id/gp')
  .get(authMiddleware, getTaskById)    // Get task by ID
  .put(authMiddleware, updateTask)     // Update task by ID
  .delete(authMiddleware, deleteTask); // Delete task by ID

export default taskRouter;
