import mongoose from "mongoose";

const connect = async (mongoDBURL: string): Promise<any> => {
  return mongoose.connect(mongoDBURL)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
}

export default connect;