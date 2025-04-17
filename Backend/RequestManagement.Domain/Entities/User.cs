using Microsoft.AspNetCore.Identity;

namespace RequestManagement.Domain.Models.Entities
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<CustomerGroup> CreatedCustomerGroups { get; set; }
        public virtual ICollection<Customer> CreatedCustomers { get; set; }
        public virtual ICollection<Request> AssignedRequests { get; set; }
        public virtual ICollection<Request> CreatedRequests { get; set; }
        public virtual ICollection<Request> ClosedRequests { get; set; }
        public virtual ICollection<RequestComment> Comments { get; set; }
        public virtual ICollection<RequestAttachment> Attachments { get; set; }
        public virtual ICollection<RequestHistory> Histories { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
    }
}
