import { Schema, model, models } from 'mongoose'

const mealSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    creator_email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const MealModel = models.Meal || model('Meal', mealSchema)

export default MealModel
