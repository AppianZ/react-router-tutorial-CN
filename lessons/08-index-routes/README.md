# Index Routes

When we visit `/` in this app it's just our navigation and a blank page.
We'd like to render a `Home` component there. Lets create a `Home`
component and then talk about how to render it at `/`.

```js
// modules/Home.js
import React from 'react'

export default React.createClass({
  render() {
    return <div>Home</div>
  }
})
```

One option is to see if we have any children in `App`, and if not,
render `Home`:

```js
// modules/App.js
import Home from './Home'

// ...
<div>
  {/* ... */}
  {this.props.children || <Home/>}
</div>
//...
```

This would work fine, but its likely we'll want `Home` to be attached to
a route like `About` and `Repos` in the future. A few reasons include:

1. Participating in a data fetching abstraction that relies on matched
   routes and their components.
2. Participating in `onEnter` hooks
3. Participating in code-splitting

Also, it just feels good to keep `App` decoupled from `Home` and let the
route config decide what to render as the children. Remember, we want to
build small apps inside small apps, not big ones!

Let's add a new route to `index.js`.

```js
// index.js
// new imports:
// add `IndexRoute` to 'react-router' imports
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
// and the Home component
import Home from './modules/Home'

// ...

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

Now open [http://localhost:8080](http://localhost:8080) and you'll see the new component is
rendered.

Notice how the `IndexRoute` has no path. It becomes
`this.props.children` of the parent when no other child of the parent
matches, or in other words, when the parent's route matches exactly.

Index routes can twist people's brains up sometimes. Hopefully it will
sink in with a bit more time. Just think about a web server that looks
for `index.html` when you're at `/`. Same idea, React Router looks for
an index route if a route's path matches exactly.


### [Next: Index Links](../09-index-links/)

---

# 默认路由
当我们访问一个应用的`/` 路径的时候,我们会想在这个默认路径下渲染一个 `Home` 组件。所以让我们创建一个 `Home`组件,然后研究一下如何在默认路径 `/` 下渲染出来。

```js
// modules/Home.js
import React from 'react'

export default React.createClass({
  render() {
    return <div>Home</div>
  }
})
```

我们需要一个参数来确认,我们的`App`中是否有子组件可渲染,如果没有则渲染 `Home`:

```js
// modules/App.js
import Home from './Home'

// ...
<div>
  {/* ... */}
  {this.props.children || <Home/>}
</div>
//...
```

这将能够很好的运行,但是我们今后也希望 `Home` 能够像 `About` 和 `Repos` 组件一样。这里有一些理由:

1. 这个组件可能会带一些抽象数据,这些数据是和路由相匹配的。

2. 可能需要 `onEnter` 的钩子。

3. 可能需要代码分割。

所以,把 `Home` 组件从 `App` 组件中解耦出来,然后由路由配置来确定,子组件要渲染什么。记得,我们想要构建的是层层嵌套的应用,而不是一个巨大的组件!

让我们在 `index.js` 中添加一个路由。

```js
// index.js
// 需要增加引入:
// 添加 `IndexRoute` 到 'react-router' 的引入中
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
// 添加 Home 组件
import Home from './modules/Home'

// ...

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

现在打开浏览器 [http://localhost:8080](http://localhost:8080),你将会看到新的组件已经被渲染了。

注意到了吗? `IndexRoute` 并没有配置路径path。当没有子组件能匹配的时候,或者是父组件的路由没有找到指定的匹配的时候,它就能直接变成 `this.props.children` 渲染的部分渲染出来。

默认路由有时候就是让人意想不到。你可以想象一下,当你的web服务的url是`/`的时候,你的页面中也有一个`index.html` 作为首页显示。同理,React Router 也是需要一个默认路由来展示。

### [下一课: 默认链接](../09-index-links/)