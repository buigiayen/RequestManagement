# Thiết kế cơ sở dữ liệu cho ứng dụng quản lý yêu cầu

## Tổng quan

Cơ sở dữ liệu cho ứng dụng quản lý yêu cầu được thiết kế để hỗ trợ các chức năng chính sau:
1. Quản lý khách hàng và nhóm khách hàng
2. Quản lý yêu cầu từ khách hàng
3. Đăng nhập và phân quyền hệ thống
4. Xem các yêu cầu hệ thống

## Mô hình quan hệ thực thể (ERD)

### Bảng Users (Người dùng)
- UserId (PK): int, identity
- UserName: nvarchar(50), not null, unique
- Email: nvarchar(100), not null, unique
- PasswordHash: nvarchar(max), not null
- FirstName: nvarchar(50), not null
- LastName: nvarchar(50), not null
- PhoneNumber: nvarchar(20), null
- IsActive: bit, not null, default 1
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null

### Bảng Roles (Vai trò)
- RoleId (PK): int, identity
- RoleName: nvarchar(50), not null, unique
- Description: nvarchar(200), null
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null

### Bảng UserRoles (Vai trò người dùng)
- UserRoleId (PK): int, identity
- UserId (FK): int, not null
- RoleId (FK): int, not null
- CreatedAt: datetime, not null, default getdate()

### Bảng CustomerGroups (Nhóm khách hàng)
- CustomerGroupId (PK): int, identity
- GroupName: nvarchar(100), not null
- Description: nvarchar(500), null
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null
- CreatedBy (FK): int, not null

### Bảng Customers (Khách hàng)
- CustomerId (PK): int, identity
- CustomerGroupId (FK): int, null
- CustomerCode: nvarchar(20), not null, unique
- CompanyName: nvarchar(200), not null
- ContactName: nvarchar(100), not null
- Email: nvarchar(100), not null
- PhoneNumber: nvarchar(20), not null
- Address: nvarchar(500), null
- City: nvarchar(100), null
- Country: nvarchar(100), null
- IsActive: bit, not null, default 1
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null
- CreatedBy (FK): int, not null

### Bảng RequestCategories (Danh mục yêu cầu)
- CategoryId (PK): int, identity
- CategoryName: nvarchar(100), not null
- Description: nvarchar(500), null
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null

### Bảng RequestPriorities (Mức độ ưu tiên yêu cầu)
- PriorityId (PK): int, identity
- PriorityName: nvarchar(50), not null
- Description: nvarchar(200), null
- ColorCode: nvarchar(10), null

### Bảng RequestStatuses (Trạng thái yêu cầu)
- StatusId (PK): int, identity
- StatusName: nvarchar(50), not null
- Description: nvarchar(200), null
- ColorCode: nvarchar(10), null
- Order: int, not null

### Bảng Requests (Yêu cầu)
- RequestId (PK): int, identity
- RequestCode: nvarchar(20), not null, unique
- Title: nvarchar(200), not null
- Description: nvarchar(max), null
- CustomerId (FK): int, not null
- CategoryId (FK): int, not null
- PriorityId (FK): int, not null
- StatusId (FK): int, not null
- AssignedTo (FK): int, null
- DueDate: datetime, null
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null
- CreatedBy (FK): int, not null
- ClosedAt: datetime, null
- ClosedBy (FK): int, null

### Bảng RequestComments (Bình luận yêu cầu)
- CommentId (PK): int, identity
- RequestId (FK): int, not null
- UserId (FK): int, not null
- Content: nvarchar(max), not null
- CreatedAt: datetime, not null, default getdate()
- UpdatedAt: datetime, null

### Bảng RequestAttachments (Tệp đính kèm yêu cầu)
- AttachmentId (PK): int, identity
- RequestId (FK): int, not null
- FileName: nvarchar(255), not null
- FilePath: nvarchar(500), not null
- FileSize: bigint, not null
- FileType: nvarchar(100), not null
- UploadedBy (FK): int, not null
- UploadedAt: datetime, not null, default getdate()

### Bảng RequestHistories (Lịch sử yêu cầu)
- HistoryId (PK): int, identity
- RequestId (FK): int, not null
- UserId (FK): int, not null
- ChangeType: nvarchar(50), not null
- OldValue: nvarchar(max), null
- NewValue: nvarchar(max), null
- ChangedAt: datetime, not null, default getdate()
- Description: nvarchar(500), null

### Bảng Notifications (Thông báo)
- NotificationId (PK): int, identity
- UserId (FK): int, not null
- Title: nvarchar(200), not null
- Content: nvarchar(max), not null
- IsRead: bit, not null, default 0
- RelatedEntityId: int, null
- RelatedEntityType: nvarchar(50), null
- CreatedAt: datetime, not null, default getdate()

## Mối quan hệ

1. Users - Roles: Nhiều-nhiều (thông qua bảng UserRoles)
2. Users - Customers: Một-nhiều (User tạo nhiều Customer)
3. Users - CustomerGroups: Một-nhiều (User tạo nhiều CustomerGroup)
4. CustomerGroups - Customers: Một-nhiều (CustomerGroup có nhiều Customer)
5. Customers - Requests: Một-nhiều (Customer có nhiều Request)
6. RequestCategories - Requests: Một-nhiều (Category có nhiều Request)
7. RequestPriorities - Requests: Một-nhiều (Priority có nhiều Request)
8. RequestStatuses - Requests: Một-nhiều (Status có nhiều Request)
9. Users - Requests (AssignedTo): Một-nhiều (User được gán nhiều Request)
10. Users - Requests (CreatedBy): Một-nhiều (User tạo nhiều Request)
11. Users - Requests (ClosedBy): Một-nhiều (User đóng nhiều Request)
12. Requests - RequestComments: Một-nhiều (Request có nhiều Comment)
13. Users - RequestComments: Một-nhiều (User tạo nhiều Comment)
14. Requests - RequestAttachments: Một-nhiều (Request có nhiều Attachment)
15. Users - RequestAttachments: Một-nhiều (User tải lên nhiều Attachment)
16. Requests - RequestHistories: Một-nhiều (Request có nhiều History)
17. Users - RequestHistories: Một-nhiều (User tạo nhiều History)
18. Users - Notifications: Một-nhiều (User nhận nhiều Notification)

## Chỉ mục

1. Users: UserName, Email
2. Customers: CustomerCode, Email, CustomerGroupId
3. Requests: RequestCode, CustomerId, StatusId, AssignedTo, CreatedBy
4. RequestComments: RequestId, UserId
5. RequestAttachments: RequestId
6. RequestHistories: RequestId
7. Notifications: UserId, IsRead

## Dữ liệu mặc định

### Roles
1. Admin - Quản trị viên hệ thống
2. Manager - Quản lý
3. Staff - Nhân viên
4. Customer - Khách hàng

### RequestCategories
1. Hỗ trợ kỹ thuật
2. Báo lỗi
3. Yêu cầu tính năng mới
4. Tư vấn
5. Khác

### RequestPriorities
1. Thấp
2. Trung bình
3. Cao
4. Khẩn cấp

### RequestStatuses
1. Mới
2. Đang xử lý
3. Chờ phản hồi
4. Đã giải quyết
5. Đóng
6. Từ chối
