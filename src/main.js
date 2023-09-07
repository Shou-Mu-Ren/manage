import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  CheckboxGroup,
  Checkbox,
  Option,
  Dialog,
  Pagination,
  MessageBox,
  message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

import router from '../router'
import store from '../store'
import http from 'axios'

import Cookie from 'js-cookie';

Vue.config.productionTip = false;
Vue.use(Button)
Vue.use(Radio)

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Option)
Vue.use(Dialog)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = message

// // 导航守卫，在路由进行跳转时，可以通过它来监听
router.beforeEach((to, from, next) => {
  // 调用store.getToken，目的是防止页面刷新后，vuex丢失token信息
  // store.commit('getToken')
  // let token = store.state.user.token
  let token = window.localStorage.getItem("X-token");
  // 如果token不存在，并且不是登录页，就不能登录系统
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
