<template>
    <el-form
        :model="psdDto"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="login-container"
    >
        <h3 class="login_title">系统登录</h3>
        <el-form-item
            label="用户名"
            label-width="80px"
            prop="username"
            class="username"
        >
            <el-input
                type="input"
                v-model="psdDto.username"
                auto-complete="off"
                placeholder="请输入账号"
            ></el-input>
        </el-form-item>
        <el-form-item
            label="密码"
            label-width="80px"
            prop="password"         
        >
            <el-input
                type="password"
                v-model="psdDto.password"
                placeholder="请输入密码"
            ></el-input>    
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'login',

    data() {
        return {
            url: "http://47.93.21.24:3001/api",
            form:{},
            psdDto: {
                username: "",
                password: "",
            },
            form:{

            },
            rules:{
                username:[
                    {required:true,message:"请输入管理员名称" ,trigger:"blur"},
                    {
                        min:3,
                        message:"管理员名称长度不能小于3位",
                        trigger:"blur"
                    }
                ],
                password:[
                    { required: true, message: "请输入密码", trigger: "blur" },
                ]
            }
        };
    },

    mounted() {

    },

    methods: {
        login(){
            let _this = this;
            this.$http
            .post(this.url + "/user/adminLogin", {
                phone: this.psdDto.username,
                password: this.psdDto.password,
            })
            .then(function (res) {
                if (res.data.code == 200) {
                window.localStorage.setItem("X-token", res.data.data.token);
                console.log(res.data.data.token)
                _this.$message({
                    message: "登录成功",
                    type: "success",
                });
                setTimeout(() => {
                    _this.$router.push({
                    name: "home",
                    });
                }, 1000);
                } else {
                _this.$message({
                    message: res.data.msg,
                    type: "warning",
                });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login_title{
    margin: 0px auto 40px atuot;
    text-align: center;
    color: #505458;
}
.login_submit{
    margin: 10px auto 0 auto;
}
</style>