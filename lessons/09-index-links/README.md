# Index Links

Have you noticed in our app that we don't have any navigation to get
back to rendering the `Home` component?

Lets add a link to `/` and see what happens:

```js
// in App.js
// ...
<li><NavLink to="/">Home</NavLink></li>
// ...
```

Now navigate around. Notice anything weird? The link to `Home` is always
active! As we learned earlier, parent routes are active when child routes
are active. Unfortunately, `/` is the parent of everything.

For this link, we want it to only be active when the index route is
active. There are two ways to let the router know you're linking to the
"index route" so it only adds the active class (or styles) when the
index route is rendered.

## IndexLink

First let's use the `IndexLink` instead of `NavLink`

```js
// App.js
import { IndexLink } from 'react-router'

// ...
<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
```

Fixed! Now this link is only "active" when we're at the index route. Go
ahead and click around to see.

## `onlyActiveOnIndex` Property

We can use `Link` as well by passing it the `onlyActiveOnIndex` prop
(`IndexLink` just wraps `Link` with this property for convenience).

```js
<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
```

That's fine, but we already abstracted away having to know what the
`activeClassName` is with `Nav`.

Remember, in `NavLink` we're passing along all of our props to `Link` with
the `{...spread}` syntax, so we can actually add the prop when we render
a `NavLink` and it will make its way down to the `Link`:

```js
<li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
```

### [Next: Clean URLs](../10-clean-urls/)

---
# 默认链接
你是否注意到,在你的应用中,没有任何一个导航可以让你的页面跳转到 `Home` 组件渲染的部分?

现在让我们添加一个 `/` 的链接,看看会发生什么:

```js
// in App.js
// ...
<li><NavLink to="/">Home</NavLink></li>
// ...
```

现在再点击导航试试,发生了什么不可思议的事? 这个能跳转到 `Home` 的链接总是被激活。回想我们之前学习的内容,当子路由有一个是被激活的,父路由总是会被激活的。不巧的是,`/` 是所有路由的父路由。

其实对于这种链接,我们只想在首页的默认路由被激活的时候,才激活链接。这里两种办法可以让路由知道你目前的链接是链到了"默认路由",所以你只需要在知道了"默认路由"被渲染的时候,再给链接加上激活样式就好了。

## IndexLink
第一步,让我们用 `IndexLink` 来代替 `NavLink`。

```js
// App.js
import { IndexLink } from 'react-router'

// ...
<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
```

ok,解决。现在我们的链接只有在"默认路由"被渲染出来之后才会显示成激活。继续点击其他链接看看。

## `onlyActiveOnIndex` 属性

我们依然还可以使用 `Link`, 但是需要给它加一个属性 `onlyActiveOnIndex`。`IndexLink` 就相当于是为了方便, 给带有 `onlyActiveOnIndex` 属性的 `Link` 封装了一层后的结果。

```js
<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
```

这样也可以,但是我们已经把激活样式抽离出来了,把这个激活样式放在了 `Nav` 组件中。

记得,在 `NavLink` 中,我们用 `{...spread}` 的语法形式向 `Link` 中传递所有我们需要的props。所以我们也可以向我们渲染的 `NavLink` 中添加props,然后让他传递到 `Link` 中去。

```js
<li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
```

### [下一课: 清理URL](../10-clean-urls/)
