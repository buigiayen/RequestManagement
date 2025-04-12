'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Tag, Typography, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const { Title } = Typography;
const { Option } = Select;

export default function CustomersPage() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerGroups, setCustomerGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (token) {
      fetchCustomers();
      fetchCustomerGroups();
    }
  }, [token]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an actual API call
      // For now, we'll simulate the data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomers([
        {
          id: 1,
          customerCode: 'CUST12345',
          companyName: 'Công ty ABC',
          contactName: 'Nguyễn Văn A',
          email: 'nguyenvana@abc.com',
          phoneNumber: '0123456789',
          address: '123 Đường Lê Lợi',
          city: 'Hồ Chí Minh',
          country: 'Việt Nam',
          customerGroupId: 1,
          customerGroupName: 'Khách hàng VIP',
          isActive: true
        },
        {
          id: 2,
          customerCode: 'CUST12346',
          companyName: 'Công ty XYZ',
          contactName: 'Trần Thị B',
          email: 'tranthib@xyz.com',
          phoneNumber: '0987654321',
          address: '456 Đường Nguyễn Huệ',
          city: 'Hà Nội',
          country: 'Việt Nam',
          customerGroupId: 2,
          customerGroupName: 'Khách hàng thường',
          isActive: true
        },
        {
          id: 3,
          customerCode: 'CUST12347',
          companyName: 'Công ty DEF',
          contactName: 'Lê Văn C',
          email: 'levanc@def.com',
          phoneNumber: '0369852147',
          address: '789 Đường Trần Hưng Đạo',
          city: 'Đà Nẵng',
          country: 'Việt Nam',
          customerGroupId: 1,
          customerGroupName: 'Khách hàng VIP',
          isActive: false
        },
      ]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      message.error('Không thể tải danh sách khách hàng');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerGroups = async () => {
    try {
      // In a real application, this would be an actual API call
      // For now, we'll simulate the data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCustomerGroups([
        {
          id: 1,
          groupName: 'Khách hàng VIP',
          description: 'Khách hàng quan trọng, ưu tiên cao'
        },
        {
          id: 2,
          groupName: 'Khách hàng thường',
          description: 'Khách hàng thông thường'
        },
        {
          id: 3,
          groupName: 'Khách hàng tiềm năng',
          description: 'Khách hàng mới, có tiềm năng phát triển'
        },
      ]);
    } catch (error) {
      console.error('Error fetching customer groups:', error);
      message.error('Không thể tải danh sách nhóm khách hàng');
    }
  };

  const showModal = (customer = null) => {
    setCurrentCustomer(customer);
    if (customer) {
      form.setFieldsValue({
        companyName: customer.companyName,
        contactName: customer.contactName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        customerGroupId: customer.customerGroupId,
        isActive: customer.isActive
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const showDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setIsDeleteModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentCustomer) {
        // Update existing customer
        // In a real application, this would be an API call
        const updatedCustomers = customers.map(c => 
          c.id === currentCustomer.id ? { ...c, ...values } : c
        );
        setCustomers(updatedCustomers);
        message.success('Cập nhật khách hàng thành công');
      } else {
        // Create new customer
        // In a real application, this would be an API call
        const newCustomer = {
          id: Math.max(...customers.map(c => c.id), 0) + 1,
          customerCode: `CUST${Math.floor(10000 + Math.random() * 90000)}`,
          ...values,
          customerGroupName: customerGroups.find(g => g.id === values.customerGroupId)?.groupName,
          isActive: true
        };
        setCustomers([...customers, newCustomer]);
        message.success('Thêm khách hàng thành công');
      }
      
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = () => {
    // In a real application, this would be an API call
    const updatedCustomers = customers.filter(c => c.id !== currentCustomer.id);
    setCustomers(updatedCustomers);
    setIsDeleteModalVisible(false);
    message.success('Xóa khách hàng thành công');
  };

  const columns = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'customerCode',
      key: 'customerCode',
    },
    {
      title: 'Tên công ty',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Người liên hệ',
      dataIndex: 'contactName',
      key: 'contactName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Nhóm khách hàng',
      dataIndex: 'customerGroupName',
      key: 'customerGroupName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
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
            icon={<DeleteOutlined />} 
            onClick={() => showDeleteModal(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  // Check if user has permission to view this page
  if (!user || !user.roles || !['Admin', 'Manager', 'Staff'].some(role => user.roles.includes(role))) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Title level={3}>Bạn không có quyền truy cập trang này</Title>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Quản lý khách hàng</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Thêm khách hàng
        </Button>
      </div>
      
      <Spin spinning={loading}>
        <Table 
          columns={columns} 
          dataSource={customers} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Spin>
      
      <Modal
        title={currentCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}
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
            name="companyName"
            label="Tên công ty"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="contactName"
            label="Người liên hệ"
            rules={[{ required: true, message: 'Vui lòng nhập tên người liên hệ!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="city"
            label="Thành phố"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="country"
            label="Quốc gia"
            initialValue="Việt Nam"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="customerGroupId"
            label="Nhóm khách hàng"
            rules={[{ required: true, message: 'Vui lòng chọn nhóm khách hàng!' }]}
          >
            <Select>
              {customerGroups.map(group => (
                <Option key={group.id} value={group.id}>{group.groupName}</Option>
              ))}
            </Select>
          </Form.Item>
          
          {currentCustomer && (
            <Form.Item
              name="isActive"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Select>
                <Option value={true}>Hoạt động</Option>
                <Option value={false}>Không hoạt động</Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
      
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa khách hàng "{currentCustomer?.companyName}" không?</p>
      </Modal>
    </MainLayout>
  );
}
