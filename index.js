import { Command } from "commander"
import add from "./src/cli/commands/add.js"
import list from "./src/cli/commands/list.js"
import remove from "./src/cli/commands/remove.js"
import toggle from "./src/cli/commands/toggle.js"
import parseArticleId from "./src/db/parseArticleId.js"

const program = new Command()

program.name("article")

program
  .command("add")
  .alias("a")
  .description("add a new article")
  .argument("<description>", "description", (x) => x.trim())
  .action(add)

program
  .command("list")
  .aliases(["ls", "l"])
  .description("list all articles (default: only not done)")
  .option("-a, --all", "show all articles including done")
  .action(list)

program
  .command("remove")
  .alias("rm")
  .description("remove a article")
  .argument("<articleId>", "Article ID", parseArticleId)
  .action(remove)

program
  .command("toggle")
  .alias("x")
  .description("toggle `done` state of a article")
  .argument("<articleId>", "Article ID", parseArticleId)
  .action(toggle)

program.parse()
