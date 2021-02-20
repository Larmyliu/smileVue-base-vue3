<template>
    <div class="container">
        <div class="search">
            <van-search v-model="value" placeholder="请输入搜索关键词" />
        </div>
        <!-- 轮播图 -->
        <!-- <banner :slides="homeData.slides"></banner> -->

        <div id="banner">
            <van-swipe :autoplay="3000" :duration="1500">
                <van-swipe-item v-for="item of slides" :key="item.goodsId">
                    <img :src="item.image" class="banner-img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 分类 -->
        <!-- <category v-if="homeData.advertesPicture" :category="homeData.category" :advertesPicture="homeData.advertesPicture.PICTURE_ADDRESS"></category> -->
        <div id="category">
            <ul v-show="category && category.length">
                <li v-for="(item, index) in category" :key="item.mallCategoryId">
                    <img :src="item.image" alt="" @click="clickCategory(item, index)" />
                    <p>{{ item.mallCategoryName }}</p>
                </li>
            </ul>
            <section class="ad">
                <img :src="advertesPicture" alt="" />
            </section>
        </div>
        <!-- 推荐商品 -->
        <!-- <recommend :recommend="homeData.recommend"></recommend> -->
        <!-- <div id="swiper-wrapper">
            <p class="title">商品推荐</p>
            <swiper :options="swiperOption">
                <swiper-slide class="recommend-item" v-for="item of recommend" :key="item.goodsId">
                    <img v-lazy="item.image" class="recommend-img" @click="goGoodsDetails(item)" />
                    <p class="name">{{ item.goodsName }}</p>
                    <p class="price">
                        <span class="code">￥</span>
                        <span class="mall-price">{{ item.mallPrice }}</span>
                        <span class="min-price">￥{{ item.price }}</span>
                    </p>
                    <div class="bottom-btn">
                        <section class="left" @click="addToShopCart(item.goodsId)">
                            <van-icon name="shopping-cart" />
                        </section>
                        <section class="right" @click="goGoodsDetails(item)">查看详情</section>
                    </div>
                </swiper-slide>
            </swiper>
        </div> -->
        <!-- 楼层商品 -->
        <!-- <div v-if="homeData.floorName">
            <floor v-for="(item, index) in Object.keys(homeData.floorName)" :key="index"
                :floorName="homeData.floorName[item]" :floor="homeData[item]" :num="index + 1">
            </floor>
        </div> -->
    </div>
</template>

<script lang='ts'>
    import {
        ref,
        onMounted,
        reactive
    } from 'vue';
    import {
        getHomeData
    } from "@/api/api.js"
    // export default defineComponent({
    //     name: 'ShoppingMall',
    //     data() {
    //         return {

    //         }
    //     },
    //     setup(){
    //         onMounted(async () => {

    //         })
    //     }
    // })
    export default {
        setup() {
            let slides = ref([])
            let category = ref([])
            let advertesPicture = ref()
            onMounted(async () => {
                const res = await getHomeData();
                console.log(res);
                slides.value = res.data.result.slides
                category.value = res.data.result.category
                advertesPicture.value = res.data.result.advertesPicture.PICTURE_ADDRESS
            })
            return {
                slides,
                category,
                advertesPicture
            }
        }
    }
</script>
<style scoped lang='less'>
    #banner {
        height: 0;
        padding-bottom: 53%;
        overflow: hidden;

        .banner-img {
            width: 100%;
            height: 200px;
        }
    }

    #category {
        background: #EEEEEE;
        padding: 15px 0;

        ul {
            display: flex;
            flex-wrap: wrap;
            width: 95%;
            margin: 0 auto;
            padding: 15px 0px 7px 0px;
            box-sizing: border-box;
            background: #fff;
            border-radius: 10px;
            box-shadow: 3px 4px 20px rgba(45, 45, 45, .15);

            li {
                width: calc((1 / 5) * 100%);
                text-align: center;

                img {
                    width: 70%;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 14px;
                }
            }
        }

        .ad {
            width: 100%;
            margin-top: 10px;

            img {
                width: 100%;
            }
        }
    }
</style>