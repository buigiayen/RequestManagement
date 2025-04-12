# Tài liệu Kiến trúc Ứng dụng Quản lý Yêu cầu

## 1. Tổng quan

Ứng dụng Quản lý Yêu cầu là một hệ thống toàn diện được thiết kế để quản lý yêu cầu từ khách hàng, bao gồm các chức năng quản lý khách hàng, quản lý yêu cầu, và phân quyền người dùng. Ứng dụng được xây dựng với kiến trúc microservices, sử dụng các công nghệ hiện đại và được triển khai bằng Docker.

## 2. Kiến trúc tổng thể

Ứng dụng được xây dựng theo mô hình 3-tier với các thành phần chính:

1. **Frontend**: Giao diện người dùng xây dựng bằng Next.js và Ant Design
2. **Backend**: API RESTful xây dựng bằng ASP.NET Core 8
3. **Database**: SQL Server để lưu trữ dữ liệu

![Kiến trúc tổng thể](architecture/overall-architecture.png)

## 3. Thành phần Backend

### 3.1. Công nghệ sử dụng

- **Framework**: ASP.NET Core 8
- **ORM**: Entity Framework Core 8
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI

### 3.2. Cấu trúc dự án

```
Backend/
├── RequestManagementAPI/
│   ├── Controllers/         # API Controllers
│   ├── Data/                # Database context và repositories
│   ├── Extensions/          # Service extensions
│   ├── Models/              # Entity models và DTOs
│   │   ├── Entities/        # Database entities
│   ├── Seeds/               # Database seed data
│   ├── Program.cs           # Application startup
│   └── appsettings.json     # Configuration
```

### 3.3. Các module chính

1. **Authentication & Authorization**
   - Đăng nhập/đăng ký người dùng
   - JWT authentication
   - Role-based authorization (Admin, Manager, Staff, Customer)

2. **Customer Management**
   - CRUD operations cho khách hàng
   - Quản lý nhóm khách hàng
   - Tìm kiếm và lọc khách hàng

3. **Request Management**
   - CRUD operations cho yêu cầu
   - Quản lý trạng thái yêu cầu
   - Phân công yêu cầu
   - Bình luận và lịch sử thay đổi
   - Tệp đính kèm

## 4. Thành phần Frontend

### 4.1. Công nghệ sử dụng

- **Framework**: Next.js (React)
- **UI Library**: Ant Design
- **State Management**: React Context API
- **Routing**: Next.js App Router

### 4.2. Cấu trúc dự án

```
Frontend/
├── request-management-client/
│   ├── src/
│   │   ├── app/              # Pages và routes
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # Context providers
│   │   └── lib/              # Utility functions
│   ├── public/               # Static assets
│   └── package.json          # Dependencies
```

### 4.3. Các trang chính

1. **Authentication**
   - Login
   - Register

2. **Dashboard**
   - Thống kê tổng quan
   - Danh sách yêu cầu gần đây

3. **Customer Management**
   - Danh sách khách hàng
   - Thêm/sửa/xóa khách hàng
   - Quản lý nhóm khách hàng

4. **Request Management**
   - Danh sách yêu cầu
   - Chi tiết yêu cầu
   - Thêm/sửa yêu cầu
   - Bình luận và lịch sử

## 5. Thành phần Database

### 5.1. Công nghệ sử dụng

- **RDBMS**: Microsoft SQL Server
- **Migration**: Entity Framework Core Migrations

### 5.2. Mô hình dữ liệu

![Entity Relationship Diagram](architecture/database-schema.png)

### 5.3. Các bảng chính

1. **Users**: Lưu trữ thông tin người dùng
2. **Roles**: Vai trò người dùng (Admin, Manager, Staff, Customer)
3. **CustomerGroups**: Nhóm khách hàng
4. **Customers**: Thông tin khách hàng
5. **RequestCategories**: Danh mục yêu cầu
6. **RequestPriorities**: Độ ưu tiên yêu cầu
7. **RequestStatuses**: Trạng thái yêu cầu
8. **Requests**: Yêu cầu từ khách hàng
9. **RequestComments**: Bình luận cho yêu cầu
10. **RequestHistories**: Lịch sử thay đổi yêu cầu
11. **RequestAttachments**: Tệp đính kèm cho yêu cầu
12. **Notifications**: Thông báo hệ thống

## 6. Triển khai

### 6.1. Docker

Ứng dụng được containerized sử dụng Docker với 3 container chính:

1. **sqlserver**: SQL Server database
2. **backend**: ASP.NET Core API
3. **frontend**: Next.js application

### 6.2. Docker Compose

File `docker-compose.yml` định nghĩa cấu hình triển khai, bao gồm:
- Network configuration
- Volume mounts
- Environment variables
- Port mappings

### 6.3. Quy trình triển khai

1. Clone repository
2. Chạy lệnh `docker-compose up -d`
3. Truy cập ứng dụng tại http://localhost:3000

## 7. Bảo mật

### 7.1. Authentication

- JWT tokens với expiration
- Secure password hashing
- HTTPS encryption

### 7.2. Authorization

- Role-based access control
- API endpoint protection
- Frontend route guards

### 7.3. Data Protection

- Input validation
- SQL injection prevention
- Cross-Site Scripting (XSS) protection

## 8. Khả năng mở rộng

Ứng dụng được thiết kế để dễ dàng mở rộng với:

1. **Microservices Architecture**: Có thể tách thành nhiều service nhỏ hơn
2. **Containerization**: Dễ dàng scale horizontally
3. **Modular Design**: Dễ dàng thêm tính năng mới

## 9. Kết luận

Ứng dụng Quản lý Yêu cầu cung cấp giải pháp toàn diện cho việc quản lý yêu cầu từ khách hàng, với kiến trúc hiện đại, bảo mật, và khả năng mở rộng cao. Việc sử dụng Docker giúp triển khai dễ dàng trên nhiều môi trường khác nhau.
