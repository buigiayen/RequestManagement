using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RequestManagement.Domain.Models.Entities;
using RequestManagement.Infrastructure.Data;


namespace RequestManagement.Infrastructure.Seeds
{
    public static class DbInitializer
    {
        public static async Task SeedData(ApplicationDbContext context, UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            // Apply migrations if they are not applied
            context.Database.Migrate();

            await SeedRoles(roleManager);
            await SeedUsers(userManager);
            await SeedRequestCategories(context);
            await SeedRequestPriorities(context);
            await SeedRequestStatuses(context);
            await SeedCustomerGroups(context);
        }

        private static async Task SeedRoles(RoleManager<IdentityRole<int>> roleManager)
        {
            string[] roles = { "Admin", "Manager", "Staff", "Customer" };

            foreach (var roleName in roles)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole<int>(roleName));
                }
            }
        }

        private static async Task SeedUsers(UserManager<User> userManager)
        {
            // Admin user
            if (await userManager.FindByNameAsync("admin") == null)
            {
                User admin = new User
                {
                    UserName = "admin",
                    Email = "admin@example.com",
                    FirstName = "Admin",
                    LastName = "User",
                    PhoneNumber = "0123456789",
                    EmailConfirmed = true,
                    IsActive = true
                };

                var result = await userManager.CreateAsync(admin, "Admin@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }

            // Manager user
            if (await userManager.FindByNameAsync("manager") == null)
            {
                User manager = new User
                {
                    UserName = "manager",
                    Email = "manager@example.com",
                    FirstName = "Manager",
                    LastName = "User",
                    PhoneNumber = "0123456788",
                    EmailConfirmed = true,
                    IsActive = true
                };

                var result = await userManager.CreateAsync(manager, "Manager@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(manager, "Manager");
                }
            }

            // Staff user
            if (await userManager.FindByNameAsync("staff") == null)
            {
                User staff = new User
                {
                    UserName = "staff",
                    Email = "staff@example.com",
                    FirstName = "Staff",
                    LastName = "User",
                    PhoneNumber = "0123456787",
                    EmailConfirmed = true,
                    IsActive = true
                };

                var result = await userManager.CreateAsync(staff, "Staff@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(staff, "Staff");
                }
            }

            // Customer user
            if (await userManager.FindByNameAsync("customer") == null)
            {
                User customer = new User
                {
                    UserName = "customer",
                    Email = "customer@example.com",
                    FirstName = "Customer",
                    LastName = "User",
                    PhoneNumber = "0123456786",
                    EmailConfirmed = true,
                    IsActive = true
                };

                var result = await userManager.CreateAsync(customer, "Customer@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(customer, "Customer");
                }
            }
        }

        private static async Task SeedRequestCategories(ApplicationDbContext context)
        {
            if (!context.RequestCategories.Any())
            {
                var categories = new List<RequestCategory>
                {
                    new RequestCategory { CategoryName = "Hỗ trợ kỹ thuật", Description = "Các vấn đề liên quan đến kỹ thuật cần hỗ trợ" },
                    new RequestCategory { CategoryName = "Báo lỗi", Description = "Báo cáo lỗi trong hệ thống hoặc sản phẩm" },
                    new RequestCategory { CategoryName = "Yêu cầu tính năng mới", Description = "Đề xuất thêm tính năng mới cho sản phẩm" },
                    new RequestCategory { CategoryName = "Tư vấn", Description = "Yêu cầu tư vấn về sản phẩm hoặc dịch vụ" },
                    new RequestCategory { CategoryName = "Khác", Description = "Các yêu cầu khác không thuộc các danh mục trên" }
                };

                context.RequestCategories.AddRange(categories);
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedRequestPriorities(ApplicationDbContext context)
        {
            if (!context.RequestPriorities.Any())
            {
                var priorities = new List<RequestPriority>
                {
                    new RequestPriority { PriorityName = "Thấp", Description = "Độ ưu tiên thấp, có thể xử lý sau", ColorCode = "#28a745" },
                    new RequestPriority { PriorityName = "Trung bình", Description = "Độ ưu tiên trung bình", ColorCode = "#ffc107" },
                    new RequestPriority { PriorityName = "Cao", Description = "Độ ưu tiên cao, cần xử lý sớm", ColorCode = "#fd7e14" },
                    new RequestPriority { PriorityName = "Khẩn cấp", Description = "Độ ưu tiên khẩn cấp, cần xử lý ngay lập tức", ColorCode = "#dc3545" }
                };

                context.RequestPriorities.AddRange(priorities);
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedRequestStatuses(ApplicationDbContext context)
        {
            if (!context.RequestStatuses.Any())
            {
                var statuses = new List<RequestStatus>
                {
                    new RequestStatus { StatusName = "Mới", Description = "Yêu cầu mới được tạo", ColorCode = "#007bff", Order = 1 },
                    new RequestStatus { StatusName = "Đang xử lý", Description = "Yêu cầu đang được xử lý", ColorCode = "#17a2b8", Order = 2 },
                    new RequestStatus { StatusName = "Chờ phản hồi", Description = "Đang chờ phản hồi từ khách hàng", ColorCode = "#ffc107", Order = 3 },
                    new RequestStatus { StatusName = "Đã giải quyết", Description = "Yêu cầu đã được giải quyết", ColorCode = "#28a745", Order = 4 },
                    new RequestStatus { StatusName = "Đóng", Description = "Yêu cầu đã đóng", ColorCode = "#6c757d", Order = 5 },
                    new RequestStatus { StatusName = "Từ chối", Description = "Yêu cầu bị từ chối", ColorCode = "#dc3545", Order = 6 }
                };

                context.RequestStatuses.AddRange(statuses);
                await context.SaveChangesAsync();
            }
        }
        private static async Task SeedCustomerGroups(ApplicationDbContext context)
        {
            if (!context.CustomerGroups.Any())
            {
                var customerGroup = new List<CustomerGroup>
                {
                    new CustomerGroup { GroupName = "Khách hàng tiềm năng", Description = "Những khách hàng có tiềm năng hợp tác trong tương lai." , CreatedBy=1, CreatedAt= DateTime.UtcNow},
                    new CustomerGroup { GroupName = "Khách hàng thường xuyên", Description = "Những khách hàng thường xuyên sử dụng sản phẩm/dịch vụ." , CreatedBy=1, CreatedAt= DateTime.UtcNow },
                    new CustomerGroup { GroupName = "Khách hàng mới", Description = "Những khách hàng mới bắt đầu sử dụng sản phẩm/dịch vụ." , CreatedBy=1, CreatedAt= DateTime.UtcNow },
                    new CustomerGroup { GroupName = "Khách hàng doanh nghiệp", Description = "Những khách hàng là các tổ chức hoặc doanh nghiệp." , CreatedBy=1, CreatedAt= DateTime.UtcNow },
                    new CustomerGroup { GroupName = "Khách hàng cá nhân", Description = "Những khách hàng là cá nhân sử dụng sản phẩm/dịch vụ." , CreatedBy=1, CreatedAt= DateTime.UtcNow },
                    new CustomerGroup { GroupName = "Khách hàng quốc tế", Description = "Những khách hàng đến từ các quốc gia khác." , CreatedBy=1, CreatedAt= DateTime.UtcNow },
                    new CustomerGroup { GroupName = "Khách hàng đặc biệt", Description = "Những khách hàng có yêu cầu hoặc điều kiện đặc biệt." , CreatedBy=1, CreatedAt= DateTime.UtcNow }

                };

                context.CustomerGroups.AddRange(customerGroup);
                await context.SaveChangesAsync();
            }
        }
    }
}
