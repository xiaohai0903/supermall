<template>
    <div class="detail">
        <DetailNavBar :current-index="currentIndex" @titleClick="selectIndex"></DetailNavBar>
        <Scroll class="content"
                :probe-type="3"
                ref="scroll"
                :pull-up-load="true"
                @pullingUp="loadMore"
                :data="[]"
                @scroll="contentScroll"
        >
            <DetailSwiper :images="topImage"></DetailSwiper>
            <DetailBaseInfo :goods="goods"></DetailBaseInfo>
            <DetailShopInfo :shop-info="shop"></DetailShopInfo>
            <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
            <DetailParamInfo :param-info="paramInfo" ref="param"></DetailParamInfo>
            <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
            <GoodsList :goods="showGoodsList" ref="recommend"></GoodsList>
        </Scroll>
        <BackTop @click.native="backClick" v-show="showBackTop"></BackTop>
        <DetailBottomBar @addToCart="_addToCart"></DetailBottomBar>
        <Toast ref="toast"></Toast>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "../../components/content/backTop/BackTop";
    import Scroll from "../../components/common/scroll/Scroll";

    import {getDetail,getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
    import {getProductData} from "../../network/home";
    import {POP} from "../../common/const";
    import {mapActions} from 'vuex'


    import Toast from "../../components/common/toast/Toast";
    export default {
        name: "Detail",
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            BackTop,
            Toast,
            Scroll
        },
        data(){
            return{
                iid:'',
                topImage:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:[],
                goodsList:[],
                showBackTop:false,
                currentIndex:0,
                offSetTop:[],
                recommend:{
                    'pop':{page:1 , list:[]}
                },
            }
        },
        created() {
            this.iid = this.$route.query.iid

            this._getDetail(this.iid)

            this._getProductData(POP)

            this._getRecommend()

        },
        computed:{
            showGoodsList() {
                return this.recommend['pop'].list
            }
        },
        methods:{
            ...mapActions({
                addCart: 'addToCart'
            }),
            _getDetail(iid){
                getDetail(iid).then(res => {
                    const data = res.result
                    console.log(data);

                    this.topImage = data.itemInfo.topImages

                    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                    this.detailInfo = data.detailInfo

                    this.shop = new Shop(data.shopInfo)

                    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                    if(data.rate.list !==0){
                        this.commentInfo = data.rate.list
                    }
                })
            },
            _getRecommend(){
              getRecommend().then(res =>{
                    this.goodsList = res.data.list
              })
            },
            _getProductData(type) {
                // 获取页码
                const page = this.recommend[type].page
                getProductData(type, page).then(res => {
                    const newList = res.data.list
                    this.recommend[type].list.push(...newList)
                    this.recommend[type].page += 1

                    // 完成加载更多数据
                    this.$refs.scroll.finishedPullUp()
                })
            },
            loadMore() {
                this._getProductData(POP)
            },
            //回到顶部
            backClick(){
                this.$refs.scroll.scrollTo(0,0, 1500)
            },
            //滚轮的方法调用
            contentScroll(position){
                this.showBackTop = position.y <=-1000
                this.listenScroll(-position.y)
            },
            imageLoad(){
                this.$refs.scroll.refresh()
                this.offSetTop.push(0)
                this.offSetTop.push(this.$refs.param.$el.offsetTop)
                this.offSetTop.push(this.$refs.comment.$el.offsetTop)
                this.offSetTop.push(this.$refs.recommend.$el.offsetTop)
            },
            selectIndex(index){
                this.$refs.scroll.scrollTo(0,-this.offSetTop[index],0)
            },
            listenScroll(position){
                for(let i=0; i<this.offSetTop.length;i++){
                    if(position>=this.offSetTop[i] && position< this.offSetTop[i+1]){
                        if (this.currentIndex !== i) {
                            this.currentIndex = i;
                        }
                        break
                    }else {
                        this.currentIndex=3
                    }

                }
            },
            _addToCart(){
                const obj ={}
                obj.iid =this.iid
                obj.imgURL = this.topImage[0]
                obj.title = this.goods.title
                obj.desc = this.goods.desc
                obj.price = this.goods.realPrice


                this.addCart(obj).then(() =>{
                    this.$toast({message:'+1'})
                }).catch(res =>{
                    this.$toast({message: '加入购物车'})
                })
            }
        }
    }
</script>

<style scoped>
    .detail{
        height: 100vh;
        position: relative;
        background-color: #fff;
    }
    .content{
        position: absolute;
        top: 44px;
        bottom: 58px;
        left: 0;
        right: 0;
    }

</style>
