<template>
  <section>
    <div class="tab-content">
      <h2>{{ type && list[type]["tit"] }}</h2>
      <div class="tab" v-if="type != 'info'">
        <span
          v-for="(val, key, index) in tabType"
          :key="index"
          @click="tab(key)"
          :class="{ active: val }"
        >
          <Icon name="home-outlined"></Icon>{{ key }}
        </span>
      </div>
      <component :is="type && list[type]['com']" :data="data" @changeTab="tab">
      </component>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Icon from "@/components/Icon";
import { tabsProps } from "ant-design-vue/lib/tabs/src/Tabs";
import { Tabs } from "ant-design-vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const list = {
  info: {
    tit: "页面信息",
    com: "Info",
  },
  images: {
    tit: "图片",
    com: "Images",
  },
  banner: {
    tit: "轮播图",
    com: "Images",
  },
  product: {
    tit: "商品",
    com: "Product",
  },
};
const tabType = ref({
  1: true,
  2: false,
  3: false,
});
const type = ref("");
onMounted(() => {
  type.value = props.data.type;
  if (props.data?.tabType) {
    tab(tabType.value);
  }
});
const tab = (key) => {
  for (let i in tabType.value) {
    if (key == i) {
      tabType.value[i] = true;
      props.data.tabType = key;
    } else {
      tabType.value[i] = false;
    }
  }
};
</script>

<style lang="less" scoped>
section {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
}
.tab-content {
  padding: 0 15px;
  h2 {
    font-size: 16px;
    color: #333;
  }
  .tab {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ddd;
    border-radius: 6px;
    span {
      width: 33.33%;
      text-align: center;
      font-size: 14px;
      color: #666;
      display: block;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      &.active {
        color: #fff;
        background: #409eff;
        border-radius: 2px;
      }
      &:nth-of-type(2) {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }
    }
  }
}
</style>
