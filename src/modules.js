import Vue from 'vue';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import VueX from 'vuex';
import VueRouter from 'vue-router';

import App from 'src/App.vue';
import { storeOpts } from 'src/store';
import { routeOpts } from 'src/routes';

import {
  BIconFilterCircleFill,
  BIconClipboardCheck,
  BIconFileText,
  BIconPen,
  BIconPencil,
  BIconTools,
  BIconSearch,
  BIconGraphDown,
  BIconGraphUp,
  BIconPrinter,
  BIconDownload,
  BIconUpload,
  BIconTrash,
  BIconDashCircleFill,
  BIconPlusCircleFill,
  BIconArrowUp,
  BIconArrowDown,
  BIconArrowLeft,
  BIconArrowRight,
  DropdownPlugin,
  NavPlugin,
  NavbarPlugin,
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
  { name: 'b-icon-filter-circle-fill', module: BIconFilterCircleFill },
  { name: 'b-icon-file-text', module: BIconFileText },
  { name: 'b-icon-clipboard-check', module: BIconClipboardCheck },
  { name: 'b-icon-pen', module: BIconPen },
  { name: 'b-icon-pencil', module: BIconPencil },
  { name: 'b-icon-tools', module: BIconTools },
  { name: 'b-icon-search', module: BIconSearch },
  { name: 'b-icon-printer', module: BIconPrinter },
  { name: 'b-icon-graph-down', module: BIconGraphDown },
  { name: 'b-icon-graph-up', module: BIconGraphUp },
  { name: 'b-icon-download', module: BIconDownload },
  { name: 'b-icon-upload', module: BIconUpload },
  { name: 'b-icon-trash', module: BIconTrash },
  { name: 'b-icon-arrow-up', module: BIconArrowUp },
  { name: 'b-icon-arrow-down', module: BIconArrowDown },
  { name: 'b-icon-arrow-left', module: BIconArrowLeft },
  { name: 'b-icon-arrow-right', module: BIconArrowRight },
  { name: 'b-icon-plus-circle-fill', module: BIconPlusCircleFill },
  { name: 'b-icon-dash-circle-fill', module: BIconDashCircleFill },
];

const VueUseList = [
  NavPlugin,
  NavbarPlugin,

  DropdownPlugin,
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
