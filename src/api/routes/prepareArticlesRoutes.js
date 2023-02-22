import add from "../../db/add.js"
import list from "../../db/list.js"
import parseArticleId from "../../db/parseArticleId.js"
import read from "../../db/read.js"
import remove from "../../db/remove.js"
import write from "../../db/write.js"

const prepareArticlesRoutes = (app) => {
  // CREATE
  app.post("/articles", async (req, res) => {
    const { title, description } = req.body

    const article = await add(title, description)

    res.send(article)
  })

  // READ collection
  app.get("/articles", async (req, res) => {
    const all = Boolean(req.query.all)
    const articles = await list({ all })

    res.send(articles)
  })

  // READ single
  app.get("/articles/:articleId", async (req, res) => {
    const articleId = parseArticleId(req.params.articleId)
    const {
      articles: { [articleId]: article },
    } = await read()

    if (!article) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send({ result: article })
  })

  // UPDATE full
  app.put("/articles/:articleId", async (req, res) => {
    const articleId = parseArticleId(req.params.articleId)
    const { title, description, published } = req.body
    const db = await read()
    const {
      articles: { [articleId]: article },
    } = db

    if (!article) {
      res.status(404).send({ error: "Not found" })

      return
    }

    const updatedArticle = {
      id: articleId,
      title,
      description,
      published,
    }

    await write(db, {
      articles: {
        [articleId]: updatedArticle,
      },
    })

    res.send(updatedArticle)
  })
  // UPDATE partial
  app.patch("/articles/:articleId", async (req, res) => {
    const articleId = parseArticleId(req.params.articleId)
    const { title, description, published } = req.body
    const db = await read()
    const {
      articles: { [articleId]: article },
    } = db

    if (!article) {
      res.status(404).send({ error: "Not found" })

      return
    }

    const updatedArticle = {
      ...article,
      title: title ?? article.title,
      description: description ?? article.description,
      published: published ?? article.published,
    }

    await write(db, {
      articles: {
        [articleId]: updatedArticle,
      },
    })

    res.send(updatedArticle)
  })
  // DELETE
  app.delete("/articles/:articleId", async (req, res) => {
    const articleId = parseArticleId(req.params.articleId)
    const article = await remove(articleId)

    if (!article) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(article)
  })
}

export default prepareArticlesRoutes
