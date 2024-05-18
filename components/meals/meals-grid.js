import MealItem from './meal-item'
import cls from './meals-grid.module.css'

export default function MealsGrid({ meals }) {
  return (
    <ul className={cls.meals}>
      {meals.map((meal) => {
        return (
          <li key={meal._id}>
            <MealItem meal={meal} />
          </li>
        )
      })}
    </ul>
  )
}
