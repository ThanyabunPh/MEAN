import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  noted: { type: String },
  color: { type: String, required: true },
  image: { type: String },
  todo_type: { type: String },
});

const Todo = mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
