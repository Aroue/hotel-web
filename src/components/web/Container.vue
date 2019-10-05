<template>
  <el-container>
    <el-header>
      <img id="logo" src="../../assets/images/logo.png" height="40" width="150"/>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <router-link :to="'/home'">
            首页
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="'/book'">
            预定
          </router-link>
        </el-menu-item>
        <el-menu-item v-if="this.login === false || this.login === null" index="3">
          <router-link :to="'/login'">
            登陆
          </router-link>
        </el-menu-item>
        <el-submenu v-if="this.login === true" index="3">
          <template slot="title"> <i style=" margin-bottom: 4px;" class="el-icon-user-solid"></i>{{user.userName}}</template>
          <el-menu-item index="3-1">
            <router-link :to="'/personalCenter'">
              个人中心
            </router-link>
          </el-menu-item>
          <el-menu-item index="3-2" @click="logout">退出</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <router-link :to="'/register'">
            注册
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>

      <router-view>
      </router-view>

    </el-main>
  </el-container>
</template>

<script>
  import db from "@/store/user/db";
  export default {
    name: "Container",
    components: {

    },
    data() {
      return {
        activeIndex: '1',
        login: db.get('login'),
        user: db.get('user'),

      };
    },

    watch: {
      login: db.get('login'),
      user:db.get('user'),
    },

    methods: {

      logout() {
        db.remove('login');
        db.remove('user');
        this.$router.push('/home');
        this.$router.go(0);
      }

    }

  }
</script>

<style scoped>
  .el-header {
    background-color: #545c64;
    color: #545c64;
    /*text-align: center;*/
    height: 50px;

  }

  #logo {
    float: left;
    margin-left: 3%;
    margin-top: 10px;
  }

  .el-menu {
    float: left;
    margin-left: 60%;
  }

  #swiper {
    width: 100%;
    background-color: gray;
    padding: 0px 20px 0px 20px;
    height: 460px;
  }

  #sub-title {
    margin-top: 35px;
    text-align: center;
    font-size: 25px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
    padding: 0 0;
  }

  .el-container {
    margin: 0;
    height: 100%;
  }
</style>
