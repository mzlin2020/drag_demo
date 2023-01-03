import "ant-design-vue/dist/antd.css";

import {
  ConfigProvider,
  Button,
  Layout,
  Menu,
  Result,
  Breadcrumb,
  Dropdown,
  Input,
  Checkbox,
  Form,
  Table,
  Tabs,
  Radio,
  Upload,
  Select,
  DatePicker,
  Row,
  Col,
  Pagination,
  Spin,
  Drawer,
  Tooltip,
  Modal,
  BackTop,
  Switch,
  Space,
  Card,
} from "ant-design-vue";

const components = [
  ConfigProvider,
  Button,
  Layout,
  Menu,
  Result,
  Breadcrumb,
  Dropdown,
  Input,
  Checkbox,
  Form,
  Table,
  Tabs,
  Radio,
  Upload,
  Select,
  DatePicker,
  Row,
  Col,
  Pagination,
  Spin,
  Drawer,
  Tooltip,
  Modal,
  BackTop,
  Switch,
  Space,
  Card,
];

// 按需引用antd
export default function registerAntd(App) {
  components.forEach((component) => {
    App.use(component);
  });
}
