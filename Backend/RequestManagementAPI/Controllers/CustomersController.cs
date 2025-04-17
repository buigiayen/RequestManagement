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
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        [Authorize(Roles = "Admin,Manager,Staff")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers
                .Include(c => c.CustomerGroup)
                .Include(c => c.Creator)
                .ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Staff,Customer")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.CustomerGroup)
                .Include(c => c.Creator)
                .FirstOrDefaultAsync(c => c.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            // If user is a Customer, they can only view their own customer record
            if (User.IsInRole("Customer"))
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int currentUserId))
                {
                    return BadRequest("Invalid user ID");
                }

                // Check if this customer record belongs to the current user
                var userCustomer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.CreatedBy == currentUserId);
                
                if (userCustomer == null || userCustomer.CustomerId != id)
                {
                    return Forbid();
                }
            }

            return customer;
        }

        // POST: api/Customers
        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<Customer>> CreateCustomer(CustomerDto customerDto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int createdBy))
            {
                return BadRequest("Invalid user ID");
            }

            // Generate a unique customer code
            string customerCode = await GenerateUniqueCustomerCode();

            var customer = new Customer
            {
                CustomerGroupId = customerDto.CustomerGroupId,
                CustomerCode = customerCode,
                CompanyName = customerDto.CompanyName,
                ContactName = customerDto.ContactName,
                Email = customerDto.Email,
                PhoneNumber = customerDto.PhoneNumber,
                Address = customerDto.Address,
                City = customerDto.City,
                Country = customerDto.Country,
                IsActive = true,
                CreatedBy = createdBy,
                CreatedAt = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.CustomerId }, customer);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> UpdateCustomer(int id, CustomerDto customerDto)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            customer.CustomerGroupId = customerDto.CustomerGroupId;
            customer.CompanyName = customerDto.CompanyName;
            customer.ContactName = customerDto.ContactName;
            customer.Email = customerDto.Email;
            customer.PhoneNumber = customerDto.PhoneNumber;
            customer.Address = customerDto.Address;
            customer.City = customerDto.City;
            customer.Country = customerDto.Country;
            customer.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // PATCH: api/Customers/5/status
        [HttpPatch("{id}/status")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> UpdateCustomerStatus(int id, [FromBody] bool isActive)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            customer.IsActive = isActive;
            customer.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            // Check if there are any requests for this customer
            var hasRequests = await _context.Requests.AnyAsync(r => r.CustomerId == id);
            if (hasRequests)
            {
                return BadRequest("Cannot delete customer that has requests");
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }

        private async Task<string> GenerateUniqueCustomerCode()
        {
            string prefix = "CUST";
            int randomPart;
            string customerCode;
            bool exists;

            do
            {
                randomPart = new Random().Next(10000, 99999);
                customerCode = $"{prefix}{randomPart}";
                exists = await _context.Customers.AnyAsync(c => c.CustomerCode == customerCode);
            } while (exists);

            return customerCode;
        }
    }

    public class CustomerDto
    {
        public int? CustomerGroupId { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}
