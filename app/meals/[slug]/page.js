import { notFound } from 'next/navigation'
import cls from './page.module.css'
import { getMeal } from '@/lib/meals'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug)

  if (!meal) {
    notFound()
  }

  return { title: meal.title, description: meal.summary }
}

export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.slug)
  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={cls.header}>
        <div className={cls.image}>
          <Image
            src={`https://fisio-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={cls.headerText}>
          <h1>{meal.title}</h1>
          <p className={cls.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={cls.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={cls.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  )
}
