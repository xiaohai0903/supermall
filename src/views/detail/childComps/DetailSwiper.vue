<template>
    <Swiper>
        <SwiperItem v-for="(item, index) in images" :key="index">
            <img :src="item" alt="" class="img-item">
        </SwiperItem>
    </Swiper>
</template>

<script>

    import SwiperItem from "../../../components/common/swiper/SwiperItem";
    import Swiper from "../../../components/common/swiper/Swiper";

    export default {
        name: "DetailSwiper",
        components:{
            SwiperItem,
            Swiper
        },
        props:{
            images:{
                type:Array,
                default:[]
            }
        }
    }
</script>

<style scoped>
    .img-item{
        height: 300px;
    }
</style>
