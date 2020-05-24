<template>
    <div class="top">
        <div class="item" v-for="(item, index) in subcategories.list" :key="index">
            <a :href="item.link">
                <img class="item-img" :src="item.image" alt="">
                <div class="item-text">{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    import GridView from "../../../components/common/gridView/GridView";
    export default {
        name: "TabContentCategory",
        components:{
            GridView
        },
        props:{
            subcategories:{
                type:Object,
            }
        }
    }
</script>

<style scoped>
    .top{
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-around;
    }
    .item{
        width: 38%;
    }
   .item img{
       width: 100%;
   }
    .item-text {
        margin-top: 15px;
    }
</style>
