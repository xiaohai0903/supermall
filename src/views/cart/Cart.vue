<template>
    <div>
        <NavBar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></NavBar>
        <CartList :item-list="cartList"></CartList>
        <CartBottomBar></CartBottomBar>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";

    import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        components:{
            NavBar,
            CartList,
            CartBottomBar
        },
        computed:{
            ...mapGetters([
                'cartLength',
                'cartList'
            ])
        }
    }
</script>

<style scoped>
    .nav-bar{
        background-color: var(--color-high-text);
        color: #fff;
        font-weight: 700;
    }
</style>
