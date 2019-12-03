# vue-divecore-storage

## 描述 && 特性

- 对存储的值进行自动序列化

- 可跨标签页面进行监听，通信

- 配置 prefix，设置项目的 scope

- 可设置对应存储内容的时长

## 安装

```
> 安装 npm install vue-divecore-storage --save
```

## 使用

```
import Vue from 'vue'
import Storage from 'vue-divecore-storage'

Vue.use(Storage, {
  prefix: 'your_app_scope_',  // default 'app_'
  storageTypes: ['session','local'] // default 'local'
})
```

## 方法

> set(key, value, delay = null)

- 将指定键下的值存储在存储器中，delay 设置存储时长，超过该时长，将删除指定键下的值。

```
Vue.$localStorage.set('userInfo', { name: 'zhangsan', age: 21 })
Vue.$localStorage.set('token', 'JWT', 8 * 60 * 60 * 1000)
```

> get(key, defalutValue = {})

- 获取指定键下存储的值，defalutValue 设置默认值，当值不存在时返回默认值

```
Vue.$localStorage.get('userInfo')
Vue.$localStorage.get('userInfo', {})
```

> remove(key)

- 删除指定键在本地存储中

```
Vue.$localStorage.remove('userInfo')
Vue.$localStorage.remove('userInfo')
```

> clear(force = false)

- 清空存储，如果 force = true，则强制清除所有缓存。force = false，则清除对应 scope 下的缓存

```
Vue.$localStorage.clear()
Vue.$localStorage.clear(true)
```

## 监听者

> addListener(key, fn)

- 给指定键添加观察者

```

const _onChange = (newV, oldV, url) => {
   // newV: 更新后的值
   // oldV: 更新前的值
   // url: 修改页面的地址
 }

Vue.$localStorage.addListener('userInfo', _onChange)
```

> removeListener(key, fn)

- 删除指定键的指定观察者

```
Vue.$localStorage.removeListener('userInfo', _onChange)
```

> clearListener(key)

- 清除指定键的所有观察者

```
Vue.$localStorage.clearListener('userInfo')
```
