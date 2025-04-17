using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        public string RequestCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CustomerId { get; set; }
        public int CategoryId { get; set; }
        public int PriorityId { get; set; }
        public int StatusId { get; set; }
        public int? AssignedTo { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ClosedAt { get; set; }
        public int? ClosedBy { get; set; }

        // Navigation properties
        public virtual Customer Customer { get; set; }
        public virtual RequestCategory Category { get; set; }
        public virtual RequestPriority Priority { get; set; }
        public virtual RequestStatus Status { get; set; }
        public virtual User AssignedUser { get; set; }
        public virtual User Creator { get; set; }
        public virtual User Closer { get; set; }
        public virtual ICollection<RequestComment> Comments { get; set; }
        public virtual ICollection<RequestAttachment> Attachments { get; set; }
        public virtual ICollection<RequestHistory> Histories { get; set; }
    }
}
