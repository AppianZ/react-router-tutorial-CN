# URL Params

Consider the following URLs:

```
/repos/reactjs/react-router
/repos/facebook/react
```

These URLs would match a route path like this:

```
/repos/:userName/:repoName
```

The parts that start with `:` are URL parameters whose values will be
parsed out and made available to route components on
`this.props.params[name]`.

## Adding a Route with Parameters

Let's teach our app how to render screens at `/repos/:userName/:repoName`.

First we need a component to render at the route, make a new file at
`modules/Repo.js` that looks something like this:

```js
// modules/Repo.js
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
})
```

Now open up `index.js` and add the new route.

```js
// ...
// import Repo
import Repo from './modules/Repo'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}/>
      {/* add the new route */}
      <Route path="/repos/:userName/:repoName" component={Repo}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

Now we can add some links to this new route in `Repos.js`.

```js
// Repos.js
import { Link } from 'react-router'
// ...
export default React.createClass({
  render() {
    return (
      <div>
        <h2>Repos</h2>

        {/* add some links */}
        <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
        </ul>

      </div>
    )
  }
})
```

Now go test your links out. Note that the parameter name in the route
`path` becomes the property name in the component. Both `repoName` and
`userName` are available on `this.props.params` of your component. You
should probably add some prop types to help others and yourself out
later.


### [Next: More Nesting](../07-more-nesting/)

---

# 带参数的URL

考虑一下如下的url:

```
/repos/reactjs/react-router
/repos/facebook/react
```

这些url都有一个特点:

```
/repos/:userName/:repoName
```

在url里面以`:`开头的,就是作为url带的参数的参数名。它对应位置的值会被解析成参数,可以通过`this.props.params[name]`来获得值。

## 添加一个带参数的路由

我们要先告知我们的应用当遇到一个带参数的url `/repos/:userName/:repoName` 的时候要如何渲染。

首先,我们需要一个组件去渲染路由,新建一个文件`modules/Repo.js`, 文件里面的内容大概如下:

```js
// modules/Repo.js
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
})
```

现在我们打开 `index.js`, 添加我们的新路由。
 
```js
// ...
// import Repo
import Repo from './modules/Repo'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}/>
      {/* add the new route */}
      <Route path="/repos/:userName/:repoName" component={Repo}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

现在我们再在`Repos.js`中添加一些link:

```js
// Repos.js
import { Link } from 'react-router'
// ...
export default React.createClass({
  render() {
    return (
      <div>
        <h2>Repos</h2>

        {/* add some links */}
        <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
        </ul>

      </div>
    )
  }
})
```

现在我们可以测试link的跳转了。注意路由的`path` 会变成组件的属性值。`repoName` 和 `userName` 的值都可以在你的组件里用 `this.props.params` 拿到。你可能之后会需要用到这些参数做一些操作。

### [下一课: 进一步了解嵌套](../07-more-nesting/)

