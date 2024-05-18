import { S3 } from '@aws-sdk/client-s3'
import slugify from 'slugify'
import { v4 as uuid } from 'uuid'
import xss from 'xss'
import connectDB from './db'
import MealModel from './models/MealModel'

const s3 = new S3({
  // очень важно чтобы регион совпадал с регионом создания
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function getMeals() {
  await connectDB()
  const meals = await MealModel.find({})

  return meals
}

export async function getMeal(slug) {
  await connectDB()
  const meal = await MealModel.findOne({ slug: slug })

  return meal
}

export async function saveMeal(meal) {
  try {
    const unique = uuid().slice(0, 16)
    meal.slug = slugify(`${meal.title} ${unique}`, {
      lower: true,
      replacement: '_',
    })
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`

    const bufferedImage = await meal.image.arrayBuffer()

    s3.putObject({
      Bucket: 'fisio-nextjs-demo-users-image',
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type,
    })

    meal.image = fileName

    await connectDB()
    await MealModel.create(meal)
  } catch (error) {
    return 'error'
  }
}
