
const mutations  ={
    addToCart(state, goods){
        state.cartList.push(goods)
    },
    incrementCount(state, index){
        state.cartList[index].counts +=1
    }
}


export default mutations
