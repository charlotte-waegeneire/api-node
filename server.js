import express from "express"
import prepareArticlesRoutes from "./src/api/routes/prepareArticlesRoutes.js"

const app = express()

app.use(express.json())

prepareArticlesRoutes(app)

app.listen(3000, () => console.log("Listening on :3000"))
