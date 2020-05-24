<template>
    <div id="home">
        <NavBar class="nav-bar">
            <div slot="center"><span>购物车</span></div>
        </NavBar>
        <TabControl @tabClick="tabClick" v-show="showTabControl" class="tab-control"></TabControl>
        <Scroll class="content"
                :probe-type="3"
                :pull-up-load="true"
                :data="[showGoodsList]"
                @pullingUp="loadMore"
                @scroll="contentScroll"
                ref="scroll">
            <HomeSwiper :banners="banners"></HomeSwiper>
            <RecommendView :recommends="recommends"></RecommendView>
            <FeatureView></FeatureView>
            <TabControl @tabClick="tabClick" ref="contentTab"></TabControl>
            <GoodsList :goods="showGoodsList"></GoodsList>
        </Scroll>
        <BackTop @click.native="backClick" v-show="showBackTop"></BackTop>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";

    import {getMultiData, getProductData} from "../../network/home";
    import {TOP_DISTANCE,POP,NEW,SELL} from "../../common/const";

    export default {
        name: "Home",

        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data(){
            return{
                banners:[],
                recommends:[],
                goods:{
                    'pop': {page: 1, list: []},
                    'new': {page: 1, list: []},
                    'sell': {page: 1, list: []},
                },
                currentType: POP,
                showTabControl:false,
                tabOffsetTop:0,
                saveY:0,
                showBackTop:false
            }
        },
        computed:{
            showGoodsList(){
              return this.goods[this.currentType].list
          }
        },
        created() {
            this._getMultiData()

            this._getProductData(POP)
            this._getProductData(NEW)
            this._getProductData(SELL)
            this.$bus.$on('imgLoad', () => {
                this.$refs.scroll.refresh()
            })

        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 500)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY =this.$refs.scroll.scrollY
        },
        methods:{
            _getMultiData(){
                getMultiData().then(res =>{
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            _getProductData(type){
                const page = this.goods[type].page
                getProductData(type, page).then(res =>{
                    const newList = res.data.list
                    this.goods[type].list.push(...newList)
                    this.goods[type].page +=1

                    this.$refs.scroll.finishedPullUp()
                })
            },
            loadMore(){
                this._getProductData('pop')
            },
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType = POP
                        break
                    case 1:
                        this.currentType =NEW
                        break
                    case 2:
                        this.currentType =SELL
                        break
                }
            },
            contentScroll(position){
                this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop
                // this.showBackTop = position.y <= -TOP_DISTANCE
                // this.showTabControl = position.y <= -this.tabOffsetTop
                this.showTabControl = position.y <= -this.tabOffsetTop
                this.showBackTop = position.y <= -TOP_DISTANCE
            },
            backClick(){
                    this.$refs.scroll.scrollTo(0,0, 1500)
            }
        }
    }
</script>

<style scoped>
    #home{
        height: 100vh;
        position: relative;
    }
    .nav-bar{
        background-color: #ff8198;
    }
    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
</style>
