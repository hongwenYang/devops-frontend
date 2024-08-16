<template>
    <el-aside width="200px" class="common-aside">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>资产管理</span>
                </template>
                <el-menu-item index="2-1">资产列表</el-menu-item>
                <el-menu-item index="2-2">新增资产</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    methods: {
        handleSelect(key) {
            if (key === '1') {
                this.$router.push('/');
            } else if (key === '2-1') {
                this.$router.push('/assets');
            } else if (key === '3') {
                this.$router.push('/users');
            }
            else if (key === 'login') {
                this.$router.push({ name: 'Login' }); // 使用路由名称 'Login'
            }
        },
    },
};
</script>

<style scoped>
.common-aside {
    background-color: #2c3e50;
    color: white;
    height: 100vh;
}

.el-menu {
    border-right: none;
}
</style>