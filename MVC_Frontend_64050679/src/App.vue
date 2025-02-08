<script setup>
import useAppHooks from "./controller/useAppHooks.js";
import NormalDriver from "./components/NormalDriver.vue";
import NewbieDriver from "./components/NewbieDriver.vue";
import PublicDriver from "./components/PublicDriver.vue";

const {
  driver,
  driverStatistics,
  driverType,
  totalDriversCount,
  errorMessage,
  licenseNumber,
  validateLicenseNumber,
  fetchDriverDetails,
} = useAppHooks();
</script>

<template>
  <div id="app">
    <h1>Driver License Validation</h1>
    <div>
      <input
        v-model="licenseNumber"
        type="text"
        placeholder="Enter License Number"
        :class="{ invalid: !validateLicenseNumber }"
      />
      <p v-if="!validateLicenseNumber" class="error-message">
        License number must be 9 digits and not start with 0.
      </p>

      <button
        :disabled="licenseNumber === '' ? true : !validateLicenseNumber"
        @click="fetchDriverDetails"
      >
        Check License
      </button>
    </div>

    <!-- Display driver details if available -->
    <NormalDriver v-if="driverType === 'Normal'" :driver="driver" />

    <NewbieDriver v-if="driverType === 'Newbie'" :driver="driver" />

    <PublicDriver v-if="driverType === 'Public'" :driver="driver" />
    <!-- Show error message if any -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div v-if="driverStatistics.length > 0" class="statistics">
      <h2>Driver Statistics</h2>
      <p><strong>Total Drivers:</strong> {{ totalDriversCount }}</p>
      <table>
        <thead>
          <tr>
            <th>Driver Type</th>
            <th>License Status</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stat, index) in driverStatistics" :key="index">
            <td>{{ stat.driverType }}</td>
            <td>{{ stat.licenseStatus }}</td>
            <td>{{ stat.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.invalid {
  border-color: red;
}

.error-message {
  color: red;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
