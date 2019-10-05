<template>
  <div style="width: 100%">
    <el-form :inline="true" ref="params" :model="params" label-width="80px" style="padding-top: 15px">
      <el-form-item label="姓名:">
        <el-input clearable @clear="getCheckInPersonList" style="width: 150px;" size="mini" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号:">
        <el-input clearable @clear="getCheckInPersonList" style="width: 200px;" size="mini" v-model="params.idNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCheckInPersonList" icon="el-icon-search" size="mini">搜索</el-button>
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
        label="姓名">
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
        prop="checkInPersonPhone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-tag style="margin-left: 5px" type="danger" @click="deleteConfirm(scope.row.id)">删除</el-tag>
        </template>
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
  </div>
</template>

<script>
  import {checkInPersonApi} from './api';
  export default {
    name: "index",
    data() {
      return{

        params: {
          name: '',
          idNumber:''
        },

        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,

      }
    },

    mounted() {
      this.getCheckInPersonList();
    },

    methods: {

      deleteConfirm(id) {
        this.$confirm('此操作将永久删除该入住人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteCheckInPerson(id);
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      getCheckInPersonList() {
        const params = {
          ...this.params,
          page: this.page,
          pageSize: this.pageSize,
        };
        checkInPersonApi.getCheckInPersonList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        })
      },


      deleteCheckInPerson(id) {
        const params = {
          id: id,
        };
        checkInPersonApi.deleteCheckInPerson(params).then(res => {
          this.getCheckInPersonList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      addCheckInPerson(id) {
        const params = {
          id: id,
        };
        checkInPersonApi.addCheckInPerson(params).then(res => {
          // this.getHotelCommentList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getCheckInPersonList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getCheckInPersonList()
      }

    }

  }
</script>

<style scoped>

</style>
