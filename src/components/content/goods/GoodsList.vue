<template>
	<div class="goods">
		<GoodsListItem v-for="(item,index) in goods" :key="index" :goodsItem="item" class="item"></GoodsListItem>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	export default{
		name:"GoodsList",
		components:{
			GoodsListItem
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

<style>
	.goods{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 2px;
	}
	.goods .item{
		width: 48%;
	}
	
</style>
