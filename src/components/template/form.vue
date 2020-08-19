<template>
  <a-card>
    <a-form-model
      ref="form"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <a-form-model-item label="全景图片" prop="pano_url">
        <upload-qn
          module="pano"
          type="pano"
          :tip="'建议尺寸10000*5000px'"
          :size="20"
          v-model="form.pano_src"
        ></upload-qn>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button size="large" htmlType="submit" type="primary">确认保存</a-button>
        <a-button
          ghost
          style="margin-left: 15px;"
          size="large"
          htmlType="submit"
          type="primary"
        >设置方向</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        pano_url: [
          { required: true, message: '请上传全景' },
          { required: true, message: '请上传zip包' }
        ]
      },
      form: {}
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
      });
    }
  }
};
</script>
