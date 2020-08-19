<template>
  <page-layout>
    <search @change="saveParams"></search>
    <a-card>
      <a-button @click="showModal" type="primary" class="add-btn">添加</a-button>
      <a-table :pagination="false" rowKey="id" :dataSource="data" :columns="columns">
        <template #avatar_url="text">
          <my-image :src="text"></my-image>
        </template>
        <template #action="text,record">
          <div class="action-box">
            <status-btn :status="record.status" @click="changeStatus(record)"></status-btn>
            <span class="primary">修改</span>
            <span @click="remove(record)" class="danger">删除</span>
          </div>
        </template>
      </a-table>
      <my-pagination :payload="payload" :total="total"></my-pagination>
      <a-modal
        :maskClosable="false"
        :destroyOnClose="true"
        :title="record.id ? '修改' : '添加'"
        v-model="visible"
        @ok="onSubmit"
        :width="600"
      >
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
        </a-form-model>
      </a-modal>
    </a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/model/product';

import Search from './Search';

const columns = [
  // { title: '编号', dataIndex: 'id' },
  { title: '头像', dataIndex: 'avatar_url', scopedSlots: { customRender: 'avatar_url' } },
  { title: '操作', scopedSlots: { customRender: 'action' } },
];

export default {
  components: {
    Search,
  },
  data() {
    return {
      form: {
        pano_url: [],
      },
      rules: {
        pano_url: [{ required: true, message: '请上传全景' }],
      },
      columns,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      data: [],
      payload: this.getPayload(),
      total: 0,
      record: {},
      visible: false,
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList() {
      // const data = await Api.list(this.payload);
      // this.data = data.list;
      // this.total = data.total;
    },
    async changeStatus(record) {
      console.log(record);
      // await Api.change(record);
      // this.$message.success('修改成功');
      // this.fetchList();
    },
    showModal(record = {}) {
      const r = { ...record };
      if (r.id) {
        r.avatar = [
          {
            url: record.avatar_url,
            path: record.avatar,
          },
        ];
      }
      this.record = r;
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    remove({ id }) {
      this.$confirm({
        title: '请确认',
        content: '删除后将不能恢复',
        onOk: async () => {
          await Api.remove(id);
          this.$message.success('删除成功');
          this.data = this.data.filter((item) => item.id !== id);
        },
      });
    },
    onSubmit() {
      this.form.validateFields(async (err, v) => {
        if (err) return;
        const values = { ...v };
        const { id } = this.record;
        values.avatar = values.avatar[0].path;

        if (id) {
          values.id = id;
          await Api.update(values);
          this.$message.success('更新成功');
        } else {
          await Api.add(values);
          this.$message.success('添加成功');
        }
        this.visible = false;
        this.fetchList();
      });
    },
  },
};
</script>
