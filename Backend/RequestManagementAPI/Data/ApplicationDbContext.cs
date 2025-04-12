using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RequestManagementAPI.Models.Entities;

namespace RequestManagementAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CustomerGroup> CustomerGroups { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<RequestCategory> RequestCategories { get; set; }
        public DbSet<RequestPriority> RequestPriorities { get; set; }
        public DbSet<RequestStatus> RequestStatuses { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestComment> RequestComments { get; set; }
        public DbSet<RequestAttachment> RequestAttachments { get; set; }
        public DbSet<RequestHistory> RequestHistories { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>()
                .HasMany(u => u.CreatedCustomerGroups)
                .WithOne(cg => cg.Creator)
                .HasForeignKey(cg => cg.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.CreatedCustomers)
                .WithOne(c => c.Creator)
                .HasForeignKey(c => c.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.AssignedRequests)
                .WithOne(r => r.AssignedUser)
                .HasForeignKey(r => r.AssignedTo)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.CreatedRequests)
                .WithOne(r => r.Creator)
                .HasForeignKey(r => r.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.ClosedRequests)
                .WithOne(r => r.Closer)
                .HasForeignKey(r => r.ClosedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure CustomerGroup entity
            modelBuilder.Entity<CustomerGroup>()
                .HasMany(cg => cg.Customers)
                .WithOne(c => c.CustomerGroup)
                .HasForeignKey(c => c.CustomerGroupId)
                .OnDelete(DeleteBehavior.SetNull);

            // Configure Customer entity
            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Requests)
                .WithOne(r => r.Customer)
                .HasForeignKey(r => r.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Request entity
            modelBuilder.Entity<Request>()
                .HasMany(r => r.Comments)
                .WithOne(rc => rc.Request)
                .HasForeignKey(rc => rc.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Request>()
                .HasMany(r => r.Attachments)
                .WithOne(ra => ra.Request)
                .HasForeignKey(ra => ra.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Request>()
                .HasMany(r => r.Histories)
                .WithOne(rh => rh.Request)
                .HasForeignKey(rh => rh.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure RequestAttachment entity
            modelBuilder.Entity<RequestAttachment>()
                .HasOne(ra => ra.Uploader)
                .WithMany(u => u.Attachments)
                .HasForeignKey(ra => ra.UploadedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure RequestComment entity
            modelBuilder.Entity<RequestComment>()
                .HasOne(rc => rc.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(rc => rc.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure RequestHistory entity
            modelBuilder.Entity<RequestHistory>()
                .HasOne(rh => rh.User)
                .WithMany(u => u.Histories)
                .HasForeignKey(rh => rh.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Notification entity
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
