<template>
  <div class="horse-list">
    <h2>Horse List (1-20)</h2>
    <DataTable :value="horses" :rows="20" responsiveLayout="scroll">
      <Column field="name" header="Name"></Column>
      <Column field="condition" header="Condition"></Column>
      <Column header="Color">
        <template #body="slotProps">
          <div
            :style="{
              backgroundColor: slotProps.data.color,
              width: '100%',
              height: '20px',
            }"
          ></div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["horses"]),
  },
  methods: {
    colorTemplate(rowData) {
      return `<div style="width: 100%; height: 20px; background-color: ${rowData.color};"></div>`;
    },
  },
};
</script>

<style scoped>
.horse-list {
  margin: 20px;
}
.color-column {
  text-align: center;
}
</style>
