<template>
  <el-container>
    <el-header>
      <h2>资产列表</h2>
      <el-button type="primary" @click="exportAssets" class="action-button">导出资产</el-button>
      <el-upload action="http://127.0.0.1:8000/api/assets/import/" :show-file-list="false"
        :on-success="handleImportSuccess" :before-upload="beforeUpload">
        <el-button type="primary" style="margin-left: 10px" class="action-button">导入资产</el-button>
      </el-upload>
    </el-header>
    <el-main>
      <el-table :data="assets" border style="width: 100%">
        <el-table-column prop="asset_id" label="资产id" width="180"></el-table-column>
        <el-table-column prop="name" label="资产名字" width="180"></el-table-column>
        <el-table-column prop="asset_type" label="资产类型" width="180"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" :formatter="formatDate"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="editAsset(scope.row)" type="text" size="small" class="edit-button">修改</el-button>
            <el-button @click="inspectAsset(scope.row)" type="text" size="small" class="inspect-button">巡检</el-button>
            <el-button @click="deleteAsset(scope.row.id)" type="text" size="small" class="delete-button"
              danger>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pageSize" :total="totalItems" layout="total, sizes, prev, pager, next, jumper"
        class="pagination"></el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';
import API_ENDPOINTS from '@/services/api';


export default {
  data() {
    return {
      assets: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0
    };
  },
  created() {
    this.fetchAssets();
  },
  methods: {
    fetchAssets(page = this.currentPage, size = this.pageSize) {
      axios.get(API_ENDPOINTS.getAssets,
        {
          params: {
            page: page,
            size: size
          }
        }
      )
        .then(response => {
          this.assets = response.data.results;
          this.totalItems = response.data.total; // 更新总项数
          console.log('response', response.data)
        })
        .catch(error => {
          console.error('Error fetching assets:', error);
        });
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    },
    exportAssets() {
      axios.get(API_ENDPOINTS.getAssets)
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'assets.csv');
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error exporting assets:', error);
        });
    },
    beforeUpload(file) {
      const isCSV = file.type === 'text/csv';
      if (!isCSV) {
        this.$message.error('只能上传CSV文件');
      }
      return isCSV;
    },
    handleImportSuccess(response) {
      this.$message.success('资产导入成功');
      this.fetchAssets();  // 重新加载资产列表
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchAssets(this.currentPage, size); // 调用 fetchAssets 以更新资产列表
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchAssets(page, this.pageSize); // 调用 fetchAssets 以更新资产列表
    },
    editAsset(asset) {
      console.log('Edit asset:', asset);
      // Implement edit functionality
    },
    inspectAsset(asset) {
      console.log('Inspect asset:', asset);
      // Implement inspect functionality
    },
    deleteAsset(assetId) {
      console.log('Delete asset with ID:', assetId);
      // Implement delete functionality
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0;
  padding: 20px 0;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-button {
  margin-left: 10px;
}

.edit-button {
  color: #409eff;
  /* Element UI primary color */
}

.inspect-button {
  color: #67c23a;
  /* Element UI success color */
}

.delete-button {
  color: #f56c6c;
  /* Element UI danger color */
}

.pagination {
  margin: 20px 0;
}
</style>
