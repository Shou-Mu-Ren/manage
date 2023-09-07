<template>
    <div class="tmanage">
        <el-dialog
            :title="operateType === 'add' ? '新增咨询师':'更新咨询师'"
            :visible.sync="isShow"
        >
            <teacher-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            ></teacher-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <teacher-form
                :formLabel="formLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            >
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </teacher-form>
        </div>
        <div class="teacher-table">
            <el-table :data="tableData" height="400px" stripe>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="180"></el-table-column>
                 <el-table-column
                        prop="sex"
                        label="性别"
                        width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                        </template>
                    </el-table-column>
                <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
                <el-table-column prop="place" label="住址" width="180"></el-table-column>
                <el-table-column label="操作" min-width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pager"
                layout="prev,pager,next"
                :total="config.total"
                :current-page.sync="config.page"
                @current-change="changePage"
                :page-size="20"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import TeacherForm from '@/components/TeacherForm.vue';
export default {
    name: 'Mall',
    props:{
        ttableData: Array,
        ttableLabel: Array,
    },
    components:{
        TeacherForm,
    },
    data() {
        return {
            url: "http://47.93.21.24:3001/api",
            token: "",
            operateType:'add',
            isShow:false,
            operateFormLabel:[
                {
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                },
                {
                    model: 'age',
                    label: '年龄',
                    type: 'input'
                },
                {
                    model: 'sex',
                    label: '性别',
                    type: 'select',
                    opts: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }
                    ]
                },
                {
                    model: 'phone',
                    label: '电话号',
                    type: 'input'
                },
                {
                    model: 'place',
                    label: '地址',
                    type: 'input'
                }
            ],
            operateForm:{
                name:'',
                age:'',
                sex:'',
                phone:'',
                plone:''
            },
            formLabel:[
                {
                    model:'keyword',
                    label:'',
                    type:'input'
                }
            ],
            searchForm:{
                keyword:''
            },
            tableData:[],
            tableLabel:[
                {
                    props:"name",
                    label:"姓名"
                },
                {
                    props: "age",
                    label: "年龄"
                }, 
                {
                    props: "sexLabel",
                    label: "性别"
                }, 
                {
                    props: "phone",
                    label: "电话号"
                }, 
                {
                    props: "place",
                    label: "地址",
                    width:320
                },
            ],
            config:{
                page:1,
                total:30

            }
        }
    },

    mounted() {
        this.token = window.localStorage.getItem("X-token");
        console.log(this.token)
    },

    methods: {
        confirm(){
            if(this.operateType === 'add'){
                console.log(this.operateForm)
                let _this = this;
                this.$http.post(this.url + "/result/insertByAdmin",
                {
                    phone: this.operateForm.phone,
                    place: this.operateForm.place,
                    name: this.operateForm.name,
                    age: this.operateForm.age,
                    sex: this.operateForm.sex,
                },
                {
                    headers: {
                    Authorization: _this.token,
                    },
                }
                ).then(res =>{
                this.$message({
                type:'success',
                message:'新增成功'
                })
                })
                this.getList()
            }else{
                //新增的接口
                this.editUser()
            }

            this.isShow=false
        },
        addUser(){
            this.isShow=true
            this.operateType='add'
            
            this.operateForm={
                name: '',
                age: '',
                sex: '',
                phone: '',
                place: ''
            }
        },
        editUser(){
            console.log(this.operateForm)
            let _this = this;
            this.$http.post(this.url + "/result/updateByAdmin",
            {
                phone: this.operateForm.phone,
                place: this.operateForm.place,
                name: this.operateForm.name,
                age: this.operateForm.age,
                sex: this.operateForm.sex,
            },
            {
                headers: {
                Authorization: _this.token,
                },
            }
            ).then(res =>{
            this.$message({
            type:'success',
            message:'编辑成功'
            })
            })
            this.getList()
        },
        delUser(row){
            console.log(row)
            let _this = this;
            this.$confirm("此操作将永久删除该组件，是否继续？","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then(() => {
                this.$http.post(this.url + "/result/deleteByAdmin",
                {
                    phone: row.phone,
                },
                {
                    headers: {
                    Authorization: _this.token,
                    },
                }
                ).then(res =>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                })
                this.getList()
            }).catch(() =>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                })
            })
        },
        getList() {
            let _this = this;
            this.$http
                .get(this.url + "/result/list", {
                    headers: {
                        Authorization: _this.token,
                    },
                })
                .then(function (res) {
                    if (res.data.code == 200) {
                        _this.tableData = res.data.data;

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleEdit(row) {
            this.isShow = true
            this.operateType = 'edit'
            this.operateForm = row
        },
        handleDelete(row) {
            this.$emit('del', row)
            this.delUser(row)
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    },
    created(){
        this.getList()
    }
};
</script>

<style lang="less" scoped>
.manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.common-table{
    height: calc(100%-62px);
    background-color: #fff;
    position: relative;
.pager{
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>