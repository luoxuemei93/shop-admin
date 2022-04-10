<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/admin.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <div>
        <span class="user-cls">{{userName}}</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#2c5d9c"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          router
        >
          <!-- :default-active="activePath" -->

          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [
        {id: 1,authName: "商品管理", children:[
          // {id: "categories",path: "categories",authName:"商品分类"},
          // {id: "params",path: "params",authName:"参数列表"},
          {id: "goods",path: "goods",authName:"商品管理"},
          {id: "shop",path: "goods/shop",authName:"我的购物车"},
          {id: "orders",path: "orders",authName:"订单管理"}
        ]},
        // {id: 1,authName: "用户管理", children:[
        //   {id: "users",path: "users",authName:"用户管理"},
        //   {id: "roles",path: "roles",authName:"角色管理"},
        //   {id: "rights",path: "rights",authName:"权限管理"}
        // ]}
      ],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
      userName: "",
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    this.userName = window.sessionStorage.getItem("userName");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  overflow: hidden;
}
.el-container {
  overflow: hidden;
}
.el-header {
  background-color: #2c5d9c;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  .user-cls {
    display: inline-block;
    margin: 0px 10px;
    font-size: 14px;
  }
}

.el-aside {
  background-color: #2c5d9c;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #2c5d9c;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
