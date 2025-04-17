using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public int? CustomerGroupId { get; set; }
        public string CustomerCode { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int CreatedBy { get; set; }

        // Navigation properties
        public virtual CustomerGroup CustomerGroup { get; set; }
        public virtual User Creator { get; set; }
        public virtual ICollection<Request> Requests { get; set; }
    }
}
