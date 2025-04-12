'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, DatePicker, message, Tag, Typography, Spin, Tabs, Timeline, Upload } from 'antd';
import { PlusOutlined, EditOutlined, CommentOutlined, HistoryOutlined, UploadOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

export default function RequestsPage() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [comments, setComments] = useState([]);
  const [history, setHistory] = useState([]);
  const [commentForm] = Form.useForm();
  const [form] = Form.useForm();

  useEffect(() => {
    if (token) {
      fetchRequests();
      fetchCustomers();
      fetchCategories();
      fetchPriorities();
      fetchStatuses();
      fetchUsers();
    }
  }, [token]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an actual API call
      // For now, we'll simulate the data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests([
        {
          id: 1,
          requestCode: 'REQ12345',
          title: 'Cần hỗ trợ kỹ thuật về sản phẩm X',
          description: 'Chúng tôi đang gặp vấn đề với sản phẩm X. Cụ thể là...',
          customerId: 1,
          customerName: 'Công ty ABC',
          categoryId: 1,
          categoryName: 'Hỗ trợ kỹ thuật',
          priorityId: 3,
          priorityName: 'Cao',
          priorityColor: '#fd7e14',
          statusId: 1,
          statusName: 'Mới',
          statusColor: '#007bff',
          assignedTo: null,
          assignedUserName: null,
          dueDate: '2025-04-20',
          createdAt: '2025-04-10',
          createdBy: 'customer',
          createdByName: 'Nguyễn Văn A'
        },
        {
          id: 2,
          requestCode: 'REQ12346',
          title: 'Yêu cầu thêm tính năng báo cáo',
          description: 'Chúng tôi muốn thêm tính năng báo cáo để...',
          customerId: 2,
          customerName: 'Công ty XYZ',
          categoryId: 3,
          categoryName: 'Yêu cầu tính năng mới',
          priorityId: 2,
          priorityName: 'Trung bình',
          priorityColor: '#ffc107',
          statusId: 2,
          statusName: 'Đang xử lý',
          statusColor: '#17a2b8',
          assignedTo: 3,
          assignedUserName: 'Staff User',
          dueDate: '2025-04-25',
          createdAt: '2025-04-11',
          createdBy: 'customer',
          createdByName: 'Trần Thị B'
        },
        {
          id: 3,
          requestCode: 'REQ12347',
          title: 'Báo lỗi không đăng nhập được',
          description: 'Chúng tôi không thể đăng nhập vào hệ thống từ sáng nay...',
          customerId: 3,
          customerName: 'Công ty DEF',
          categoryId: 2,
          categoryName: 'Báo lỗi',
          priorityId: 4,
          priorityName: 'Khẩn cấp',
          priorityColor: '#dc3545',
          statusId: 4,
          statusName: 'Đã giải quyết',
          statusColor: '#28a745',
          assignedTo: 3,
          assignedUserName: 'Staff User',
          dueDate: '2025-04-12',
          createdAt: '2025-04-12',
          createdBy: 'customer',
          createdByName: 'Lê Văn C'
        },
      ]);
    } catch (error) {
      console.error('Error fetching requests:', error);
      message.error('Không thể tải danh sách yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCustomers([
        { id: 1, companyName: 'Công ty ABC' },
        { id: 2, companyName: 'Công ty XYZ' },
        { id: 3, companyName: 'Công ty DEF' },
      ]);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCategories([
        { id: 1, categoryName: 'Hỗ trợ kỹ thuật' },
        { id: 2, categoryName: 'Báo lỗi' },
        { id: 3, categoryName: 'Yêu cầu tính năng mới' },
        { id: 4, categoryName: 'Tư vấn' },
        { id: 5, categoryName: 'Khác' },
      ]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPriorities = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPriorities([
        { id: 1, priorityName: 'Thấp', colorCode: '#28a745' },
        { id: 2, priorityName: 'Trung bình', colorCode: '#ffc107' },
        { id: 3, priorityName: 'Cao', colorCode: '#fd7e14' },
        { id: 4, priorityName: 'Khẩn cấp', colorCode: '#dc3545' },
      ]);
    } catch (error) {
      console.error('Error fetching priorities:', error);
    }
  };

  const fetchStatuses = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStatuses([
        { id: 1, statusName: 'Mới', colorCode: '#007bff' },
        { id: 2, statusName: 'Đang xử lý', colorCode: '#17a2b8' },
        { id: 3, statusName: 'Chờ phản hồi', colorCode: '#ffc107' },
        { id: 4, statusName: 'Đã giải quyết', colorCode: '#28a745' },
        { id: 5, statusName: 'Đóng', colorCode: '#6c757d' },
        { id: 6, statusName: 'Từ chối', colorCode: '#dc3545' },
      ]);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers([
        { id: 1, firstName: 'Admin', lastName: 'User' },
        { id: 2, firstName: 'Manager', lastName: 'User' },
        { id: 3, firstName: 'Staff', lastName: 'User' },
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRequestDetails = async (requestId) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate comments
      setComments([
        {
          id: 1,
          requestId: requestId,
          userId: 3,
          userName: 'Staff User',
          content: 'Tôi đã nhận được yêu cầu và đang xử lý.',
          createdAt: '2025-04-10 14:30:00'
        },
        {
          id: 2,
          requestId: requestId,
          userId: 4,
          userName: 'Customer User',
          content: 'Cảm ơn bạn. Tôi đang chờ phản hồi.',
          createdAt: '2025-04-10 15:45:00'
        },
        {
          id: 3,
          requestId: requestId,
          userId: 3,
          userName: 'Staff User',
          content: 'Tôi đã tìm ra nguyên nhân của vấn đề. Đó là do...',
          createdAt: '2025-04-11 09:15:00'
        },
      ]);
      
      // Simulate history
      setHistory([
        {
          id: 1,
          requestId: requestId,
          userId: 4,
          userName: 'Customer User',
          changeType: 'Created',
          newValue: 'Request created',
          changedAt: '2025-04-10 10:00:00',
          description: 'Yêu cầu được tạo'
        },
        {
          id: 2,
          requestId: requestId,
          userId: 3,
          userName: 'Staff User',
          changeType: 'Status',
          oldValue: 'Mới',
          newValue: 'Đang xử lý',
          changedAt: '2025-04-10 14:30:00',
          description: 'Trạng thái được cập nhật'
        },
        {
          id: 3,
          requestId: requestId,
          userId: 3,
          userName: 'Staff User',
          changeType: 'Assignment',
          oldValue: 'Unassigned',
          newValue: 'Staff User',
          changedAt: '2025-04-10 14:30:00',
          description: 'Phân công được cập nhật'
        },
      ]);
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const showModal = (request = null) => {
    setCurrentRequest(request);
    if (request) {
      form.setFieldsValue({
        title: request.title,
        description: request.description,
        customerId: request.customerId,
        categoryId: request.categoryId,
        priorityId: request.priorityId,
        statusId: request.statusId,
        assignedTo: request.assignedTo,
        dueDate: request.dueDate ? dayjs(request.dueDate) : null
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const showViewModal = async (request) => {
    setCurrentRequest(request);
    await fetchRequestDetails(request.id);
    setIsViewModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentRequest) {
        // Update existing request
        // In a real application, this would be an API call
        const updatedRequests = requests.map(r => {
          if (r.id === currentRequest.id) {
            const updatedRequest = { 
              ...r, 
              ...values,
              customerName: customers.find(c => c.id === values.customerId)?.companyName,
              categoryName: categories.find(c => c.id === values.categoryId)?.categoryName,
              priorityName: priorities.find(p => p.id === values.priorityId)?.priorityName,
              priorityColor: priorities.find(p => p.id === values.priorityId)?.colorCode,
              statusName: statuses.find(s => s.id === values.statusId)?.statusName,
              statusColor: statuses.find(s => s.id === values.statusId)?.colorCode,
              assignedUserName: values.assignedTo ? `${users.find(u => u.id === values.assignedTo)?.firstName} ${users.find(u => u.id === values.assignedTo)?.lastName}` : null,
              dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null
            };
            return updatedRequest;
          }
          return r;
        });
        setRequests(updatedRequests);
        message.success('Cập nhật yêu cầu thành công');
      } else {
        // Create new request
        // In a real application, this would be an API call
        const newRequest = {
          id: Math.max(...requests.map(r => r.id), 0) + 1,
          requestCode: `REQ${Math.floor(10000 + Math.random() * 90000)}`,
          ...values,
          customerName: customers.find(c => c.id === values.customerId)?.companyName,
          categoryName: categories.find(c => c.id === values.categoryId)?.categoryName,
          priorityName: priorities.find(p => p.id === values.priorityId)?.priorityName,
          priorityColor: priorities.find(p => p.id === values.priorityId)?.colorCode,
          statusName: statuses.find(s => s.id === values.statusId)?.statusName,
          statusColor: statuses.find(s => s.id === values.statusId)?.colorCode,
          assignedUserName: values.assignedTo ? `${users.find(u => u.id === values.assignedTo)?.firstName} ${users.find(u => u.id === values.assignedTo)?.lastName}` : null,
          dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
          createdAt: new Date().toISOString().split('T')[0],
          createdBy: user.id,
          createdByName: `${user.firstName} ${user.lastName}`
        };
        setRequests([...requests, newRequest]);
        message.success('Thêm yêu cầu thành công');
      }
      
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const values = await commentForm.validateFields();
      
      // In a real application, this would be an API call
      const newComment = {
        id: Math.max(...comments.map(c => c.id), 0) + 1,
        requestId: currentRequest.id,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        content: values.content,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      
      setComments([...comments, newComment]);
      commentForm.resetFields();
      message.success('Thêm bình luận thành công');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const updateRequestStatus = (requestId, statusId) => {
    // In a real application, this would be an API call
    const updatedRequests = requests.map(r => {
      if (r.id === requestId) {
        const status = statuses.find(s => s.id === statusId);
        return { 
          ...r, 
          statusId: statusId,
          statusName: status.statusName,
          statusColor: status.colorCode
        };
      }
      return r;
    });
    
    setRequests(updatedRequests);
    
    // Also update current request if in view modal
    if (currentRequest && currentRequest.id === requestId) {
      const status = statuses.find(s => s.id === statusId);
      setCurrentRequest({
        ...currentRequest,
        statusId: statusId,
        statusName: status.statusName,
        statusColor: status.colorCode
      });
      
      // Add to history
      const newHistoryEntry = {
        id: Math.max(...history.map(h => h.id), 0) + 1,
        requestId: requestId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        changeType: 'Status',
        oldValue: currentRequest.statusName,
        newValue: status.statusName,
        changedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        description: 'Trạng thái được cập nhật'
      };
      
      setHistory([newHistoryEntry, ...history]);
    }
    
    message.success('Cập nhật trạng thái thành công');
  };

  const columns = [
    {
      title: 'Mã yêu cầu',
      dataIndex: 'requestCode',
      key: 'requestCode',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a onClick={() => showViewModal(record)}>{text}</a>
      ),
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priorityName',
      key: 'priorityName',
      render: (text, record) => (
        <Tag color={record.priorityColor}>{text}</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusName',
      key: 'statusName',
      render: (text, record) => (
        <Tag color={record.statusColor}>{text}</Tag>
      ),
    },
    {
      title: 'Người xử lý',
      dataIndex: 'assignedUserName',
      key: 'assignedUserName',
      render: (text) => text || 'Chưa phân công',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
            type="primary"
            ghost
          />
          <Button 
            icon={<CommentOutlined />} 
            onClick={() => showViewModal(record)}
          />
        </Space>
      ),
    },
  ];

  // Check if user has permission to view this page
  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Quản lý yêu cầu</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Tạo yêu cầu mới
        </Button>
      </div>
      
      <Spin spinning={loading}>
        <Table 
          columns={columns} 
          dataSource={requests} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Spin>
      
      {/* Create/Edit Request Modal */}
      <Modal
        title={currentRequest ? "Cập nhật yêu cầu" : "Tạo yêu cầu mới"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          
          <Form.Item
            name="customerId"
            label="Khách hàng"
            rules={[{ required: true, message: 'Vui lòng chọn khách hàng!' }]}
          >
            <Select>
              {customers.map(customer => (
                <Option key={customer.id} value={customer.id}>{customer.companyName}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select>
              {categories.map(category => (
                <Option key={category.id} value={category.id}>{category.categoryName}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="priorityId"
            label="Độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
          >
            <Select>
              {priorities.map(priority => (
                <Option key={priority.id} value={priority.id}>{priority.priorityName}</Option>
              ))}
            </Select>
          </Form.Item>
          
          {currentRequest && (
            <Form.Item
              name="statusId"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select>
                {statuses.map(status => (
                  <Option key={status.id} value={status.id}>{status.statusName}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          
          <Form.Item
            name="assignedTo"
            label="Người xử lý"
          >
            <Select allowClear>
              {users.map(user => (
                <Option key={user.id} value={user.id}>{user.firstName} {user.lastName}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="dueDate"
            label="Hạn xử lý"
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* View Request Modal */}
      <Modal
        title={`Chi tiết yêu cầu: ${currentRequest?.requestCode}`}
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {currentRequest && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin" key="1">
              <div style={{ marginBottom: 16 }}>
                <Title level={4}>{currentRequest.title}</Title>
                <div style={{ display: 'flex', gap: '8px', marginBottom: 16 }}>
                  <Tag color={currentRequest.statusColor}>{currentRequest.statusName}</Tag>
                  <Tag color={currentRequest.priorityColor}>{currentRequest.priorityName}</Tag>
                </div>
                
                <Paragraph>{currentRequest.description}</Paragraph>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 24 }}>
                  <div>
                    <p><strong>Khách hàng:</strong> {currentRequest.customerName}</p>
                    <p><strong>Danh mục:</strong> {currentRequest.categoryName}</p>
                    <p><strong>Người tạo:</strong> {currentRequest.createdByName}</p>
                    <p><strong>Ngày tạo:</strong> {currentRequest.createdAt}</p>
                  </div>
                  <div>
                    <p><strong>Người xử lý:</strong> {currentRequest.assignedUserName || 'Chưa phân công'}</p>
                    <p><strong>Hạn xử lý:</strong> {currentRequest.dueDate || 'Không có'}</p>
                  </div>
                </div>
                
                <div style={{ marginTop: 24 }}>
                  <Title level={5}>Cập nhật trạng thái:</Title>
                  <Space>
                    {statuses.map(status => (
                      <Button 
                        key={status.id}
                        type={currentRequest.statusId === status.id ? 'primary' : 'default'}
                        onClick={() => updateRequestStatus(currentRequest.id, status.id)}
                      >
                        {status.statusName}
                      </Button>
                    ))}
                  </Space>
                </div>
              </div>
            </TabPane>
            
            <TabPane tab="Bình luận" key="2">
              <div style={{ marginBottom: 16 }}>
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id} style={{ marginBottom: 16, padding: 16, border: '1px solid #f0f0f0', borderRadius: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <strong>{comment.userName}</strong>
                        <span>{comment.createdAt}</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p>Chưa có bình luận nào.</p>
                )}
                
                <div style={{ marginTop: 24 }}>
                  <Title level={5}>Thêm bình luận:</Title>
                  <Form
                    form={commentForm}
                    layout="vertical"
                    onFinish={handleAddComment}
                  >
                    <Form.Item
                      name="content"
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung bình luận!' }]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Gửi bình luận
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </TabPane>
            
            <TabPane tab="Lịch sử" key="3">
              <Timeline
                mode="left"
                items={history.map(item => ({
                  label: item.changedAt,
                  children: (
                    <div>
                      <p><strong>{item.userName}</strong> - {item.description}</p>
                      {item.oldValue && item.newValue && (
                        <p>
                          Từ <Tag>{item.oldValue}</Tag> thành <Tag>{item.newValue}</Tag>
                        </p>
                      )}
                    </div>
                  )
                }))}
              />
            </TabPane>
            
            <TabPane tab="Tệp đính kèm" key="4">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="text"
                defaultFileList={[
                  {
                    uid: '1',
                    name: 'example.png',
                    status: 'done',
                    url: 'http://www.baidu.com/xxx.png',
                  },
                ]}
              >
                <Button icon={<UploadOutlined />}>Tải lên tệp</Button>
              </Upload>
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </MainLayout>
  );
}
