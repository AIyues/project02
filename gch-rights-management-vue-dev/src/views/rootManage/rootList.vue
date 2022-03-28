<template>
  <div class="permissManaMain">
    <el-select
        class="addPosInput"
        size="small"
        v-model="formInline.region" placeholder="角色类型" style="margin-right: 8px;">
      <el-option label="管理员" value="管理员"></el-option>
      <el-option label="教师" value="教师"></el-option>
      <el-option label="学生" value="学生"></el-option>
    </el-select>
    <el-button size="small"  type="primary" class="selectButton" @click="TermSelRole">查询角色</el-button>
    <div class="permissManaMain">
      <el-collapse v-model="activeName"   accordion @change="change">
        <el-collapse-item :title="r.roleName" :name="r.roleId" v-for="(r,index) in tableData" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 10px;">
              <span>可访问权限</span>
              <el-button style="float: right; padding: 0px 0" @click="UpdateMenus(index)" type="text">更新权限</el-button>
            </div>
            <div>
              <el-tree
                       :data="allMenus"
                       :props="defaultProps">
              </el-tree>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog
        title="权限更新"
        :visible.sync="addUserDialog"
        width="50%"
        :before-close="handleClose">
      <div class="permissManaMain">
        <el-collapse   accordion @change="change1">
          <el-collapse-item :title="r.roleName" :name="r.roleId" v-for="(r,index) in tableData" :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix" style="height: 10px;">
                <span>可访问权限</span>
              </div>
              <div>
                <el-tree
                    show-checkbox
                    :data="allMenus"
                    :props="defaultProps"
                    ref="tree"
                    :default-checked-keys="selectMenus"
                    node-key="menuId"
                >
                </el-tree>
                <div style="display: flex;justify-content: flex-end">
                  <el-button size="mini" @click="addUserDialog = false">取消</el-button>
                  <el-button size="mini" type="primary" @click="doUpdate(r.roleId,index)">确认修改</el-button>
                </div>

              </div>

            </el-card>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {getRequest, postRequest} from "../../utils/api";

export default {
  name: "Test2",
  data() {
    return {
      pos:{
        name:''
      },
      tableData:[],
      activeName:-1,
      allMenus:[],
      addUserDialog:false,
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      selectMenus:[],
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
    doUpdate(rid,index){
      let tree =this.$refs.tree[index];
      let selectKeys=tree.getCheckedKeys(true);
      let url='/UpdateMenus?rid='+ rid;
      selectKeys.forEach(key=>{
        url +='&mids=' +key;
      })

      postRequest(url).then(resp=>{
        if (resp){
          this.initPositions();
          this.addUserDialog=false;
          this.activeName=-1;
        }
      })
    },
    initSelectMenus(rid){
      postRequest('/SelMenuIdById?id='+rid).then(resp=>{
        if (resp){
          this.selectMenus=resp['obj'];
        }
      })
    },

    initPositions() {
      getRequest('/selAllRole').then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
        }
      })
    },
    TermSelRole(){
      postRequest('/TermSelRole?roleName='+this.formInline['region']).then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
        }
      })
    },
    UpdateMenus(index){
      this.addUserDialog=true;
      postRequest('/TermSelRole?roleName='+this.tableData[index]['roleName']).then(resp=>{
        if (resp){
          this.tableData=resp['obj'];
        }
      })
    },
    change(rid){
      if (rid){
        this.initAllMenus(rid);
      }
    },
    initAllMenus(rid){
      postRequest('/SelMenuById?id='+rid).then(resp=>{
        if (resp){
          this.allMenus=resp['obj'];
        }
      })
    },
    change1(rid){
      this.MyinitAllMenus();
      this.initSelectMenus(rid);
    },
    MyinitAllMenus(){
      getRequest('/SelAllMenu').then(resp=>{
        if (resp){
          this.allMenus=resp['obj'];
        }
      })
    }
  }
}
</script>

<style scoped>

.permissManaMain{
  margin-top: 20px;
  width: 700px;
}
</style>