<template>
  <div class="goodsList">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button class="btn-cls" size="small" type="danger" @click="removeShopCar" :disabled="checkedShops.length==0">移出购物车</el-button>
        <el-button class="btn-cls" size="small" type="primary" @click="createOrder">确定下单</el-button>
      </el-row>
      <!-- 卡片 -->
      <div class="card-box">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <el-checkbox-group v-model="checkedShops" @change="handleCheckedChange">
          <el-checkbox v-for="(shopItem,index) in shopCardList" :label="shopItem.goodsId" :key="index">
            <div class="card-item">
              <div style="margin: 15px 0">
                <img class="card-img" :src="network.defaults.baseImgURL + shopItem.goodsImgUrl"/>
                <div>商品名称：{{ shopItem.goodsName }}</div>
                <div>商品价格(元)：{{ shopItem.goodsPrice }}</div>
                <div>商品单位：{{ shopItem.goodsUnit }}</div>
                <div>商品单位：{{ shopItem.goodsImgUrl }}</div>
                <div>订购数量： {{shopItem.orderNum}}</div>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>
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
      isIndeterminate: true,
      checkAll: false,
      checkedShops: [],
      shopCardList: [],
    };
  },
  created() {
    this.getShopCardInfo();
  },
  methods: {
    // 查询购物车
    async getShopCardInfo() {
     const { data: res } = await this.$http.post("user/getShopCar");
      if (res.status != 0) {
        return this.$message.error("获取商品列表失败！");
      }
      this.shopCardList = res.results;
    },
    // 生成订单
    createOrder() {

    },
    // 移出购物车 
    async removeShopCar() {
      if(this.checkedShops.length == 0) {
        return;
      }
      const ary = [];
      for(let index in this.checkedShops) {
        ary.push(this.checkedShops[index]);
      }
      const aryStr = ary.join(",");
      const params = {
        goodsIdStr: aryStr
      }
      console.log(params);
      const { data: res } = await this.$http.post("user/removeShopCar", params);
      if (res.status != 0) {
        return this.$message.error("删除失败！");
      } else {
        this.getShopCardInfo();
      }
    },
    handleCheckAllChange(val) {
      const ary = [];
      for(let index in this.shopCardList) {
        ary.push(this.shopCardList[index]["goodsId"]);
      }
      this.checkedShops = val ? ary : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.shopCardList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.shopCardList.length;
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
  .btn-cls {
    display: inline-block;
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
      & > div {
        text-align: left;
        margin: 5px 0px;
      }
      .card-img {
        min-width: 80px;
        height: 100px
      }
    }
  }
}
</style>
