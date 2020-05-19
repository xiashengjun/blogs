---
title: （一）vue的基本使用
---
# Vue入门

## 1.Vue引用

```markup
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## 2.vue基本代码结构

```markup
<div id="app">
    {{msg}}
</div>
<script>
var vm = new Vue({
    //非常重要,如果不在此区域定义的属性不会生效
    el: '#app',
    data: {
           msg: 'LOGIN IN'
    }
})
</script>
```


### v-text,v-cloak,v-html

```javascript
<div id="app">
    <div v-cloak>{{ msg }}</div>
    <div v-text="msg"></div>
    <div v-html="msg2"></div>
</div>

<script>
    var vue = new Vue({
        el: '#app',
        data : {
            msg: 'Hello World',
            msg2: '<h2>Hi</h2>'
        }
    })
</script>
```

> 三者区别说明:
>
> v-cloak:用于在网速较慢的时候,vue还未完成渲染,会显示,此属性用于对进行隐藏
>
> v-text:作用与相同,但是在网速较慢的时候,直接不进行显示
>
> v-html:可以对html进行渲染

### v-bind数据绑定

```markup
<input type="button" value="按钮" v-bind:title="title"/>
<!-- 简写 :title等同于v-bind:title,v-bind里面可以写合法的js表达式 -->
<input type="button" value="按钮" :title="title + '123'"/>
<script>
    var vue = new Vue({
        el: '#app',
        data : {
            title: 'Title'
        }
    })
</script>
```

### v-on事件绑定

```markup
<div id="app">
    <!-- v-on:后面跟事件类型,如click,keyups -->
    <input type="button" value="按钮" v-on:click="show"/>
    <!-- 缩写@click -->
    <input type="button" value="按钮" @click="show"/>
</div>

<script>
    var vue = new Vue({
        el: '#app',
        methods: {
            show:function() {
                alert("hello");
            }
        }
    })
</script>
```

### 跑马灯效果实现

> 需求:点击"浪起来"实现跑马灯效果,点击"低调"停止跑马灯效果

```markup
<div id="app">
    <input type="button" value="浪起来" @click="lang"/>
    <input type="button" value="低调" @click="stop"/>
    <h4>{{msg}}</h4>
</div>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: '猥琐发育,别浪~~',
            intervalId: null
        },
        methods: {
            lang() {
                if(this.intervalId != null) return;
                this.intervalId = setInterval(() => {
                    var start = this.msg.charAt(0);
                    var end = this.msg.substr(1);
                    this.msg = end + start;
                },400)
            },
            stop() {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    })
</script>
```
### 事件修饰符

> * .stop 阻止冒泡
> * .prevent 阻止默认事件
> * .capture 添加事件侦听器时使用事件捕获模式
> * .self 只当事件在该元素本身\(比如不是子元素\)触发时触发回调
> * .once 事件只触发一次

```markup
<!-- 事件修饰符可以合并使用:如@click.stop.prevent -->
<div id="app">
    <div id="area" @click="divClick" style="background: darkcyan">
        <!-- 阻止冒泡事件 -->
        <input type="button" value="按钮" @click.stop="btnClick"/>
        <a href="https://www.baidu.com/" @click.prevent="linkClick">阻止默认行为</a>
    </div>
</div>

<script>
    var vm = new Vue({
        el: '#app',
        methods: {
            divClick() {
                alert("div_click");
            },
            btnClick() {
                alert("btn_click");
            },
            linkClick() {
                alert("触发点击事件")
            }
        }
    })
</script>
```

### v-model实现双向数据绑定

> 实现V修改同步到M,M修改同步到V,v-model只能运用在表单元素中,如下
>
>  select checkbox textarea

```markup
<div id="app">
    <!-- 修改input,span内容也会改变 -->
    <span>{{msg}}</span><br/>
    <input type="text" v-model="msg">
</div>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'this is a msg'
        }
    })
