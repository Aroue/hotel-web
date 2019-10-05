<template>
  <div style="width: 100%">
    <el-form :inline="true" ref="params" :model="params" label-width="80px" style="padding-top: 15px">
      <el-form-item label="用户姓名:">
        <el-input clearable @clear="getUserList" style="width: 150px;" size="mini" v-model="params.userName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码:">
        <el-input clearable @clear="getUserList" style="width: 150px;" size="mini" v-model="params.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号:">
        <el-input clearable @clear="getUserList" style="width: 200px;" size="mini" v-model="params.idNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="phone"
        label="电话号码"
        width="300">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="userName"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="idNumber"
        label="身份证号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
            <el-tag  @click="getUser(scope.row.id)">修改</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog center title="用户信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="'120px'">
          <el-input style="width: 400px;" disabled v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="'120px'">
          <el-input style="width: 400px;" v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="'120px'">
          <el-input style="width: 400px;" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="'120px'">
          <el-input style="width: 400px;" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" :label-width="'120px'">
          <el-input style="width: 400px;" v-model="form.idNumber" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">修 改</el-button>
      </div>
    </el-dialog>
    <div style="margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {hotelUserApi} from "./api";

  export default {
    name: "index",
    data() {
      return {
        params: {
          phone:'',
          userName:'',
          idNumber:''
        },
        form: {
          id:'',
          phone:'',
          userName:'',
          password:'',
          idNumber:''
        },
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,

        dialogFormVisible: false,

      }
    },

    mounted() {
      this.getUserList()
    },

    methods: {

      getUserList() {
        const params = {
          ...this.params,
          page: this.page,
          pageSize: this.pageSize,
        };
        hotelUserApi.getUserList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        })
      },

      getUser(id) {
        this.dialogFormVisible = true;
        const params = {
          id: id,
        };
        hotelUserApi.getUser(params).then(res => {
          this.form = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });


      },

      updateUser() {
        const params = {
          ...this.form,
        };
        hotelUserApi.updateUser(params).then(res => {
          this.dialogFormVisible = false;
          this.getUserList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },


      handleSizeChange(val) {
        this.pageSize = val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUserList()
      }


    },

  }
</script>

<style scoped>

</style>
