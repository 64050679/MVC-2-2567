using System;
using System.Collections.Generic;

namespace MVC_Backend_64050679.Models;

//โมเดลที่ใช้ใน Database เดี๋ยวแคปรูปส่งให้ครับ
public partial class Driver
{
    public int LicenseNumber { get; set; }

    public string DriverType { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string LicenseStatus { get; set; } = null!;
}
