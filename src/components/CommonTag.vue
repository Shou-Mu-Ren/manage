<template>
    <div class="tabs">
        <el-tag 
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name!== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag,index)"
            size="small"
        >
        {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name: 'CommonTag',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        ...mapMutations({
            close:'closeTag'
        }),
        changeMenu(item){
            this.$router.push({name:item.name})
        },
        handleClose(tag,index){
            const length= this.tags.length-1
            this.close(tag)
            // 如果点击删除时，与当前路由不一致，则不需要改变聚焦的焦点
            if(tag.name !== this.$route.name){
                return;
            }
            //点击删除了最右侧tag，焦点往左移动（往前跳转）
            if(index === length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                // 点击了中间的tag，焦点往右跳转
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    }
};
</script>

<style lang="less" scoped>
.tabs {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>