<template>
    <div class="bottom-bar">
        <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :value="isSelectALL"></CheckButton>
        <span>全选</span>
        <span class="total-price">合计：￥({{totalPrice}})</span>
        <span class="buy-product">去结算{{cartLength}}</span>
    </div>
</template>

<script>
    import CheckButton from "./CheckButton";
    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cartList','cartLength']),
            totalPrice(){
                const cartList = this.cartList
                return cartList.filter(item =>{
                    return item.checked
                }).reduce((preValue, item) =>{
                    return preValue+item.counts * item.price
                },0).toFixed(2)
            },
            isSelectALL(){
                let isSelectAll  = this.cartList.find(item =>{
                    return  !item.checked
                })
                if(isSelectAll){
                   return false
                }else {
                    return true
                }
            }
        },
        methods:{
            checkBtnClick(){
                let isSelectAll  = this.cartList.find(item =>{
                   return  !item.checked
                })
                if(isSelectAll){
                    this.cartList.forEach(item =>{
                        item.checked = true
                    })
                }else {
                    this.cartList.forEach(item =>{
                        item.checked =false
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        width: 100%;
        height: 44px;
        background-color: #eee;
        position: fixed;
        bottom: 49px;
        left: 0;
        box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
        font-size: 14px;
        color: #888;
        line-height: 44px;
        padding-left: 35px;
        box-sizing: border-box;
    }
    .bottom-bar .select-all{
        position: absolute;
        line-height: 0;
        left: 12px;
        top: 13px;
    }
    .bottom-bar .total-price{
        margin-right: 15px;
        font-size: 16px;
        color: #666;
    }
    .bottom-bar .buy-product{
        background-color: orangered;
        color: #fff;
        width: 100px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        float: right;
    }
</style>
