# Navigating Programatically

While most navigation happens with `Link`, you can programmatically
navigate around an application in response to form submissions, button
clicks, etc.

Let's make a little form in `Repos` that programmatically navigates.

```js
// modules/Repos.js
import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  // add this method
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          {/* add this form */}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
```

There are two ways you can do this, the first is simpler than the
second.

First we can use the `browserHistory` singleton that we passed into
`Router` in `index.js` and push a new URL into the history.

```js
// modules/Repos.js
import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    // ...
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
// ...
```

There's a potential problem with this though. If you pass a different
history to `Router` than you use here, it won't work. It's not very
common to use anything other than `browserHistory`, so this is
acceptable practice. If you're concerned about it, you can make a module
that exports the history you want to use across the app, or...

You can also use the `router` that `Router` provides on "context".
First, you ask for context in the component, and then you can use it:

```js
export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  // ...

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },

  // ..
})
```

This way you'll be sure to be pushing to whatever history gets passed to
`Router`. It also makes testing a bit easier since you can more easily
stub context than singletons.

### [Next: Server Rendering](../13-server-rendering/)

---

# 编程式导航

大部分的导航都是用 `Link` 来构造的,你也可以在自己的应用中写导航的跳转逻辑,比如用表单提交的响应事件,按钮的点击事件等。

现在,让我们在 `Repos` 中写一个小表单来实现一个编程式导航。

```js
// modules/Repos.js
import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  // add this method
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          {/* add this form */}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
```

这里有两种方式,第一种比第二种更简单。

第一种就是,我们可以只使用 `browserHistory` 作为参数传入 `index.js` 的 `Router` 中,然后增加一个新的历史记录。
 
 
```js
// modules/Repos.js
import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    // ...
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
// ...
```

这种方法有一个潜在的问题。如果你传递了一个和你使用的不一样的历史进 `Router` 的话,它不能正确相应。但这种场景并不是经常发生,所以这种小问题是可以接受的。如果你比较在意这个问题,你可以把历史记录打包导出,或者其他一些方法...

你也可以使用 `Router` 在 "context" 中提供的 `router` 。

首先,你在你的组件中请求一个context,然后你可以这样使用它。


```js
export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  // ...

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },

  // ..
})
```

用这种方式,你可以确定,无论你的历史记录如何记录都可以。这样就能更好的测试,因为你可以更好的通过上下文环境来做出判断。

### [下一课: 服务端渲染](../13-server-rendering/)