# Active Links

One way that `Link` is different from `a` is that it knows if the path
it links to is active so you can style it differently.

## Active Styles

Let's see how it looks with inline styles, add `activeStyle` to your
`Link`s.

```js
// modules/App.js
<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
<li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
```

Now as you navigate, the active link is red.

## Active Class Name

You can also use an active class name instead of inline-styles.

```js
// modules/App.js
<li><Link to="/about" activeClassName="active">About</Link></li>
<li><Link to="/repos" activeClassName="active">Repos</Link></li>
```

We don't have a stylesheet on the page yet though. Lets add one-extra
point if you can add a `link` tag from memory.

```html
// index.html
<link rel="stylesheet" href="index.css" />
```

And the CSS file:

```css
.active {
  color: green;
}
```

You'll need to manually refresh the browser since Webpack isn't building
our `index.html`.

## Nav Link Wrappers

Most links in your site don't need to know they are active, usually just
primary navigation links need to know. It's useful to wrap those so you
don't have to remember what your `activeClassName` or `activeStyle` is
everywhere.

We will use a spread operator here, the three dots. It clones our props
and in this use case it clones `activeClassName` to our desired component for
us to benefit from.

Create a new file at `modules/NavLink.js` that looks like this:

```js
// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
```

Now you can go change your links to `NavLink`s.

```js
// modules/App.js
import NavLink from './NavLink'

// ...

<li><NavLink to="/about">About</NavLink></li>
<li><NavLink to="/repos">Repos</NavLink></li>
```

Oh, how beautiful upon the renders is the composability of components.


### [Next: Params](../06-params/)

---


# 激活的链接

一个`Link` 和 `a` 的差别就是,如果Link的路径是当前地址栏里的路径(激活的路径),你可以让这个被激活的Link的样式不同。


## 激活样式
让我们看看带有激活样式了之后会怎样,我们在 `Link` 里面添加 `activeStyle` 属性。

```js
// modules/App.js
<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
<li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
```

现在你可以发现你的导航里,被激活的Link是红色的。

## 激活的classname
你也可以用classname代替style的写法,作为激活样式的样式。

```js
// modules/App.js
<li><Link to="/about" activeClassName="active">About</Link></li>
<li><Link to="/repos" activeClassName="active">Repos</Link></li>
```

我们暂时还没有给页面加入样式,你可以在页面中通过link标签来引入样式。

```html
// index.html
<link rel="stylesheet" href="index.css" />
```

在CSS文件中写一些样式:

```css
.active {
  color: green;
}
```

你需要手动刷新浏览器,因为Webpack还没有构建我们的`index.html`页面。

## 导航Link的封装

你的很多link大部分都不需要知道他们是否被激活了,只有主要的导航link需要知道。
所以很有必要对你的link进行封装。这样你就不会需要一直去关注你在哪里需要`activeClassName` 或者 `activeStyle` 了。

我们将会在这里使用一个解构的形式,也就是三个点。这样可以把我们的props解构传入,然后把`activeClassName` 复制到每个你想要用到的组件中去。

我们创建一个新文件, `modules/NavLink.js` ,如下:

```js
// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
```

然后我们把我们原来写link的地方改成`NavLink`了:

```js
// modules/App.js
import NavLink from './NavLink'

// ...

<li><NavLink to="/about">About</NavLink></li>
<li><NavLink to="/repos">Repos</NavLink></li>
```

现在,我们就能比较优雅地把组件都组装起来了。

### [下一课: 参数](../06-params/)





