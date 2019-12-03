/**
 * 监听者类
 */

/**
 * window.addEventListener 参数说明
 *
 * 使用 addEventListener 监控 storage 的触发机制，同源的不同网页。
 *
 * @param { String } type                   事件的类型
 * @param { Function } listener             监听到事件后的处理函数
 * @param { Boolean } useCapture            是否监听捕获阶段事件流（事件流分为：捕获阶段 -> 目标阶段 -> 冒泡阶段）
 * @param { Int } priority                  监听器优先级
 * @param { Boolean } useWeakReference      监听器是否被强引用（是否被垃圾回收机制处理）
 */

import { parseJSON } from './util'

// 监听者监听的类型
const LISTENER_TYPE = 'storage'
// 存放监听器实例容器
let LISTENER_CONTAINER = {}

class Listener {
  constructor() {
    window.addEventListener(LISTENER_TYPE, this._onChange, false, 0, false)
  }

  _onChange(e) {
    const { key, newValue = '{}', oldValue = '{}', url } = e
    const listeners = LISTENER_CONTAINER[key] || []
    for (const listener of listeners) {
      listener(parseJSON(newValue)['value'], parseJSON(oldValue)['value'], url)
    }
  }

  /**
   * 添加监听者
   * @param  key            存储 key 值
   * @param  fn             监听者处理方法
   */
  addListener(key, fn) {
    LISTENER_CONTAINER[key] = LISTENER_CONTAINER[key] || []
    LISTENER_CONTAINER[key].push(fn)
  }

  /**
   * 移除监听者
   * @param  key            存储 key 值
   * @param  fn             监听者处理方法
   */
  removeListener(key, fn) {
    LISTENER_CONTAINER[key] = LISTENER_CONTAINER[key] || []
    if (LISTENER_CONTAINER[key].length) {
      LISTENER_CONTAINER[key].splice(LISTENER_CONTAINER[key].indexOf(fn), 1)
    }
  }

  /**
   * 清空监听者
   *
   * 如果 key 存在，清空对应的观察者，不存在，则清空容器中所有观察者
   *
   * @param  key            存储 key 值
   */
  clearListener(key) {
    if (key) {
      LISTENER_CONTAINER[key] = []
    } else {
      LISTENER_CONTAINER = {}
    }
  }
}

export default Listener
