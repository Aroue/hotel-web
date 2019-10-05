<template>
  <div style="width: 100%;padding: 80px 150px 150px;">

    <el-tabs type="border-card">
      <el-tab-pane label="我的订单">
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
            prop="userName"
            label="用户名"
            width="80">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="createdTime"
            label="创建日期"
            width="140">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="roomTypeName"
            label="房型"
            width="150">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="checkInTime"
            label="入住时间"
            width="150">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="orderState"
            label="订单状态"
            width="100px">
            <template slot-scope="scope">
              <p v-if="scope.row.orderState === 1" style="color: #0099FF">已预订</p>
              <p v-else-if="scope.row.orderState === 2" style="color: #6fa2cc">已入住</p>
              <p v-else-if="scope.row.orderState === 3" style="color: #00cc00">已完成</p>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="orderNote"
            label="备注">
          </el-table-column>
        </el-table>
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
      </el-tab-pane>
      <el-tab-pane label="个人资料">
        <el-form label-position="left" style="padding-left: 5%" inline class="demo-table-expand">
          <el-form-item label="id:">
            <span>{{ this.user.id }}</span>
          </el-form-item>
          <el-form-item label="用户名:">
            <span>{{ this.user.userName }}</span>
          </el-form-item>
          <el-form-item label="密码:">
            <span>{{ this.user.password }}</span>
          </el-form-item>
          <el-form-item label="身份证号:">
            <span>{{ this.user.idNumber }}</span>
          </el-form-item>
          <el-form-item label="电话号码:">
            <span>{{ this.user.phone }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form status-icon  label-width="80px" style="padding-top: 50px">
          <el-form-item prop="password" label="密码:">
            <el-input
              style="width: 200px"
              v-model="newPassword"
              placeholder="请输入新密码"
            >
            </el-input>
          </el-form-item>

          <el-button
            style="width: 10%;margin-left: 120px"
            type="primary"
            @click="updateUser">
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {hotelOrderApi} from '../admin/hotelOrder/api';
  import {hotelUserApi} from '../admin/hotelUser/api';
  import db from "@/store/user/db";
  export default {
    name: "PersonalCenter",
    data() {
      return {
        user:{
          id:'',
          userName:'',
          password:'',
          idNumber:'',
          phone:''
        },
        newPassword:'',
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,
      }
    },

    mounted() {
      this.getHotelOrderList();
      this.getUser();
    },

    methods: {
      getHotelOrderList() {
        const params = {
          userId: db.get("user").id,
          page: this.page,
          pageSize: this.pageSize,
        };
        hotelOrderApi.getHotelOrderList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        })
      },

      getUser() {
        const params = {
          id: db.get("user").id,
        };
        hotelUserApi.getUser(params).then(res => {
          this.user = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      updateUser() {
        const params = {
          id: db.get("user").id,
          password: this.newPassword,
        };
        hotelUserApi.updateUser(params).then(res => {
          this.$message.success(res.message);
          this.$router.push('/personalCenter');
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getHotelOrderList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getHotelOrderList()
      }


    }

  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 70%;
  }
</style>
