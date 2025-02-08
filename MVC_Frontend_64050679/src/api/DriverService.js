import apiClient from "./apiClient";

const DriverService = {
  // เส้น Get driver details รับข้อมูลของ driver รหัสนั้นๆ
  getDriverByLicenseNumber(licenseNumber) {
    return apiClient.get(`Driver/driver-details/${licenseNumber}`);
  },

  // Update Status ของ License 
  updateLicenseStatus(licenseNumber, status) {
    return apiClient.put(`Driver/update-license-status`, {
      licenseNumber: licenseNumber,
      status: status,
    });
  },

  // Update Type ของ License
  updateLicenseType(licenseNumber, driverType) {
    return apiClient.put(`Driver/update-driver-type`, {
      licenseNumber: licenseNumber,
      driverType: driverType,
    });
  },

  // รับค่าสถิติใบขับขี่ทั้งหมด
  getDriverStatistics() {
    return apiClient.get("Driver/driver-statistics");
  },
};

export default DriverService;
