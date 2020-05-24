<template>
        <Scroll :probe-type="3" class="cart-list">
            <CartListItem v-for="(item,index) in itemList" :key="item.iid" :list-item="item" ></CartListItem>
        </Scroll>
</template>

<script>
    import CartListItem from "./CartListItem";
    import Scroll from "../../../components/common/scroll/Scroll";
    export default {
        name: "CartList",
        components:{
            CartListItem,
            Scroll
        },
        props:{
            itemList:{
                type:Array,
                default(){

                }
            }
        }
    }
</script>

<style scoped>
    .cart-list{
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 93px;
    }
</style>
