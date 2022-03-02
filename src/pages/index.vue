<template>
  <div class="box">
    <router-view></router-view>
    <div class="foot flex flex-align-center">
      <div class="tc mr30">
        <router-link :to="{ path: '/toutiao' }">
          <van-icon name="wap-home-o" />
          <div>
            头条
          </div>
        </router-link>
      </div>
      <div class="tc">
        <router-link :to="{ path: '/xingzuo' }">
          <van-icon name="like-o" />
          <div>
            星座
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.router-link-active {
  text-decoration: none;
  color: #3480ff;
}
a {
  text-decoration: none;
  color: #333;
}
.box {
  font-size: 14px;
}

.foot {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50px;
  justify-content: space-around;
  background-color: #f4f6f8;
}

.flex {
  display: flex;
}

.flex-align-center {
  align-items: center;
}
</style>
