# git-search
🔎 find what you are looking for in git

## Usage

```
Usage
  $ git-search [options]

Options
  --string, -s [<string>]           Finds the given string
  --author, -a [<author>]           Finds the given author
  --authors                         Finds a list of all the authors
```

### --author

```
$ git-search --author=gabecsapo@gmail.com
28 commits
17990052e64e0448545dee08c572ddd88a1b31db 25 hours ago
 - gabecsapo@gmail.com (0 files)
0e73f0b237bf359f6ba4b2958087341c5f374f1b 3 months ago
 - gabecsapo@gmail.com (15 files)
52a48f3c99655a7bf4349a7048917fe36dfa1bc5 5 months ago
 - gabecsapo@gmail.com (15 files)
f3b25242ae02b6d9288620a718abc59de862c6c5 5 months ago
 - gabecsapo@gmail.com (15 files)
24aba1fb1f82eb46d65863652f7f91b9fbe09984 5 months ago
 - gabecsapo@gmail.com (17 files)
...
```

### --string

```
$ git-search --string=bin
2 commits
f3b25242ae02b6d9288620a718abc59de862c6c5 5 months ago
 - gabecsapo@gmail.com (15 files)
17cd5ac2a81a848a258d8227137abd4fcb2d202b 5 months ago
 - gabecsapo@gmail.com (24 files)
```

### --authors

```
$ git-search --authors
Gabriel Csapo -> 18
Gabriel J. Csapo -> 8
GitHub -> 3
```
