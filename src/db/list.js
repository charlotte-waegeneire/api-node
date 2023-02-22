import read from "./read.js"

const identity = (x) => x
const checkNotDone = ({ done }) => !done

const list = async ({ all } = {}) => {
  const { articles } = await read()

  return Object.values(articles).filter(all ? identity : checkNotDone)
}

export default list
