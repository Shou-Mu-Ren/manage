<template>
    <header>
        <div class="l-content">
            <el-button @click="handlerMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color: #fff">首页</h3> -->
                <!-- 面包屑 -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span>
                    <img class="user" :src="userImg">
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut" command="b">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'CommonHeader',
    data(){
        return{
            userImg:require('../assets/images/user.png')
        }
    },
    methods:{
        handlerMenu(){
            this.$store.commit('CollapseMenu')
        },
        logOut(){
            window.localStorage.setItem("X-token", "");
            this.$router.push("/login")
        },
        loginon(){
            this.$router.push("/login")
        }
    },
     computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
    header{
        background-color: #333;
        display: flex;
        height: 100%;
        justify-content: space-between;//左右靠边
        align-items: center;//上下居中
    }
    .l-content{
        margin-left: 15px;
        display: flex;
        align-items: center;//上下居中
        .el-button{
            margin-right: 20px;
        }
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link {
                    color: #666
                }
            }
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff
                }
            }
        }
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
        }
    }
</style>