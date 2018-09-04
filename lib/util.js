const childProcess = require('child_process')
const { promisify } = require('util')
const debug = require('debug')
const exec = promisify(childProcess.exec)

async function parseLog (log) {
  const commitBlocks = []
  const finalizedOutput = []

  let temp = []
  log.split('\n').forEach((l) => {
    if (l === '-----') {
      commitBlocks.push(temp)
      temp = []
    } else {
      temp.push(l)
    }
  })

  for (const commit of commitBlocks) {
    const files = await getFiles(commit[0])

    finalizedOutput.push({
      commit: commit[0],
      author: commit[1],
      time: commit[2],
      message: commit.slice(3, commit.length),
      files
    })
  }

  return finalizedOutput
}

async function getFiles (commit) {
  const { stdout } = await exec(`git diff ${commit} --name-only`)

  return stdout.split('\n').filter((l) => l)
}

async function gitLog () {
  const args = ['git log --pretty=format:%H%n%aE%n%ar%n%B%n-----'].concat(...arguments).join(' ')
  debug(args)

  const { stdout } = await exec(args)

  return parseLog(stdout)
}

async function findAuthor (author) {
  return gitLog(`--author=${author}`)
}

async function findAuthors () {
  const { stdout } = await exec('git log --pretty=format:%cn')

  return stdout.split('\n').reduce((count, author) => {
    if (!count[author]) {
      count[author] = 1
    } else {
      count[author] = count[author] + 1
    }
    return count
  }, {})
}

async function findString (string) {
  return gitLog('--all', '--full-history', `--grep='${string}'`)
}

function printOutput (log) {
  let output = ''

  if (Object.keys(log).length === 0) {
    return `no results found`
  }

  output += `${log.length} commits\n`

  output += log.map((l) => {
    return `${l.commit} ${l.time}\n - ${l.author} (${l.files.length} files)`
  }).join('\n')

  return output
}

function printAuthors (authors) {
  if (Object.keys(authors).length === 0) {
    return `no authors found`
  }

  return Object.keys(authors).sort((a, b) => {
    return authors[b] - authors[a]
  }).map((author) => {
    return `${author} -> ${authors[author]}`
  }).join('\n')
}

module.exports = {
  findAuthor,
  findAuthors,
  findString,
  printOutput,
  printAuthors
}
