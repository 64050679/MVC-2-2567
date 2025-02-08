import { ref, computed } from "vue";
import useAppHooks from "./useAppHooks";

export default function useNormalDriverHooks(driver) {
  const status = ref(""); // To store the driver's status
  const performanceTest = ref(false); // To track performance test state

  const { updateDriverStatus } = useAppHooks();

  const reload = () => {
    window.location.reload();
  };

  // Utility function to calculate the driver's age based on the birthDate
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Computed property to track the driver's status
  const driverStatus = computed(() => {
    if (!driver) return ""; // If no driver data, return an empty string

    const age = calculateAge(driver.birthDate);
    console.log(age);
    console.log(driver);

    // Change status based on age conditions
    if (age > 70) {
      status.value = "Expired";
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Expired"; // Driver over 70 is expired
    } else if (age < 16) {
      status.value = "Closed";
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Closed"; // Driver under 16 is suspended
    } else {
      console.log(driver);

      return driver.licenseStatus; // Driver is active if between 16 and 70
    }
  });

  // Function to start the performance test
  const startPerformanceTest = () => {
    if (driverStatus.value === "Active") {
      performanceTest.value = true;
    }
  };

  // Function to end the performance test
  const endPerformanceTest = () => {
    reload();
  };

  return {
    status,
    driverStatus,
    performanceTest,
    startPerformanceTest,
    endPerformanceTest,
    reload,
  };
}
