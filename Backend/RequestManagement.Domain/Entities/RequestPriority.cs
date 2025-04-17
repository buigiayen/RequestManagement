using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class RequestPriority
    {
        [Key]
        public int PriorityId { get; set; }
        public string PriorityName { get; set; }
        public string Description { get; set; }
        public string ColorCode { get; set; }

        // Navigation properties
        public virtual ICollection<Request> Requests { get; set; }
    }
}
