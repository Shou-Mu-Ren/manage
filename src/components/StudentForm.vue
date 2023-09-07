<template>
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
            <el-input
                v-if="item.type === 'input'"
                :placeholder="'请输入' + item.label"
                v-model="form[item.model]"
            ></el-input>
            <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
            <el-select
                v-if="item.type === 'select'"
                placeholder="请选择"
                v-model="form[item.model]"
            >
                <el-option
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-checkbox-group 
                v-if="item.type === 'checkbox-group'" 
                v-model="form[item.model]"
            ></el-checkbox-group>
            <el-checkbox
                v-for="item in item.checks"
                :key="item.value"
                :label="item.label"
                :name="item.name"
            ></el-checkbox>
        </el-form-item>   
        <el-form-item><slot></slot></el-form-item>   
    </el-form>
</template>

<script>
export default {
    name: 'StudentForm',
    props: {
        formLabel: Array,
        form: Object,
        inline: Boolean
    },
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                gaokao: [
                    { required: true, message: '请输入高考年份' }
                ],
                grade: [
                    { required: true, message: '请输入高考分数' }
                ],
                teacher: [
                    { required: true, message: '请输入导师ID' }
                ],
                course: [
                    { required: true, message: '请输入选科' }
                ]
            }
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>

</style>