<template>
  <section class="decoration-edit">
    <section class="l">
      <ul @dragstart="dragstart" @dragend="dragend">
        <li
          v-for="(val, key, index) in typeList"
          :draggable="true"
          :key="index + 1"
          :data-type="key"
        >
          <Icon :name="val.icon" />
          <p>{{ val.name }}</p>
        </li>
      </ul>
    </section>
    <section class="c">
      <!-- header 不可拖拽-->
      <div class="top-nav" @click="selectType(0)">
        <img src="./../assets/img/topNavBlack.png" />
        <span class="tit">{{ info.title }}</span>
      </div>
      <div
        class="view-content"
        @drog="drog"
        @dragover="dragOver"
        :style="{ backgroundColor: info.backgroundColor }"
      >
        <template v-for="(item, index) in view">
          <div
            v-if="index > 0"
            :data-index="index"
            :key="index"
            class="item"
            @click="selectType(index)"
          >
            <!-- waiting -->
            <template v-if="item.status && item.status == 2">
              <div class="wait">{{ item.type }}</div>
            </template>
            <template v-else>
              <component
                :is="typeList[item.type]['com']"
                :data="item"
              ></component>
            </template>
            <i class="el-icon-error"
              ><Icon @click="(e) => deleteItem(e, index)" name="delete"
            /></i>
          </div>
        </template>
      </div>
    </section>
    <section class="r">
      <Edit :data="props" v-if="isRight" />
    </section>

    <div class="submit-btn">
      <a-button @click="submit">提交页面</a-button>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref, nextTick } from "vue";
import Icon from "@/components/Icon";
import Images from "@/components/View/Images.vue";
import Banner from "@/components/View/Banner.vue";
import Product from "@/components/View/Product.vue";
import Edit from "@/components/Edit";
const typeList = {
  banner: {
    name: "轮播图",
    icon: "desktop-outlined",
    com: Banner,
  },
  product: {
    name: "商品",
    icon: "shop-outlined",
    com: Product,
  },
  images: {
    name: "图片",
    icon: "bar-chart",
    com: Images,
  },
};
const view = reactive([
  {
    type: "info",
    title: "页面标题",
  },
]);
const info = computed(() => view[0]);
let props = reactive({});
const isRight = ref(false);
const type = ref(null); //组件的类型
const index = ref(null); // 组件索引
const isPush = ref(false); //是否已添加组件

const selectType = (index) => {
  isRight.value = false;
  props = view[index];
  nextTick(() => {
    isRight.value = true;
  });
};

// 开始拖拽
const dragstart = (e) => {
  console.log(e.target.dataset.type);
  type.value = e.target.dataset.type;
};

// 拖拽结束
const dragend = () => {
  delete view[index.value].status;
  isPush.value = false;
  type.value = null;
};

// 放置到指定位置
const drog = () => {
  if (!type.value) return; //内容拖拽
  e.preventDefault();
  e.stopPropagation();

  dragend();
};

// 移动中
const dragOver = (e) => {
  if (!type.value) return;
  e.preventDefault(); //阻止浏览器默认行为
  e.stopPropagation(); //阻止冒泡

  let className = e.target.className; //view-content
  let name = className !== "view-content" ? "item" : "view-content"; //是否在其他布局组件上

  const defaultData = {
    type: type.value, // 组件类型
    status: 2, // 默认状态
    data: [], // 数据
    options: {}, // 选项操作
  };
  if (name == "view-content") {
    if (!isPush.value) {
      index.value = view.length;
      isPush.value = true;
      view.push(defaultData);
    }
  } else if (name == "item") {
    let target = e.target;
    let [y, h, curIndex] = [
      e.offsetY,
      target.offsetHeight,
      target.dataset.index,
    ];
    let direction = y < h / 2;

    if (!isPush.value) {
      // Push to Top or Bottom
      if (direction) {
        if (curIndex == 0) {
          view.unshift(defaultData);
        } else {
          view.splice(curIndex, 0, defaultData);
        }
      } else {
        curIndex = +curIndex + 1;
        view.splice(curIndex, 0, defaultData);
      }
    } else {
      // Moving
      console.log("move");
      let i = null;
      let result = null;
      if (direction) {
        i = curIndex == 0 ? 0 : curIndex - 1;
        result = view[i]["status"] == 2;
      } else {
        i = +curIndex + 1;
        result = view.length > i && view[i]["status"] == 2;
      }

      if (result) return;

      const temp = view.splice(index.value, 1);
      view.splice(curIndex, 0, temp[0]);
    }
    index.value = curIndex;
    isPush.value = true;
  }
};

const submit = () => {
  console.log("提交");
};

// 删除
const deleteItem = (e, index) => {
  e.preventDefault();
  e.stopPropagation();
  view.splice(index, 1);
  isRight.value = false;
  props = reactive({});
};
</script>

<style lang="less">
.decoration-edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background: #f7f8f9;
  height: calc(100vh - 50px);
  position: relative;
  .l,
  .r {
    width: 340px;
    height: 100%;
    padding: 15px 0;
    background: #fff;
  }
  .l {
    ul {
      margin: 0;
      padding: 0;
      li {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: default;
        list-style: none;
        font-size: 14px;
        color: #666;
        float: left;
        margin: 0 10px;
        border-radius: 6px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background: #efefef;
        }
        span {
          display: block;
          font-size: 40px;
          margin-bottom: 8px;
          color: #999;
        }
        p {
          display: block;
          margin: 0;
          font-size: 12px;
        }
      }
    }
  }
  .c {
    width: auto;
    max-width: 400px;
    position: relative;
    .top-nav {
      position: absolute;
      top: 0;
      background: #fff;
      z-index: 999;
      transition: all 0.3s;
      & * {
        pointer-events: none;
      }
      &:hover {
        transform: scale(0.95);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px #afafaf;
      }
      .tit {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
      }
      img {
        max-width: 100%;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
      }
    }
    .view-content {
      width: 400px;
      height: 700px;
      background: #f5f5f5;
      overflow-y: auto;
      overflow-x: hidden;
      padding-top: 72px;
      box-shadow: 0 2px 6px #ccc;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #dbdbdb;
      }
      &::-webkit-scrollbar-track {
        background: #f6f6f6;
      }

      .item {
        transition: all 0.3s;
        background: #fff;
        &:hover {
          transform: scale(0.95);
          border-radius: 10px;
          box-shadow: 0 0 10px #afafaf;
          .el-icon-error {
            display: block;
          }
        }
        div {
          pointer-events: none;
        }
        .wait {
          background: #deedff;
          height: 35px;
          text-align: center;
          line-height: 35px;
          font-size: 12px;
          color: #666;
        }
        .el-icon-error {
          position: absolute;
          right: -10px;
          top: -6px;
          color: red;
          font-size: 25px;
          cursor: pointer;
          display: none;
          z-index: 9999;
        }
      }
    }
  }
  .submit-btn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
