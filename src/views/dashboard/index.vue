<template lang="pug">
  div(class="dashboard-container")
    div(class="app-container")
      el-form(ref="form" :model="form" label-width="120px" :inline="true")
        el-form-item(label="Git Link")
          el-input(v-model="form.repo" placeholder="请填写你的 Git Link")
        el-form-item
          el-button(type="primary" @click="onSubmit") 提交
      el-table(
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row)
        el-table-column(align="center" label="ID" width="95" type="index")
        el-table-column(label="提交仓库" align="center")
          template(slot-scope="scope")
            span {{ scope.row.repo }}
        el-table-column(class-name="status-col" label="状态" width="110" align="center")
          template(slot-scope="scope")
            el-tag(:type="scope.row.test_status==='passed'?'success':'danger'") {{ scope.row.test_status }}
        el-table-column(align="center" prop="created_at" label="判题结束时间" width="400")
          template(slot-scope="scope")
            i(class="el-icon-time")
            span {{ scope.row.test_time }}
        el-table-column(align="center" label="报错信息" width="200")
          template(slot-scope="scope")
            div
              el-button(type="primary" @click="showDialog") 查看报错信息
              el-dialog(
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              )
                span {{ scope.row.error_log}}
                span(slot="footer" class="dialog-footer")
                  el-button(@click="dialogVisible = false") 取 消
                  el-button(type="primary" @click="dialogVisible = false") 确 定
</template>

<script>
import { getList, updateRepo } from '../../api/table'
import { mapState } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        repo: ''
      },
      list: [],
      listLoading: true,
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      id_tag: state => state.user.id_tag
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    async onSubmit() {
      try {
        const res = await updateRepo({
          repo: this.form.repo,
          id_tag: this.id_tag
        })
        if (res['error']) Message.error(res['error'])
        else Message.success('提交成功')
      } catch (err) {
        console.warn('Put Repo Error:', err)
      }
      
    },
    async fetchData() {
      this.listLoading = true
      try {
        const res = await getList(
          { id_tag: this.id_tag }
        )
        this.list = res['error'] ? [] : res
      } catch (err) {
        console.warn('Get Table Error:', err)
      }
      this.listLoading = false
    },
    showDialog() {
      this.dialogVisible = true
    },
    handleClose() {}
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
