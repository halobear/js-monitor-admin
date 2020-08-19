import { mapState } from "vuex";
import { deviceEnquire, DEVICE_TYPE } from "@/utils/device";

export const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    }),
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE;
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP;
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET;
    }
  }
};

export const AppDeviceEnquire = {
  mounted() {
    const { dispatch } = this.$store;
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          dispatch("toggleDevice", deviceType);
          dispatch("toggleSidebar", false);
          break;
        case DEVICE_TYPE.TABLET:
          dispatch("toggleDevice", deviceType);
          dispatch("toggleSidebar", false);
          break;
        case DEVICE_TYPE.MOBILE:
        default:
          dispatch("toggleDevice", deviceType);
          dispatch("toggleSidebar", true);
          break;
      }
    });
  }
};

export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 4
          }
        }
      }
    };
  },
  methods: {
    // 保存列表参数
    changeImage(url, path, originData) {
      return url ? [{ ...originData, url: url, path: path }] : [];
    },
    // 展示图片  form.cover = changeImage(d.cover_url, d.cover)
    submitImage(cover) {
      return cover && cover.length ? cover[0].path : "";
    },
    saveParams(payload = {}) {
      this.payload = { ...this.payload, ...payload };
      this.$router.push({ query: { ...this.$route.query, ...this.payload } });
    },
    getPayload(fixPayload) {
      const { query = {} } = this.$route;
      const payload = {
        page: 1,
        per_page: 12,
        ...query,
        ...fixPayload
      };
      const numKeys = ["page", "per_page", "status"];
      numKeys.forEach(key => {
        payload[key] && (payload[key] = Number(payload[key]));
      });
      return payload;
    }
  }
};
