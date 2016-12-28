# Clean URLs with Browser History

The URLs in our app right now are built on a hack: the hash. It's the
default because it will always work, but there's a better way.

Modern browsers let JavaScript manipulate the URL without making an http
request, so we don't need to rely on the hash (`#`) portion of the url
to do routing, but there's a catch (we'll get to it later).

## Configuring Browser History

Open up `index.js` and import `browserHistory` instead of `hashHistory`.

```js
// index.js
// ...
// bring in `browserHistory` instead of `hashHistory`
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
    {/* ... */}
  </Router>
), document.getElementById('app'))
```

Now go click around and admire your clean URLs.

Oh yeah, the catch. Click on a link and then refresh your browser. What
happens?

```
Cannot GET /repos
```

## Configuring Your Server

Your server needs to deliver your app no matter what URL comes in,
because your app, in the browser, is manipulating the URL. Our current
server doesn't know how to handle the URL.

The Webpack Dev Server has an option to enable this. Open up
`package.json` and add `--history-api-fallback`.

```json
    "start": "webpack-dev-server --inline --content-base . --history-api-fallback"
```

We also need to change our relative paths to absolute paths in
`index.html` since the URLs will be at deep paths and the app, if it
starts at a deep path, won't be able to find the files.

```html
<!-- index.html -->
<!-- index.css -> /index.css -->
<link rel="stylesheet" href="/index.css">

<!-- bundle.js -> /bundle.js -->
<script src="/bundle.js"></script>
```

Stop your server if it's running, then `npm start` again. Look at those
clean URLs :)

### [Next: Production-ish Server](../11-productionish-server/)

---

# 利用Browser History清理URL

在我们的应用中的URL,现在是用hash构造的。它是默认的,因为它总是默默的工作生效,但是这里有一个更好的方式。

现代的浏览器能够利用js,不用任何http请求就修改地址栏的url。所以我们其实也不需要利用hash来使路由生效,我们一会将会介绍另一种方法。

## 配置Browser History

打开 `index.js`。引入 `browserHistory`, 就不用引入 `hashHistory`了.

```js
// index.js
// ...
// 用 `browserHistory` 替代 `hashHistory`
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
    {/* ... */}
  </Router>
), document.getElementById('app'))
```

现在回到浏览器中看看,你就发现你的URL已经被清理了。

然后点击一个链接之后,刷新浏览器,你会发现...

```
Cannot GET /repos
```

# 配置你的服务

无论你的URL变成了什么,你的服务都需要接收你的应用,因为你的应用是在浏览器中的,是一个被操作的URL。我们当前的服务不会如何处理URL。

Webpack Dev Server有一个参数可以处理这个。打开`package.json` 然后添加参数 `--history-api-fallback`.

```json
    "start": "webpack-dev-server --inline --content-base . --history-api-fallback"
```

我们也需要把 `index.html` 的相对路径改成绝对路径。因为URL可能会出现在更深的路径中,如果应用是在一个更深的路径中被运行的话,将会找不到文件。

```html
<!-- index.html -->
<!-- index.css -> /index.css -->
<link rel="stylesheet" href="/index.css">

<!-- bundle.js -> /bundle.js -->
<script src="/bundle.js"></script>
```

利用 `npm start` 重启你的服务,然后再看看URL的变化吧 :)

### [下一课: 生产环境的服务](../11-productionish-server/)
