<template>
  <div>
    <div>
      <div v-show="false">
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
            v-model="formInline.tType" placeholder="用户类型" style="margin-right: 8px;">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="教师" value="2"></el-option>
          <el-option label="班长" value="3"></el-option>
          <el-option label="学生" value="5"></el-option>
        </el-select>

        <el-button size="small"  type="primary" class="selectButton" @click="TermSelUser">查询用户</el-button>
        <el-button type="text" icon="el-icon-plus" @click="addUserDialog = true" style="margin-left: 330px;">添加用户</el-button>
      </div>

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
            prop="name"
            label="姓名"
            width="100">
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
            label="评教">
          <template slot-scope="scope">
            <el-button
                type="primary" icon="el-icon-edit" circle
                size="mini"
                @click="showEditView(scope.$index,scope.row)"></el-button>
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
        title="教师评教"
        :visible.sync="dialogVisible"
        width="45%"
        :before-close="handleClose">
      <el-form  label-width="80px">

        <el-form-item label="评教教师" style="margin-left: 100px">

          <div style="margin-left: 150px">
            {{updatePos.name}}
          </div>
        </el-form-item>

          <el-input v-model="updatePos.rid" type="hidden"></el-input>


      </el-form>
      <el-form  label-width="300px">
        <span class="demonstration">该老师上课没有迟到、早退现象</span>
        <el-select
            size="small"
            v-model="core1" placeholder="评教分数" style="margin-left: 148px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>

        <span class="demonstration">考试或者评定成绩的作业，能够检验学习内容</span>
        <el-select
            size="small"
            v-model="core2" placeholder="评教分数" style="margin-left: 65px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>

        <span class="demonstration">老师用来评价学生表现的办法公平恰当</span>
        <el-select
            size="small"
            v-model="core3" placeholder="评教分数" style="margin-left: 107px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">教师对每个学生都很友好</span>
        <el-select
            size="small"
            v-model="core4" placeholder="评教分数" style="margin-left: 190px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">老师对教学很热情</span>
        <el-select
            size="small"
            v-model="core5" placeholder="评教分数" style="margin-left: 233px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">老师坚持教学、科研和社会服务一体化</span>
        <el-select
            size="small"
            v-model="core6" placeholder="评教分数" style="margin-left: 107px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">老师清楚所教专业的培养目标和标准</span>
        <el-select
            size="small"
            v-model="core7" placeholder="评教分数" style="margin-left: 120px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">老师能进行课堂管理，有效掌控课堂气氛</span>
        <el-select
            size="small"
            v-model="core8" placeholder="评教分数" style="margin-left: 92px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">老师教学内容新颖，信息量大，能理论联系实际</span>
        <el-select
            size="small"
            v-model="core9" placeholder="评教分数" style="margin-left: 50px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>
        <br><br>
        <span class="demonstration">治学严谨,要求严格,能深入了解学生的学习和生活状况</span>
        <el-select
            size="small"
            v-model="core10" placeholder="评教分数" style="margin-left: 15px;">
          <el-option label="10" value="10"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="70" value="70"></el-option>
          <el-option label="90" value="90"></el-option>
        </el-select>

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
        :before-close="handleClose">
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
  name: "evaTeaching",
  data() {
    return {
        user:JSON.parse(window.sessionStorage.getItem('user')),
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
        name: '',
        tType:'2'
      },
      pjNumber: {
        cores:0,
        pjTeacher:"",
        pjStudent:""
      },
      core1:60,
      core2:60,
      core3:60,
      core4:60,
      core5:60,
      core6:60,
      core7:60,
      core8:60,
      core9:60,
      core10:60,
      total:0,
      currentPage:1,
      size:8
    }
  },
  mounted(){
    this.initPositions();
  },
  methods:{
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
      let cores=Number(this.core1)+Number(this.core2)+Number(this.core3)+Number(this.core4)+
          Number(this.core5)+Number(this.core6)+Number(this.core7)+Number(this.core8)+Number(this.core9)+Number(this.core10);
      this.pjNumber.cores=cores/10;
      this.pjNumber.pjTeacher=this.updatePos.rid;
      this.pjNumber.pjStudent=this.user.rid;


      postRequest('/InsertPj',this.pjNumber).then(resp=>{
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

    },
    initPositions(){
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
</style>