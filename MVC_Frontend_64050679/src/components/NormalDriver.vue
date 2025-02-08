<script setup>
import { defineProps, watch } from "vue";
import useNormalDriverHooks from "../controller/useNormalDriverHooks.js";

// รับ Props เข้ามาใช้จาก Component แม่

const props = defineProps({
  driver: Object,
});

const {
  driverStatus,
  performanceTest,
  startPerformanceTest,
  endPerformanceTest,
  reload,
} = useNormalDriverHooks(props.driver);
</script>

<template>
  <div id="normal-driver">
    <h2>Normal Driver Status</h2>

    <div v-if="driverStatus === 'Expired' || driverStatus === 'expired'">
      <p>Driver Status: Expired</p>
      <button @click="reload">Continue</button>
    </div>
    <div v-if="driverStatus === 'Closed' || driverStatus === 'closed'">
      <p>Driver Status: Suspended</p>
      <button @click="reload">Continue</button>
    </div>
    <div v-if="driverStatus === 'Active' || driverStatus === 'active'">
      <p>Driver Status: Active</p>
      <button v-if="performanceTest" @click="endPerformanceTest">
        End Performance Test
      </button>
      <button v-else @click="startPerformanceTest">
        Start Performance Test
      </button>
    </div>
  </div>
</template>
