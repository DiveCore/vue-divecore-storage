/**
 * 本地存储监听器
 */
import Storage from './storage'
import Listener from './listener'
import { getJoinPrefixKey } from './util'

class StorageListener extends Storage {
  constructor(prefix = 'app_', storageType = 'local') {
    super(prefix, storageType)
    this.listener = new Listener()
  }

  addListener(key, fn) {
    this.listener.addListener(getJoinPrefixKey(this.prefix, key), fn)
    return this
  }

  removeListener(key, fn) {
    this.listener.removeListener(getJoinPrefixKey(this.prefix, key), fn)
    return this
  }

  clearListener(key) {
    const storageKey = key ? getJoinPrefixKey(this.prefix, key) : null
    this.listener.clearListener(storageKey)
    return this
  }
}

export default StorageListener
