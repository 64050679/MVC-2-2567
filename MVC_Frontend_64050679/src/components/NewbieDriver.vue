<script setup>
import { defineProps } from "vue";
import useNewbieHooks from "../controller/useNewbieDriverHook";

// รับ Props เข้ามาใช้จาก Component แม่
const props = defineProps({
  driver: Object,
});

const {
  driverStatus,
  writtenTestCompleted,
  practicalTestCompleted,
  toggleWrittenTest,
  togglePracticalTest,
  driverType,
  reload,
} = useNewbieHooks(props.driver);
</script>

<template>
  <div id="newbie-driver">
    <h2>Newbie Driver Status</h2>

    <div v-if="driverStatus === 'Expired' || driverStatus === 'expired'">
      <p>Driver Status: Expired</p>
      <button @click="reload">Continue</button>
    </div>

    <div v-else-if="driverStatus === 'Closed' || driverStatus === 'closed'">
      <p>Driver Status: Suspended</p>
      <button @click="reload">Continue</button>
    </div>

    <div v-else-if="driverStatus === 'Active' || driverStatus === 'active'">
      <p>Driver Status: Active</p>
      <p>Driver Type: {{ driverType }}</p>

      <button @click="toggleWrittenTest">
        {{ writtenTestCompleted ? "สิ้นสุดการสอบข้อเขียน" : "สอบข้อเขียน" }}
      </button>

      <button @click="togglePracticalTest">
        {{ practicalTestCompleted ? "สิ้นสุดการสอบปฏิบัติ" : "สอบปฏิบัติ" }}
      </button>
    </div>
  </div>
</template>
