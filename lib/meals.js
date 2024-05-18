import { S3 } from '@aws-sdk/client-s3'
import slugify from 'slugify'
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

  // const ins = await MealModel.insertMany({
  //   title: 'nnnnnnn',
  //   summary: 'jjjjj',
  //   instructions: 'hhhhh',
  //   creator: 'qwert',
  //   creator_email: 'srdyddydy',
  //   image: 'hgguuguug',
  //   slug: 'juhgugug',
  // })
  // await UserModel.insertMany({ name: 'tim' })

  // console.log('meals', meals)

  return meals
}

export async function getMeal(slug) {
  await connectDB()
  const meal = await MealModel.find({ slug: slug })
 
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })
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

  // db.prepare(
  //   `
  // INSERT INTO meals
  // (title, summary, instructions, creator, creator_email, image, slug)
  // VALUES (
  //   @title,
  //   @summary,
  //   @instructions,
  //   @creator,
  //   @creator_email,
  //   @image,
  //   @slug
  // )
  // `,
  // ).run(meal)
}
