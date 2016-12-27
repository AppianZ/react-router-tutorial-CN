# Nested Routes

The navigation we added to `App` should probably be present on every
screen. Without React Router, we could wrap that `ul` into a
component, say `Nav`, and render a `Nav` on every one of our screens.

This approach isn't as clean as the application grows. React Router
provides another way to share UI like this with nested routes, a trick
it learned from [Ember](http://emberjs.com) (/me tips hat).

## Nested UI and Nested URLs

Have you ever noticed your app is just a series of boxes inside boxes
inside boxes? Have you also noticed your URLs tend to be coupled to that
nesting? For example given this url, `/repos/123`, our
components would probably look like this:

```js
<App>       {/*  /          */}
  <Repos>   {/*  /repos     */}
    <Repo/> {/*  /repos/123 */}
  </Repos>
</App>
```

And our UI something like:

```
         +-------------------------------------+
         | Home Repos About                    | <- App
         +------+------------------------------+
         |      |                              |
Repos -> | repo |  Repo 1                      |
         |      |                              |
         | repo |  Boxes inside boxes          |
         |      |  inside boxes ...            | <- Repo
         | repo |                              |
         |      |                              |
         | repo |                              |
         |      |                              |
         +------+------------------------------+
```

React Router embraces this by letting you nest your routes, which
automatically becomes nested UI.

## Sharing Our Navigation

Let's nest our `About` and `Repos` components inside of `App` so that we
can share the navigation with all screens in the app. We do it in two
steps:

First, let the `App` `Route` have children, and move the other routes
underneath it.

```js
// index.js
// ...
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

Next, render children inside of `App`.

```js
// modules/App.js
// ...
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
// ...
```

Alright, now go click the links and notice that the `App` component
continues to render while the child route's component gets swapped
around as `this.props.children` :)

React Router is constructing your UI like this:

```js
// at /about
<App>
  <About/>
</App>

// at /repos
<App>
  <Repos/>
</App>
```

## By Small and Simple Things are Great Things Brought to Pass

The best way to build large things is to stitch small things together.

This is the real power of React Router, every route can be developed
(even rendered!) as an independent application. Your route configuration
stitches all these apps together however you'd like.  Applications
inside of Applications, boxes inside of boxes.

What happens if you move the `About` route outside of `App`?

Okay, now put it back.



### [Next: Active Links](../05-active-links/)

---

# 路由嵌套

这个 `App` 导航应该在每一个需要被用到的页面引入。如果没有React Router,我们需要把 `ul` 包裹进每一个组件中去,可能是 `Nav` 组件,或者是渲染一个 `Nav` 组件到每一屏中去。

这个方式会随着项目的增长越来越累。React Router提供了另一种方式,用路由嵌套的方式来解决这种问题。就像[Ember](http://emberjs.com)一样(个人观点)。

## 嵌套的结构和URL

你是否注意到你的应用,实际上是一系列的盒子互相嵌套? 你是否注意到,你的路由也是和这些盒子视图有一样的嵌套逻辑? 

比如,当你想要跳转到一个url, `/repos/123`,的时候,你的组件可能是这样构造的:

```js
<App>       {/*  /          */}
  <Repos>   {/*  /repos     */}
    <Repo/> {/*  /repos/123 */}
  </Repos>
</App>
```

然后你的页面UI可能是这样的:

```
         +-------------------------------------+
         | Home Repos About                    | <- App
         +------+------------------------------+
         |      |                              |
Repos -> | repo |  Repo 1                      |
         |      |                              |
         | repo |  Boxes inside boxes          |
         |      |  inside boxes ...            | <- Repo
         | repo |                              |
         |      |                              |
         | repo |                              |
         |      |                              |
         +------+------------------------------+
```

React Router希望能够通过这样嵌套路由的方式,让页面显示也能够自动嵌套。

## 导航共享
把我们的`About` 和 `Repos` 组件嵌套到 `App`,为了让我们能够在应用的所有页面中都共享这个导航。所以我们做了以下两步:

第一步,让`App` 和 `Route` 改成可以添加子组件的形式,并把其他路由移到App的Route里面作为他的子组件。

```js
// index.js
// ...
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

第二步,在`App`的地方,渲染子组件。

```js
// modules/App.js
// ...
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
// ...
```

好了完成,现在点击跳转链接,可以注意到`App`组件仍然被渲染成路由本身的子组件,就像`this.props.children` 一样:)

React Router是想把页面渲染成像下面这样的:

```js
// at /about
<App>
  <About/>
</App>

// at /repos
<App>
  <Repos/>
</App>
```

## 每件大事都是简单小事的集合
干大事的最好的方式是把所有小事拼接在一起。

这就是React Router所致力于的事。每个路由组件都是可以被开发成一个独立的应用。只要你喜欢,你就可以把你想要的路由组装到你的应用中来。

应用包裹着应用,盒子包裹着盒子。

如果你想要把 `About` 组件移除出 `App` 会怎样呢?

好,我们回到正题。

### [下一课: 激活的Links](../05-active-links/)



