using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class RequestComment
    {
        [Key]
        public int CommentId { get; set; }
        public int RequestId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual Request Request { get; set; }
        public virtual User User { get; set; }
    }
}
