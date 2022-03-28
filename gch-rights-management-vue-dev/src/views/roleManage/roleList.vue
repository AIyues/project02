<template>
  <div>
    <div>
      <el-select
          class="addPosInput"
          size="small"
          v-model="formInline.region" placeholder="角色类型" style="margin-right: 8px;">
        <el-option label="管理员" value="管理员"></el-option>
        <el-option label="教师" value="教师"></el-option>
        <el-option label="学生" value="学生"></el-option>
      </el-select>

      <el-button size="small"  type="primary" class="selectButton" @click="TermSelRole">查询角色</el-button>
      <el-button type="text" icon="el-icon-plus" @click="addRoleDialog = true" style="margin-left: 330px;">添加角色</el-button>
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
            prop="roleId"
            label="编号"
            width="50">
        </el-table-column>
        <el-table-column
            prop="roleName"
            label="角色名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="state"
            label="角色状态"
            width="100">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                type="primary" icon="el-icon-edit" circle
                size="mini"
                @click="showEditView(scope.$index,scope.row)"></el-button>
            <el-button

                type="danger" icon="el-icon-delete" circle
                size="mini"
                @click="handleDelete(scope.$index,scope.row)"></el-button>
          </template>
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
  name: "Test3",
  data() {
    return {
      pos:{
        name:''
      },
      tableData:[],
      activeName:'1',
      dialogVisible: false,
      addRoleDialog:false,
      updatePos: {
      },
      addPos:{
      },
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  mounted() {
    this.initPositions();
  },
  methods:{
    doUpdate(){
      postRequest('/UpdateRole',this.updatePos).then(resp=>{
        if (resp){
          this.initPositions();
          this.dialogVisible=false;
        }
      });
    },
    showEditView(index,data){
      // this.updatePos=data;
      this.updatePos=Object.assign({},this.updatePos,data);
      this.dialogVisible=true;
    },
    handleDelete(index,data){
      this.$confirm('确定删除['+data.roleName+'],是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
        postRequest('/DeleteRole?roleId='+data.roleId).then(resp=>{
          if (resp){
            this.initPositions();
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'

        });
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    initPositions() {
      getRequest('/selAllRole').then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
        }
      })

    },
    doAddRole(){
      postRequest('/InsertRole?roleName='+this.addPos['roleName']).then(resp => {
        if (resp) {
          this.initPositions();
          this.addRoleDialog = false;
        }
      });
    },
    TermSelRole(){
      postRequest('/TermSelRole?roleName='+this.formInline['region']).then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
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