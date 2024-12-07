<template>
  <div class="program-table">
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
.program-table {
  margin-bottom: 20px;
}
</style>
