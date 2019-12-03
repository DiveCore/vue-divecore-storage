/**
 * 工具函数
 */

export const parseJSON = value => {
  try {
    return JSON.parse(value)
  } catch (error) {
    console.error(error)
    return value
  }
}

export const stringify = value => {
  try {
    return JSON.stringify(value)
  } catch (error) {
    console.error(error)
    return value
  }
}

export const arrayify = value => {
  return value instanceof Array ? value : [value]
}

export const getNowTime = () => {
  return new Date().getTime()
}

export const getJoinPrefixKey = (prefix, key) => {
  return `${String(prefix)}${String(key)}`
}
