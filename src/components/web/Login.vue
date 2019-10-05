<template>
  <el-card class="box-card" style="width: 400px;height:300px;margin: 200px 500px 300px">
    <el-form :model="formData" status-icon ref="formData" label-width="80px" style="padding-top: 50px">
      <el-form-item prop="userName" label="用户名:">
        <el-input
          v-model="formData.phone"
          placeholder="请输入电话号码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>

      <el-button
        style="width: 40%;margin-left: 120px"
        type="primary"
        @click="login">
        登录
      </el-button>
    </el-form>
  </el-card>

</template>

<script>
  import { hotelUserApi } from '../admin/hotelUser/api';
  import db from "@/store/user/db";
  export default {
    name: "login",
    data() {
      return{
        formData: {
          phone: '',
          password: ''
        },
      }
    },

    methods: {
      login() {
        const params = {
          ...this.formData
        };
        hotelUserApi.login(params).then(res => {
          db.set('user', res.data);
          db.set('login', true);
          this.$router.push('/home');
          this.$router.go(0);
        }).catch((err) => {
          this.$message.error(err.message);
        })

      },


    }
  }
</script>

<style scoped>

</style>
