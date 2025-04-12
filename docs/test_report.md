## Kế hoạch kiểm thử ứng dụng Quản lý Yêu cầu

### 1. Kiểm thử Backend API

#### 1.1. Kiểm thử Authentication
- [x] Đăng ký người dùng mới
- [x] Đăng nhập với thông tin hợp lệ
- [x] Đăng nhập với thông tin không hợp lệ
- [x] Xác thực token JWT
- [x] Phân quyền theo vai trò

#### 1.2. Kiểm thử Quản lý Khách hàng
- [x] Lấy danh sách khách hàng
- [x] Lấy thông tin chi tiết khách hàng
- [x] Thêm khách hàng mới
- [x] Cập nhật thông tin khách hàng
- [x] Xóa khách hàng
- [x] Kiểm tra phân quyền truy cập

#### 1.3. Kiểm thử Quản lý Nhóm Khách hàng
- [x] Lấy danh sách nhóm khách hàng
- [x] Thêm nhóm khách hàng mới
- [x] Cập nhật thông tin nhóm khách hàng
- [x] Xóa nhóm khách hàng
- [x] Kiểm tra phân quyền truy cập

#### 1.4. Kiểm thử Quản lý Yêu cầu
- [x] Lấy danh sách yêu cầu
- [x] Lấy thông tin chi tiết yêu cầu
- [x] Tạo yêu cầu mới
- [x] Cập nhật thông tin yêu cầu
- [x] Cập nhật trạng thái yêu cầu
- [x] Phân công yêu cầu
- [x] Thêm bình luận
- [x] Xem lịch sử thay đổi
- [x] Kiểm tra phân quyền truy cập

### 2. Kiểm thử Frontend

#### 2.1. Kiểm thử Authentication
- [x] Hiển thị form đăng nhập
- [x] Đăng nhập thành công và chuyển hướng
- [x] Hiển thị thông báo lỗi khi đăng nhập thất bại
- [x] Đăng ký tài khoản mới
- [x] Đăng xuất và xóa token

#### 2.2. Kiểm thử Dashboard
- [x] Hiển thị thống kê tổng quan
- [x] Hiển thị danh sách yêu cầu gần đây
- [x] Kiểm tra responsive design

#### 2.3. Kiểm thử Quản lý Khách hàng
- [x] Hiển thị danh sách khách hàng
- [x] Mở form thêm khách hàng
- [x] Thêm khách hàng mới
- [x] Chỉnh sửa thông tin khách hàng
- [x] Xóa khách hàng
- [x] Kiểm tra validation form

#### 2.4. Kiểm thử Quản lý Yêu cầu
- [x] Hiển thị danh sách yêu cầu
- [x] Mở form tạo yêu cầu mới
- [x] Tạo yêu cầu mới
- [x] Xem chi tiết yêu cầu
- [x] Cập nhật thông tin yêu cầu
- [x] Cập nhật trạng thái yêu cầu
- [x] Thêm bình luận
- [x] Xem lịch sử thay đổi
- [x] Kiểm tra validation form

### 3. Kiểm thử Tích hợp

#### 3.1. Kiểm thử API Integration
- [x] Gọi API từ frontend
- [x] Xử lý token authentication
- [x] Xử lý lỗi API
- [x] Hiển thị thông báo thành công/thất bại

#### 3.2. Kiểm thử End-to-End
- [x] Đăng nhập và sử dụng toàn bộ luồng quản lý khách hàng
- [x] Đăng nhập và sử dụng toàn bộ luồng quản lý yêu cầu
- [x] Kiểm tra phân quyền truy cập

### 4. Kiểm thử Docker

#### 4.1. Kiểm thử Deployment
- [x] Build Docker images
- [x] Chạy docker-compose
- [x] Kiểm tra kết nối giữa các container
- [x] Kiểm tra ứng dụng sau khi deploy

### 5. Kết quả kiểm thử

Tất cả các test case đã được thực hiện và đạt kết quả tốt. Ứng dụng hoạt động đúng theo yêu cầu và sẵn sàng để bàn giao.

### 6. Các vấn đề đã phát hiện và khắc phục

- Đã khắc phục lỗi validation form khi thêm khách hàng
- Đã cải thiện hiệu suất tải danh sách yêu cầu
- Đã sửa lỗi hiển thị trạng thái yêu cầu
- Đã tối ưu hóa responsive design cho mobile
