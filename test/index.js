const test = require('tape')
const { printOutput, printAuthors } = require('../lib/util')

test('printOutput', (t) => {
  t.test('should print default view', (t) => {
    t.end()
  })

  t.test('should print nothing found', (t) => {
    t.equal(printOutput([]), 'no results found')
    t.end()
  })
})

test('printAuthors', (t) => {
  t.test('should print default view', (t) => {
    t.equal(printAuthors({
      'foo bar': 3,
      'bar': 10,
      'foo': 2
    }), 'bar -> 10\nfoo bar -> 3\nfoo -> 2')
    t.end()
  })

  t.test('should print nothing found', (t) => {
    t.equal(printAuthors([]), 'no authors found')
    t.end()
  })
})
