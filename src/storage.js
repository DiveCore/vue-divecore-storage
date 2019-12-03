/**
 * 本地存储类
 */
import { parseJSON, stringify, getNowTime, getJoinPrefixKey } from './util'

class Storage {
  /**
   * 构造函数
   * @param prefix              前缀
   * @param storageType         本地存储类型 local/session
   */
  constructor(prefix = 'app_', storageType = 'local') {
    this.prefix = prefix
    this.storage = window[`${storageType}Storage`]
  }

  /**
   * 存储
   * @param key                 存储 key 值
   * @param value               存储 value 值
   * @param delay               设置存储的缓存时长，单位毫秒
   */
  set(key, value, delay = null) {
    try {
      const data = {}
      if (!isNaN(parseInt(delay))) {
        data['delay'] = delay
        data['createAt'] = getNowTime()
      }
      data['value'] = value
      this.storage.setItem(getJoinPrefixKey(this.prefix, key), stringify(data))
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  /**
   * 获取
   * @param key                 存储 key 值
   * @param defaultValue        设置默认值，当不存在对应 value 值时，返回默认值
   */
  get(key, defaultValue = null) {
    const storageValue = this.storage.getItem(
      getJoinPrefixKey(this.prefix, key)
    )

    if (storageValue) {
      const { value, delay = null, createAt = null } = parseJSON(storageValue)
      if (delay && createAt) {
        if (getNowTime() - createAt > delay) {
          this.remove(key)
          return defaultValue
        }
        return value
      }
      return value
    }
    return defaultValue
  }

  /**
   * 删除
   * @param key               存储 key 值
   */
  remove(key) {
    try {
      this.storage.removeItem(getJoinPrefixKey(this.prefix, key))
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  /**
   * 清空
   * @param force             是否强制清除所有缓存
   */
  clear() {
    this.storage.clear()
  }
}

export default Storage
