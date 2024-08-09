# nextjs App Router最佳实践

### 说明

本项目是一个`NextJs App Router`的学习笔记和实践源码，涉及的知识点，对应源码都会有对应的实践，也是快速上手`NextJs app Router`开发模式的一个过程。

# 标签

`App router` `平行路由` `路由组` `拦截路由` `Server Component` `Client Component` `ssg` `isr` `antd`

## 说明

基于next@14.2.5版本，使用app router模式的服务端渲染应用开发实践，结合antd的开发实践，如何合理划分Server Component 和 Client Component的实践心得...

## 创建流程

### next-cli

```js
pnpm create next-app@latest

or

npx create-next-app@latest
```

## Turbopack实践

### 开发环境开启

## 最佳目录结构实践

业务全局的内容，比如封装的功能组件、样式和通用方法目录划分，以及跟app目录同级。app目录还是主管路由页面、布局嵌套等，如果是单个页面特殊的内容比如抽离的组件或者是样式等可以存放在页面相关的目录里面。

```js
my-nextjs-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ...
├── public/
│   ├── images/
│   ├── ...
├── styles/
│   ├── globals.css
│   ├── ...
├── utils/
│   ├── helpers.ts
│   ├── ...
├── package.json
├── tsconfig.json
└── ...
```

## 命名实践

### 文件和目录命名

采用`kebab-case`短横线命名法

### 组件命名

采用`PascalCase`帕斯卡命名法、大驼峰命名法

## app router实践

### layout实践 ✅

### template实践 ✅

template最大作用就是它包裹的路由页面相互切换的时候路由页面组件会重新创建实例，不会维持状态，可以用于记录页面访问次数
模板在路由切换时会为每一个 children 创建一个实例。这就意味着当用户在共享一个模板的路由间跳转的时候，将会重新挂载组件实例，重新创建 DOM 元素，不保留状态

### 定义加载界面（Loading UI）✅

#### 说明

我们可以给相关路由页面提供一个共享布局Layout、template，同样的我们也可以非常轻松地给给路由页面提供加载ui，加载页面组件之前会先显示这个ui比如骨架屏效果

#### 实现原理

要使用加载ui，页面组件本身必须是一个异步组件，异步组件加载需要一定耗时，nextjs内部通过react提供的Suspense组件对异步组件的加载处理实现加载ui的展示以及页面组件加载成功后正确展示。

### error错误界面ui实践✅

#### 说明

定义一个error.tsx，界面运行出错的时候，会展示这个ui，一般我们可以将它定义在app.tsx，这样任意根布局页面下的错误都可以被捕获和展示这个ui

#### global-error.tsx

到了顶层，就比如根布局中的错误如何捕获呢？为了解决这个问题，Next.js 提供了 global-error.js文件，使用它时，需要将其放在 app 目录下
global-error.js会包裹整个应用，而且当它触发的时候，它会替换掉根布局的内容。所以，global-error.js 中也要定义 <html> 和 <body> 标签。

global-error.js示例代码如下：

```tsx
'use client'
// app/global-error.js
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

```

### 404页面实践✅

#### 说明

> 这个应用有一个统一的404页即可，也就是`app`根目录下的全局404页面

### 路由组(Route grounps)实践 ✅

#### 说明

> 在 `app`目录下，文件夹名称通常会被映射到 URL 中，但你可以将文件夹标记为路由组，阻止文件夹名称被映射到 URL 中。
>
> 使用路由组，你可以将路由和项目文件按照逻辑进行分组，但不会影响 URL 路径结构。路由组可用于比如：
>
> 1. 按站点、意图、团队等将路由分组
>
> 2. 在同一层级中创建多个布局，甚至是创建多个根布局
>
>    > 多个根布局：原本`app`根目录下创建唯一的一个`Layout`是整个应用所有页面都会使用到的根布局，但是现在可以通过删除`app`根目录下的`Layout`布局，改成每一个分组里面创建一个`Layout`，这样你的应用它就有不同的根布局了
>    >
>    > 注意：**创建多个根布局的时候，因为删除了顶层的 `app/layout.js`文件，访问 `/`会报错，所以`app/page.js`需要定义在其中一个路由组中**

#### 实现

> 通过将文件夹名称使用括号括起来即可。就比如 `(dashboard)`

#### 分组示例

![Snipaste_2024-08-08_18-31-43](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-08_18-31-43.png)

#### 多根布局示例

![Snipaste_2024-08-08_18-32-34](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-08_18-32-34.png)



### 动态路由实践 ✅

#### ` [folderName]`

![Snipaste_2024-08-08_21-50-58](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-08_21-50-58.png)