</script>
```

### v-model实现简易计算器效果

```markup
<div id="app">
    <input type="text" v-model="n1"/>
    <select v-model="opt">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
    </select>
    <input type="text" v-model="n2"/>
    <button @click="calc">=</button>
    <input type="text" v-model="result"/>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            n1: 0,
            n2: 0,
            result: 0,
            opt: '-'
        },
        methods: {
            calc() {
                //只是demo,不要过于纠结细节
                var codeStr = 'this.n1' + this.opt + this.n2;
                this.result = eval(codeStr);
            }
        },
    })
</script>
```


## 3.在vue中使用样式

### 使用class样式

1. 数组

   ```markup
   <h1 :class="['red','thin']">this is a eval h1</h1>
   ```

2. 数组中使用三元表达式

   ```markup
   <h1 :class="['red','thin',isactive?'active':'']">this is a eval h1</h1>
   ```

3. 数组中嵌套对象

   ```markup
   <h1 :class="['red','thin',{'active':isactive}]">this is a eval h1</h1>
   ```

4. 直接使用对象

   ```markup
   <h1 :class="{red:true,italic:true,active:true,thin:true}">this is a eval h1</h1>
   ```

### 使用内联样式

1. 直接在元素上通过`:style`的形式,书写样式对象

   ```markup
   <h1 :style="{color:'red','font-size':'40px'}">this is a eval h1</h1>
   ```

2. 将样式对象,定义到`data`中,并直接引用到`:style`中

   * 在data上定义样式\(注意:如果属性存在'-',必须添加单引号\)

   ```javascript
   data: {
       h1StyleObj: {color:'red','font-size': '40px','font-weight': '200'}
   }
   ```

   * 在元素中,通过属性绑定的形式,将样式对象应用到元素中:

   ```markup
   <h1 :style="h1StyleObj">this is a eval h1</h1>
   ```

3. 在`:style`中通过数组,引用多个`data`上的样式对象

   * 在data上定义样式\(注意:如果属性存在'-',必须添加单引号\)

   ```javascript
   data: {
       h1StyleObj: {color:'red','font-size': '40px','font-weight': '200'},
       h1StyleObj2: {font-style: 'italic'}
   }
   ```

   * 在元素中,通过属性绑定的形式,将样式对象应用到元素中

   ```markup
   <h1 :style="[h1StyleObj,h1StyleObj2]">this is a eval h1</h1>
   ```

   ## 4.vue指令

### v-for与key属性

> 2.20+的版本中,当在组件中使用v-for时,key现在是必须的
>
> 当Vue.js用v-for正在更新已渲染过的元素列表时,它默认用"就地复用"策略,如果数据项的顺序被改变,Vue将不是移动DOM元素来匹配数据项的顺序,而是简单复用此处每个元素,并且确保它在特定索引下显示已被渲染过的每个元素。
>
> 为了给Vue一个提示,以便它能追踪每个节点的身份,从而复用和重新排序现有元素,你需要单独为每项提供一个唯一key属性

1. 迭代数组

   ```markup
   <ul>
       <li v-for="(item,i) in list">索引:{{i} --- 姓名:{{item.name}} --- 年龄:{{item.age}}}</li>
   </ul>
   ```

2. 迭代对象中的属性\(顺序为:值,键,索引\)

   ```markup
   <!-- 循环遍历对象身上的属性 -->
   <div v-for="(val,ke,i) in userInfo">{{{val}} --- {{key}} --- {{i}}}</div>
   ```

3. 迭代数字\(i从1开始\)

   ```markup
   <p v-for="i in 10">{{i}}</p>
   ```

### v-if和v-show

> `v-if`每次都会重新删除或创建元素;`v-for`每次不会重新进行DOM的删除和创建操作,只是切换display:none样式;
>
> `v-if`有较高的切换性能消耗,`v-for`有较高的初始渲染消耗;如果元素涉及到频繁的切换,最好不要使用v-if

```markup
<div id="app">
    <input type="button" @click="flag=!flag" value="切换">
    <h3 v-if="flag">这是v-if控制的元素</h3>
    <h3 v-show="flag">这是v-show控制的元素</h3>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            flag: true
        }
    })
