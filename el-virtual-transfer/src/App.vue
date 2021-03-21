<template>
    <div id="app">
        <!-- <el-transfer v-model="value" :data="data"></el-transfer> -->
        <el-virtual-transfer v-model="value" :data="data"></el-virtual-transfer>
    </div>
</template>

<script>
export default {
    data() {
        const generateData = () => {
            const data = [];
            for (let i = 1; i <= 20000; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`
                });
            }
            return data;
        };

        return {
            data: generateData(),
            value: []
        };
    }
};
</script>

<style lang="less">
#app {
    display: flex;
    justify-content: center;
    padding-top: 100px;
}
</style>
