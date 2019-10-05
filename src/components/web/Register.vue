<template>
  <el-card class="box-card" style="width: 400px;height:400px;margin: 150px 500px 300px">
    <el-form :model="formData" status-icon ref="formData" label-width="80px" style="padding-top: 50px">
      <el-form-item prop="phone" label="电话号码:">
        <el-input
          v-model="formData.phone"
          placeholder="请输入电话号码">
        </el-input>
      </el-form-item>
      <el-form-item prop="userName" label="用户名:">
        <el-input
          v-model="formData.userName"
          placeholder="请输入用户名">
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
      <el-form-item prop="idNumber" label="身份证号:">
        <el-input
          v-model="formData.idNumber"
          placeholder="请输入身份证号">
        </el-input>
      </el-form-item>
      <el-button
        style="width: 40%;margin-left: 120px"
        type="primary"
        @click="Register">
        注册
      </el-button>
    </el-form>
  </el-card>
</template>

<script>
  import {hotelUserApi} from '../../components/admin/hotelUser/api';
  export default {
    name: "register",
    data() {
      return{
        formData: {
          userName: '',
          password: '',
          idNumber:'',
          phone:'',
        },
      }
    },

    methods:{
      Register() {
        const params = {
          ...this.formData,
        };
        hotelUserApi.Register(params).then(res => {
          this.$router.push('/home');
          this.$router.go(0);
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },
    }

  }
</script>

<style scoped>

</style>
