import read from "./read.js"
import write from "./write.js"

const add = async (title, description) => {
  const db = await read()
  const lastId = db.lastId + 1
  const article = {
    id: lastId,
    title,
    description,
    published: false,
  }

  await write(db, {
    lastId,
    articles: {
      [lastId]: article,
    },
  })

  return article
}

export default add
