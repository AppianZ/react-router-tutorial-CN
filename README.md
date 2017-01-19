React Router Tutorial
=====================

Quick lessons for getting up-to-speed with React Router.

See [Lesson 1 - Setting Up](/lessons/01-setting-up/) to get started.

Each lesson is a fully runnable app with all code from the previous lesson, so you can `cd lessons/<lesson-folder>`, npm install,
and then run the appropriate NPM scripts for each lesson from within the lesson folder.

Missing stuff that will come eventually, hopefully ... maybe.

1. an app that isn't completely pointless
- egghead.io videos
- code splitting
- location state
- data integration


---

##  React Router官方教程
这是一个React-Router快速入门教程。

从 [第一课 - 安装](/lessons/01-setting-up/)开始我们的学习。

每一课都会带有一个完整的可运行的例子,你可以`cd lessons/<lesson-folder>`, 执行`npm i`, 然后就能够在每个课程的文件夹下, 运行适当的npm指令, 就可以运行课程内容了。


---
> 接下来讲讲自己开发小demo的感觉

# 路由匹配的原则
## 路径语法
* :paramName – 匹配一段位于 /、? 或 # 之后的 URL。 命中的部分将被作为一个参数
* () – 在它内部的内容被认为是可选的
* \* – 匹配任意字符（非贪婪的）直到命中下一个字符或者整个 URL 的末尾，并创建一个 splat 参数

```js
<Route path="/hello/:name">         // 匹配 /hello/zhang 和 /hello/huang
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/zhang 和 /hello/huang
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
```

如果一个路由使用了`相对路径`，那么完整的路径将由它的`所有祖先节点的路径`和`自身指定的相对路径`拼接而成。使用`绝对路径`可以使路由匹配行为忽略嵌套关系。

## Histories
>  主要类型有: `browserHistory` \ `hashHistory` \  `createMemoryHistory`

|类型名称|解释|
|:---:|---|
|browserHistory|Browser history 是使用 React Router 的应用推荐的 history。它使用浏览器中的 History API 用于处理 URL，创建一个像example.com/some/path这样真实的 URL 。|
|hashHistory|Hash history 使用 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由。|
|createMemoryHistory|Memory history 不会在地址栏被操作或读取。这就解释了我们是如何实现服务器渲染的，而且测试方便。const history = createMemoryHistory(location) |

## IndexRoute 
* 进入页面时默认的路由的设置IndexRoute
```js
<Router history={browserHistory}>
		<Route path="/" component={Tab}>
			<IndexRoute component={pageA}/>
			<Route path="/pageb" component={pageB}/>
			<Route path="/pagec" component={pageC}>
				<Route path="/pagec/:username/:nickname" component={pageD}/>
			</Route>
		</Route>
	</Router>
```

## IndexLink
* / 的链接对应的默认链接IndexLink
默认链接如果你在这个 app 中使用 `<Link to="/">Home</Link> ` , 它会一直处于激活状态，因为所有的 URL 的开头都是 / 。 

如果指向 / 的链接只激活home，请使用 `<IndexLink to="/">Home</IndexLink>`，也可以像底下这样写。

```js
<Link key={`tab-${idx}`} to={`${obj.path}`}
				  activeClassName="on"
				  onlyActiveOnIndex={true} // points
				  className="tab">{obj.name}</Link>
```

## 用对象的方式替换配置
```js
const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'about', component: About },
      { path: 'inbox',
        component: Inbox,
        childRoutes: [
          { path: '/messages/:id', component: Message },
          { path: 'messages/:id',
            onEnter: function (nextState, replaceState) {
              replaceState(null, '/messages/' + nextState.params.id)
            }
          }
        ]
      }
    ]
  }
]

React.render(<Router routes={routeConfig} />, document.body)
```

## 动态路由
* 我们所希望的一定是“代码分拆” ，按需加载。路由配置好每个 view，就是一种代码分拆。
* React Router的路由配置都是异步完成，不仅允许延迟加载组件，并且延迟加载配置。
* 路由配置是一种“逐渐匹配”的过程，根据URL一级级向下匹配对应的组件和配置。
* Route 可以定义 `getChildRoutes`，`getIndexRoute` 和 `getComponents`  这几个函数.

