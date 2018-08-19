<template lang="pug">
  el-upload.upload(
  drag,
  :name = "name",
  :headers="headers",
  :accept="accept",
  :show-file-list="false",
  :action="uploadUrl",
  :on-success="handleFileSuccess",
  :before-upload="beforeFileUpload")
    i.el-icon-upload
    .el-upload__text {{content.help}}
      em {{content.title}}
    .el-upload__tip( slot="tip") {{content.tip}}
</template>

<script>
  import {baseUrl} from '../config/index'
  import {lazyGoto} from '../utils'
  import {mapMutations} from 'vuex'
  import {content} from '../config/text'
  import {setStore} from '../config/localStorage'

  export default {
    name: 'upload',
    data() {
      return {
        content: content.upload,
        imageUrl: '',
        name: 'excel',
        accept: '.xls,.xlsx',
        uploadUrl: baseUrl + '/upload',
        // headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        headers: {token: `${localStorage.getItem('token')}`}
      }
    },
    methods: {
      ...mapMutations(['FILE_NAME']),
      handleFileSuccess(res, file) {
        // this.$notify({
        //   title: '成功',
        //   message: 'Excel 文件上传成功',
        //   type: 'success'
        // })
        const {fileName} = res.body.data
        this.FILE_NAME(res.body.data.fileName)
        setStore('file', fileName)
        this.onSuccess(file)
      },
      beforeFileUpload(file) {
        const fileNameArr = file.name.split('.')
        const isXls = fileNameArr[fileNameArr.length - 1] === 'xls'
        const isXlsx = fileNameArr[fileNameArr.length - 1] === 'xlsx'
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isXls && !isXlsx) {
          this.$message.error('只能上传 Excel 文件!')
        }
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!')
        }
        return (isXls || isXlsx) && isLt10M
      },
      onSuccess(file) {
        this.$confirm('文件上传成功, 是否开始分析?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(async () => {
          this.$message({
            type: 'success',
            message: '开始分析，请稍等'
          })
          await lazyGoto(this, '/analysis/all')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分析'
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .upload {
    margin 50px auto
    .File-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .File-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .File-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .File {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
