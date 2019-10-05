<template>
  <div style="width: 100%">
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
        prop="uerName"
        label="用户名"
        width="80">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="commentContent"
        label="留言内容"
        width="721px"
        style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="commentTime"
        label="留言时间"
        width="180">
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-tag type="danger" @click="deleteConfirm(scope.row.id)">删除</el-tag>
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
  import {hotelCommentApi} from './api';
  export default {
    name: "index",
    data() {
      return {

        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,
      }
    },

    mounted() {
      this.getHotelCommentList();
    },

    methods:{

      deleteConfirm(id) {
        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteHotelComment(id);
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      getHotelCommentList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
        };
        hotelCommentApi.getHotelCommentList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        })
      },


      deleteHotelComment(id) {
        const params = {
          id: id,
        };
        hotelCommentApi.deleteHotelComment(params).then(res => {
          this.getHotelCommentList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getHotelCommentList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getHotelCommentList()
      }

    }

  }
</script>

<style scoped>

</style>
