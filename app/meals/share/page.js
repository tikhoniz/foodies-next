'use client'

import ImagePicker from '@/components/meals/image-picker'
import MealsFormSubmit from '@/components/meals/meals-form-submit'
// import { shareMeal } from '@/lib/actions'
// import { useActionState } from 'react'
import cls from './page.module.css'

export default function ShareMealPage() {
  // const [state, formAction] = useActionState(shareMeal, { message: null })

  return (
    <>
      <header className={cls.header}>
        <h1>
          Share your <span className={cls.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={cls.main}>
        {/* <form className={cls.form} action={formAction}>
          <div className={cls.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={cls.actions}>
            <MealsFormSubmit />
          </p>
        </form> */}
      </main>
    </>
  )
}
