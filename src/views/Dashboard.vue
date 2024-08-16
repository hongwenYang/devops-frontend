<template>
  <div class="dashboard">
    <CommonAside class="aside-menu" />
    <div class="main-content">
      <div class="user-info">
        <h2>Welcome, {{ userInfo.username }}</h2>
        <p>Email: {{ userInfo.email }}</p>
      </div>
      <div class="asset-stats">
        <h3>Asset Statistics</h3>
        <ul>
          <li>Total Assets: {{ assetStats.total }}</li>
          <li>Total Value: ${{ assetStats.totalValue }}</li>
          <!-- 添加更多统计信息 -->
        </ul>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'; // 假设CommonAside在components文件夹
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
    CommonAside
  },
  data() {
    return {
      userInfo: {},
      assetStats: {}
    };
  },
  created() {
    this.fetchUserInfo();
    this.fetchAssetStats();
  },
  methods: {
    fetchUserInfo() {
      // 假设从后端获取用户信息的API
      axios.get('http://127.0.0.1:8000/api/user/info/')
        .then(response => {
          this.userInfo = response.data;
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    },
    fetchAssetStats() {
      // 假设从后端获取资产统计信息的API
      axios.get('http://127.0.0.1:8000/api/assets/stats/')
        .then(response => {
          this.assetStats = response.data;
        })
        .catch(error => {
          console.error('Error fetching asset stats:', error);
        });
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.aside-menu {
  width: 250px;
  background-color: #2c3e50;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.user-info {
  margin-bottom: 20px;
}

.asset-stats {
  margin-bottom: 20px;
}
</style>
