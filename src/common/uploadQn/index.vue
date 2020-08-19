<template>
  <vue-upload
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :accept="accept"
    :fetchToken="fetchToken"
  />
</template>

<script>
import VueUpload from '@halobear/vue-upload';
import { newQn as qnToken } from '@/api/uploadToken';

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
    },
    type: {
      type: String, // hotel public private
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    isHotel: {
      type: Boolean,
    },
  },
  components: {
    VueUpload,
  },
  methods: {
    fetchToken() {
      return qnToken(this.type);
    },
  },
};

// props: {
//   action: {
//     type: String,
//     default: "https://upload.qiniup.com"
//   },
//   value: {
//     type: Array
//   },
//   params: {
//     type: Object,
//     default: () => ({})
//   },
//   fetchToken: {
//     type: Function
//   },
//   limit: {
//     type: Number,
//     default: 1
//   },
//   size: {
//     type: Number,
//     default: 20 // 限制文件大小20
//   },
//   width: {
//     type: Number,
//     default: 0
//   },
//   height: {
//     type: Number,
//     default: 0
//   },
//   accept: {
//     type: String,
//     default: 'image/*'
//   },
//   needMD5: {
//     type: Boolean,
//     default: true // 是否获取文件MD5
//   }
// },
</script>
