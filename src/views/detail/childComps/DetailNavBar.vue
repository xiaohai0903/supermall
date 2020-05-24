<template>
    <NavBar class="nav-bar">
        <img src="../../../assets/img/common/back.svg" alt="" slot="left" @click="backClcik">
        <div class="title" slot="center">
            <div @click="titleClick(index)" class="title-item" v-for="(item ,index) in titles" :key="index":class="{active:currentIndex === index}">
                <span>{{item}}</span>
            </div>
        </div>
    </NavBar>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        props:{
            currentIndex:{
                type:Number,
                default:0
            }
        },

        data(){
            return {
                titles:['商品', '参数', '评论', '推荐'],
            }
        },
        methods:{
            backClcik(){
                this.$router.back()
            },
            titleClick(index){
                this.$emit('titleClick', index)
            }
        }

    }
</script>

<style scoped>
    .nav-bar{
        display: flex;
        height: 49px;
    }
    .nav-bar img{
        width: 25px;
        text-align: center;
        margin-top: 10px;
    }
    .title{
        display: flex;
    }
    .title-item{
        flex: 1;
        font-size: 14px;
    }
    .title-item.active{
        color: var(--color-high-text);
    }
</style>
