<template>
  <div class="horse-list">
    <div class="horse-header">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Horse List (1-20)</h2>
    </div>
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
};
</script>

<style scoped>
.horse-list {
}

.horse-header {
  background: yellow;
  border: 1px solid black;
  text-align: center;
}
</style>
