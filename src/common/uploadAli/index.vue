<template>
  <vue-upload v-bind="$attrs" :value="value" v-on="$listeners" :needMD5="false" :params="params" />
</template>

<script>
import VueUpload from '@halobear/vue-upload';
import { aliToken } from '@/api/uploadToken';

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    VueUpload
  },
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      params: {},
      token: ''
    };
  },
  mounted() {
    this.getToken();
  },
  methods: {
    async getToken() {
      const data = await aliToken();
      this.params = {
        host: data.host,
        dir: data.dir,
        OSSAccessKeyId: data.accessid,
        policy: data.policy,
        Signature: data.signature,
        callback: data.callback
      };
    }
  }
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
