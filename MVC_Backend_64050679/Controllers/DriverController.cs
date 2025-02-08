using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVC_Backend_64050679.Data;
using MVC_Backend_64050679.DTOS;
using MVC_Backend_64050679.Models;

namespace MVC_Backend_64050679.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly DriverDbContext _context;

        public DriverController(DriverDbContext context)
        {
            _context = context;
        }

        [HttpGet("driver-details/{licenseNumber}")]
        public async Task<ActionResult<Driver>> GetDriverByLicenseNumber(int licenseNumber)
        {
            // ขั้นตอนการ query ด้วย licensenumber
            var driver = await _context.Drivers.FindAsync(licenseNumber);

            if (driver == null)
            {
                // ถ้าหาคนขับไม่เจอจะส่ง 404 ไปให้
                return NotFound(new { Message = "Driver not found." });
            }

            // return 200 ถ้าไม่มีปัญหาอะไร
            return Ok(driver);
        }

        [HttpPut("update-license-status")]
        public async Task<ActionResult> UpdateLicenseStatus([FromBody] UpdateStatusDTO request)
        {
            int licenseNumber = request.LicenseNumber;
            string status = request.Status;

            // query ข้อมูล
            var driver = await _context.Drivers.FindAsync(licenseNumber);

            if (driver == null)
            {
                // ถ้าหาไม่เจอก็จะ return 404
                return NotFound(new { Message = "Driver not found." });
            }

            // validate ข้อมูล ว่า status ที่รับมาตรงกับอะไรในนี้ไหม
            var validStatuses = new[] { "active", "expired", "closed" };
            if (!validStatuses.Contains(status.ToLower()))
            {
                // return 404
                return BadRequest(new { Message = "Invalid status. Valid values are 'active', 'expired', or 'closed'." });
            }

            // update status ของใบขับขี่
            driver.LicenseStatus = status.ToLower();

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Driver status updated successfully." });
        }

        [HttpPut("update-driver-type")]
        public async Task<ActionResult> UpdateDriverType([FromBody] UpdateTypeDTO request)
        {
            int licenseNumber = request.LicenseNumber;
            string driverType = request.DriverType;

            var driver = await _context.Drivers.FindAsync(licenseNumber);

            if (driver == null)
            {
                return NotFound(new { Message = "Driver not found." });
            }

            var validDriverTypes = new[] { "normal", "newbie", "public" };
            if (!validDriverTypes.Contains(driverType.ToLower()))
            {
                return BadRequest(new { Message = "Invalid driver type. Valid values are 'normal', 'newbie', or 'public'." });
            }

            driver.DriverType = driverType.ToLower();

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Driver type updated successfully." });
        }


        [HttpGet("driver-statistics")]
        public async Task<ActionResult> GetDriverStatistics()
        {
            var driverStatistics = await _context.Drivers
                .GroupBy(d => new { d.DriverType, d.LicenseStatus })  // Group ข้อมูลด้วย DriverType กับ Status
                .Select(g => new
                {
                    DriverType = g.Key.DriverType,
                    LicenseStatus = g.Key.LicenseStatus,
                    Count = g.Count()
                })
                .ToListAsync();

            var totalDriversCount = await _context.Drivers.CountAsync();

            return Ok(new { driverStatistics, totalDriversCount});
        }
    }
}
