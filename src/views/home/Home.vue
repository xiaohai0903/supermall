<template>
	<div id="home">
		<NavBar class="home-nav">
			<div slot="center"> 购物街</div>
		</NavBar>
		<Scroll class="content" ref='scroll' :probe-type="3" @scroll="contentScroll">
			<Swiper>
				<SwiperItem v-for="(item,index) in banners" :key='index' >
					<a :href="item.link">
						<img :src="item.image" alt="">
					</a>
				</SwiperItem>
			</Swiper>
			<RecommendView :recommends="recommends"></RecommendView>
			<FeatureView></FeatureView>
			<TabControl :titles="['流行', '热销', '上新']" class="tab-control"
			@tabClick="tabClick"
			></TabControl>
			<GoodsList :goods="showGoods"></GoodsList>
			
		</Scroll>
		<BackTop @click.native="backClick" v-show="isshowBack"></BackTop>
	</div>
	
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar.vue'
	import {getHomeMultidata,getHomeGoods}  from "@/network/home.js"
	// import Swiper from '@/components/common/swiper/Swiper.vue'
	// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
	import {Swiper, SwiperItem} from '@/components/common/swiper/index.js'
	
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	import TabControl from '@/components/content/tabControl/TabControl.vue'
	import GoodsList from '@/components/content/goods/GoodsList.vue'
	import Scroll from '@/components/common/scroll/Scroll.vue'
	import BackTop from '@/components/content/backTop/BackTop.vue'
	
	export default{
		name:'Home',
		components:{
			NavBar,
			Swiper,
			SwiperItem,
			RecommendView,
			FeatureView,
			TabControl,
			getHomeGoods,
			GoodsList,
			Scroll,
			BackTop
		},
		data(){
			return{
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0, list:[]},
					'sell':{page:0, list:[]},
					'new':{page:0, list:[]}
					},
				currentType:'pop',
				isshowBack:false
				}	
			 },
		created(){
			this.getHomeMultidata()
			
			this.getHomeGoods('pop')
			this.getHomeGoods('sell')
			this.getHomeGoods('new')
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
			
		},
		methods:{
			getHomeMultidata(){
				getHomeMultidata().then(res =>{
					// console.log(res)
					this.banners = res.data.banner.list;
					this.recommends=res.data.recommend.list;
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page+1
				getHomeGoods(type, page).then(res =>{
					const newList =res.data.list
					this.goods[type].list.push(...newList)
					this.goods[type].page +=1
				})
			},
			//事件监听相关方法
			tabClick(index){
				switch(index){
					case 0:
					this.currentType ='pop'
					break
					case 1:
					this.currentType ='sell'
					break
					case 2:
					this.currentType ='new'
			}
		},
		backClick(){
			this.$refs.scroll.scrollTo(0,0,500)
		},
		contentScroll(position){
			this.isshowBack =(-position.y) >1000
		}
	}
}
</script>

<style scoped>
	#home{
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #F6F6F6;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	.tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	}
	/* .content{
		height: calc(100% - 49px);
		margin-top: 44px;
	} */
	.content{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
		
	}
</style>
