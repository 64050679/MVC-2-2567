import { ref, computed } from "vue";
import useAppHooks from "./useAppHooks";

export default function usePublicDriverHook(driver) {
  const status = ref("");
  const trainingCompleted = ref(false);
  const abilityTestCompleted = ref(false);
  const complaintsCount = ref(0);
  const driverType = ref("");

  const { updateDriverStatus } = useAppHooks();

  const reload = () => {
    window.location.reload();
  };

  // คำนวณอายุจาก Date ทำไมผมไม่ใช้ int ระบุอายุไปน้าาาา
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

  // Function gen คำ complaints สำหรับ public driver
  const generateComplaints = () => {
    return Math.floor(Math.random() * 11);
  };

  // บรรทัดนี้ใช้ Init complaint count จำนวน complaint นั่นแหละ
  complaintsCount.value = generateComplaints();

  // หา condition สำหรับการแสดงผล
  const driverStatus = computed(() => {
    if (!driver) return "";

    const age = calculateAge(driver.birthDate);

    if (age > 60) {
      status.value = "Expired";
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Expired";
    } else if (age < 20) {
      status.value = "Closed";
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Closed";
    } else if (complaintsCount.value > 5) {
      status.value = "Closed";
      updateDriverStatus(driver.licenseNumber, status.value);
      return "Temporarily Closed";
    } else {
      console.log(driver);

      return driver.licenseStatus;
    }
  });

  const toggleTraining = async () => {
    trainingCompleted.value = !trainingCompleted.value;
    if (!trainingCompleted.value) {
      // ถ้าอบรบเสร็จจะกลับเป็น active แล้ว reload
      await updateDriverStatus(driver.licenseNumber, "active");
      reload();
    }
  };

  const toggleAbilityTest = () => {
    abilityTestCompleted.value = !abilityTestCompleted.value;
    if (!abilityTestCompleted.value) {
      reload();
    }
  };

  return {
    status,
    driverStatus,
    complaintsCount,
    trainingCompleted,
    abilityTestCompleted,
    toggleTraining,
    toggleAbilityTest,
    driverType,
    reload,
  };
}
