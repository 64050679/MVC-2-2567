using System;
using System.Collections.Generic;
using MVC_Backend_64050679.Models;
using Microsoft.EntityFrameworkCore;

namespace MVC_Backend_64050679.Data;

//ใช้สำหรับเข้าถึง DB
public partial class DriverDbContext : DbContext
{
    public DriverDbContext()
    {
    }

    public DriverDbContext(DbContextOptions<DriverDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Driver> Drivers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-20PRBQI\\SQLEXPRESS;Database=Drivers;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Driver>(entity =>
        {
            entity.HasKey(e => e.LicenseNumber);

            entity.ToTable("Driver");

            entity.Property(e => e.LicenseNumber)
                .ValueGeneratedNever()
                .HasColumnName("license_number");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.DriverType)
                .HasMaxLength(50)
                .HasColumnName("driver_type");
            entity.Property(e => e.LicenseStatus)
                .HasMaxLength(50)
                .HasColumnName("license_status");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
