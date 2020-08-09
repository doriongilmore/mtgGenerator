import Vue from 'vue';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import VueX from 'vuex';
import VueRouter from 'vue-router';

import App from 'src/App.vue';
import { storeOpts } from 'src/store';
import { routeOpts } from 'src/routes';

import {
  BIconClipboardCheck,
  BIconFileText,
  BIconPen,
  BIconTools,
  BIconSearch,
  BIconGraphDown,
  BIconGraphUp,
  BIconPrinter,
  BIconDownload,
  BIconUpload,
  BIconTrash,
  BIconDash,
  BIconPlus,
  BIconPlusCircleFill,
  // IconsPlugin,
  NavPlugin,
  NavbarPlugin,
  DropdownPlugin,
  ButtonPlugin,
  ButtonGroupPlugin,
  LayoutPlugin,
  SpinnerPlugin,
  ProgressPlugin,
  ModalPlugin,
  CardPlugin,
  FormInputPlugin,
  FormCheckboxPlugin,
  FormTextareaPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
} from 'bootstrap-vue';

const IconComponentList = [
  { name: 'b-icon-file-text', module: BIconFileText },
  { name: 'b-icon-clipboard-check', module: BIconClipboardCheck },
  { name: 'b-icon-pen', module: BIconPen },
  { name: 'b-icon-tools', module: BIconTools },
  { name: 'b-icon-search', module: BIconSearch },
  { name: 'b-icon-printer', module: BIconPrinter },
  { name: 'b-icon-graph-down', module: BIconGraphDown },
  { name: 'b-icon-graph-up', module: BIconGraphUp },
  { name: 'b-icon-download', module: BIconDownload },
  { name: 'b-icon-upload', module: BIconUpload },
  { name: 'b-icon-trash', module: BIconTrash },
  { name: 'b-icon-dash', module: BIconDash },
  { name: 'b-icon-plus', module: BIconPlus },
  { name: 'b-icon-plus-circle-fill', module: BIconPlusCircleFill },
];

const VueUseList = [
  // IconsPlugin,
  NavPlugin,
  NavbarPlugin,
  DropdownPlugin,
  ButtonPlugin,
  ButtonGroupPlugin,
  LayoutPlugin,

  SpinnerPlugin,
  ProgressPlugin,
  ModalPlugin,
  CardPlugin,

  FormInputPlugin,
  FormCheckboxPlugin,
  FormTextareaPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
];

export default {
  Vue,
  IconComponentList,
  VueUseList,
  VueX,
  VueRouter,
  App,
  storeOpts,
  routeOpts,
};
