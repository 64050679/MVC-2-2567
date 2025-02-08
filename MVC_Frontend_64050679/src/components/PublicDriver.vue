<script setup>
import { defineProps } from "vue";
import usePublicDriverHook from "../controller/usePublicDriverHook";

// รับ Props เข้ามาใช้จาก Component แม่
const props = defineProps({
  driver: Object,
});

const {
  driverStatus,
  complaintsCount,
  trainingCompleted,
  abilityTestCompleted,
  toggleTraining,
  toggleAbilityTest,
  driverType,
  reload,
} = usePublicDriverHook(props.driver);
</script>

<template>
  <div id="public-driver">
    <h2>Public Driver Status</h2>

    <div v-if="driverStatus === 'Expired' || driverStatus === 'expired'">
      <p>Driver Status: Expired</p>
      <button @click="reload">Continue</button>
    </div>

    <div v-else-if="driverStatus === 'Closed' || driverStatus === 'closed'">
      <p>Driver Status: Suspended</p>
      <button @click="reload">Continue</button>
    </div>

    <div
      v-else-if="
        driverStatus === 'Temporarily Closed' ||
        driverStatus === 'temporarily closed'
      "
    >
      <p>Driver Status: Temporarily Suspended</p>
      <p>Complaints: {{ complaintsCount }}</p>

      <button v-if="!trainingCompleted" @click="toggleTraining">อบรม</button>
      <button v-else @click="toggleTraining">สิ้นสุดการอบรม</button>
    </div>

    <div v-else-if="driverStatus === 'Active' || driverStatus === 'active'">
      <p>Driver Status: Active</p>
      <p>Driver Type: {{ driverType }}</p>
      <p>Complaints: {{ complaintsCount }}</p>

      <button v-if="!abilityTestCompleted" @click="toggleAbilityTest">
        ทดสอบสมรรถนะ
      </button>
      <button v-else @click="toggleAbilityTest">สิ้นสุดการทดสอบ</button>
    </div>
  </div>
</template>
