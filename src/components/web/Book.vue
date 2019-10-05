<template>
  <div style="width: 100%;padding: 50px">
    <el-form :inline="true" ref="params" :model="params" label-width="80px" style="padding-top: 15px">
      <el-form-item label="房型名称:">
        <el-input clearable @clear="getRoomTypeList" style="width: 150px;" size="mini" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="房型价格:">
        <el-col :span="11">
          <el-input clearable @clear="getRoomTypeList" size="mini"
                    v-model="params.lowPrice"></el-input>
        </el-col>
        <el-col class="line" :span="2">&nbsp;&nbsp;~</el-col>
        <el-col :span="11">
          <el-input clearable @clear="getRoomTypeList" size="mini"
                    v-model="params.highPrice"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="床位数:">
        <el-input-number size="small" v-model="params.beds"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoomTypeList" icon="el-icon-search" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      border
      :data="tableData"
      style="width: 100%;margin-top: 10px">
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
        prop="name"
        label="房型名称"
        width="200">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="beds"
        label="床位数">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="price"
        label="价格">
        <template slot-scope="scope">
          <p>¥ {{scope.row.price}}</p>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="introduction"
        label="房型介绍"
        width="400">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-tag @click="getHotelRoomType(scope.row.id)">预定</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog center title="新建订单" :visible.sync="dialogFormVisible">
      <el-form :model="orderData">
        <el-form-item label="房型" :label-width="'120px'">
          <el-select v-model="orderData.roomTypeId" placeholder="请选择" size="small">
            <el-option
              v-for="item in roomTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住时间" :label-width="'120px'">
          <el-date-picker
            v-model="orderData.checkInTime"
            type="date"
            placeholder="选择入住日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="'120px'">
          <el-input style="width: 400px;" v-model="orderData.orderNote" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHotelOrder">确 定</el-button>
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
  import {hotelOrderApi} from '../../components/admin/hotelOrder/api';
  import {hotelRoomTypeApi} from '../../components/admin/hotelRoomType/api';
  import db from "@/store/user/db";
  export default {
    name: "book",
    data() {
      return{
        params: {
          roomTypeId: '',
          homeState: '',
        },
        formData: {
          id: '',
          roomTypeId: '',
          homeState: '',
          remark: '',
          roomNumber: ''
        },
        orderData: {
          orderNote: '',
          checkInTime: '',
          roomTypeId:''
        },


        roomTypes:[],
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,

        dialogFormVisible: false,
      }
    },

    mounted() {
      this.getRoomTypeList();
      this.getRoomTypeLists();
    },

    methods: {

      getRoomTypeLists() {
        const params = {
          ...this.params,
          page: 1,
          pageSize: 1000,
        };
        hotelRoomTypeApi.getRoomTypeList(params).then(res => {
          this.roomTypes = res.data;
        })
      },

      getRoomTypeList() {
        const params = {
          ...this.params,
          page: this.page,
          pageSize: this.pageSize,
        };
        hotelRoomTypeApi.getRoomTypeList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        })
      },

      addHotelOrder() {
        const params = {
          ...this.orderData,
          userId: db.get("user").id,
        };
        hotelOrderApi.addHotelOrder(params).then(res => {
          this.$message.success(res.message);
          this.dialogFormVisible= false;
        }).catch((err) => {
          this.$message.error(err.message);
        });


      },

      getHotelRoomType(id) {
        let user = db.get("user");
        if (user === null) {
          this.$router.push('/login');
          this.$message.warning("还未登陆请先登陆");
        }
        else {
          this.dialogFormVisible = true;
          this.orderData.roomTypeId = id;
          // const params = {
          //   id: id,
          // };
          // hotelRoomTypeApi.getRoomType(params).then(res => {
          //   this.orderData.roomTypeId = res.data.id;
          // }).catch((err) => {
          //   this.$message.error(err.message);
          // });
        }

      },


      handleSizeChange(val) {
        this.pageSize = val;
        this.getHotelRoomList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getHotelRoomList()
      }

    }


    }
</script>

<style scoped>

</style>
