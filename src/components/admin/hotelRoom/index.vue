<template>
  <div style="width: 100%">
    <el-form :inline="true" ref="params" :model="params" label-width="80px" style="padding-top: 15px">
      <el-form-item label="房间房型:">
        <el-select v-model="params.roomTypeId" @change="getHotelRoomList" clearable placeholder="请选择" size="small">
          <el-option
            v-for="item in roomTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间状态:">
        <el-select v-model="params.homeState" @change="getHotelRoomList" clearable placeholder="请选择" size="small">
          <el-option
            v-for="item in homeStates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button style="margin-top: 0.5%;margin-left:46%; " @click="dialogFormVisible1 = true" type="primary"
                 size="small" icon="el-icon-plus">添加房间
      </el-button>
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
        prop="roomTypeName"
        label="房型"
        width="200">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="roomNumber"
        label="房间号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="homeState"
        label="房间状态">
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="remark"
        label="详细信息"
        width="400">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-tag @click="getHotelRoom(scope.row.id)">修改</el-tag>
          <el-tag style="margin-left: 5px" type="danger" @click="deleteConfirm(scope.row.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog center title="房间信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="id" :label-width="'150px'">
          <el-input style="width: 175px;" disabled v-model="formData.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型" :label-width="'150px'">
          <el-select v-model="formData.roomTypeId" placeholder="请选择" size="small">
            <el-option
              v-for="item in roomTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间状态" :label-width="'150px'">
          <el-select v-model="formData.homeState" @change="getHotelRoomList" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in homeStates"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="formData.roomNumber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="详细信息" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="formData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHotelRoom">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="添加房间" :visible.sync="dialogFormVisible1">
      <el-form :model="submitForm">
        <el-form-item label="房型" :label-width="'150px'">
          <el-select v-model="submitForm.roomTypeId" placeholder="请选择" size="small">
            <el-option
              v-for="item in roomTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="submitForm.roomNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细信息" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="submitForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHotelRoom">添 加</el-button>
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
  import {hotelRoomApi} from './api';
  import {hotelRoomTypeApi} from "../hotelRoomType/api";

  export default {
    name: "index",
    data() {
      return {

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
        submitForm: {
          roomTypeId: '',
          homeState: '',
          remark: '',
          roomNumber: ''
        },

        roomTypes: [],
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,

        dialogFormVisible: false,
        dialogFormVisible1: false,

        homeStates: [{
          value: '空闲',
          label: '空闲'
        }, {
          value: '已入住',
          label: '已入住'
        }],

      }
    },

    mounted() {
      this.getHotelRoomList();
      this.getRoomTypeList();
    },

    methods: {


      clearInput() {
        this.submitForm.roomTypeId = '';
        this.submitForm.homeState = '';
        this.submitForm.remark = '';
        this.submitForm.roomNumber = ''
      },

      deleteConfirm(id) {
        this.$confirm('此操作将永久删除该房间, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteHotelRoom(id);
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      getRoomTypeList() {
        const params = {
          ...this.params,
          page: 1,
          pageSize: 1000,
        };
        hotelRoomTypeApi.getRoomTypeList(params).then(res => {
          this.roomTypes = res.data;
        })
      },

      getHotelRoomList() {
        const params = {
          ...this.params,
          page: this.page,
          pageSize: this.pageSize,
        };
        hotelRoomApi.getHotelRoomList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        })
      },

      getHotelRoom(id) {
        this.dialogFormVisible = true;
        const params = {
          id: id,
        };
        hotelRoomApi.getHotelRoom(params).then(res => {
          this.formData = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      updateHotelRoom() {
        const params = {
          ...this.formData,
        };
        hotelRoomApi.updateHotelRoom(params).then(res => {
          this.dialogFormVisible = false;
          this.getHotelRoomList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });


      },

      addHotelRoom() {
        const params = {
          ...this.submitForm,
        };
        hotelRoomApi.addHotelRoom(params).then(res => {
          this.dialogFormVisible1 = false;
          this.getHotelRoomList();
          this.clearInput();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });

      },

      deleteHotelRoom(id) {
        const params = {
          id: id,
        };
        hotelRoomApi.deleteHotelRoom(params).then(res => {
          this.getHotelRoomList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getHotelRoomList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getHotelRoomList()
      }

    },


  }
</script>

<style scoped>

</style>
