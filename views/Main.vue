<template>
    <el-container style="height:100%">
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <el-header>
                <common-header/>
            </el-header>
            <common-tag/>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'
export default {
    data() {
        return {}
    },
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>
<style scoped>
.el-header {
    padding: 0
}
</style>