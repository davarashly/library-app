const yargs = require("yargs"),
    library = require("./library-functions")

yargs.command({
    command: "add",
    describe: "Add book to Library",
    builder: {
        title: {
            describe: "Title of the book",
            demandOption: true,
            type: "string"
        },
        author: {
            describe: "Author of the book",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        library.addToLibrary({title: argv.title, author: argv.author})
    }
})

yargs.command({
    command: "remove",
    describe: "Remove book from the Library",
    builder: {
        title: {
            describe: "Title of the book",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        library.removeFromLibrary(argv.title)
    }
})

yargs.command({
    command: "show",
    describe: "Show all books in Library",
    handler: function () {
        library.printLibrary()
    }
})

yargs.parse()
