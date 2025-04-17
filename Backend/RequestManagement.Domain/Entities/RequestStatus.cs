using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class RequestStatus
    {
        [Key]
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string Description { get; set; }
        public string ColorCode { get; set; }
        public int Order { get; set; }

        // Navigation properties
        public virtual ICollection<Request> Requests { get; set; }
    }
}
