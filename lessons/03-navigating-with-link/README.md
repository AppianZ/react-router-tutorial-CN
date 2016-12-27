# Navigating with Link

Perhaps the most used component in your app is `Link`. It's almost
identical to the `<a/>` tag you're used to except that it's aware of
the `Router` it was rendered in.

Let's create some navigation in our `App` component.

```js
// modules/App.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    )
  }
})
```

Now visit [http://localhost:8080](http://localhost:8080) and click the links, click back, click
forward. It works!


### [Next: Nested Routes](../04-nested-routes/)


---

# 带有Link的导航

`Link` 可能在你的应用中,最有用的组件了。除了它是用 `Router` 渲染出来的,这个组件和你过去使用的 `<a/>` 差不多。

让我们在我们的 `App` 组件中创建一些导航。

```js
// modules/App.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    )
  }
})
```

打开浏览器,[http://localhost:8080](http://localhost:8080),点击这些导航,点来点去,你会发现能够实现跳转了。

### [下一课: 路由嵌套](../04-nested-routes/)