![Snipaste_2024-08-08_21-51-23](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-08_21-51-23.png)

#### ` [...folderName]`

![Snipaste_2024-08-08_21-51-58](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-08_21-51-58.png)

![Snipaste_2024-08-08_21-51-48](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-08_21-51-48.png)

#### ` [[...folderName]]`

可选捕获动态路由后面的所有片段，包括空参数比如`/blog`，当你访问`/blog`的时候，打印出来的参数`params`为`{}`对象。其他同上

### 平行路由实践 ✅

#### 说明

**平行路由可以使你在同一个布局中同时或者有条件的渲染一个或者多个页面**，通过合理的使用，可以实现一个项目中划分和管理多个小型应用，每个应用都可以更轻松地提供单独的错误和加载状态等处理。比如有些特殊情况，我们需要在一个`Layout`布局中同时展示项目中两个页面。

#### 如何使用

在页面文件夹中使用`@`作为开头进行命名，比如`@team` 和 `@analytics`，此时我们可以在`app/layout.js`中，通过`props`获取了 `@team` 和 `@analytics` 两个页面`page.tsx`内容，同`app/layout`获取`children`进行在`Layout`布局里面渲染成页面是一致的，这是此时你不仅能获取到`childre`，还可以获取到你通过`@`定义的另外两个页面，一并在`Layout`进行操控渲染。

```tsx
// app/layout.js
export default function Layout({ children, team, analytics }) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}

```

#### 示例

![Snipaste_2024-08-09_12-13-11](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-09_12-13-11.png)

<img src="D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\cebbef525a5d45047ec11992395f6cb.png" alt="cebbef525a5d45047ec11992395f6cb" style="zoom:50%;" />



### 拦截路由实践✅

#### 说明

> 路由拦截，应用内进入`xxx/shop/aaaaa`，进行拦截，在当前页面(`children`)以全屏`modal`形式进行展示。如果是地址栏输入`xxx/shop/aaaa`会直接进入这个详情页面，不会进行拦截。

#### 示例

![Snipaste_2024-08-09_13-47-43](D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-09_13-47-43.png)

<img src="D:\学吧\code-practice-实践-非小程序\ssr服务端渲染\框架篇\NextJs13 App Router\my-next-latest\public\Snipaste_2024-08-09_13-46-00.png" alt="Snipaste_2024-08-09_13-46-00" style="zoom:50%;" />



## Server Component实践

### 服务端组件无法执行任何涉及到浏览器api和任何react hook方法

#### 不能试图在服务端组件里面直接对标签或组件进行事件绑定，或者是调用react hook，即使我们封装一个事件处理程序的客户端组件，通过在服务端使用该组件参数的形式，让事件绑定的执行程序最终在服务端组件进行触发，这种形式本质也是属于服务端调用了浏览器api，同样是不允许的

#### 在尽量最大化ssr的情况下（数据获取和获取后静态ui的展示，还是交给服务端组件），目前的抽离出交互相关逻辑功能的组件，在服务端组件的最里层进行一个使用，一种折中方案，看起来并不是很友好。



## 经验心得

### 水合警告

#### 参考：https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c

```tsx
<html lang="en" suppressHydrationWarning={true}>
      {/* 关闭水合不一致警告 通过在 RootLayout 的起始<body>标记中将suppressHydrationWarning设置为true来抑制水合警告,我的浏览器控制程序会修改服务端渲染输出到页面的html，增加了一些额外属性的，导致服务端合客户端输出不一致的html从而会有警告，
      正确的处理是开发环境下禁用这些扩展程序。可以明确一点对生成环境不会有影响。 */}
      <body className={inter.className} >
        {children}
      </body>
    </html>
```

### 划分 Server Component 和 Client Component

随着应用越来越复杂以及第三方组件库的使用，在保证功能实现和最大化ssr上划分服务端和客户组件也会越来越困难，带来更多心智负担，造成一定的开发效率下降。复杂的应用程序都会伴随需要各种交互、状态处理和状态共享等操作的组件，这些组件由于需要调用到浏览器api或者是react hook导致无法直接使用服务端组件。如果处理不得当，就会造成整个应用越来越多的客户端组件，那么ssr起到的作用就会越来越小。
我的一点开发心得就是在

- 在功能需求前提下提前做好整个应用功能的组件层面的合理划分和组织架构。确定好各个功能模块的数据获取入口、ui结合逻辑。
- 从各个功能模块中拆分出需要进行交互的各种最小化逻辑进行单独的客户端组件封装并定义好服务端组件与这些客户端组件的结合形式。
- 其中遵循的基本原则就是：尽量把服务端组件定义在外层去获取数据，把客户端组件定义在最里层去处理用户交互
