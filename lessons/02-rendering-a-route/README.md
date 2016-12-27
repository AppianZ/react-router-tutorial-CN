# Rendering a Route

At its heart, React Router is a component.

```js
render(<Router/>, document.getElementById('app'))
```

That's not going to display anything until we configure a route.

Open up `index.js` and

1. import `Router`, `Route`, and `hashHistory`
2. render a `Router` instead of `App`

```js
// ...
import { Router, Route, hashHistory } from 'react-router'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))
```

Make sure your server is running with `npm start` and then visit
[http://localhost:8080](http://localhost:8080)

You should get the same screen as before, but this time with some junk
in the URL. We're using `hashHistory`--it manages the routing history
with the hash portion of the url. It's got that extra junk to shim some
behavior the browser has natively when using real urls.  We'll change
this to use real urls later and lose the junk, but for now, this works
great because it doesn't require any server-side configuration.

## Adding More Screens

Create two new components at:

- `modules/About.js`
- `modules/Repos.js`

```js
// modules/About.js
import React from 'react'

export default React.createClass({
  render() {
    return <div>About</div>
  }
})
```

```js
// modules/Repos.js
import React from 'react'

export default React.createClass({
  render() {
    return <div>Repos</div>
  }
})
```

Now we can couple them to the app at their respective paths.

```js
// insert into index.js
import About from './modules/About'
import Repos from './modules/Repos'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))
```

Now visit [http://localhost:8080/#/about](http://localhost:8080/#/about) and
[http://localhost:8080/#/repos](http://localhost:8080/#/repos)

 

### [Next: Navigating With Link](../03-navigating-with-link/)

---

# 渲染一个Route
首先,React Router是一个组件。

```js
render(<Router/>, document.getElementById('app'))
```

这里除非我们配置了路由,否则什么也显示不出来。

打开 `index.js` ,然后:

1. 引入 `Router`, `Route`, 和 `hashHistory`
2. 在 `App` 的位置上渲染一个 `Router`

```js
// ...
import { Router, Route, hashHistory } from 'react-router'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))
```

确定你的服务还在 `npm start`, 然后打开浏览器[http://localhost:8080](http://localhost:8080)


你应该可以和之前看到一样的页面,但是这一次url有一些不同。

我们使用`hashHistory` -- 它管理着带有hash的历史路由的url。

当我们使用真正的url的时候,浏览器会自动填充一些额外的东西进来。

我们之后将会使用真正的url,并且剔除这些额外的东西。

但是现在看来,路由还是很正常的,因为它还没有引入任何服务端的配置。

## 添加更多屏

创建两个新的组件


- `modules/About.js`
- `modules/Repos.js`

```js
// modules/About.js
import React from 'react'
export default React.createClass({
  render() {
    return <div>About</div>
  }
})
```

```js
// modules/Repos.js
import React from 'react'
export default React.createClass({
  render() {
    return <div>Repos</div>
  }
})
```

现在我们把它们都组合起来,并给他们定义各自的路径。

```js
// insert into index.js
import About from './modules/About'
import Repos from './modules/Repos'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))
```

现在打来浏览器,浏览[http://localhost:8080/#/about](http://localhost:8080/#/about) 和 [http://localhost:8080/#/repos](http://localhost:8080/#/repos)



### [下一课: 带有Link的导航](../03-navigating-with-link/)
