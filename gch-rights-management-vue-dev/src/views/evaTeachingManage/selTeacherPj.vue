<template>
  <div>
    <div>
      <el-table
          ref="multipleTable"
          height="500"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="pjCore"
            label="综合评分"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="评分学生"
            width="100">
        </el-table-column>

      </el-table>
    </div>

    <el-dialog
        title="新增角色"
        :visible.sync="addRoleDialog"
        width="30%"
        :before-close="handleClose">
      <el-form  label-width="80px">
        <el-form-item label="角色名">
          <el-input v-model="addPos.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addRoleDialog = false">取 消</el-button>
    <el-button type="primary" @click="doAddRole">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="编辑角色"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form  label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="updatePos.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
import {getRequest, postRequest} from "@/utils/api";

export default {
  name: "selTeacherPj",
  data() {
    return {
      user:JSON.parse(window.sessionStorage.getItem('user')),
      pos: {
        name: ''
      },
      tableData: [],
      activeName: '1',
      dialogVisible: false,
      addRoleDialog: false,
      updatePos: {},
      addPos: {},
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    initPositions() {
      postRequest('/SelPjByTid?rid=' + this.user.rid).then(resp => {
        if (resp) {
          this.tableData = resp['obj'];
        }
      })
    }
  }
}

</script>

<style scoped>
.addPosInput{
  margin-top: 20px;
  width: 200px;
  margin-right: 8px;
}
.updatePosInput{
  width: 200px;
  margin-left: 8px;
  margin-top: 8px;

}
.permissManaMain{
  margin-top: 10px;
  width: 700px;
}
</style>