<template>
  <h3 class="table-top">{{ title }}</h3>
  <DataTable :value="data" :stripedRows="true" responsiveLayout="scroll">
    <Column field="position" header="Position"></Column>
    <Column field="name" header="Name"></Column>
  </DataTable>
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

<style scoped></style>
