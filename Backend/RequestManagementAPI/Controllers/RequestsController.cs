using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RequestManagementAPI.Data;
using RequestManagementAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RequestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // If user is a Customer, they can only view their own requests
            if (User.IsInRole("Customer"))
            {
                var customerIds = await _context.Customers
                    .Where(c => c.CreatedBy == currentUserId)
                    .Select(c => c.CustomerId)
                    .ToListAsync();

                return await _context.Requests
                    .Where(r => customerIds.Contains(r.CustomerId))
                    .Include(r => r.Customer)
                    .Include(r => r.Category)
                    .Include(r => r.Priority)
                    .Include(r => r.Status)
                    .Include(r => r.AssignedUser)
                    .ToListAsync();
            }
            else if (User.IsInRole("Staff"))
            {
                // Staff can view requests assigned to them or unassigned
                return await _context.Requests
                    .Where(r => r.AssignedTo == currentUserId || r.AssignedTo == null)
                    .Include(r => r.Customer)
                    .Include(r => r.Category)
                    .Include(r => r.Priority)
                    .Include(r => r.Status)
                    .Include(r => r.AssignedUser)
                    .ToListAsync();
            }
            else
            {
                // Admin and Manager can view all requests
                return await _context.Requests
                    .Include(r => r.Customer)
                    .Include(r => r.Category)
                    .Include(r => r.Priority)
                    .Include(r => r.Status)
                    .Include(r => r.AssignedUser)
                    .ToListAsync();
            }
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _context.Requests
                .Include(r => r.Customer)
                .Include(r => r.Category)
                .Include(r => r.Priority)
                .Include(r => r.Status)
                .Include(r => r.AssignedUser)
                .Include(r => r.Creator)
                .Include(r => r.Closer)
                .FirstOrDefaultAsync(r => r.RequestId == id);

            if (request == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // If user is a Customer, they can only view their own requests
            if (User.IsInRole("Customer"))
            {
                var customerIds = await _context.Customers
                    .Where(c => c.CreatedBy == currentUserId)
                    .Select(c => c.CustomerId)
                    .ToListAsync();

                if (!customerIds.Contains(request.CustomerId))
                {
                    return Forbid();
                }
            }
            else if (User.IsInRole("Staff") && request.AssignedTo != currentUserId && request.AssignedTo != null)
            {
                // Staff can only view requests assigned to them or unassigned
                return Forbid();
            }

            return request;
        }

        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<Request>> CreateRequest(RequestDto requestDto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // If user is a Customer, they can only create requests for their own customer
            if (User.IsInRole("Customer"))
            {
                var customerIds = await _context.Customers
                    .Where(c => c.CreatedBy == currentUserId)
                    .Select(c => c.CustomerId)
                    .ToListAsync();

                if (!customerIds.Contains(requestDto.CustomerId))
                {
                    return Forbid();
                }
            }

            // Generate a unique request code
            string requestCode = await GenerateUniqueRequestCode();

            // Get the default "New" status
            var newStatus = await _context.RequestStatuses
                .FirstOrDefaultAsync(s => s.StatusName == "Mới");

            if (newStatus == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Default status not found");
            }

            var request = new Request
            {
                RequestCode = requestCode,
                Title = requestDto.Title,
                Description = requestDto.Description,
                CustomerId = requestDto.CustomerId,
                CategoryId = requestDto.CategoryId,
                PriorityId = requestDto.PriorityId,
                StatusId = newStatus.StatusId,
                AssignedTo = requestDto.AssignedTo,
                DueDate = requestDto.DueDate,
                CreatedBy = currentUserId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            // Add history record
            var history = new RequestHistory
            {
                RequestId = request.RequestId,
                UserId = currentUserId,
                ChangeType = "Created",
                NewValue = "Request created",
                ChangedAt = DateTime.UtcNow,
                Description = "Request created"
            };

            _context.RequestHistories.Add(history);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRequest), new { id = request.RequestId }, request);
        }

        // PUT: api/Requests/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager,Staff")]
        public async Task<IActionResult> UpdateRequest(int id, RequestDto requestDto)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // Staff can only update requests assigned to them
            if (User.IsInRole("Staff") && request.AssignedTo != currentUserId)
            {
                return Forbid();
            }

            // Track changes for history
            var changes = new List<RequestHistory>();
            
            if (request.Title != requestDto.Title)
            {
                changes.Add(new RequestHistory
                {
                    RequestId = id,
                    UserId = currentUserId,
                    ChangeType = "Title",
                    OldValue = request.Title,
                    NewValue = requestDto.Title,
                    ChangedAt = DateTime.UtcNow,
                    Description = "Title updated"
                });
            }

            if (request.Description != requestDto.Description)
            {
                changes.Add(new RequestHistory
                {
                    RequestId = id,
                    UserId = currentUserId,
                    ChangeType = "Description",
                    OldValue = request.Description,
                    NewValue = requestDto.Description,
                    ChangedAt = DateTime.UtcNow,
                    Description = "Description updated"
                });
            }

            if (request.CategoryId != requestDto.CategoryId)
            {
                var oldCategory = await _context.RequestCategories.FindAsync(request.CategoryId);
                var newCategory = await _context.RequestCategories.FindAsync(requestDto.CategoryId);
                
                changes.Add(new RequestHistory
                {
                    RequestId = id,
                    UserId = currentUserId,
                    ChangeType = "Category",
                    OldValue = oldCategory?.CategoryName,
                    NewValue = newCategory?.CategoryName,
                    ChangedAt = DateTime.UtcNow,
                    Description = "Category updated"
                });
            }

            if (request.PriorityId != requestDto.PriorityId)
            {
                var oldPriority = await _context.RequestPriorities.FindAsync(request.PriorityId);
                var newPriority = await _context.RequestPriorities.FindAsync(requestDto.PriorityId);
                
                changes.Add(new RequestHistory
                {
                    RequestId = id,
                    UserId = currentUserId,
                    ChangeType = "Priority",
                    OldValue = oldPriority?.PriorityName,
                    NewValue = newPriority?.PriorityName,
                    ChangedAt = DateTime.UtcNow,
                    Description = "Priority updated"
                });
            }

            if (request.AssignedTo != requestDto.AssignedTo)
            {
                var oldAssignee = request.AssignedTo.HasValue ? 
                    await _context.Users.FindAsync(request.AssignedTo.Value) : null;
                var newAssignee = requestDto.AssignedTo.HasValue ? 
                    await _context.Users.FindAsync(requestDto.AssignedTo.Value) : null;
                
                changes.Add(new RequestHistory
                {
                    RequestId = id,
                    UserId = currentUserId,
                    ChangeType = "Assignment",
                    OldValue = oldAssignee != null ? $"{oldAssignee.FirstName} {oldAssignee.LastName}" : "Unassigned",
                    NewValue = newAssignee != null ? $"{newAssignee.FirstName} {newAssignee.LastName}" : "Unassigned",
                    ChangedAt = DateTime.UtcNow,
                    Description = "Assignment updated"
                });
            }

            if (request.DueDate != requestDto.DueDate)
            {
                changes.Add(new RequestHistory
                {
                    RequestId = id,
                    UserId = currentUserId,
                    ChangeType = "DueDate",
                    OldValue = request.DueDate?.ToString("yyyy-MM-dd"),
                    NewValue = requestDto.DueDate?.ToString("yyyy-MM-dd"),
                    ChangedAt = DateTime.UtcNow,
                    Description = "Due date updated"
                });
            }

            // Update request
            request.Title = requestDto.Title;
            request.Description = requestDto.Description;
            request.CategoryId = requestDto.CategoryId;
            request.PriorityId = requestDto.PriorityId;
            request.AssignedTo = requestDto.AssignedTo;
            request.DueDate = requestDto.DueDate;
            request.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
                
                // Save history records
                if (changes.Any())
                {
                    _context.RequestHistories.AddRange(changes);
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PATCH: api/Requests/5/status
        [HttpPatch("{id}/status")]
        [Authorize(Roles = "Admin,Manager,Staff")]
        public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] int statusId)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            var status = await _context.RequestStatuses.FindAsync(statusId);
            if (status == null)
            {
                return BadRequest("Invalid status ID");
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // Staff can only update requests assigned to them
            if (User.IsInRole("Staff") && request.AssignedTo != currentUserId)
            {
                return Forbid();
            }

            // Get old status for history
            var oldStatus = await _context.RequestStatuses.FindAsync(request.StatusId);

            // Update request status
            request.StatusId = statusId;
            request.UpdatedAt = DateTime.UtcNow;

            // If status is "Closed" or "Resolved", set ClosedAt and ClosedBy
            if (status.StatusName == "Đóng" || status.StatusName == "Đã giải quyết")
            {
                request.ClosedAt = DateTime.UtcNow;
                request.ClosedBy = currentUserId;
            }

            // Add history record
            var history = new RequestHistory
            {
                RequestId = id,
                UserId = currentUserId,
                ChangeType = "Status",
                OldValue = oldStatus?.StatusName,
                NewValue = status.StatusName,
                ChangedAt = DateTime.UtcNow,
                Description = "Status updated"
            };

            _context.RequestHistories.Add(history);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Requests/5/comments
        [HttpPost("{id}/comments")]
        public async Task<ActionResult<RequestComment>> AddComment(int id, [FromBody] CommentDto commentDto)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // If user is a Customer, they can only comment on their own requests
            if (User.IsInRole("Customer"))
            {
                var customerIds = await _context.Customers
                    .Where(c => c.CreatedBy == currentUserId)
                    .Select(c => c.CustomerId)
                    .ToListAsync();

                if (!customerIds.Contains(request.CustomerId))
                {
                    return Forbid();
                }
            }
            else if (User.IsInRole("Staff") && request.AssignedTo != currentUserId && request.AssignedTo != null)
            {
                // Staff can only comment on requests assigned to them or unassigned
                return Forbid();
            }

            var comment = new RequestComment
            {
                RequestId = id,
                UserId = currentUserId,
                Content = commentDto.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.RequestComments.Add(comment);
            await _context.SaveChangesAsync();

            // Add history record
            var history = new RequestHistory
            {
                RequestId = id,
                UserId = currentUserId,
                ChangeType = "Comment",
                NewValue = "Comment added",
                ChangedAt = DateTime.UtcNow,
                Description = "Comment added"
            };

            _context.RequestHistories.Add(history);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        // GET: api/Requests/5/comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<RequestComment>>> GetComments(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // If user is a Customer, they can only view comments on their own requests
            if (User.IsInRole("Customer"))
            {
                var customerIds = await _context.Customers
                    .Where(c => c.CreatedBy == currentUserId)
                    .Select(c => c.CustomerId)
                    .ToListAsync();

                if (!customerIds.Contains(request.CustomerId))
                {
                    return Forbid();
                }
            }
            else if (User.IsInRole("Staff") && request.AssignedTo != currentUserId && request.AssignedTo != null)
            {
                // Staff can only view comments on requests assigned to them or unassigned
                return Forbid();
            }

            return await _context.RequestComments
                .Where(c => c.RequestId == id)
                .Include(c => c.User)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Requests/5/history
        [HttpGet("{id}/history")]
        [Authorize(Roles = "Admin,Manager,Staff")]
        public async Task<ActionResult<IEnumerable<RequestHistory>>> GetHistory(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
            {
                return BadRequest("Invalid user ID");
            }

            // Staff can only view history of requests assigned to them
            if (User.IsInRole("Staff") && request.AssignedTo != currentUserId)
            {
                return Forbid();
            }

            return await _context.RequestHistories
                .Where(h => h.RequestId == id)
                .Include(h => h.User)
                .OrderByDescending(h => h.ChangedAt)
                .ToListAsync();
        }

        private bool RequestExists(int id)
        {
            return _context.Requests.Any(e => e.RequestId == id);
        }

        private async Task<string> GenerateUniqueRequestCode()
        {
            string prefix = "REQ";
            int randomPart;
            string requestCode;
            bool exists;

            do
            {
                randomPart = new Random().Next(10000, 99999);
                requestCode = $"{prefix}{randomPart}";
                exists = await _context.Requests.AnyAsync(r => r.RequestCode == requestCode);
            } while (exists);

            return requestCode;
        }
    }

    public class RequestDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CustomerId { get; set; }
        public int CategoryId { get; set; }
        public int PriorityId { get; set; }
        public int? AssignedTo { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class CommentDto
    {
        public string Content { get; set; }
    }
}
