using System.ComponentModel.DataAnnotations;

namespace RequestManagement.Domain.Models.Entities
{
    public class RequestAttachment
    {
        [Key]
        public int AttachmentId { get; set; }
        public int RequestId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }
        public string FileType { get; set; }
        public int UploadedBy { get; set; }
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Request Request { get; set; }
        public virtual User Uploader { get; set; }
    }
}
