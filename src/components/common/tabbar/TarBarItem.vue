<template>
    <div class="tar-bar-item" @click="itemClick">
        <div v-if="!isActived" class="item-icon"><slot name="item-icon"></slot></div>
        <div v-else class="item-active-icon"><slot name="item-active-icon"></slot></div>
        <div class="item-text" :style="textActive"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TarBarItem",
        props:{
            path:{
                type:String,
                required:true
            }
        },
        data(){
           return{
               textColor: {
                   type: String,
                   color:'#ff5777'
               }
           }
        },
        methods:{
            itemClick(){
                this.$router.push(this.path)
            }
        },
        computed:{
            isActived(){
                if(this.$route.path === this.path){
                    return true
                }else {
                    return false
                }
            },
            textActive(){
                return this.isActived ? {color: this.textColor.color} : {}
            }

        }
    }
</script>

<style scoped>
    .tar-bar-item{
        flex: 1;
        font-size: 10px;

    }
    .tar-bar-item .item-icon img, .item-active-icon img{
        width: 24px;
        height: 24px;
        margin-top: 8px;
        vertical-align: middle;
    }

</style>
