import read from "./read.js"
import write from "./write.js"

const toggle = async (articleId) => {
  const db = await read()
  const { [articleId]: article } = db.articles

  if (!article) {
    return null
  }

  const updatedArticle = {
    ...article,
    published: !article.published,
  }

  await write(db, {
    articles: {
      [articleId]: updatedArticle,
    },
  })

  return updatedArticle
}

export default toggle
