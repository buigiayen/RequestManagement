# Hướng dẫn Sử dụng Ứng dụng Quản lý Yêu cầu

## 1. Giới thiệu

Ứng dụng Quản lý Yêu cầu là một hệ thống toàn diện giúp quản lý khách hàng và yêu cầu từ khách hàng. Hệ thống bao gồm các chức năng quản lý khách hàng, quản lý yêu cầu, đăng nhập và phân quyền người dùng.

## 2. Cài đặt và Khởi động

### 2.1. Yêu cầu hệ thống

- Docker và Docker Compose
- Git

### 2.2. Cài đặt

1. Clone repository:
```bash
git clone https://github.com/your-repo/RequestManagementApp.git
cd RequestManagementApp
```

2. Khởi động ứng dụng bằng Docker Compose:
```bash
docker-compose up -d
```

3. Truy cập ứng dụng:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Swagger API Documentation: http://localhost:5000/swagger

## 3. Đăng nhập và Phân quyền

### 3.1. Tài khoản mặc định

Hệ thống được cấu hình với các tài khoản mặc định sau:

| Tài khoản | Mật khẩu | Vai trò |
|-----------|----------|---------|
| admin | Admin@123 | Admin |
| manager | Manager@123 | Manager |
| staff | Staff@123 | Staff |
| customer | Customer@123 | Customer |

### 3.2. Phân quyền

- **Admin**: Có toàn quyền trên hệ thống
- **Manager**: Quản lý khách hàng, yêu cầu và nhân viên
- **Staff**: Xử lý yêu cầu từ khách hàng
- **Customer**: Tạo và theo dõi yêu cầu

## 4. Quản lý Khách hàng

### 4.1. Xem danh sách khách hàng

1. Đăng nhập với quyền Admin, Manager hoặc Staff
2. Truy cập menu "Khách hàng"
3. Xem danh sách khách hàng với các thông tin cơ bản

### 4.2. Thêm khách hàng mới

1. Tại trang Khách hàng, nhấn nút "Thêm khách hàng"
2. Điền đầy đủ thông tin khách hàng
3. Chọn nhóm khách hàng
4. Nhấn "Lưu" để hoàn tất

### 4.3. Cập nhật thông tin khách hàng

1. Tại danh sách khách hàng, nhấn biểu tượng chỉnh sửa
2. Cập nhật thông tin cần thiết
3. Nhấn "Lưu" để hoàn tất

### 4.4. Quản lý nhóm khách hàng

1. Truy cập menu "Nhóm khách hàng"
2. Xem, thêm, sửa, xóa các nhóm khách hàng

## 5. Quản lý Yêu cầu

### 5.1. Xem danh sách yêu cầu

1. Truy cập menu "Yêu cầu"
2. Xem danh sách yêu cầu với các thông tin cơ bản
3. Lọc yêu cầu theo trạng thái, độ ưu tiên, khách hàng

### 5.2. Tạo yêu cầu mới

1. Tại trang Yêu cầu, nhấn nút "Tạo yêu cầu mới"
2. Điền thông tin yêu cầu: tiêu đề, mô tả, khách hàng, danh mục, độ ưu tiên
3. Nhấn "Lưu" để hoàn tất

### 5.3. Xem chi tiết yêu cầu

1. Nhấn vào tiêu đề yêu cầu trong danh sách
2. Xem thông tin chi tiết, bình luận, lịch sử thay đổi và tệp đính kèm

### 5.4. Cập nhật trạng thái yêu cầu

1. Tại trang chi tiết yêu cầu, chọn trạng thái mới từ các nút trạng thái
2. Hệ thống tự động cập nhật và ghi lại lịch sử thay đổi

### 5.5. Thêm bình luận

1. Tại tab "Bình luận" trong trang chi tiết yêu cầu
2. Nhập nội dung bình luận
3. Nhấn "Gửi bình luận"

### 5.6. Phân công yêu cầu

1. Tại trang chi tiết hoặc chỉnh sửa yêu cầu
2. Chọn người xử lý từ danh sách nhân viên
3. Nhấn "Lưu" để hoàn tất

## 6. Báo cáo và Thống kê

### 6.1. Dashboard

1. Truy cập trang Dashboard
2. Xem các thống kê tổng quan: số lượng khách hàng, yêu cầu, trạng thái
3. Xem danh sách yêu cầu gần đây

### 6.2. Báo cáo chi tiết

1. Truy cập các báo cáo chuyên biệt từ menu báo cáo
2. Lọc và xuất báo cáo theo nhu cầu

## 7. Quản lý Người dùng

### 7.1. Xem danh sách người dùng

1. Đăng nhập với quyền Admin
2. Truy cập menu "Người dùng"
3. Xem danh sách người dùng với thông tin và vai trò

### 7.2. Thêm người dùng mới

1. Tại trang Người dùng, nhấn nút "Thêm người dùng"
2. Điền thông tin người dùng và chọn vai trò
3. Nhấn "Lưu" để hoàn tất

### 7.3. Cập nhật thông tin người dùng

1. Tại danh sách người dùng, nhấn biểu tượng chỉnh sửa
2. Cập nhật thông tin cần thiết
3. Nhấn "Lưu" để hoàn tất

## 8. Hỗ trợ và Liên hệ

Nếu bạn gặp vấn đề hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: support@example.com
- Điện thoại: 0123-456-789
