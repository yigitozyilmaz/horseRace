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
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.program-table {
  margin-bottom: 20px;
}
</style>
