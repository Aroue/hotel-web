<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo">
    <router-link :to="'/admin/hotelUser'">
      <el-menu-item style="padding-left: 30px" index="1">
        <i class="el-icon-edit"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/hotelRoomType'">
      <el-menu-item style="padding-left: 30px" index="2">
        <i class="el-icon-edit"></i>
        <span slot="title">房型管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/hotelRoom'">
      <el-menu-item style="padding-left: 30px" index="3">
        <i class="el-icon-edit"></i>
        <span slot="title">房间管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/hotelOrder'">
      <el-menu-item style="padding-left: 30px" index="4">
        <i class="el-icon-edit"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/checkInPerson'">
      <el-menu-item style="padding-left: 30px" index="7">
        <i class="el-icon-edit"></i>
        <span slot="title">入住人管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/hotelComment'">
      <el-menu-item style="padding-left: 30px" index="5">
        <i class="el-icon-edit"></i>
        <span slot="title">留言管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/hotelAdministrator'">
      <el-menu-item style="padding-left: 30px" index="6">
        <i class="el-icon-edit"></i>
        <span slot="title">管理员管理</span>
      </el-menu-item>
    </router-link>

  </el-menu>
</template>

<script>
  export default {
    name: "SliderBarMenu",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
