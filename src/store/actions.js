const actions ={
    addToCart({state, commit},info){
        return new Promise((resolve, reject)=>{
            const oldInfo = state.cartList.find(item =>item.iid === info.iid)

            if(oldInfo){
                const index =state.cartList.indexOf(oldInfo)
                commit('incrementCount', index)
                resolve()
            }else {
                info.counts = 1
                info.checked = true
                commit('addToCart',info)
                reject()
            }

        })
    }
}
//
// const actions={
//     addToCart({state,commit}, info){
//         const oldInfo = state.cartList.find(item =>item.iid === info.iid)
//
//             if(oldInfo){
//                 const index =state.cartList.indexOf(oldInfo)
//
//                 return '1'
//                 commit('incrementCount', index)
//
//
//             }else {
//                 info.count = 1
//                 return '2'
//                 commit('addToCart',info)
//
//             }
//         }
//     }


export default actions