</script>
```

## 5.案例: 使用vue实现品牌新增,删除以及关键字搜索和时间处理

```markup
<div id="app">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">添加品牌</h3>
        </div>
        <div class="panel-body form-inline">
            <label>
                id:
                <input type="text" class="form-control" v-model="id">
            </label>
            <label>
                name:
                <input type="text" class="form-control" v-model="name">
            </label>
            <input type="button" value="添加" class="btn btn-primary" @click="add">
            <label>
                搜索名称关键字
                <!-- 在vue中的所有指令,在调用的时候都以v-开头 -->
                <input type="text" class="form-control" v-model="keywords">
            </label>
        </div>
    </div>

    <table class="table table-hover table-bordered table-striped">
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>ctime</th>
                <th>operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in search(keywords)" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.ctime | dateFormat('yyyy-MM-dd')}}</td>
                <td>
                    <a href="#" @click.prevent="del(item.id)">删除</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<script>
    //全局过滤器
    Vue.filter('dateFormat',function(dateStr,pattern = '') {
        //根据给定字符串获取特定时间
        var dt = new Date(dateStr)
        //yyyy-mm-dd
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()
        if(pattern && pattern.toLowerCase() == 'yyyy-mm-dd') {
            return `${y}-${m}-${d}`
        } else {
            var hh = dt.getHours()
            //padStart:开始填充;padEnd():末尾填充(如两位填充数字1: 01 和 10)
            var mm = (dt.getMinutes()).toString().padStart(2,'0')
            var ss = (dt.getSeconds()).toString().padStart(2,'0')
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
    })
    var vm = new Vue({
        el: '#app',
        data: {
            id:null,
            name:null,
            keywords:'',
            list: [
                {id : 1,name: '奔驰',ctime: new Date()},
                {id : 2,name: '宝马',ctime: new Date()},
                {id : 3,name: '保时捷',ctime: new Date()}
            ]
        },
        methods: {
            add() {
                var car = {id: this.id,name: this.name,ctime: new Date()};
                this.list.push(car);
                this.id = this.name = null;
            },
            del(id) {
                // this.list.some((item,i) => {
                //     if(item.id == id) {
                //         this.list.splice(i,1);
                //         return true;
                //     }
                // })

                var index = this.list.findIndex(item => {
                    if(item.id == id) {
                        return true;
                    }
                })
                this.list.splice(index,1);
            },
            search(keywords) {
                //"测试".indexOf('')等于0
                // var newList = [];
                // this.list.forEach(item => {
                //     if(item.name.indexOf(keywords) != -1) {
                //         newList.push(item);
                //     }
                // })
                // return newList;

                return this.list.filter(item => {
                    if(item.name.includes(keywords)) {
                        return true;
                    }
                })
            }
        },
        filters: { //定义私有过滤器【过滤器名称和处理函数】
            //如果同名,
            dateFormat:function(dateStr,pattern) {
                return "私有过滤器"
            }
        }
    })
</script>
```


## 6.vue-devtools安装

> 推荐翻墙安装,搜索`Vue.js devtools`
>
> 注意事项:
>
> vue扩展程序需要勾选允许访问文件网址和收集各项错误;同时引入的vue.js不能使用min.js

## 7.过滤器

> vue.js允许自定义过滤器,可被用作一些常见文本格式化.过滤器可以用在两个地方:`mustache插值`和`v-bind表达式`.过滤器应该被添加在js表达式的尾部,由"管道"符指示

### 私有过滤器

> 过滤器调用: Vue.filter\('过滤器名称',function\(\){}\)
>
> //过滤器中的function,第一个参数已经规定死了,永远都是过滤器管道符前面传递过来的数据

1. html元素

```markup
<td>{{item.ctime | dataFormat('yyyy-mm-dd')}}</td>
```

1. 私有filter定义方式

```javascript
filters: {
    dataFormat(input,pattern = '') {
        ...
    }
}
```

* 替换'单纯'为'邪恶'

```markup
<div id="app">
    <p> {{msg | msgFormat('邪恶') | str}}</p>
</div>
<script>
    Vue.filter('msgFormat',function(msg,arg) {
        return msg.replace(/单纯/g,arg);
    })
    Vue.filter('str',function(msg) {
        return msg+"---";
    })
    var vm = new Vue({
        el: '#app',
        data: {
            msg: '曾经,我也是一个单纯的少年,单纯的我,傻傻的问,谁是世界上最单纯的男人'
        }
    })
</script>
```

## 8.自定义按键修饰符

* 1.x中自定义键盘修饰符\(了解不推荐\)

```javascript
Vue.directive('on').keyCodes.f2 = 113;
```

* 2.x中自定义键盘修饰符
* 通过`Vue.config.keyCodes.名称 = 按键值`来自定义按键修饰符的别名

```javascript
Vue.config.keyCodes.f2 = 113;
```

1. 使用自定义的按键修饰符

```markup
<input type="text" v-model="name" @keyup.f2="add">
```

## 9.自定义指令

> 参数1：指令的名称,在定义的时候不需要加v-前缀,在调用的时候,必须加上v-前缀
>
> 参数2：一个对象,对象身上有一些指令相关的函数,函数可以在特定的阶段,执行相关的操作

* 使用Vue.directive\(\)定义全局指令 

```markup
<input id="search" type="text" class="form-control" v-model="keywords" v-focus v-color="'blue'">
<script>
    //自动获取焦点
    Vue.directive('focus',{
        //在每个函数中,第一个参数永远是el,表示被绑定了指令的那个元素,这个el参数是一个原生js对象
        bind:function(){}, //每当指令绑定在元素上的时候,会立即执行这个bind函数,只执行一次
        inserted:function(el){
            el.focus();
        },//元素插入到dom中的时候会执行inserted函数,触发一次
        updated:function(){}//当VNode更新的时候,会执行updated,可能会触发多次
    });

    //写法一:全局
    //修改字体颜色
    Vue.directive('color',{
        bind: function(el,expression) {
            el.style.color = binding.value;
            console.log(binding.name);//color
            console.log(binding.value);//blue
            console.log(binding.expression);//'blue'
        }
    })

    //写法二:私有
    var vue = new Vue({
        el: '#app',
        directives: {
            'color': {
                bind: function(el,binding) {
                    el.style.color = binding.value;
                    ...
                }
            }
        }
    })
</script>
```

### 函数简写

> 在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

## 10.vue实例的生命周期

* 什么是生命周期:从vue实例创建,运行到销毁期间,总是伴随着各种各样的事件,这些事件统称为生命周期
* 生命周期钩子: 生命周期事件的别名
* 主要的生命周期函数分类
  * 创建期间的生命周期函数
    * beforeCreate: 实例刚在内存中被创建出来,此时,还没有初始化好data 和 methods属性
    * created: 实例已经在内存中创建ok,此时data和Methods已经创建ok,此时还没有开始编译模板
    * beforeMount: 此时已经完成模板的编译,但是还没有挂在到页面中
    * mounted: 此时,已经将编译好的模板,挂在到了页面指定的容器中显示
  * 运行期间的生命周期函数
    * beforeUpdate: 状态更新之前执行此函数,此时data中的状态值是最新的,但是界面上显示的数据还是旧的,因为此时还没有开始渲染DOM节点
    * updated: 实例更新完毕之后调用此函数,此时data中的状态值和页面上显示的数据,都已经完成了更新,界面已经被重新渲染好了
  * 销毁期间的生命周期
    * beforeDestory: 实例销毁之前调用,在这一步,实例仍然完全可用
    * destoryedL Vue实例销毁后调用,调用后,vue实例指示的所有东西都会解除绑定,所有的事件监听器都会移除,所有的子实例也会被销毁

```markup
<div id="app">
    <input type="button" value="触发change" @click="msg='this is not a msg'">
    <h3 id="h3">{{msg}}</h3>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'this is a msg'
        },
        methods: { 
            show() {
                console.log("this is a function")
            }
        },
        //实例化周期
        beforeCreate() { // first life cycle function
            //在beforeCreate生命周期函数执行的时候,data和methos中的数据都还没有初始化
            console.log(this.msg)//undefined
        },
        created() { //second life cycle function
            //如果要调用methods中的方法,或操作data中的数据,最早只能在created中操作
            console.log(this.msg)//this is a msg
        },
        beforeMount() { //third life cycle function
            //模板已经在内存中编辑完成,尚未把模板渲染到页面中去,页面中的元素还未替换过来
            console.log(document.getElementById("h3").innerText)//{{msg}}
        },
        mounted() { //fourth life cycle function
            //内存中的模板,已经真实的挂载到了页面中,用户已经可以看到渲染好的页面("实例创建"的最后一个生命周期函数)
            console.log(document.getElementById("h3").innerText)//this is a msg
        },
        //运行中周期
        beforeUpdate() {
            //数据被改变触发,此时页面中显示的数据还未与最新数据同步,data数据已经最新
            console.log(document.getElementById("h3").innerText)//页面数据:this is a msg
            console.log(this.msg)//data中的msg数据:this is not a msg
        },
        updated() {
            //此时,页面和data数据已经保持同步,都是最新的
            console.log(document.getElementById("h3").innerText)//页面数据:this is not a msg
            console.log(this.msg)//data中的msg数据:this is not a msg
        },
    })
