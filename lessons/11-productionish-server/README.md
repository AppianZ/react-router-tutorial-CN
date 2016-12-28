# Production-ish Server

None of this has anything to do with React Router, but since we're
talking about web servers, we might as well take it one step closer to
the real-world. We'll also need it for server rendering in the next
section.

Webpack dev server is not a production server. Let's make a production
server and a little environment-aware script to boot up the right server
depending on the environment.

Let's install a couple modules:

```
npm install express if-env compression --save
```

First, we'll use the handy `if-env` in `package.json`.  Update your
scripts entry in package.json to look like this:

```json
// package.json
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base . --history-api-fallback",
  "start:prod": "webpack && node server.js"
},
```

In the root directly, go open up `webpack.config.js` and add the publicPath '/' as per below:
```
// webpack.config.js
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
```

When you run `npm start` it checks if the value of our `NODE_ENV` environment variable is
`production`. If yes, it runs `npm run start:prod`, if not, it runs
`npm run start:dev`.

Now we're ready to create a production server with Express and add a new file at root dir. Here's a
first attempt:

```js
// server.js
var express = require('express')
var path = require('path')

var app = express()

// serve our static stuff like index.css
app.use(express.static(__dirname))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

Now run:

```sh
NODE_ENV=production npm start
# For Windows users:
# SET "NODE_ENV=production" && npm start
```

Congratulations! You now have a production server for this app. After
clicking around, try navigating to [http://localhost:8080/package.json](http://localhost:8080/package.json).
Whoops.  Let's fix that. We're going to shuffle around a couple files and
update some paths scattered across the app.

1. make a `public` directory.
2. Move `index.html` and `index.css` into it.

Now let's update `server.js` to point to the right directory for static
assets:

```js
// server.js
// ...
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))

// ...
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

We also need to tell webpack to build to this new directory:

```js
// webpack.config.js
// ...
output: {
  path: 'public',
  // ...
}
```

And finally (!) add it to the `--content-base` argument to `npm run start:dev` script:

```json
"start:dev": "webpack-dev-server --inline --content-base public --history-api-fallback",
```

If we had the time in this tutorial, we could use the `WebpackDevServer`
API in a JavaScript file instead of the CLI in an npm script and then
turn this path into config shared across all of these files. But, we're
already on a tangent, so that will have to wait for another time.

Okay, now that we aren't serving up the root of our project as public
files, let's add some code minification to Webpack and gzipping to
express.

```js
// webpack.config.js

// make sure to import this
var webpack = require('webpack')

module.exports = {
  // ...

  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  // ...
}
```

And compression in express:

```js
// server.js
// ...
var compression = require('compression')

var app = express()
// must be first!
app.use(compression())
```

Now go start your server in production mode:

```
NODE_ENV=production npm start
```

You'll see some UglifyJS logging and then in the browser, you can see
the assets are being served with gzip compression.

### [Next: Navigating](../12-navigating/)

---

# 生产环境下的服务

这个部分不会讲React Router的问题,因为我们要在这节讨论服务器的问题。我们可能会更进一步的了解内部原理。我们在下一阶段也会需要了解服务端渲染。

Webpack dev server不是一个生产环境的服务器。让我们构造一个生产服务器,并且让我们写一个脚本,让我们能够根据不同的开发环境启动对应的服务。

先让我们安装一些依赖包:

```
npm install express if-env compression --save
```

首先,我们将会在 `package.json` 里用 `if-env` 来启动脚本。更新你的脚本,如下:

```json
// package.json
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base . --history-api-fallback",
  "start:prod": "webpack && node server.js"
},
```

在这个教程的目录下打开 `webpack.config.js` 然后添加 publicPath 的配置。

```
// webpack.config.js
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
```

当你执行 `npm start` 的时候,它能够获得 `NODE_ENV` 的值。通过判断值,是否是 `production` ,如果是,则运行 `npm run start:prod`,如果不是,则运行 `npm run start:dev`。

现在我们开始用Express创建一个生产服务器,然后在根目录上添加一个新的文件,如下:

```js
// server.js
var express = require('express')
var path = require('path')

var app = express()

// serve our static stuff like index.css
app.use(express.static(__dirname))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

现在在命令行中运行:

```sh
NODE_ENV=production npm start
# For Windows users:
# SET "NODE_ENV=production" && npm start
```

恭喜,现在你的应用已经有生产环境的服务器了。尝试着把链接跳转到 [http://localhost:8080/package.json](http://localhost:8080/package.json)看看。

哎,让我们来解决这个问题,我们需要调整一些文件,然后把他们分发到应用的其他地方,并且更新路径配置。

1. 创建一个 `public` 目录
2. 把 `index.html` 和 `index.css` 放进去

现在我们需要更新 `server.js` ,让他能够指向正确的静态目录:

```js
// server.js
// ...
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))

// ...
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

我们也需要告诉webpack如何去构建这样的一个新目录。

```js
// webpack.config.js
// ...
output: {
  path: 'public',
  // ...
}
```

并且最后!,需要在 `npm run start:dev` 的指令中增加一个配置 `--content-base` ,如下:

```json
"start:dev": "webpack-dev-server --inline --content-base public --history-api-fallback",
```

如果我们有时间,我们可以使用 `WebpackDevServer` 这个API代替npm的脚手架,然后把这些路径配置共享到所有文件中。但是我们现有的配置已经能够满足配置了,所以这个配置就等下次吧

ok,现在我们还不能运行我们public下的文件,所以让我们添加一点代码到Webpack中:

```js
// webpack.config.js

// make sure to import this
var webpack = require('webpack')

module.exports = {
  // ...
  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  // ...
}
```

然后在express中压缩压缩:

```js
// server.js
// ...
var compression = require('compression')

var app = express()
// must be first!
app.use(compression())
```

现在启动你的生产环境下的服务:

```
NODE_ENV=production npm start
```

你将会在浏览器中看到UglifyJS被使用,并且你也可以看到静态资源文件都被服务压缩了。


### [下一课: 导航](../12-navigating/)
