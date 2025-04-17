using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class CustomerGroup
    {
        [Key]
        public int CustomerGroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int CreatedBy { get; set; }

        // Navigation properties
        public virtual User Creator { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
    }
}