</script>
```
## 11.Vue路由

### 什么是路由

> 1. 后端路由: 对于普通网站,所有的超链接都是URL地址,所有的URL地址都对应服务器上对应的资源
> 2. 前端路由:对于单页面应用程序来说,主要通过URL中的hash\(\#号\)来实现不同页面之间的切换,同时,hash有一个特点:HTTP请求中不会包含hash相关的内容,所以,单页面程序中的页面跳转主要用hash来实现
> 3. 在单页面应用程序中,这种通过hash改变来切换页面的方式,称作前端路由

### 在vue中使用vue-router

1. 导入vue-router组件类库

```markup
<script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
```

1. 使用router-link组件来导航

```markup
<!-- 使用router-link组件来导航 -->
<router-link to="/login">登录</router-link>
<router-link to="/register">注册</router-link>
```

1. 使用router-view组件来显示匹配到的组件

```markup
<!-- 使用router-view组件来显示匹配到的组件 -->
<router-view></router-view>
```

1. 使用`Vue.extend`创建组件

```javascript
// 使用Vue.extend来创建登录/注册组件
var login = Vue.extend({
    template: '<h1>登录组件</h1>'
})
var register = Vue.extend({
    template: '<h1>注册组件</h1>'
})
```

1. 创建一个路由router实例,通过routers属性来定义路由匹配规则

```javascript
var router = new VueRouter({
    routes: [
        {path： '/login',component: login},
        {path: '/register',component: register}
    ]
})
```

1. 使用router属性来使用路由规则

```javascript
var vm = new Vue({
    el: '#app',
    router: router
})
```

```markup
<div id="app">
    <!-- 注意:此处需要加'#'号 -->
    <!-- <a href="#/login">登录</a>
    <a href="#/register">注册</a> -->

    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <!-- 显示匹配到的组件 -->
    <router-view></router-view>
