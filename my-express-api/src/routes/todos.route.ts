import {Router, Request, Response} from 'express';
import Todo from '../models/todos.models';

const todo_router: Router = Router();

todo_router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const todos = await Todo.find().sort({timestamp: -1});
    res.status(200).json({
      todos: todos
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

todo_router.get('/:query_type', async (req: Request, res: Response): Promise<any> => {
  try {
    const query_type = req.params.query_type;
    const todos = await Todo.find({todo_type: query_type}).sort({timestamp: -1});

    res.status(200).json({
      todos: todos
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
})


todo_router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      noted: req.body.noted,
      color: req.body.color,
      todo_type: req.body.todo_type,
    });
    const todo = await newTodo.save();
    res.status(201).json({
      message: 'Todo Created',
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

todo_router.put('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const todoID = req.body.todoID;
    const updated_data = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(todoID, updated_data, {new: true});

    if (!updatedTodo) {
      return res.status(404).send({
          message: 'Todo not found'
      });
    }

    res.json({
      message: 'Todo updated',
      updatedTodo
    })

  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

todo_router.delete('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const todoID = req.body.todoID;
    const Delete_todos = await Todo.findByIdAndDelete(todoID);
    if (!Delete_todos) {
      return res.status(404).send({
          message: 'Todo not found'
      });
    }

    res.json({message: 'Todo deleted successfully'});
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default todo_router;