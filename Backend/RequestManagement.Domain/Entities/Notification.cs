using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; } = false;
        public int? RelatedEntityId { get; set; }
        public string RelatedEntityType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual User User { get; set; }
    }
}
