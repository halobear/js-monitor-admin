<template>
  <div>
    <my-pagination :total="total" :payload="payload"></my-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 50,
      payload: {
        page: 1,
        per_page: 20
      }
    }
  }
}
</script>