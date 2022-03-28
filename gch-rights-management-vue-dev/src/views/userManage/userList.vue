<template>

  <div>
    <div>
      <div>
        <el-upload
            style="display: inline-flex;"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :disabled="importDataDisabled"
            action="/ImportUsers">
          <el-button size="small"  type="success" :icon="importDataBtnIcon" :disabled="importDataDisabled" class="fileUpload">
            {{importDataBtnText}}
          </el-button>
        </el-upload>
        <el-button size="small"  type="success" class="fileUpload" icon="el-icon-download" @click="ExportUserFile">
          用户导出
        </el-button>
        
      <el-input
                size="small"
                class="addPosInput"
                placeholder="用户名"
                v-model="formInline.name">
      </el-input>

      <el-input
          size="small"
          class="addPosInput"
          placeholder="账户"
          v-model="formInline.rId">
      </el-input>
        <el-select
            size="small"
            v-model="formInline.tType" placeholder="用户类型" style="margin-right: 10px;">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="教师" value="2"></el-option>
          <el-option label="班长" value="3"></el-option>
          <el-option label="学生" value="5"></el-option>
        </el-select>

      <el-button size="small"  type="primary" class="selectButton" @click="TermSelUser">查询用户</el-button>

      <el-button type="text"  icon="el-icon-plus" @click="addUserDialog = true" style="margin-left: 330px;">添加用户</el-button>
      </div>
      <el-table
          ref="multipleTable"
          height="500"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          >
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
            prop="rid"
            label="账户"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="50" >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="120px">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="身份证号">
        </el-table-column>
        <el-table-column
            prop="ttype"
            label="用户类型"
            width="80">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态"
            width="50">
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
    <!-- 分页 -->
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
          background
          @current-change="currentChange"
          layout="prev, pager, next ,jumper , ->, total"
          :total="total">
      </el-pagination>
    </div>

    <el-button type="danger" plain  disabled="">批量删除</el-button>
    <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%"
        >
      <el-form  label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="updatePos.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updatePos.email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="updatePos.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="updatePos.idCard"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="新增用户"
        :visible.sync="addUserDialog"
        width="30%"
        >
      <el-form  label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="addPos.name"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="addPos.r_id"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addPos.r_password"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input v-model="addPos.t_type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addUserDialog = false">取 消</el-button>
    <el-button type="primary" @click="doAddUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
import {deleteRequest, getRequest, postRequest, putRequest} from "../../utils/api";
export default {
  name: "Test1",
  data() {
    return {
      importDataDisabled: false,
      importDataBtnText: '用户导入',
      importDataBtnIcon: 'el-icon-upload2',
      headers:{
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      fileList: [],
      pos:{
        name:''
      },
      tableData:[],
      dialogVisible: false,
      addUserDialog:false,
      updatePos: {
      },
      addPos:{
      },
      formInline: {
        name: ''
      },
      total:0,
      currentPage:1,
      size:8
    }
  },
  mounted(){
    this.initPositions();
  },
  methods:{
    beforeUpload(){
      this.importDataBtnIcon='el-icon-loading';
      this.importDataBtnText='正在导入';
      this.importDataDisabled=true;
    },
    onSuccess(){
      this.importDataBtnIcon='el-icon-upload2';
      this.importDataBtnText='用户导入';
      this.importDataDisabled=false;
      this.initPositions();
    },
    onError(){
      this.importDataBtnIcon='el-icon-upload2';
      this.importDataBtnText='用户导入';
      this.importDataDisabled=false;
    },

    currentChange(currentPage){
      this.currentPage=currentPage;
      this.initPositions();
    },
    doAddUser(){
          postRequest('/insertUser', this.addPos).then(resp => {
            if (resp) {
              this.initPositions();
              this.addUserDialog = false;
            }
          });
        },
    doUpdate(){
      postRequest('/updateUser',this.updatePos).then(resp=>{
        if (resp){
          this.initPositions();

          this.dialogVisible=false;
        }
      });
    },
    showEditView(index,data){
      this.tableData.map(val=>{
        if (val.sex=='男'){
          val.sex=1;
        }
        else if (val.sex=='女'){
          val.sex=0
        }
      })
      this.tableData.map(val=>{
        if (val.state=='停用'){
          val.state=0;
        }
        else {
          val.state=1;
        }
      })
      this.tableData.map(val=>{
        if (val.ttype=='管理员'){
          val.ttype=1;
        }
        else if (val.ttype=='老师') {
          val.ttype=2;
        }
        else if (val.ttype=='班长'){
          val.ttype=3;
        }
        else if (val.ttype=='学生'){
          val.ttype=5;
        }
      })
     // this.updatePos=data;
      this.updatePos=Object.assign({},this.updatePos,data);
      this.dialogVisible=true;

    },
    handleDelete(index,data){
      this.$confirm('确定删除['+data.name+'],是否继续?','提示',{
         confirmButtonText: '确定',
         cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
        postRequest('/deleteUser?id='+data.id).then(resp=>{
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
    TermSelUser(){
      postRequest('/TermSelUser',this.formInline).then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
          this.tableData.map(val=>{
            if (val.sex==1){
              val.sex='男';
            }
            else if (val.sex==0){
              val.sex='女'
            }
          })
          this.tableData.map(val=>{
            if (val.state==0){
              val.state='停用';
            }
            else {
              val.state='启用';
            }
          })
          this.tableData.map(val=>{
            if (val.ttype==1){
              val.ttype='管理员';
            }
            else if (val.ttype==2) {
              val.ttype='老师';
            }
            else if (val.ttype==3){
              val.ttype='班长';
            }
            else if (val.ttype==5){
              val.ttype='学生';
            }
          })
        }
      })
    },
    ExportUserFile(){
      this.downloadRequest('/ExportUsers');
    },
    initPositions(){
      getRequest('/selUser?currentPage='+this.currentPage+'&size='+this.size).then(resp=>{
        if (resp){
          this.tableData=resp.data;
          this.total=resp.total;
          this.tableData.map(val=>{
            if (val.sex==1){
              val.sex='男';
            }
            else if (val.sex==0){
              val.sex='女'
            }
          })
          this.tableData.map(val=>{
            if (val.state==0){
              val.state='停用';
            }
            else {
              val.state='启用';
            }
          })
          this.tableData.map(val=>{
            if (val.ttype==1){
              val.ttype='管理员';
            }
            else if (val.ttype==2) {
              val.ttype='老师';
            }
            else if (val.ttype==3){
              val.ttype='班长';
            }
            else if (val.ttype==5){
              val.ttype='学生';
            }
          })
        }
      })
    },

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
.fileUpload{
  margin-top: 20px;
  width: 100px;
  margin-right: 8px;
}
</style>


