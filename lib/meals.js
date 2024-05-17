import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import { S3 } from '@aws-sdk/client-s3'

const s3 = new S3({
  // очень важно чтобы регион совпадал с регионом создания
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
const db = sql('meals.db')

export async function getMeals() {
  return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
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

  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error('Saving image failed!')
  //   }
  // })

  meal.image = fileName

  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title,
    @summary, 
    @instructions, 
    @creator, 
    @creator_email, 
    @image, 
    @slug
  )
  `,
  ).run(meal)
}
