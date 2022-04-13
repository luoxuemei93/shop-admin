<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入订单号内容" v-model="queryInfo.orderCode">
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表数据 -->
      <el-table :data="orderlist" type="expand" border stripe>
        <el-table-column label="详情" type="expand">
          <template slot-scope="props">
            <div class="order-detail">
              <div class="detail-item" v-for="(item,index) in props.row.children" :key="index">
                <span>{{index * 1 + 1}}、</span>
                <span class="info name">{{item.goodsName}}</span>
                <span class="info unit">{{item.orderNum}}{{item.goodsUnit}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="订单编号" prop="orderCode"></el-table-column>
        <el-table-column label="订单人" prop="userName"></el-table-column>
        <el-table-column label="下单时间" prop="orderDate"></el-table-column>
        <el-table-column label="订单状态" prop="orderStatus"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="exportExcel">导出订单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderlist: [],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      progressVisible: false,
      progressInfo: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      this.orderlist = [];
      const { data: res } = await this.$http.post("user/getOrder", this.queryInfo);
      if (res.status == 0) {
        this.orderlist = res.data.results;
        this.total = res.data.total;
      } 
    },
    search() {
      this.queryInfo.pagenum = 1;
      this.getOrderList();
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    // 展示修改地址的对话框
    exportExcel() {
      console.log("订单导出");
    }
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  padding: 5px 10px;
  max-height: 200px;
  overflow: auto;
  .detail-item {
    padding: 4px;
    .info {
      display: inline-block;
    }
    .info.name {
      font-weight: 600;
      font-size: 14px;
      color: #111;
    }
    .info.unit{
      font-size: 12px;
      color: #333;
      margin-left: 10px;
    }
  }
}
</style>
