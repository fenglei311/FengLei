<template>
  <div>
    <div class="head flex flex-space-between flex-align-center">
      <van-icon name="chat-o" />
      <div>掌上新闻</div>
      <van-icon name="search" />
    </div>
    <van-tabs v-model="active">
      <van-tab title="推荐">
        <!-- vant轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in swipeimage" :key="index">
            <img class="swipe-image" :src="item.pic" @click="goto(item.url)" />
          </van-swipe-item>
        </van-swipe>
        <div
          class="list flex"
          v-for="(item, index) in list"
          :key="index"
          @click="goto(item.url)"
        >
          <img class="list-img" :src="item.pic" alt="" />
          <div class="flex1">
            <p class="two-txt mb10 c-f33">{{ item.title }}</p>
            <p class="c-f99">{{ item.time }}</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="郑州">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div
            class="list flex"
            v-for="(item, index) in list2"
            :key="index"
            @click="goto(item.url)"
          >
            <img class="list-img" :src="item.thumbnail_pic_s" alt="" />
            <div class="flex1">
              <p class="two-txt mb10 c-f33">{{ item.title }}</p>
              <p class="c-f99">{{ item.date }}</p>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="游戏">0000000000</van-tab>
      <van-tab title="社会">333333333333333</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import news1 from "./first";
import axios from "../axiosServer/index";

export default {
  data() {
    return {
      active: 0,
      swipeimage: news1.slice(9, 15),
      list: news1,
      page: 0,
      isLoading: false,
      list2: [] //空
    };
  },
  created() {
    // 返回;
    this.onRefresh();
  },
  methods: {
    onRefresh() {
      //上来++ 变成1 
      this.page++;
      //聚合就给了50.如果到50变成0，
      if (this.page == 50) this.page = 0;
      this.isLoading = true;
      axios({
        url: "/ft/toutiao/index",///ft
        method: "get",
        params: {
          page: this.page,
          page_size: 30,
          key: "98226f8d6b2c89432222edbbc5108336"
        }
      })
        .then(res => {
          try {
            this.list2 = res.data.result.data;
          } catch (error) {
            this.list2 = [];//如果报错直接清掉
          }
        })
        //
        .finally(() => {
          this.isLoading = false;
        });
    },
    //url错误提示
    goto(url) {
      if (!url) return this.$toast("当前新闻暂无链接！！");
      location.href = url;
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.swipe-image {
  width: 100%;
  height: 100%;
}
.box {
  font-size: 14px;
}


/* 如果宽度是由内容自适应撑开的，则overflow: auto;
   内容自动撑开容器的宽度不包括滚动条，相当于滚动条是一个和内容并列显示的组件。则
    overflow-y: scroll;
*/
.van-tabs__content {
  height: calc(100vh - 140px);
  overflow-y: scroll;
}
.head {
  height: 45px;
  background-color: #3480ff;
  padding: 0 10px;
  color: #ffffff;
}
.van-tabs__line {
  background-color: #3480ff !important;
}
.list {
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;
}
.list-img {
  height: 66px;
  width: 100px;
  margin-right: 20px;
}
.foot {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50px;
  justify-content: space-around;
  background-color: #f4f6f8;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 120px;
  height: 120px;
  text-align: center;
  background-color: #39a9ed;
}
.van-pull-refresh {
  height: 100%;
}

/* 弹性盒 */

.flex {
  display: flex;
}

.flex1 {
  flex: 1;
}

.flex2 {
  flex: 2;
}




.flex-space-between {
  justify-content: space-between;
}

.flex-align-center {
  align-items: center;
}

.flex-direction-column {
  flex-direction: column;
}

.flex-center {
  justify-content: center;
}

.flex-direction-r {
  flex-direction: row-reverse;
}

.space-between {
  justify-content: space-between;
}

.space-around {
  justify-content: space-around;
}

.mt10 {
  margin-top: 10px;
}

.mt20 {
  margin-top: 20px;
}

.mt30 {
  margin-top: 30px;
}

.mr10 {
  margin-right: 10px;
}

.mr30 {
  margin-right: 30px;
}

/* 强制改变（优先权） */
.mb0 {
  margin-bottom: 0 !important;
}

.mb17 {
  margin-bottom: 17px;
}

.mb10 {
  margin-bottom: 10px;
}

.mb15 {
  margin-bottom: 15px;
}

.mb20 {
  margin-bottom: 20px;
}

.mb30 {
  margin-bottom: 30px;
}

.mb40 {
  margin-bottom: 40px;
}

.ml10 {
  margin-left: 10px;
}

.pl20 {
  padding-left: 20px;
}

.pr20 {
  padding-right: 20px;
}

.c-404040 {
  color: #404040;
}

.c-ff {
  color: #ffffff;
}

.c-f66 {
  color: #666;
}

.c-f88 {
  color: #888;
}

.c-f33 {
  color: #333;
}

.c-f99 {
  color: #999;
}

.c-f252B3A {
  color: #252b3a;
}

.c-1D939A {
  color: #1d939a;
}

.f12 {
  font-size: 12px;
}

.f14 {
  font-size: 14px;
}

.f16 {
  font-size: 16px;
}

.f18 {
  font-size: 18px;
}

.f24 {
  font-size: 24px;
}

.f26 {
  font-size: 26px;
}

.f30 {
  font-size: 30px;
}

.f36 {
  font-size: 36px;
}

.fw400 {
  font-weight: 400;
}

.fw700 {
  font-weight: 700;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}

.tl {
  text-align: left;
}

.abs {
  position: absolute;
}

.rel {
  position: relative;
}



/* 第二行没展示完的字用。。。代替钓 */
.two-txt {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
