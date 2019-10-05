<template>
  <el-container>
    <el-header>
      <img id="logo" src="../../assets/images/logo.png" height="40" width="150"/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SliderBarMenu></SliderBarMenu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import SliderBarMenu from './SliderBarMenu';

  export default {
    name: "AdminContainer",
    components: {
      SliderBarMenu
    },
    data() {
      return {

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
    margin-left: 1%;
    margin-top: 10px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
    /*padding: 0 0;*/
  }

  .el-container {
    margin: 0;
    height: 100%;
  }
</style>
