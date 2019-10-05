<template>
  <div style="width: 100%">
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

      <!--<el-form-item label="房型介绍:">-->
      <!--<el-input clearable @clear="getRoomTypeList" style="width: 150px;" size="mini"-->
      <!--v-model="params.introduction"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="床位数:">
        <el-input-number size="small" v-model="params.beds"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoomTypeList" icon="el-icon-search" size="mini">搜索</el-button>
      </el-form-item>
      <el-button style="margin-top: 0.5%;margin-left:7%; " @click="dialogFormVisible1 = true" type="primary"
                 size="small" icon="el-icon-plus">添加房型
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
          <el-tag @click="getHotelRoomType(scope.row.id)">修改</el-tag>
          <el-tag style="margin-left: 5px" type="danger" @click="deleteConfirm(scope.row.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog center title="房型信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="id" :label-width="'150px'">
          <el-input style="width: 400px;" disabled v-model="formData.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型名" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="床位数" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="formData.beds" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型价格" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="formData.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型介绍" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="formData.introduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHotelRoomType">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="添加房型" :visible.sync="dialogFormVisible1">
      <el-form :model="submitForm">
        <el-form-item label="房型名" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="submitForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="床位数" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="submitForm.beds" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型价格" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="submitForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房型介绍" :label-width="'150px'">
          <el-input style="width: 400px;" v-model="submitForm.introduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addHotelRoomType">添 加</el-button>
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
  import {hotelRoomTypeApi} from "./api";

  export default {
    name: "index",
    data() {
      return {
        params: {
          name: '',
          introduction: '',
          beds: '',
          lowPrice: '',
          highPrice: ''
        },
        formData: {
          id: '',
          name: '',
          introduction: '',
          beds: '',
          price: ''
        },
        submitForm: {
          name: '',
          introduction: '',
          beds: '',
          price: ''
        },

        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,

        dialogFormVisible: false,
        dialogFormVisible1: false,
      }
    },

    mounted() {
      this.getRoomTypeList();
    },


    methods: {

      clearInput() {
        this.submitForm.name = '';
        this.submitForm.introduction = '';
        this.submitForm.beds = '';
        this.submitForm.price = ''
      },

      deleteConfirm(id) {
        this.$confirm('此操作将永久删除该房型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteRoomType(id);
        }).catch(() => {
          this.$message.info("已取消删除");
        });
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

      getHotelRoomType(id) {
        this.dialogFormVisible = true;
        const params = {
          id: id,
        };
        hotelRoomTypeApi.getRoomType(params).then(res => {
          this.formData = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      updateHotelRoomType() {
        const params = {
          ...this.formData,
        };
        hotelRoomTypeApi.updateRoomType(params).then(res => {
          this.dialogFormVisible = false;
          this.getRoomTypeList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });


      },

      addHotelRoomType() {
        const params = {
          ...this.submitForm,
        };
        hotelRoomTypeApi.addRoomType(params).then(res => {
          this.dialogFormVisible1 = false;
          this.getRoomTypeList();
          this.clearInput();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });

      },

      deleteRoomType(id) {
        const params = {
          id: id,
        };
        hotelRoomTypeApi.deleteRoomType(params).then(res => {
          this.getRoomTypeList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getRoomTypeList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getRoomTypeList()
      }
    }


  }
</script>

<style scoped>

</style>
