import MealsGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import Link from 'next/link'
import { Suspense } from 'react'
import cls from './page.module.css'

export const metadata = {
  title: 'All meals',
  description: 'Browse the delicious shared bla bla bla',
}

async function Meals() {
  const meals = await getMeals()
  // прокидываем ошибку
  // throw new Error('loading meals failed')
  return <MealsGrid meals={meals} />
}

// async можно использовать в серверных компонентах
export default function MealsPage() {
  return (
    <>
      <header className={cls.header}>
        <h1>
          Вкусная еда приготовленная{' '}
          <span className={cls.highlight}>тобой</span>
        </h1>
        <p>Выбери любимый рецепт и приготовь сам</p>
        <p className={cls.cta}>
          <Link href={'/meals/share'}>Поделиться любимым рецептом</Link>
        </p>
      </header>
      <main className={cls.main}>
        <Suspense fallback={<p className={cls.loading}>loading meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}
