import mongoose from 'mongoose'

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!)
  } catch (error) {
    throw new Error('Connection failed!')
  }
}

export default connectDB
