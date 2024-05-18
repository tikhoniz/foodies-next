import Image from 'next/image'
import classes from './meal-item.module.css'
import Link from 'next/link'

export default function MealItem({ meal }) {
  const { image, title, creator, summary, slug } = meal
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://fisio-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
            alt={title}
            fill
            sizes="100vw"
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}
