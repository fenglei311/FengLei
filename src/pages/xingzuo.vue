<template>
  <div>
    <div class="head flex flex-center flex-align-center">
      <div>星座测试</div>
    </div>
    <van-field
      readonly
      clickable
      :value="xingzuo"
      label="星座选择："
      placeholder="点击选择星座"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <van-field
      readonly
      clickable
      :value="type"
      label="时间选择："
      placeholder="点击选择时间"
      @click="showtype = true"
    />
    <van-popup v-model="showtype" position="bottom">
      <van-picker
        show-toolbar
        :columns="typeList"
        @confirm="onConfirmType"
        @cancel="showtype = false"
      />
    </van-popup>
    <div class="p20">
      <van-button
        round
        type="info"
        :loading="isLoading"
        loading-text="查询中..."
        size="normal"
        @click="submit"
        block
        >提交</van-button
      >
    </div>

    <!-- 今天明天 -->


    <div
      class="res"
      v-if="hasResult && ['today', 'tomorrow'].includes(typeValue)"
    >
      <p><span class="title">星座名称：</span>{{ result.name }}</p>
      <p><span class="title">日期：</span>{{ result.datetime }}</p>
      <p><span class="title">综合指数：</span>{{ result.all }}</p>
      <p><span class="title">幸运色：</span>{{ result.color }}</p>
      <p><span class="title">健康指数：</span>{{ result.health }}</p>
      <p><span class="title">爱情指数：</span>{{ result.love }}</p>
      <p><span class="title">财运指数：</span>{{ result.money }}</p>
      <p><span class="title">幸运数字：</span>{{ result.number }}</p>
      <p><span class="title">速配星座：</span>{{ result.QFriend }}</p>
      <p><span class="title">今日概述：</span>{{ result.summary }}</p>
      <p><span class="title">工作指数：</span>{{ result.work }}</p>
    </div>


    <!-- 本周 -->


    <div class="res" v-if="hasResult && ['week'].includes(typeValue)">
      <p><span class="title">星座名称：</span>{{ result.name }}</p>
      <p><span class="title">日期：</span>{{ result.date }}</p>
      <p><span class="title">健康指数：</span>{{ result.health }}</p>
      <p><span class="title">爱情指数：</span>{{ result.love }}</p>
      <p><span class="title">财运指数：</span>{{ result.money }}</p>
      <p><span class="title">工作指数：</span>{{ result.work }}</p>
    </div>


    <!-- 本月 -->


    <div class="res" v-if="hasResult && ['month'].includes(typeValue)">
      <p><span class="title">星座名称：</span>{{ result.name }}</p>
      <p><span class="title">日期：</span>{{ result.date }}</p>
      <p><span class="title">综合运势：</span>{{ result.all }}</p>
      <p><span class="title">健康指数：</span>{{ result.health }}</p>
      <p><span class="title">爱情指数：</span>{{ result.love }}</p>
      <p><span class="title">财运指数：</span>{{ result.money }}</p>
      <p><span class="title">工作指数：</span>{{ result.work }}</p>
    </div>

    
    <!-- 本年 -->


    <div class="res" v-if="hasResult && ['year'].includes(typeValue)">
      <p><span class="title">星座名称：</span>{{ result.name }}</p>
      <p><span class="title">日期：</span>{{ result.date }}</p>
      <p><span class="title">年度密码：</span>{{ result.mima.info + ":" + result.mima.text[0]  }}</p>
      <p><span class="title">事业运：</span>{{ result.career[0] }}</p>
      <p><span class="title">感情运：</span>{{ result.love[0] }}</p>
      <p><span class="title">财运：</span>{{ result.finance[0] }}</p>
    </div>
  </div>
</template>
<script>
import axios from "../axiosServer/index";
export default {
  data() {
    return {
      xingzuo: "",
      columns: [
        "白羊座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "狮子座",
        "处女座",
        "天秤座",
        "天蝎座",
        "射手座",
        "摩羯座",
        "水瓶座",
        "双鱼座"
      ],
      showPicker: false,

      type: "",
      typeList: ["今天", 
        "明天", 
        "本周", 
        "本月", 
        "本年"
      ],
      showtype: false,
      isLoading: false,
      typeValue: "",
      hasResult: false,
      result: {}
    };
  },
  methods: {
    onConfirm(value) {
      this.xingzuo = value;
      this.showPicker = false;
      console.log(value);
    },
    onConfirmType(value) {
      this.type = value;
      switch (value) {
        case "今天":
          this.typeValue = "today";
          break;
        case "明天":
          this.typeValue = "tomorrow";
          break;
        case "本周":
          this.typeValue = "week";
          break;
        case "本月":
          this.typeValue = "month";
          break;
        case "本年":
          this.typeValue = "year";
          break;
      }
      this.showtype = false;
      console.log(value);
    },
    submit() {
      if (this.isLoading) return;
      if (!this.typeValue) return this.$toast("请选择时间类型");
      if (!this.xingzuo) return this.$toast("请选择星座");
      this.isLoading = true;
      this.hasResult = false;
      axios({
        url: "/xz/constellation/getAll",
        method: "get",
        params: {
          consName: this.xingzuo,
          type: this.typeValue,
          key: "09e687ab03a9df5e5c4739fe1b25d970"
        }
      })
        .then(res => {
          this.result = res.data;
          this.hasResult = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style>
.van-loading--vertical {
  color: #3480ff;
  z-index: 999;
}
.head {
  height: 45px;
  background-color: #3480ff;
  padding: 0 10px;
  color: #ffffff;
  justify-content: center;
  margin-bottom: 20px;
}
.van-cell--clickable {
  background: #e1e1e1;
  background: rgba(52, 128, 255, 0.1);
}
.mt20 {
  margin-top: 20px;
}
.p20 {
  padding: 20px 40px;
}
.res {
  padding: 20px;
  color: #999;
  height: 350px;
  overflow-y: scroll;
}
.res p {
  margin-bottom: 10px;
}
.title {
  color: #333;
}
</style>
