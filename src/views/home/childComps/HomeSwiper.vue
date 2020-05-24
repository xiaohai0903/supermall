<template>
    <Swiper v-if="banners.length">
        <SwiperItem v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </SwiperItem>
    </Swiper>
</template>

<script>
    import Swiper from "../../../components/common/swiper/Swiper";
    import SwiperItem from "../../../components/common/swiper/SwiperItem";
    export default {
        name: "HomeSwiper",
        components:{
            Swiper,
            SwiperItem
        },
        props:{
            banners:{
                type:Array,

            }
        },
        data(){
            return{
                isLoaded:false
            }
        },
        methods:{
            startTimer() {
                this.$refs.swiper && this.$refs.swiper.startTimer()
            },
            stopTimer() {
                this.$refs.swiper && this.$refs.swiper.stopTimer()
            },
            imageLoad(){
                if(!this.isLoaded){
                    this.$emit('swiperLoaded')
                    this.isLoaded =true
                }
            }

        }
    }
</script>

<style scoped>

</style>
