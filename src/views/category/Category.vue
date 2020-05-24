<template>
    <div id="category">
        <NavBar class="category-title">
            <div slot="center">商品分类</div>
        </NavBar>
        <div class="content">
            <TabMenu :table-list="categories" @selectItem="selectItem"></TabMenu>
            <Scroll id="tab-content" ref="scroll" :data="[categoryData]">
                <div>
                    <TabContentCategory :subcategories="showSubcategory"></TabContentCategory>
                </div>
            </Scroll>
        </div>

    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar"
    import TabMenu from "./childComps/TabMenu";
    import TabContentCategory from "./childComps/TabContentCategory";

    import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category";
    import Scroll from "../../components/common/scroll/Scroll";

    export default {
        name: "Category",
        components:{
            NavBar,
            TabMenu,
            TabContentCategory,
            Scroll
        },
        data(){
          return{
              categories:[],
              categoryData:{},
              currentIndex:-1,
          }
        },
        created() {
            this._getCategory()

            this.$bus.$on('imgLoad', () => {
                this.$refs.scroll.refresh()
            })
        },
        computed:{
            showSubcategory(){
                if (this.currentIndex === -1) return {}
                return this.categoryData[this.currentIndex].subcategories
            }
        },
        methods:{
            _getCategory(){
                getCategory().then(res =>{
                    this.categories =res.data.category.list
                    for (let i =0; i<this.categories.length; i++){
                        this.categoryData[i] = {
                            subcategories: {}
                        }
                    }
                    console.log(this.categoryData)
                    this._getSubcategory(0)
                })
            },
            _getSubcategory(index){
                this.currentIndex =index
                const mailKey = this.categories[index].maitKey
                getSubcategory(mailKey).then(res =>{
                    this.categoryData[index].subcategories = res.data
                    console.log(this.categoryData)
                    this.categoryData = {...this.categoryData}
                    console.log(this.categoryData)
                })
            },
            selectItem(index){
                this._getSubcategory(index)
            }
        }
    }
</script>

<style scoped>
    #category{
        height: 100vh;
    }
    .category-title{
        background-color: var(--color-high-text);
        font-weight: 700;
        color: #fff;
    }
    .content{
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 49px;
        display: flex;
    }
    #tab-content{
        height: 100%;
        flex: 1;
    }
</style>
