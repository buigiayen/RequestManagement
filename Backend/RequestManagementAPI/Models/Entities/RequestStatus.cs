using System;
using System.Collections.Generic;

namespace RequestManagementAPI.Models.Entities
{
    public class RequestStatus
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string Description { get; set; }
        public string ColorCode { get; set; }
        public int Order { get; set; }

        // Navigation properties
        public virtual ICollection<Request> Requests { get; set; }
    }
}
