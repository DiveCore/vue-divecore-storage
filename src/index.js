import { arrayify } from './util'
import StorageListener from './storageListener'

const DEFAULT_PARAMS = {
  prefix: 'app_',
  storageTypes: 'local'
}

// 初始化实例对象
const initInstance = (Vue, storageType, prefix) => {
  const instance = new StorageListener(prefix, storageType)
  const storageName = `$${storageType}Storage`
  Vue.prototype[storageName] = instance
}

// 注册实例
const registerInstance = (Vue, options) => {
  const safeOptions = Object.assign({}, DEFAULT_PARAMS, options)
  const { storageTypes, prefix } = safeOptions
  for (const type of arrayify(storageTypes)) {
    initInstance(Vue, type, prefix)
  }
}

export default registerInstance
