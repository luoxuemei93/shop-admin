<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="getCateList"
            >刷新</el-button
          >
          <el-button type="primary" size="small" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" height="580px">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="catName" label="分类名称"> </el-table-column>
        <el-table-column prop="orderNum" label="分类编码"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editFun(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteFun(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      :title="type=='edit'?'修改分类':'添加分类'"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类编码：" prop="catCode">
          <el-input v-model="addCateForm.catCode" :disabled="type=='edit'"></el-input>
        </el-form-item>
        <el-form-item label="分类名称：" prop="catName">
          <el-input v-model="addCateForm.catName"></el-input>
        </el-form-item>
        <el-form-item label="分类排序：" prop="orderNum">
          <el-input-number v-model="addCateForm.orderNum" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button v-if="type=='edit'" type="primary" @click="editCate">修改确定</el-button>
        <el-button v-else type="primary" @click="addCate">新增确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      columns: [
        { label: "分类名称", prop: "catName" },
        { label: "排序", type: "template", template: "order" },
        { label: "操作", type: "template", template: "opt" },
      ],
      type: "",
      addCateDialogVisible: false, // 控制添加分类对话框的显示与隐藏
      addCateForm: {
        // 添加分类的表单数据对象
        catCode: "",
        catName: "",
        orderNum: 1,
      },
      addCateFormRules: {
        catName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        catCode: [
          { required: true, message: "请输入分类编码", trigger: "blur" },
        ],
        orderNum: [
          { type: 'number', required: true, message: "请输入分类排序", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      this.tableData = [];
      const { data: res } = await this.$http.post("user/categories");
      if (res.status == 0) {
        this.tableData = res.results;
      }
    },
    // 点击按钮，展示添加分类的对话框
    showAddCateDialog() {
      this.type="add";
      this.addCateDialogVisible = true;
    },
    // 修改分类
    editFun(row) {
      this.addCateDialogVisible = true;
      this.type="edit";
      this.addCateForm = row;
    },
    // 分类删除
    deleteFun(row) {
      console.log(row);
      this.$confirm("是否确认删除商品分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const params = {
          catCode: row.catCode
        }
        const { data: res } = await this.$http.post("user/categoriesDelete",params);
        if (res.status != 0) {
          return this.$message.error("删除失败！");
        } else {
          this.$message.success("删除成功！");
          this.getCateList();
        }
      });
    },
    editCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "user/categoriesEdit",
          this.addCateForm
        );
        if (res.status == 0) {
          this.$message.success("修改分类成功！");
          this.getCateList();
          this.addCateDialogVisible = false;
        } else {
          return this.$message.error(res.message || "修改分类失败！");
        }
      });
    },
    // 点击按钮，添加新的分类
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "user/categoriesAdd",
          this.addCateForm
        );
        if (res.status == 0) {
          this.$message.success("添加分类成功！");
          this.getCateList();
          this.addCateDialogVisible = false;
        } else {
          return this.$message.error(res.message || "添加分类失败！");
        }
      });
    },
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogClosed() {
      this.addCateForm = {};
      this.$refs.addCateFormRef.resetFields();
      this.addCateDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}

// .el-scrollbar__wrap {
//   height: 200px !important;
// }
</style>
