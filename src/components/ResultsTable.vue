<template>
  <div class="results-table">
    <h3>{{ title }}</h3>
    <DataTable :value="data" :stripedRows="true" responsiveLayout="scroll">
      <Column field="position" header="Position"></Column>
      <Column field="name" header="Name"></Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.results-table {
  margin-bottom: 20px;
}
.font-size-10 {
  font-size: 10px;
}
</style>