## 跳转前确认
* `routerWillLeave 生命周期钩子`，这使得 React 组件可以拦截正在发生的跳转，或在离开 route 前提示用户。

> routerWillLeave 返回值有以下两种：

> 1. return false 取消此次跳转

> 2. return 返回提示信息，在离开 route 前提示用户进行确认。

```js
import { Lifecycle } from 'react-router';
const Home = React.createClass({
 //在路由中需要利用mixins Lifecycle来获取routerWillLeave
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation) {},
})
```


## 服务端渲染
```js
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import routes from './routes'

serve((req, res) => {
  //  使用 match 在渲染之前根据 location 匹配 route
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.send(500, error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
    // 使用 RoutingContext 同步渲染 route 组件 , 或另外去请求数据
      res.send(200, renderToString(<RoutingContext {...renderProps} />))
    } else {
      res.send(404, 'Not found')
    }
  })
})
```

## 组件生命周期
|hookname|function|
|:---:|---|
|componentDidMount|根据路由，组件挂载完成|
|componentWillUnmount|路由切换，原组件即将卸载|
|componentWillReceiveProps|路由参数变动，组件有更新，会接收到新的props|
|componentDidUpdate|接收到新的props，会触发组件更新|

```js
// 特别注意componentDidUpdate这个钩子，有一个默认参数，就是prevProps
componentDidUpdate (prevProps) {
    let oldId = prevProps.params.invoiceId // 通过参数更新数据
    let newId = this.props.params.invoiceId
    if (newId !== oldId){ ....一些操作 }
  },
// 特别注意componentWillReceiveProps这个钩子，有一个默认参数，就是nextProps
componentWillReceiveProps(nextProps) {
    const routeChanged = nextProps.location !== this.props.location
    console.log(routeChanged);
  }
```

## src下的小Demo
### 页面演示
1.首次进入的首页。默认页面,一个简易的todoList
![](https://ohovav7hg.qnssl.com/react_router1.png)

2.进入pageB。带有axios请求的搜索github用户的列表
![](https://ohovav7hg.qnssl.com/reacr_router2.png)

3.进入pageC。演示一个嵌套路由的例子
![](https://ohovav7hg.qnssl.com/reacr_router3.png)

4.点击那个链接(带有两个参数nickname,username),注意路由
![](https://ohovav7hg.qnssl.com/reacr_router4.png)

### webpack 配置
项目使用框架版本主要有 `react(15.4.1)` + `react-dom(15.4.1)` +  `react-router(3.0.0)`  + `webpack(1.13.3) ` + `axios(0.15.3)` + `node(6.2.2)`, 配置和之前react的教程没有太大差别，详情可见[教程的github地址：Close2React](https://github.com/AppianZ/Close2React)

### index.js
```javascript
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
// react-router可能会使用的包
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// 引入所有组件
import Tab from './tab';
import pageA from './page_a';
import pageB from './page_b';
import pageC from './page_c';
import pageD from './page_d';
 
const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
	<Router history={hashHistory}>
	    // 根组件，引入tab
		<Route path="/" component={Tab}>
		      // 默认路由是pageA
			<IndexRoute component={pageA}/>
			// 匹配"/pageb"的路由pageB
			<Route path="/pageb" component={pageB}/>
			// 匹配"/pagec"的路由pageC
			<Route path="/pagec" component={pageC}>
			     // 匹配"/pagec/:username/:nickname"的带参数的嵌套路由pageD
				<Route path="/pagec/:username/:nickname" component={pageD}/>
			</Route>
		</Route>
	</Router>
	, app);
```

### tab.js
```javascript
initSpan(obj, idx){
		return(
			<span className="tab" key={idx}>
				<Link to={`${obj.path}`} activeClassName="on">{obj.name}</Link>
			</span>
		)
	},
	
	render() {
		return (
			<div id="content">
				<div id="navBox">
					<span className="tab">
				         // 默认激活链接
						<IndexLink to="/" activeClassName="on">pageA</IndexLink>
					</span>
					<span className="tab">
						<Link to="/pageb" activeClassName="on">pageB</Link>
					</span>
					<span className="tab">
						<Link to="/pagec" activeClassName="on">pageC</Link>
					</span>
				</div>
				// 渲染子组件
				{this.props.children}
			</div>
		)
	}
```


