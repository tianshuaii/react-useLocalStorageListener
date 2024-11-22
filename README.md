# react-useLocalStorageListener

一个监听本地存储的 React Hook

## 下载

```bash
npm install react-uselocalstoragelistener --save-dev
```

## 使用

```javascript
useLocalStorageListener(stroageKey, (newValue) => {
  console.log(stroageKey, "的值发生改变，新值为：", newValue)
})
```
