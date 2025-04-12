-- Tạo cơ sở dữ liệu
CREATE DATABASE RequestManagementDB;
GO

USE RequestManagementDB;
GO

-- Bảng Users (Người dùng)
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    PhoneNumber NVARCHAR(20) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);
GO

-- Bảng Roles (Vai trò)
CREATE TABLE Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(200) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);
GO

-- Bảng UserRoles (Vai trò người dùng)
CREATE TABLE UserRoles (
    UserRoleId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_UserRoles_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_UserRoles_Roles FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
    CONSTRAINT UQ_UserRoles_UserRole UNIQUE (UserId, RoleId)
);
GO

-- Bảng CustomerGroups (Nhóm khách hàng)
CREATE TABLE CustomerGroups (
    CustomerGroupId INT IDENTITY(1,1) PRIMARY KEY,
    GroupName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
    CreatedBy INT NOT NULL,
    CONSTRAINT FK_CustomerGroups_Users FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);
GO

-- Bảng Customers (Khách hàng)
CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerGroupId INT NULL,
    CustomerCode NVARCHAR(20) NOT NULL UNIQUE,
    CompanyName NVARCHAR(200) NOT NULL,
    ContactName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    Address NVARCHAR(500) NULL,
    City NVARCHAR(100) NULL,
    Country NVARCHAR(100) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
    CreatedBy INT NOT NULL,
    CONSTRAINT FK_Customers_CustomerGroups FOREIGN KEY (CustomerGroupId) REFERENCES CustomerGroups(CustomerGroupId),
    CONSTRAINT FK_Customers_Users FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);
GO

-- Bảng RequestCategories (Danh mục yêu cầu)
CREATE TABLE RequestCategories (
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);
GO

-- Bảng RequestPriorities (Mức độ ưu tiên yêu cầu)
CREATE TABLE RequestPriorities (
    PriorityId INT IDENTITY(1,1) PRIMARY KEY,
    PriorityName NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200) NULL,
    ColorCode NVARCHAR(10) NULL
);
GO

-- Bảng RequestStatuses (Trạng thái yêu cầu)
CREATE TABLE RequestStatuses (
    StatusId INT IDENTITY(1,1) PRIMARY KEY,
    StatusName NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200) NULL,
    ColorCode NVARCHAR(10) NULL,
    [Order] INT NOT NULL
);
GO

-- Bảng Requests (Yêu cầu)
CREATE TABLE Requests (
    RequestId INT IDENTITY(1,1) PRIMARY KEY,
    RequestCode NVARCHAR(20) NOT NULL UNIQUE,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    CustomerId INT NOT NULL,
    CategoryId INT NOT NULL,
    PriorityId INT NOT NULL,
    StatusId INT NOT NULL,
    AssignedTo INT NULL,
    DueDate DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
    CreatedBy INT NOT NULL,
    ClosedAt DATETIME NULL,
    ClosedBy INT NULL,
    CONSTRAINT FK_Requests_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId),
    CONSTRAINT FK_Requests_RequestCategories FOREIGN KEY (CategoryId) REFERENCES RequestCategories(CategoryId),
    CONSTRAINT FK_Requests_RequestPriorities FOREIGN KEY (PriorityId) REFERENCES RequestPriorities(PriorityId),
    CONSTRAINT FK_Requests_RequestStatuses FOREIGN KEY (StatusId) REFERENCES RequestStatuses(StatusId),
    CONSTRAINT FK_Requests_Users_AssignedTo FOREIGN KEY (AssignedTo) REFERENCES Users(UserId),
    CONSTRAINT FK_Requests_Users_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    CONSTRAINT FK_Requests_Users_ClosedBy FOREIGN KEY (ClosedBy) REFERENCES Users(UserId)
);
GO

