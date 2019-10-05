<template>
  <div>
    <div id="swiper">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="../../assets/images/img4.jpg" height="460"/></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/img5.jpg" height="460"/></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/img6.jpg" height="460"/></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/img7.jpg" height="460"/></van-swipe-item>
      </van-swipe>
    </div>

    <p class="sub-title">-&nbsp;&nbsp;&nbsp; 酒店房间 &nbsp;&nbsp;&nbsp; - </p>

    <div style="margin-top: 40px">
      <at-card style="width: 300px;float: left;margin-left: 43px" :body-style="{ padding: 0 }">
        <div>
          <img src="../../assets/images/room1.jpg" height="150" width="300"/>
          <div style="padding: 25px;text-align:center ">
            <p>经济舒适单人间</p>
          </div>
          <div style="text-align: center;">
            <p style="color: red">¥ 199</p>
          </div>
        </div>
      </at-card>
      <at-card style="width: 300px;float: left;margin-left: 43px" :body-style="{ padding: 0 }">
        <div>
          <img src="../../assets/images/room2.jpg" height="150" width="300"/>
          <div style="padding: 25px;text-align:center ">
            <p>商务双人间</p>
          </div>
          <div style="text-align: center;">
            <p style="color: red">¥ 299</p>
          </div>
        </div>
      </at-card>
      <at-card style="width: 300px;float: left;margin-left: 43px" :body-style="{ padding: 0 }">
        <div>
          <img src="../../assets/images/room3.jpg" height="150" width="300"/>
          <div style="padding: 25px;text-align:center ">
            <p>豪华单人间</p>
          </div>
          <div style="text-align: center;">
            <p style="color: red">¥ 599</p>
          </div>
        </div>
      </at-card>
      <at-card style="width: 300px;float: left;margin-left: 43px" :body-style="{ padding: 0 }">
        <div>
          <img src="../../assets/images/room4.jpg" height="150" width="300"/>
          <div style="padding: 25px;text-align:center ">
            <p>豪华总统套房</p>
          </div>
          <div style="text-align: center;">
            <p style="color: red">¥ 1999</p>
          </div>
        </div>
      </at-card>
    </div>

    <p class="sub-title" style="clear: both;padding-top: 50px">-&nbsp;&nbsp;&nbsp; 留言 &nbsp;&nbsp;&nbsp; - </p>

    <el-carousel style="margin-top: 40px;text-align: center;clear: both" :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in hotelComment" :key="item.id">
        <p class="medium">{{ item.commentContent }}</p>
        <p>一&nbsp;&nbsp;{{ item.uerName }},&nbsp;&nbsp;{{ item.commentTime }}</p>
      </el-carousel-item>
    </el-carousel>

    <div style="margin-top: 50px;text-align: center;clear: both">
      <p>2019@dh</p>
      <p>地址：重庆理工大学竹轩A530</p>
    </div>
  </div>
</template>

<script>
  import {hotelCommentApi} from '../../components/admin/hotelComment/api';

  export default {
    name: "home",
    data() {
      return {

        hotelComment: [],
        page: 1,
        pageSize: 30,
        totalCount: 0,
      }
    },

    mounted() {
      this.getHotelCommentList();
    },

    methods: {
      getHotelCommentList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
        };
        hotelCommentApi.getHotelCommentList(params).then(res => {
          this.hotelComment = res.data;
        })
      },
    }
  }
</script>

<style scoped>
  #swiper {
    width: 100%;
    background-color: gray;
    padding: 0px 20px 0px 20px;
    height: 460px;
  }

  .sub-title {
    margin-top: 35px;
    text-align: center;
    font-size: 25px;
  }

  .el-carousel__item p {
    text-align: center;
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 30px;
    padding: 30px 30px 0px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
