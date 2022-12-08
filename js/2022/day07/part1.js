import * as aoc from '../../2020/aoc.js'

const root = {
  parent: null,
  name: "/",
  files: [],
  directories: new Map(),
  size: null
}

/**
 * @param {{ parent: any; name: string; files: array; directories: Map; size: number; }} dir
 */
function computeSizes(dir) {
  var size = 0
  for (const subdir of dir.directories.values()) {
    computeSizes(subdir)
    size += subdir.size
  }
  for (const file of dir.files) {
    size += file.size
  }
  dir.size = size
  return size
}

function findDirectories(dir, maxSize) {
  const foundDirectories = []
  if (dir.size < maxSize) {
    foundDirectories.push(dir)
  }
  for (const subdir of dir.directories.values()) {
    foundDirectories.push(...findDirectories(subdir, maxSize))
  }
  return foundDirectories
}

aoc.run(function(input) {
    const lines = input.lines()

    var cwd = root

    while(lines.length > 0) {
      const line = lines.shift()
      if (line.startsWith("$ cd")) {
        // cd
        const args = line.split(" ")
        const newDir = args[2]
        if (newDir == '/') {
          cwd = root
        } else if (newDir == "..") {
          cwd = cwd.parent
        } else {
          cwd = cwd.directories.get(newDir)
        }
      } else {
        // ls
        while(lines.length > 0 && !lines[0].startsWith("$")) {
          const result = lines.shift()
          if (result.startsWith("dir")) {
            const name = result.split(" ")[1]
            cwd.directories.set(name, {
              parent: cwd,
              name,
              files: [],
              directories: new Map(),
            })
          } else {
            const [size, name] = result.split(" ")
            cwd.files.push({
              name,
              size: parseInt(size, 10)
            })
          }
        }
      }
    }

    computeSizes(root)

    var result = 0

    const dirs = findDirectories(root, 100000)

    for (const dir of dirs) {
      result += dir.size
    }
    
    return result
})
