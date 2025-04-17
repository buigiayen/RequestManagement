using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RequestManagement.Infrastructure.Data;
using RequestManagement.Domain.Models.Entities;

namespace RequestManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerGroupsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerGroupsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomerGroups
        [HttpGet]
        [Authorize(Roles = "Admin,Manager,Staff")]
        public async Task<ActionResult<IEnumerable<CustomerGroup>>> GetCustomerGroups()
        {
            return await _context.CustomerGroups
                .Include(cg => cg.Creator)
                .ToListAsync();
        }

        // GET: api/CustomerGroups/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Staff")]
        public async Task<ActionResult<CustomerGroup>> GetCustomerGroup(int id)
        {
            var customerGroup = await _context.CustomerGroups
                .Include(cg => cg.Creator)
                .FirstOrDefaultAsync(cg => cg.CustomerGroupId == id);

            if (customerGroup == null)
            {
                return NotFound();
            }

            return customerGroup;
        }

        // POST: api/CustomerGroups
        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<CustomerGroup>> CreateCustomerGroup(CustomerGroupDto customerGroupDto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int createdBy))
            {
                return BadRequest("Invalid user ID");
            }

            var customerGroup = new CustomerGroup
            {
                GroupName = customerGroupDto.GroupName,
                Description = customerGroupDto.Description,
                CreatedBy = createdBy,
                CreatedAt = DateTime.UtcNow
            };

            _context.CustomerGroups.Add(customerGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomerGroup), new { id = customerGroup.CustomerGroupId }, customerGroup);
        }

        // PUT: api/CustomerGroups/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> UpdateCustomerGroup(int id, CustomerGroupDto customerGroupDto)
        {
            var customerGroup = await _context.CustomerGroups.FindAsync(id);
            if (customerGroup == null)
            {
                return NotFound();
            }

            customerGroup.GroupName = customerGroupDto.GroupName;
            customerGroup.Description = customerGroupDto.Description;
            customerGroup.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerGroupExists(id))
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

        // DELETE: api/CustomerGroups/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCustomerGroup(int id)
        {
            var customerGroup = await _context.CustomerGroups.FindAsync(id);
            if (customerGroup == null)
            {
                return NotFound();
            }

            // Check if there are any customers in this group
            var hasCustomers = await _context.Customers.AnyAsync(c => c.CustomerGroupId == id);
            if (hasCustomers)
            {
                return BadRequest("Cannot delete customer group that has customers assigned to it");
            }

            _context.CustomerGroups.Remove(customerGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerGroupExists(int id)
        {
            return _context.CustomerGroups.Any(e => e.CustomerGroupId == id);
        }
    }

    public class CustomerGroupDto
    {
        public string GroupName { get; set; }
        public string Description { get; set; }
    }
}
