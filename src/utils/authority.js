import localData from "kuan-utils/lib/localData";

const authority = localData.create(
  process.env.VUE_APP_LOCAL_KEY || "super_admin"
);

export function changeCode(code) {
  const user = authority.get() || {};
  user.region_code = code;
  authority.set(user);
  return user;
}

export function authorityPlugins(store) {
  store.subscribe((mutation, state = {}) => {
    if (mutation.type === "SET_USER") {
      const { user = {} } = state.user || {};
      authority.set(user);
    }
  });
}

export default authority;
