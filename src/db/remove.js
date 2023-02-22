import read from "./read.js"
import write from "./write.js"

const remove = async (articleId) => {
  const db = await read()
  const { [articleId]: article } = db.articles

  if (!article) {
    return null
  }

  await write(db, {
    articles: {
      [articleId]: undefined,
    },
  })

  return article
}

export default remove