</div>
<script>
    var login = {
        template: '<h1>登录组件</h1>'
    }

    var register = {
        template: '<h1>注册组件</h1>'
    }

    //2.创建一个路由对象,当导入vue-router包之后,在window全局对象中,就有了一个路由的构造函数,叫做VueRouter
    var routerObj = new VueRouter({
        //表示路由匹配规则
        routes: [
            //每个路由规则,都是一个对象,{path: '表示监听哪个路由链接地址';
            //component: '表示如果路由是前面匹配到的path,则显示对应组件(值必须是组件模板对象,不能是引用名称)'}
            {path: '/',redirect: '/register'},
            {path: '/login',component: login},
            {path: '/register',component: register}
        ],
        //使用自定义class
        //linkActiveClass: 'myactive'
    })

    var vm=new Vue({
        el:'#app',
        data:{},
        methods:{},
        //将路由规则对象注册到vm实例上,用来监听url地址的变化,然后展示对应的组件
        //http://127.0.0.1:5500/router_basic.html#/ => 会使用#哈希路由
        router: routerObj
    });
</script>
```

### 路由传参

* 方式1

```markup
<div id="app">
    <!-- 如果在路由中,使用查询字符串,给路由传参 -->
    <router-link to="/login?id=10&name=zhangsan">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
