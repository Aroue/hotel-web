<template>
  <div style="width: 100%">
    <el-form :inline="true" ref="params" :model="params" label-width="60px" style="padding-top: 15px">
      <el-form-item label="房型:">
        <el-select v-model="params.roomTypeId" @change="getHotelOrderList" clearable placeholder="请选择" size="small">
          <el-option
            v-for="item in roomTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getHotelOrderList" size="mini">搜索</el-button>
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
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-tag @click="getHotelOrder(scope.row.id,scope.row.roomTypeId)">修改</el-tag>
          <el-tag style="margin-left: 5px" type="danger" @click="deleteConfirm(scope.row.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="订单信息修改" :visible.sync="dialogFormVisible">

      <el-dialog
        center
        width="50%"
        title="添加入住人"
        :visible.sync="innerVisible"
        append-to-body>
        <el-form :model="checkInPerson">
          <el-form-item label="姓名:" :label-width="'120px'">
            <el-input style="width: 200px;" v-model="checkInPerson.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" :label-width="'120px'">
            <el-input style="width: 400px;" v-model="checkInPerson.idNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码:" :label-width="'120px'">
            <el-input style="width: 400px;" v-model="checkInPerson.checkInPersonPhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCheckInPerson">添加</el-button>
        </div>
      </el-dialog>


      <el-dialog
        center
        width="50%"
        title="入住人信息"
        :visible.sync="innerVisible1"
        append-to-body>
        <el-form :model="innerCheckInPerson">
          <el-form-item label="姓名:" :label-width="'120px'">
            <el-input style="width: 200px;" v-model="innerCheckInPerson.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" :label-width="'120px'">
            <el-input style="width: 400px;" v-model="innerCheckInPerson.idNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码:" :label-width="'120px'">
            <el-input style="width: 400px;" v-model="innerCheckInPerson.checkInPersonPhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible1 = false">取 消</el-button>
          <!--<el-button type="primary" @click="updateOrderHotelOrder">修 改</el-button>-->
        </div>
      </el-dialog>

      <el-form :model="form">
        <el-form-item label="id:" :label-width="'120px'">
          <el-input style="width: 200px;" disabled v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型:" :label-width="'120px'">
          <el-select v-model="form.roomTypeId" placeholder="请选择房型">
            <el-option
              v-for="item in roomTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间:" :label-width="'120px'">
          <el-select v-model="form.roomId"   filterable placeholder="请选择房间">
            <el-option
              v-for="item in rooms"
              :key="item.id"
              :label="item.roomNumber"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住时间:" :label-width="'120px'">
          <el-date-picker
            v-model="form.checkInTime"
            type="date"
            placeholder="选择入住日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态:" :label-width="'120px'">
          <el-select v-model="form.orderState" filterable placeholder="请选择状态">
            <el-option
              v-for="item in orderState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住人:" :label-width="'120px'">
          <el-tag
            @click="getCheckInPerson(item.id)"
            style="margin-right: 10px"
            v-for="item in checkInPersons"
            :key="item.name"
            effect="plain">
            {{ item.name }}
          </el-tag>
        </el-form-item>
        <el-form-item label="备注:" :label-width="'120px'">
          <el-input style="width: 300px;" v-model="form.orderNote" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">添加入住人</el-button>
        <el-button type="primary" @click="updateHotelOrder">修 改</el-button>
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
  import {hotelOrderApi} from './api';
  import {hotelRoomTypeApi} from "../hotelRoomType/api";
  import {hotelRoomApi} from '../hotelRoom/api';
  import {checkInPersonApi} from '../checkInPerson/api';

  export default {
    name: "index",
    data() {
      return {
        params: {
          roomTypeId: '',
        },
        form: {
          id: '',
          orderNote: '',
          roomTypeId: '',
          roomId: '',
          checkInTime: '',
          orderState: ''
        },
        checkInPerson: {
          name: '',
          idNumber: '',
          checkInPersonPhone: '',
          orderId: '',
          roomId: '',
        },
        checkInPersons:[],
        innerCheckInPerson:{
          name: '',
          idNumber: '',
          checkInPersonPhone: '',
        },
        roomTypes: [],
        rooms: [],
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,

        dialogFormVisible: false,
        innerVisible: false,
        innerVisible1: false,

        orderState: [{
          value: 1,
          label: '已预订'
        }, {
          value: 2,
          label: '已入住'
        }, {
          value: 3,
          label: '已完成'
        }],

      }
    },

    mounted() {
      this.getHotelOrderList();
      this.getRoomTypeList();
    },

    methods: {

      deleteConfirm(id) {
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteHotelOrder(id);
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      getOrderCheckInPersonList(id) {
        const params = {
          id:id,
        };
        checkInPersonApi.getOrderCheckInPersonList(params).then(res => {
          this.checkInPersons = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      addCheckInPerson() {
        const params = {
          ...this.checkInPerson,
        };
        checkInPersonApi.addCheckInPerson(params).then(res => {
          // this.getHotelCommentList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
        this.innerVisible = false;
        // this.getOrderCheckInPersonList(this.form.id);
      },

      getRoomTypeList() {
        const params = {
          page: 1,
          pageSize: 1000,
        };
        hotelRoomTypeApi.getRoomTypeList(params).then(res => {
          this.roomTypes = res.data;
        })
      },

      getCheckInPerson(id) {
        this.innerVisible1 = true;
        const params = {
          id:id,
        };
        checkInPersonApi.getCheckInPerson(params).then(res => {
          this.innerCheckInPerson = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      getRoomList(id) {
        const params = {
          roomTypeId: id,
          page: 1,
          pageSize: 1000,
        };
        hotelRoomApi.getHotelRoomList(params).then(res => {
          this.rooms = res.data;
        })
      },

      getHotelOrderList() {
        const params = {
          ...this.params,
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

      deleteHotelOrder(id) {
        const params = {
          id: id,
        };
        hotelOrderApi.deleteHotelOrder(params).then(res => {
          this.getHotelOrderList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      getHotelOrder(id, roomTypeId) {
        this.dialogFormVisible = true;
        this.getRoomList(roomTypeId);
        const params = {
          id: id,
        };
        hotelOrderApi.getHotelOrder(params).then(res => {
          this.form = res.data;
          this.checkInPerson.orderId = res.data.id;
          this.checkInPerson.roomId = res.data.roomId;
        }).catch((err) => {
          this.$message.error(err.message);
        });
        this.getOrderCheckInPersonList(id);
      },

      updateHotelOrder() {
        const params = {
          // ...this.form,
          id: this.form.id,
          orderNote: this.form.orderNote,
          roomTypeId: this.form.roomTypeId,
          roomId: this.form.roomId,
          checkInTime: this.form.checkInTime,
          orderState: this.form.orderState
        };
        hotelOrderApi.updateHotelOrder(params).then(res => {
          this.dialogFormVisible = false;
          this.getHotelOrderList();
          this.$message.success(res.message);
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

</style>
