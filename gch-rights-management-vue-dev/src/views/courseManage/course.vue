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
            prop="id"
            label="编号"
            width="50">
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="courseType"
            label="课程类型"
            width="100">
        </el-table-column>
        <el-table-column
            prop="teacherName"
            label="任课教师"
            width="100">
        </el-table-column>
        <el-table-column
            prop="deptName"
            label="院系"
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
  name: "course",
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
      getRequest('/selAllCourse').then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
          this.tableData.map(val=>{
            if (val.courseType==1){
              val.courseType='必修';
            }
            else if (val.courseType==0){
              val.courseType='选修'
            }
          })
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