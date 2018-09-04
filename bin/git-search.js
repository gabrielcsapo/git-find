#!/usr/bin/env node

const woof = require('woof')

const { printOutput, printAuthors, findAuthor, findAuthors, findString } = require('../lib/util')

const cli = woof(`
  Usage
    $ git-search

  Options
    --string, -s [<string>]           Finds the given string
    --author, -a [<author>]           Finds the given author
    --authors, -as                    Finds a list of all the authors
`, {
  flags: {
    string: {
      type: 'string',
      alias: 's'
    },
    author: {
      type: 'string',
      alias: 'a'
    },
    authors: {
      type: 'boolean'
    }
  }
});

(async function () {
  if (cli.author) {
    process.stdout.write(`${printOutput(await findAuthor(cli.author))}\n`)
  }

  if (cli.authors) {
    process.stdout.write(`${printAuthors(await findAuthors())}\n`)
  }

  if (cli.string) {
    process.stdout.write(`${printOutput(await findString(cli.string))}\n`)
  }
}())
