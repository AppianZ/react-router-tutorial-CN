# Server Rendering

Alright, first things first. Server rendering, at its core is a simple
concept in React.

```js
render(<App/>, domNode)
// can be rendered on the server as
const markup = renderToString(<App/>)
```

It's not rocket science, but it also isn't trivial. First I'm going to
just throw a bunch of webpack shenanigans at you with little
explanation, then we'll talk about the Router.

Since node doesn't (and shouldn't) understand JSX, we need to compile
the code somehow. Using something like `babel/register` is not fit for
production use, so we'll use webpack to build a server bundle, just like
we use it to build a client bundle.

Make a new file called `webpack.server.config.js` and put this stuff in
there:

```js
var fs = require('fs')
var path = require('path')

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
```

Hopefully some of that makes sense, we aren't going to cover what all of
that stuff does, it's sufficient to say that now we can run our
`server.js` file through webpack and then run it.

Now we need to make some scripts to build server bundle before we try to
run our app.  Update your `package.json` script config to look like
this:

```
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base public/ --history-api-fallback",
  "start:prod": "npm run build && node server.bundle.js",
  "build:client": "webpack",
  "build:server": "webpack --config webpack.server.config.js",
  "build": "npm run build:client && npm run build:server"
},
```

Now when we run `NODE_ENV=production npm start` both the client and
server bundles get created by Webpack.

Okay, let's talk about the Router. We're going to need our routes split
out into a module so that both the client and server entries can require
it. Make a file at `modules/routes` and move your routes and components
into it.

```js
// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
)
```

```js
// index.js
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import routes and pass them into <Router/>
import routes from './modules/routes'

render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
)
```

Now open up `server.js`. We're going to bring in two modules from React
Router to help us render on the server.

If we tried to render a `<Router/>` on the server like we do in the
client, we'd get an empty screen since server rendering is synchronous
and route matching is asynchronous.

Also, most apps will want to use the router to help them load data, so
asynchronous routes or not, you'll want to know what screens are going
to render before you actually render so you can use that information to
load asynchronous data before rendering. We don't have any data loading
in this app, but you'll see where it could happen.

First we import `match` and `RouterContext` from react router, then
we'll match the routes to the url, and finally render.

```js
// ...
// import some new stuff
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

// ...

// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

And that's it. Now if you run `NODE_ENV=production npm start` and visit
the app, you can view source and see that the server is sending down our
app to the browser. As you click around, you'll notice the client app
has taken over and doesn't make requests to the server for UI. Pretty
cool yeah?!


Our callback to match is a little naive, here's what a production
version would look like:

```js
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
})
```

Server rendering is really new. There aren't really "best practices"
yet, especially when it comes to data loading, so this tutorial is done,
dropping you off at the bleeding edge.

### [Next: What's Next?](../14-whats-next/)

---


# 服务端渲染

好吧,万事之首,服务端渲染,这也是React一个简单的核心的概念。

```js
render(<App/>, domNode)
// 可以在服务端中被渲染成
const markup = renderToString(<App/>)
```

虽然它不是火箭科学家,但是它也很重要。首先,我将不会做任何解释的对你抛出一大段webpack的配置。然后再讨论Router。

因为node不能(并且不需要去)理解JSX,所以我们需要编译这些代码,使用一些工具,比如 `babel/register` ,但是这并不适合生产环境使用,所以我们使用webpack来构建一个服务包,就像我们使用它来给客户端构建一个包一样。

现在创建一个新的文件,叫 `webpack.server.config.js`, 内容如下:


```js
var fs = require('fs')
var path = require('path')

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
```

这样有些场景就说得通了,我们不需要去覆盖这些包裹的结果,这些配置已经足够了,所以我们已经可以配合webpack运行我们的 `server.js` 了。

现在,在我们运行我们的应用之前,我们需要一些脚本去构建我们的服务。更新 `package.json` 中的脚本,如下:

```
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base public/ --history-api-fallback",
  "start:prod": "npm run build && node server.bundle.js",
  "build:client": "webpack",
  "build:server": "webpack --config webpack.server.config.js",
  "build": "npm run build:client && npm run build:server"
},
```

现在,我们可以运行 `NODE_ENV=production npm start`, Webpack会帮我们打包好服务端和客户端的包。

ok,现在我们来讨论Router。我们需要把我们的路由打包到一个模块中去,为了能够让客户端和服务端都能引入它。在 `modules/routes` 下创建一个文件,然后把你的路由和组件移植过去。

```js
// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
)
```

```js
// index.js
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import routes and pass them into <Router/>
import routes from './modules/routes'

render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
)
```

现在打开 `server.js`,我们将会从React Router中引入两个包来帮助我们的服务端渲染。

如果我们尝试像用户端渲染一个 `<Router/>` 在服务端,我们将会得到一个空白的网页,因为服务端渲染是同步的,而路由匹配是异步的。

因此,大多数应用都会想要利用路由去加载数据。所以无论路由是异步的或者其他什么,你都应该在渲染之前就知道哪一屏将会被渲染出来,这样你就可以在渲染之前利用这些信息去异步加载数据。我们现在的这个应用中暂时不需要任何的数据记载,但是我们可以看看它会在哪里发生。

首先,我们从react router中引入 `match` 和 `RouterContext`, 然后我们将会根据路由匹配到请求的url,然后最后渲染页面。


```js
// ...
// import 一些新的包
import React from 'react'
// 我们可以利用 renderToString 把我们的页面渲染成html字符串
import { renderToString } from 'react-dom/server'
// match 和 RouterContext 能够根据url匹配到路由,然后渲染
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

// ...

// 把所有请求都发送到 index.html 为了 browserHistory 能够生效

app.get('*', (req, res) => {
  // 匹配url对应的路由
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` 代表着要被渲染的 `Router` . `Router` 把
    // `props` 作为 `browserHistory` 的状态传递下去。但是这个应用的服务端
    // 是不知道状态是如何的, 所以我们需要在渲染前就使用 `match` 获得props
    const appHtml = renderToString(<RouterContext {...props}/>)

    // 有很多种方式可以把html放在一个模板里, 但是React Router
    // 只需要用一个很简单的函数 `renderPage` 就可以了
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

现在,如果你运行 `NODE_ENV=production npm start` ,然后打开应用,你会看到源文件,看到服务端已经把我们的应用发送到浏览器上了。我们点击一下页面,你会发现客户端的页面已经被渲染过了,所以不需要再向服务端请求页面了。是不是很棒?

我们的回调现在还比较简陋,这里有一个成品版本,如下:

```js
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // 在这里我们可以先做一个判断
    if (err) {
      // 路由匹配过程中报错处理
      res.status(500).send(err.message)
    } else if (redirect) {
      // 我们还没有讨论过路由的 `onEnter` , 但是当一个路由entered的时候,
      // 这个路由可以被重定向。在这里我们可以限制服务。
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // 我们获得了props,然后我们就可以匹配路由,然后渲染。
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      // 没有错误,也没有重定向,也没有匹配到任何东西的时候404
      res.status(404).send('Not Found')
    }
  })
})
```

服务端渲染还是很新的。这还不是"最佳实践",特别是它的数据加载部分并不是特别完善,所以这个教程只不过是你以后实践的垫脚石。

### [下一课: 接下来搞点啥?](../14-whats-next/)
