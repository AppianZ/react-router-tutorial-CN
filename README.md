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


