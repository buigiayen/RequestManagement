using System;
using System.Collections.Generic;

namespace RequestManagementAPI.Models.Entities
{
    public class RequestCategory
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Request> Requests { get; set; }
    }
}
