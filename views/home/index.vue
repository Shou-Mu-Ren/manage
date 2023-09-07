<template>
    <el-row class="home" :gutter="20">
        <el-col :span="12" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card style="margin-top:20px;height:450px;">
                <el-table :data="tableData">
                    <el-table-column prop="type" label="类型" width="120"></el-table-column>
                    <el-table-column prop="count" label="总购买数" width="120"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>

export default {
    name: 'home',

    data() {
        return {
            url: "http://47.93.21.24:3001/api",
            token: "",
            userImg: require('../../src/assets/images/user.png'),
            tableData: [],
            tableLabel:{
                type:'类型',
                count:'总购买'
            }
        };
    },

    mounted() {
    },

    methods: {
        getCountList() {
            let _this = this;
            this.$http
                .get(this.url + "/user/vipCount", 
                {
                    headers: {
                        Authorization: _this.token,
                    },
                }
                )
                .then(function (res) {
                    console.log(res);
                    if (res.data.code == 200) {
                        // _this.tableData = JSON.parse(JSON.stringify(res.data.data))
                        _this.tableData = res.data.data;
                        console.log(res.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    created() {
        this.token = window.localStorage.getItem("X-token");
        this.getCountList()
    }
};
</script>

<style lang="less" scoped>
 .user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access {
            color: #999;
        }
    }
}
</style>