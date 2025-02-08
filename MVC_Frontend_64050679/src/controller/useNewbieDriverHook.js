import { ref, computed } from "vue";
import useAppHooks from "./useAppHooks";
import DriverService from "../api/DriverService";

export default function useNewbieHooks(driver) {
  const status = ref(""); // Store the driver's status
  const writtenTestCompleted = ref(false);
  const practicalTestCompleted = ref(false);
  const driverType = ref("มือใหม่"); // Default type is Newbie

  const { updateDriverStatus } = useAppHooks();

  const reload = () => {
    window.location.reload();
  };

  // Function to calculate age
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

  // Computed property to determine driver status
  const driverStatus = computed(() => {
    if (!driver) return "";

    const age = calculateAge(driver.birthDate);

    if (age > 50) {
      status.value = "Expired";
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Expired";
    } else if (age < 16) {
      status.value = "Closed"; // If age is under 16, suspend
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Closed";
    } else {
      console.log(driver);

      return driver.licenseStatus; // Driver is active if between 16 and 70
    }
  });

  // Toggle written test completion
  const toggleWrittenTest = () => {
    writtenTestCompleted.value = !writtenTestCompleted.value;
    checkForGeneralType();
  };

  // Toggle practical test completion
  const togglePracticalTest = () => {
    practicalTestCompleted.value = !practicalTestCompleted.value;
    checkForGeneralType();
  };

  const updateDriverType = async () => {
    try {
      const response = await DriverService.updateLicenseType(
        driver.licenseNumber,
        "Normal"
      );

      console.log(response);
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  // Check if both tests are completed → Change type to "บุคคลทั่วไป"
  const checkForGeneralType = async () => {
    if (writtenTestCompleted.value && practicalTestCompleted.value) {
      driverType.value = "Normal";
      await updateDriverType();
      reload();
    }
  };

  return {
    status,
    driverStatus,
    writtenTestCompleted,
    practicalTestCompleted,
    toggleWrittenTest,
    togglePracticalTest,
    driverType,
    reload,
  };
}
