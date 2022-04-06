<template>
  <div class="goodsList">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="viewMyShop">查看购物车</el-button>
        </el-col>
      </el-row>
      <!-- 卡片 -->
      <div class="card-box">
        <div class="card-item" v-for="(item, index) in goodslist" :key="index">
          <img
            :src="network.defaults.baseImgURL + item.goodsImgUrl"
            style="min-width: 80px; height: 100px"
          />
          <div>商品名称：{{ item.goodsName }}</div>
          <div>商品价格(元)：{{ item.goodsPrice }}</div>
          <div>商品单位：{{ item.goodsUnit }}</div>
          <div>商品单位：{{ item.goodsImgUrl }}</div>
          <div>订购数量： <el-input-number v-model="item.orderNumDefault" size="mini" controls-position="right" :min="1" label="订购数量" style="width:100px;"></el-input-number></div>
          <el-button type="primary" @click="addShop(item)" size="mini" round>加入购物车</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import network from "../../network/index.js";
export default {
  data() {
    return {
      network,
      // 查询参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 商品列表
      goodslist: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.post("user/getGoodsList");
      if (res.status != 0) {
        return this.$message.error("获取商品列表失败！");
      }
      this.goodslist = res.results;
    },
    // 加入购物车
    addShop(item) {
      console.log(item);
    },
    // 查看购物车
    viewMyShop() {
      this.$router.push("/goods/shop");
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    goAddpage() {
      this.$router.push("/goods/shop");
    },
  },
};
</script>

<style lang="less" scoped>
.goodsList {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .el-card {
    height: 100%;
    padding: 10px;
    /deep/.el-card__body {
      height: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0px;
    }
  }
  .card-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    align-content: flex-start;
    padding: 10px 0px;
    .card-item {
      border: 1px solid #d5d9e3;
      border-radius: 8px;
      display: inline-block;
      width: 200px;
      padding: 10px;
      margin: 10px 10px 10px 0px;
      text-align: center;
      &>div{
        text-align: left;
        margin: 5px 0px;
      }
    }
  }
}
</style>
