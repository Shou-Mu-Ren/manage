<template>
    <el-menu default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
    >
      <h3>{{isCollapse ? '后台':'后台管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '咨询师管理',
                    icon: 'user',
                    url: 'MallManage/MallManage'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                },
            ]
        };
        },
            methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item){
                this.$router.push({
                    name: item.name
                })
                this.$store.commit('selectMenu',item)
            }
        },
        computed:{
            noChildren(){
                return this.menu.filter(item => !item.children)
            },
            isCollapse() {
            return this.$store.state.tab.isCollapse
            }
        },
    }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
  }
</style>