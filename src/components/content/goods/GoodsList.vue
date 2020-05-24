<template>
    <div class="good-list">
        <GoodListItem v-for="(item, index) in goods" :goods-item="item" :key="index" class="item">

        </GoodListItem>
    </div>
</template>

<script>
    import GoodListItem from "./GoodListItem";

    export default {
        name: "GoodsList",
        components:{
            GoodListItem
        },
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .good-list{
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      justify-content: space-around;
    }
    .good-list .item{
        width: 48%;
    }
</style>
