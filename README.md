# query-components

@amoy/query 插件，用于连接 @amoy/components，使 query 可以以 模板 + 样式 的形式进行界面的构建；

## 使用姿势:

```js
import query from "@amoy/query"
import QueryComponents, { style } from "@amoy/query-components"

const game = new PIXI.Application()
document.body.appendChild(game.view)

const $ = query(game.stage)

style('container', `
    width: 100%; 
    height: 50%;
    center-x: 10px; 
    center-y: 30%; 
    border-width: 2;
`)

style({
    sprite: `
        width: 250px; 
        height: 250; 
        left: 30%; 
        top: 30;
        text-align: center;
        font-size: 50px;
    `,
    rect: `
        width: 250px; 
        height: 250; 
        right: 30; 
        top: 30; 
        background-color: red; 
        border-width: 3; 
        border-radius: 50;
    `,
})

PIXI.Loader.shared.add('rect', rect).load((loader, resources) => {
	$(`
		<container className="container">
	        <sprite className="sprite" src="rect">精灵图</sprite>
	        <rect className="rect" />
	        <circle className="circle" />
	        <text className="text">这是一段测试文字文字文字，它会自动换行哦~</text>
	    </container>
	`).appendTo(game.stage)
})
```

## 拓展方法

- `$el.appendTo(container)`
    - 添加元素到 container 容器中；

- `$el.append(child)`
    - 添加 child 元素；

- `$el.insertBefore(sibling)`
    - 添加到 sibling 元素的前方；

- `$el.insertAfter(sibling)`
    - 添加到 sibling 元素的后方；

- `$el.before(sibling)`
    - 在自身前方添加 sibling 元素；

- `$el.after(sibling)`
    - 在自身后方添加 sibling 元素；

- `$el.remove()`
    - 删除自身；

- `$el.removeChild(child)`
    - 删除 child 子元素；

- `$el.update(style)`
    - 更新元素布局；