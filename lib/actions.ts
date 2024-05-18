'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveMeal } from './meals'

function isInvalidText(text: string) {
  return !text || text.trim() === ''
}

export async function shareMeal(formData: FormData) {
  const meal = {
    creator: formData.get('name')?.toString(),
    creator_email: formData.get('email')?.toString(),
    title: formData.get('title')?.toString(),
    summary: formData.get('summary')?.toString(),
    instructions: formData.get('instructions')?.toString(),
    image: formData.get('image'),
  }

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image
  ) {
    throw new Error()
  }

  const response: string = await saveMeal(meal)

  if (response === 'error') {
    throw new Error()
  }
  // ревалидирует кэш после добавления нового блюда
  // два пути ревалидации, первый 'page' (по умолчанию) ревалидирует только целевую страницу без вложенных страниц, второй 'layout' целевую страницу и все вложенные страницы по урлу,
  // если нужно обновить все страницы то revalidatePath('/', 'layout')
  revalidatePath('/meals', 'page')
  redirect('/meals')
}
