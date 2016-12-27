# More Nesting

Notice how the list of links to different repositories goes away when we
navigate to a repository? What if we want the list to persist, just like
the global navigation persists?

Try to figure that out before reading on.

...

First, nest the `Repo` route under the `Repos` route. Then go render
`this.props.children` in `Repos`.

```js
// index.js
// ...
<Route path="/repos" component={Repos}>
  <Route path="/repos/:userName/:repoName" component={Repo}/>
</Route>
```

```js
// Repos.js
// ...
<div>
  <h2>Repos</h2>
  <ul>
    <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
    <li><Link to="/repos/facebook/react">React</Link></li>
  </ul>
  {/* will render `Repo.js` when at /repos/:userName/:repoName */}
  {this.props.children}
</div>
```

## Active Links

Let's bring in our `NavLink` from before so we can add the `active`
class name to these links:

```js
// modules/Repos.js
// import it
import NavLink from './NavLink'

// ...
<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
<li><NavLink to="/repos/facebook/react">React</NavLink></li>
// ...
```

Notice how both the `/repos` link up top and the individual repo links are
both active? When child routes are active, so are the parents.

### [Next: Index Routes](../08-index-routes/)

---

# 进一步了解嵌套
当我们用导航切换我们链接到的仓库的时候, 是否注意到我们的链接是如何区分这些仓库的?如果我们想要这些链接列表留存下来,就像是全局的导航一样的话,要怎么做?

在阅读之前,先试着辨别清楚:

第一,`Repos`路由下嵌套着`Repo`,嵌套的路由会在`Repos`中`this.props.children`的地方渲染出来。

```js
// index.js
// ...
<Route path="/repos" component={Repos}>
  <Route path="/repos/:userName/:repoName" component={Repo}/>
</Route>
```

```js
// Repos.js
// ...
<div>
  <h2>Repos</h2>
  <ul>
    <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
    <li><Link to="/repos/facebook/react">React</Link></li>
  </ul>
  {/* will render `Repo.js` when at /repos/:userName/:repoName */}
  {this.props.children}
</div>
```

## 激活的链接
回到我们的 `NavLink` 的组件里,在我们添加 `active` 这个类名之前:

```js
// modules/Repos.js
// import it
import NavLink from './NavLink'

// ...
<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
<li><NavLink to="/repos/facebook/react">React</NavLink></li>
// ...
```

注意到这两个子组件都以 `/repos` 为链接的顶部,并且都有一个独立的repo链接。难道要让他们都激活吗? 如果有子组件被激活了,他们的父级组件就会被显示成激活。

### [下一课: 默认路由](../08-index-routes/)