</div>
<script>
    var login = {
        template: '<h1>登录 --- {{$route.query.id}} --- {{$route.query.name}}</h1>'
    }
    var register = {
        template: '<h1>注册</h1>'
    }

    var route = new VueRouter({
        routes: [
            {path: '/login',component: login},
            {path: '/register',component: register}
        ]
    })

    var vm = new Vue({
        el:'#app',
        router: route
    });
</script>
```

* 方式2

```markup
<div id="app">
    <!-- 如果在路由中,使用查询字符串,给路由传参 -->
    <router-link to="/login/12/zhangsan">登录</router-link>
    <router-view></router-view>
</div>
<script>
    var login = {
        template: '<h1>登录 --- {{$route.params.id}} --- {{$route.params.name}}</h1>'
    }

    var route = new VueRouter({
        routes: [
            {path: '/login/:id/:name',component:login}
        ]
    })

    var vm = new Vue({
        el:'#app',
        router: route
    });
</script>
```

### 路由嵌套

```markup
<div id="app">
    <router-link to="/account">Account</router-link>
    <router-view></router-view>
</div>
<template id="temp1">
    <div>
        <h1>这是Account组件</h1>
        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    var account = {
        template: '#temp1'
    }
    var login = {
        template: '<h1>登录</h1>'
    }
    var register = {
        template: '<h1>注册</h1>'
    }
    var router = new VueRouter({
        routes: [
            {
                path: '/account',
                component: account,
                children: [
                    {path: 'login',component:login},
                    {path: 'register',component:register}
                ]
            }
            // {path: '/account/login',component: login},
            // {path: '/account/register',component: register}
        ]   
    })
    var vm = new Vue({
        el:'#app',
        router:router
    });
</script>
```


## 12.Vue监视

### 案例: watch监视名称改变

```markup
<div id="app">
    <input type="text" v-model="first_name"> + 
    <input type="text" v-model="last_name"> =
    <input type="text" v-model="fullname">
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            first_name: '',
            last_name: '',
            fullname: ''
        },
        //使用这个属性,可以监视data中指定数据的变化,然后触发这个watch中对应的function处理函数
        watch: {
            first_name: function(newVal,oldVal) {
                this.fullname = `${newVal}-${this.last_name}`
            },
            last_name: function() {
                this.fullname = `${this.first_name}-${this.last_name}`
            }
        }
    })
</script>
```

### watch监视路由改变

```markup
<script>
    var login = {
        template: '<h1>登录</h1>'
    }
    var register = {
        template: '<h1>注册</h1>'
    }
    var router = new VueRouter({
        routes: [
            {path: '/login',component: login},
            {path: '/register',component: register}
        ]
    })
    var vm = new Vue({
        el: '#app',
        router: router,
        watch: {
            '$route.path': function(newVal,oldVal) {
                if(newVal === '/login') {
                    console.log('欢迎登录')
                } else if(newVal === '/register') {
                    console.log('欢迎注册')
                }
            }
        }
    }) 
