const fs = require("fs"),
  path = "./src/library.json",
  chalk = require("chalk")

function getLibrary() {
  let a
  try {
    a = JSON.parse(fs.readFileSync(path))
  } catch (e) {
    if (e.message != "Unexpected end of JSON input") {
      console.error(chalk.red.bold(`Can't get the library!`))
      console.error(chalk.red.inverse(e.message))
    } else a = []
  }

  return a
}

function isBook(book) {
  let library = getLibrary()
  for (let i = 0; i < library.length; i++)
    if (book.title == library[i].title) return true
}

function addToLibrary(book) {
  try {
    let library = getLibrary()

    if (isBook(book)) throw new Error("This book is already in the Library!")

    library.push(book)
    saveLibrary(library)

    console.log(chalk.green.bold(`Book successfully added to the Library!`))
    console.log(chalk.green.inverse(`Title : ${book.title} `))
    console.log(chalk.green.inverse(`Author: ${book.author} `))
  } catch (e) {
    console.error(chalk.red.bold(`Can't add book to the library!`))
    console.error(chalk.red.inverse(e.message))
  }
}

function saveLibrary(library) {
  try {
    fs.writeFileSync(path, JSON.stringify(library))
  } catch (e) {
    console.error(chalk.red.bold(`Can't save the library!`))
    console.error(chalk.red.inverse(e.message))
  }
}

function removeFromLibrary(title) {
  let library = getLibrary()

  let newLib = library.filter(book => {
    return book.title != title
  })

  try {
    saveLibrary(newLib)
    console.log(
      chalk.green.bold(`Book successfully removed from to the Library!`)
    )
  } catch (e) {
    console.error(chalk.red.bold(`Can't remove this book from the library!`))
    console.error(chalk.red.inverse(e.message))
  }
}

function printBook(book) {
  let line = ""
  line = chalk.green.bold(`Title : `)
  console.log(`${line} ${book.title} `)
  line = chalk.green.bold(`Author :`)
  console.log(`${line} ${book.author} `)
}

function printLibrary() {
  let library = getLibrary()
  library.forEach(book => {
    printBook(book)
    console.log()
  })
}

module.exports = {
  addToLibrary,
  removeFromLibrary,
  printLibrary
}
