<!-- 自定义图标 -->
<template>
  <Icon :style="style">
    <template #component>
      <template v-if="name === 'home-outlined'"><HomeOutlined /></template>
      <template v-if="name === 'shop-outlined'"><ShopOutlined /></template>
      <template v-if="name === 'setting-outlined'"
        ><SettingOutlined
      /></template>
      <template v-if="name === 'desktop-outlined'"
        ><DesktopOutlined
      /></template>
      <template v-if="name === 'safety-certificate-outlined'"
        ><SafetyCertificateOutlined
      /></template>
      <template v-if="name === 'meh-outlined'"><MehOutlined /></template>
      <template v-if="name === 'profile-outlined'"
        ><ProfileOutlined
      /></template>
      <template v-if="name === 'user-outlined'"><UserOutlined /></template>
      <template v-if="name === 'check'"><CheckOutlined /></template>
      <template v-if="name === 'close'"><CloseOutlined /></template>
      <template v-if="name === 'delete'"><DeleteOutlined /></template>
      <template v-if="name === 'down'"><DownOutlined /></template>
      <template v-if="name === 'cloud-upload'"
        ><CloudUploadOutlined
      /></template>
      <template v-if="name === 'bar-chart'"><BarChartOutlined /></template>
      <template v-if="name === 'environment'"><EnvironmentOutlined /></template>
      <template v-if="name === 'edit'"><edit-outlined /></template>
      <template v-if="name === 'bell'"><BellOutlined /></template>
    </template>
  </Icon>
</template>

<script setup>
import Icon, {
  UserOutlined,
  HomeOutlined,
  ShopOutlined,
  SettingOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
  ProfileOutlined,
  MehOutlined,
  DesktopOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  DownOutlined,
  EnvironmentOutlined,
  EditOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
const props = defineProps({
  name: {
    type: String,
    default() {
      return "";
    },
  },
  style: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style lang="less" scoped></style>