</script>
```

## 13.computed计算属性

```markup
<script>
    var vm=new Vue({
        el:'#app',
        data:{
            firstname: '',
            lastname: ''
        },
        methods:{},
        //在computed中,可以定义一些属性,这些属性叫做计算属性,计算属性的本质就是一个方法,只不过我们
        //在使用这些属性的时候,是把它们的名称直接当作属性来使用,并不会把计算属性当作方法去调用
        computed: {
            //只要计算属性这个function内部,所用到的任何data数据发生变化,就会重新计算这个属性的值
            //计算属性的求值结果,会被缓存起来,方便下次使用,如果任何属性未发生改变,不会重新计算属性求值
            'fullname': function() {
                return this.firstname + '-' + this.lastname
            }
        }
    })
</script>
```

## 14.vue render渲染

```markup
<div id="app">
    <login></login>
</div>
<script>
    var login = {
        template: '<h1>这是登录组件</h1>'
    }
    var vm = new Vue({
        el:'#app',
        /**
        render(h) { //该形参是一个方法，能够把指定的组件模板渲染为html结构
            //return的结果会直接替换el指定的那个容器(区别于components)
            return h(login)
        }
        **/
        render: h => h(login)
    });
</script>
```


### export default和export

> //node中向外暴露成员的形式
>
> module.exports = {}和exports = {}
>
> //在es6中导入模块: import 模块名称 from '模块标识符' / import '表示路径'
>
> //es6向外暴露成员: export default/export
>
> export:使用export向外暴露的成员,只能使用{}的形式接收,可以向外暴露多个成员
>
> export.default:在一个模块中,只允许向外暴露一次

test.js

```javascript
// module.exports = {
//     name: 'zhangsan',
//     age: 20
// }

var info = {
    name: 'zhangsan',
    age: 20
}

export default info

//可以不全部导出 import info,{title} => 只导出title
export var title = 'hello'
export var content = 'world'
ecport var color = 'red'
```

main.js

```javascript
//export default暴露的,可以任意变量接收
import person,{title,content,color as co} from './test.js'
console.log(person) //{name:'zhangsan',age:20}
console.log(title)  //hello
console.log(content)//world
console.log(co) //red
```

### 结合webpack使用vue-router

> 使用参考: [vue-router npm 安装](https://router.vuejs.org/zh/installation.html)

1. 安装vue-router

```text
npm install vue-router
```

1. 如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装路由功能：

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import account from './vue/account.vue'

const router = new VueRouter({
  routes: [
    {path:'/login',component: account} //http://localhost:3000/#/login
  ]
})

Vue.use(VueRouter)

var vm = new Vue({
    el: '#app',
    render: h => h(app), //如果存在render,必须把router组件放入app.vue中
    router
})
```

1. account.vue

```text
<template>
    <div>
        <h1>这是登录组件</h1>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
    /* 
        scoped:定义为私有样式(默认全局样式) 
        普通的style标签只支持普通的样式,如果要启用scss或less,需要为style元素,设置lang属性
    */
    body {
        div {
            color: red;
        }
    }
</style>
```

1. app.vue

```text
<template>
    <div>
        <h1>这是app组件</h1>
        <router-view></router-view>
    </div>
</template>
```

#### 抽离路由模块

* 新建router.js用于抽离router模块

```javascript
import VueRouter from 'vue-router'
import account from './vue/account.vue'

const router = new VueRouter({
    routes: [
        {path:'/login',component: account}
    ]
})

export default router
```

* main.js

```javascript
import Vue from 'vue'
import app from './vue/app.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: h => h(app),
    router
})
```


资料参考

[vue.js guide](https://cn.vuejs.org/v2/guide/)

[vue-router guide](https://router.vuejs.org/zh/)

[vuex guide](https://vuex.vuejs.org/zh/)

[keycode键盘 按键 - 键码 对应表](https://www.cnblogs.com/yiven/p/7118056.html)

[animate.css](https://daneden.github.io/animate.css/)

[webpack](https://www.webpackjs.com/)

[windows npm安装webpack](https://www.cnblogs.com/liuliwei/p/9202433.html)

[webpack和webpack cli的安装卸载](https://www.cnblogs.com/ssw-men/p/10936173.html)

[mint ui](https://mint-ui.github.io/#!/zh-cn)

