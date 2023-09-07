<template>
    <div class="smanage">
        <el-dialog
            :title="operateType === 'add' ? '新增用户' : '更新用户'"
            :visible.sync="isShow"
        >
            <student-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            ></student-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <student-form
                :formLabel="formLabel"
                :form="operateForm"
                :inline="true"
                :ref="form"
            >
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </student-form>
        </div>
      <div class="student-table">
            <el-table :data="tableData" height="400px" stripe>
                <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
                <el-table-column prop="place" label="地址" width="180"></el-table-column>
                <el-table-column prop="school" label="毕业高中" width="140"></el-table-column>
                <el-table-column prop="year" label="高考年份" width="100"></el-table-column>
                 <el-table-column prop="grand" label="高考分数" width="110"></el-table-column>
                  <el-table-column prop="resultId" label="导师id" width="100"></el-table-column>
                   <el-table-column prop="subject" label="选科" width="130"></el-table-column>
                <el-table-column label="操作" min-width="170">
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
import StudentForm from '../../src/components/StudentForm.vue';
export default {
    name: 'User',
    components:{
        StudentForm
    },
    props: {
        stableData: Array,
        stableLabel: Array,
    },
    data() {
        return {
            url: "http://47.93.21.24:3001/api",
            token: "",
            operateType: 'add',
            isShow: false,
            form: {
                phone: '',
                place: '',
                school: '',
                year: '',
                grand: '',
                resultId:'',
                subject:''
            },
             operateFormLabel: [
                {
                    model: 'phone',
                    label: '手机号',
                    type: 'input'
                },
                {
                    model: 'place',
                    label: '地址',
                    type: 'input'
                },
                {
                    model: 'school',
                    label: '毕业高中',
                    type: 'input',
                },
                {
                    model: 'year',
                    label: '高考年份',
                    type: 'input'
                },
                {
                    model: 'grand',
                    label: '高考分数',
                    type: 'input'
                },
                {
                    model: 'resultId',
                    label: '分配导师',
                    type: 'input'
                },
                {
                    model:'subject',
                    label:'选科',
                    type:'input'
                }
            ],
            operateForm:{
                phone:'',
                place: '',
                school: '',
                year: '',
                grand: '',
                resultId:'',
                subject:''
            },
            formLabel: [
                {
                    model: 'keyword',
                    label: '',
                    type: 'input'
                }
            ],
            searchForm: {
                keyword: ''
            },
            tableData: [],
            tableLabel: [
                {
                    props: "phone",
                    label: "手机号"
                },
                {
                    props: "place",
                    label: "地址"
                },
                {
                    props: "school",
                    label: "毕业高中"
                },
                {
                    props: "year",
                    label: "高考年份"
                },
                {
                    props: "grand",
                    label: "高考分数",
                },
                {
                    props: "resultId",
                    label: "分配导师",
                },
                {
                    props: "subject",
                    label: "选科",
                },
            ],
            config: {
                total: 20,
                page: 1
            },
            rules: {
                year: [
                    { required: true, message: '请输入高考年份' }
                ],
                grand: [
                    { required: true, message: '请输入高考分数' }
                ],
                resultId: [
                    { required: true, message: '请输入导师ID' }
                ],
                subject: [
                    { required: true, message: '请输入选科' }
                ]
            }
        }
    },

    mounted() {
        this.token = window.localStorage.getItem("X-token");
        console.log(this.token)
    },

    methods: {
        confirm(){
            if (this.operateType === 'add') {
                //编辑的接口
                let _this = this;
                this.$http.post(this.url + "/user/insertByAdmin",
                {
                    phone: this.operateForm.phone,
                    place: this.operateForm.place,
                    school: this.operateForm.school,
                    year: this.operateForm.year,
                    grand: this.operateForm.grand,
                    resultId: this.operateForm.resultId,
                    subject: this.operateForm.subject,
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
            } else {
                //新增的接口
                this.editUser()
            }
            this.isShow = false
        },
        addUser() {
            this.isShow = true
            this.operateType = 'add'
            this.operateForm={
                phone:'',
                place: '',
                school: '',
                year: '',
                grand: '',
                resultId: '',
                subject: ''
            }
        }, 
        editUser() {
            let _this = this;
            this.$http.post(this.url + "/user/updateByAdmin",
            {
                phone: this.operateForm.phone,
                place: this.operateForm.place,
                school: this.operateForm.school,
                year: this.operateForm.year,
                grand: this.operateForm.grand,
                resultId: this.operateForm.resultId,
                subject: this.operateForm.subject,
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
        delUser(row) {
            let _this = this;
            this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$http.post(this.url + "/user/deleteByAdmin",
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
                });
                })
                this.getList()
            }).catch(() => {
                this.$message({
                type:'info',
                message:'已取消删除'
                });
            });
        },
        getList() {
            let _this = this;
            this.$http
                .get(this.url + "/user/list", {
                    headers: {
                        Authorization: _this.token,
                    },
                })
                .then(function (res) {
                    if (res.data.code == 200) {
                        // _this.tableData = JSON.parse(JSON.stringify(res.data.data))
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
            this.delUser(row)
            this.$emit('del', row)
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