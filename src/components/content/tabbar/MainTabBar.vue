<template>
    <div>
        <TarBar>
            <TarBarItem path="/home">
                <img src="@/assets/img/tabbar/home.svg" alt="" slot="item-icon">
                <img src="@/assets/img/tabbar/home_active.svg" slot="item-active-icon" alt="">
                <span slot="item-text">首页</span>
            </TarBarItem>
            <TarBarItem path="/category">
                <img src="@/assets/img/tabbar/category.svg" alt="" slot="item-icon">
                <img src="@/assets/img/tabbar/category_active.svg" slot="item-active-icon" alt="">
                <span slot="item-text">分类</span>
            </TarBarItem>
            <TarBarItem path="/cart">
                <img src="@/assets/img/tabbar/shopcart.svg" alt="" slot="item-icon">
                <img src="@/assets/img/tabbar/shopcart_active.svg" slot="item-active-icon" alt="">
                <span slot="item-text">购物车</span>
            </TarBarItem>
            <TarBarItem path="/profile">
                <img src="@/assets/img/tabbar/profile.svg" alt="" slot="item-icon">
                <img src="@/assets/img/tabbar/profile_active.svg" slot="item-active-icon" alt="">
                <span slot="item-text">我的</span>
            </TarBarItem>
        </TarBar>
    </div>
</template>

<script>
    import TarBar from "../../common/tabbar/TarBar";
    import TarBarItem from "../../common/tabbar/TarBarItem";
    export default {
        name: "MainTabBar",
        components:{
            TarBar,
            TarBarItem
        }
    }
</script>

<style scoped>

</style>
