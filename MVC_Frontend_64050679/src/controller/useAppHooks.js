import { computed, onMounted, ref } from "vue";
import DriverService from "../api/DriverService";

export default function useAppHooks() {
  const driver = ref("");
  const errorMessage = ref("");
  const licenseNumber = ref("");
  const status = ref("");
  const driverStatistics = ref([]);
  const totalDriversCount = ref(0);

  const fetchDriverDetails = async () => {
    try {
      const response = await DriverService.getDriverByLicenseNumber(
        licenseNumber.value
      );
      driver.value = response.data;

      errorMessage.value = null;
    } catch (error) {
      errorMessage.value = "Driver not found or error occurred";
    }
  };

  // Update status ของคนขับ
  const updateDriverStatus = async (licenseNumber, newStatus) => {
    try {
      const response = await DriverService.updateLicenseStatus(
        licenseNumber,
        newStatus
      );
      console.log(licenseNumber.value);

      console.log(response);
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  // Get สถิติทั้งหมดของคนขับ เอ่อใบขับขี่ทั้งหมด
  const getDriverStatistics = async () => {
    try {
      const response = await DriverService.getDriverStatistics();
      driverStatistics.value = response.data.driverStatistics;
      totalDriversCount.value = response.data.totalDriversCount;
    } catch (error) {
      console.log("Error fetching statistics:", error);
    }
  };

  const driverType = computed(() => {
    return driver.value.driverType === "Normal"
      ? "Normal"
      : driver.value.driverType === "Newbie"
      ? "Newbie"
      : driver.value.driverType === "Public"
      ? "Public"
      : "";
  });

  const validateLicenseNumber = computed(() => {
    // Regular expression สำหรับเช็คว่ากรอกถูก format
    const regex = /^[1-9]\d{8}$/;
    return licenseNumber.value === "" ? true : regex.test(licenseNumber.value);
  });

  onMounted(() => {
    getDriverStatistics();
  });

  // Return methods and data for the component to use
  return {
    driver,
    driverType,
    errorMessage,
    licenseNumber,
    status,
    validateLicenseNumber,
    driverStatistics,
    totalDriversCount,
    fetchDriverDetails,
    updateDriverStatus,
    getDriverStatistics,
  };
}
