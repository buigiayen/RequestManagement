using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class RequestHistory
    {
        [Key]
        public int HistoryId { get; set; }
        public int RequestId { get; set; }
        public int UserId { get; set; }
        public string ChangeType { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
        public string Description { get; set; }

        // Navigation properties
        public virtual Request Request { get; set; }
        public virtual User User { get; set; }
    }
}
