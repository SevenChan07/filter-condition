
export const getUUID = () => {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const getTreeObj = (obj, id) => {
  if (id === obj.id) return obj

  if (obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      let res = getTreeObj(obj.children[i], id)

      if (res) {
        return res
      }
    }
  }
}

export const lowerLevel = children => {
  return children.map(item => {
    if (item.children) {
      return ({
        ...item,
        level: --item.level,
        children: lowerLevel(item.children)
      })
    } else {
      item.level--
      return item
    }
  })
}

export const findParentNode = (obj, id) => {
  let res

  const findNode = (obj, id) => {
    if (obj.children) {
      for (let i = 0; i < obj.children.length; i++) {
        if (id === obj.children[i].id) {
          res = obj
        } else if (obj.children[i].children) {
          findNode(obj.children[i], id)
        }
      }
    }
  }

  findNode(obj, id)

  return res
}

export const addLevelAndId = (data) => {
  let result = []
  let level = 0
  data.level = 0
  data.id = '1001'
  let queue = data.children
  while (queue.length > 0) {
    level += 1
      ;[...queue].forEach((child, i) => {
        queue.shift()
        child.level = level
        child.id = getUUID()
        if (level === 1) {
          result = result.concat([child])
        }
        child.children && queue.push(...child.children)
      })
  }
  return {
    ...data,
    children: result
  }
}
