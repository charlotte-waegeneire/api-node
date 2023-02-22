const parseArticleId = (id) => {
  const articleId = Number.parseInt(id, 10)

  if (Number.isNaN(articleId)) {
    throw new Error("Invalid article ID")
  }

  return articleId
}

export default parseArticleId