-- Bảng RequestComments (Bình luận yêu cầu)
CREATE TABLE RequestComments (
    CommentId INT IDENTITY(1,1) PRIMARY KEY,
    RequestId INT NOT NULL,
    UserId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
    CONSTRAINT FK_RequestComments_Requests FOREIGN KEY (RequestId) REFERENCES Requests(RequestId),
    CONSTRAINT FK_RequestComments_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- Bảng RequestAttachments (Tệp đính kèm yêu cầu)
CREATE TABLE RequestAttachments (
    AttachmentId INT IDENTITY(1,1) PRIMARY KEY,
    RequestId INT NOT NULL,
    FileName NVARCHAR(255) NOT NULL,
    FilePath NVARCHAR(500) NOT NULL,
    FileSize BIGINT NOT NULL,
    FileType NVARCHAR(100) NOT NULL,
    UploadedBy INT NOT NULL,
    UploadedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_RequestAttachments_Requests FOREIGN KEY (RequestId) REFERENCES Requests(RequestId),
    CONSTRAINT FK_RequestAttachments_Users FOREIGN KEY (UploadedBy) REFERENCES Users(UserId)
);
GO

-- Bảng RequestHistories (Lịch sử yêu cầu)
CREATE TABLE RequestHistories (
    HistoryId INT IDENTITY(1,1) PRIMARY KEY,
    RequestId INT NOT NULL,
    UserId INT NOT NULL,
    ChangeType NVARCHAR(50) NOT NULL,
    OldValue NVARCHAR(MAX) NULL,
    NewValue NVARCHAR(MAX) NULL,
    ChangedAt DATETIME NOT NULL DEFAULT GETDATE(),
    Description NVARCHAR(500) NULL,
    CONSTRAINT FK_RequestHistories_Requests FOREIGN KEY (RequestId) REFERENCES Requests(RequestId),
    CONSTRAINT FK_RequestHistories_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- Bảng Notifications (Thông báo)
CREATE TABLE Notifications (
    NotificationId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    RelatedEntityId INT NULL,
    RelatedEntityType NVARCHAR(50) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Notifications_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- Tạo các chỉ mục
CREATE INDEX IX_Users_UserName ON Users(UserName);
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Customers_CustomerCode ON Customers(CustomerCode);
CREATE INDEX IX_Customers_Email ON Customers(Email);
CREATE INDEX IX_Customers_CustomerGroupId ON Customers(CustomerGroupId);
CREATE INDEX IX_Requests_RequestCode ON Requests(RequestCode);
CREATE INDEX IX_Requests_CustomerId ON Requests(CustomerId);
CREATE INDEX IX_Requests_StatusId ON Requests(StatusId);
CREATE INDEX IX_Requests_AssignedTo ON Requests(AssignedTo);
CREATE INDEX IX_Requests_CreatedBy ON Requests(CreatedBy);
CREATE INDEX IX_RequestComments_RequestId ON RequestComments(RequestId);
CREATE INDEX IX_RequestComments_UserId ON RequestComments(UserId);
CREATE INDEX IX_RequestAttachments_RequestId ON RequestAttachments(RequestId);
CREATE INDEX IX_RequestHistories_RequestId ON RequestHistories(RequestId);
CREATE INDEX IX_Notifications_UserId ON Notifications(UserId);
CREATE INDEX IX_Notifications_IsRead ON Notifications(IsRead);
GO

-- Dữ liệu mặc định cho bảng Roles
INSERT INTO Roles (RoleName, Description)
VALUES 
    ('Admin', N'Quản trị viên hệ thống'),
    ('Manager', N'Quản lý'),
    ('Staff', N'Nhân viên'),
    ('Customer', N'Khách hàng');
GO

-- Dữ liệu mặc định cho bảng RequestCategories
INSERT INTO RequestCategories (CategoryName, Description)
VALUES 
    (N'Hỗ trợ kỹ thuật', N'Các vấn đề liên quan đến kỹ thuật cần hỗ trợ'),
    (N'Báo lỗi', N'Báo cáo lỗi trong hệ thống hoặc sản phẩm'),
    (N'Yêu cầu tính năng mới', N'Đề xuất thêm tính năng mới cho sản phẩm'),
    (N'Tư vấn', N'Yêu cầu tư vấn về sản phẩm hoặc dịch vụ'),
    (N'Khác', N'Các yêu cầu khác không thuộc các danh mục trên');
GO

-- Dữ liệu mặc định cho bảng RequestPriorities
INSERT INTO RequestPriorities (PriorityName, Description, ColorCode)
VALUES 
    (N'Thấp', N'Độ ưu tiên thấp, có thể xử lý sau', '#28a745'),
    (N'Trung bình', N'Độ ưu tiên trung bình', '#ffc107'),
    (N'Cao', N'Độ ưu tiên cao, cần xử lý sớm', '#fd7e14'),
    (N'Khẩn cấp', N'Độ ưu tiên khẩn cấp, cần xử lý ngay lập tức', '#dc3545');
GO

-- Dữ liệu mặc định cho bảng RequestStatuses
INSERT INTO RequestStatuses (StatusName, Description, ColorCode, [Order])
VALUES 
    (N'Mới', N'Yêu cầu mới được tạo', '#007bff', 1),
    (N'Đang xử lý', N'Yêu cầu đang được xử lý', '#17a2b8', 2),
    (N'Chờ phản hồi', N'Đang chờ phản hồi từ khách hàng', '#ffc107', 3),
    (N'Đã giải quyết', N'Yêu cầu đã được giải quyết', '#28a745', 4),
    (N'Đóng', N'Yêu cầu đã đóng', '#6c757d', 5),
    (N'Từ chối', N'Yêu cầu bị từ chối', '#dc3545', 6);
GO

-- Tạo tài khoản admin mặc định (password: Admin@123)
INSERT INTO Users (UserName, Email, PasswordHash, FirstName, LastName, PhoneNumber, IsActive)
VALUES ('admin', 'admin@example.com', 'AQAAAAEAACcQAAAAEBCK4QhxTu8LhvVFUt+CKs5tGMJ5rGIQJqWXiJNKnQwvOLY1QZrxeRBiRXNUbKkbJA==', 'Admin', 'User', '0123456789', 1);
GO

-- Gán vai trò Admin cho tài khoản admin
INSERT INTO UserRoles (UserId, RoleId)
VALUES (1, 1);
GO
