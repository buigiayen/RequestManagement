'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Typography, Spin } from 'antd';
import { 
  TeamOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined 
} from '@ant-design/icons';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const { Title } = Typography;

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRequests: 0,
    openRequests: 0,
    closedRequests: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // In a real application, these would be actual API calls
      // For now, we'll simulate the data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalCustomers: 24,
        totalRequests: 78,
        openRequests: 15,
        closedRequests: 63
      });
      
      setRecentRequests([
        {
          key: '1',
          id: 'REQ12345',
          title: 'Cần hỗ trợ kỹ thuật về sản phẩm X',
          customer: 'Công ty ABC',
          status: 'Mới',
          priority: 'Cao',
          createdAt: '2025-04-10'
        },
        {
          key: '2',
          id: 'REQ12346',
          title: 'Yêu cầu thêm tính năng báo cáo',
          customer: 'Công ty XYZ',
          status: 'Đang xử lý',
          priority: 'Trung bình',
          createdAt: '2025-04-11'
        },
        {
          key: '3',
          id: 'REQ12347',
          title: 'Báo lỗi không đăng nhập được',
          customer: 'Công ty DEF',
          status: 'Đã giải quyết',
          priority: 'Khẩn cấp',
          createdAt: '2025-04-12'
        },
        {
          key: '4',
          id: 'REQ12348',
          title: 'Cần tư vấn về gói dịch vụ',
          customer: 'Công ty GHI',
          status: 'Chờ phản hồi',
          priority: 'Thấp',
          createdAt: '2025-04-12'
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Mới': return 'blue';
      case 'Đang xử lý': return 'cyan';
      case 'Chờ phản hồi': return 'orange';
      case 'Đã giải quyết': return 'green';
      case 'Đóng': return 'gray';
      case 'Từ chối': return 'red';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Thấp': return 'green';
      case 'Trung bình': return 'gold';
      case 'Cao': return 'orange';
      case 'Khẩn cấp': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Mã yêu cầu',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>{priority}</Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <MainLayout>
      <Title level={2}>Dashboard</Title>
      
      <Spin spinning={loading}>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng số khách hàng"
                value={stats.totalCustomers}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng số yêu cầu"
                value={stats.totalRequests}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Yêu cầu đang mở"
                value={stats.openRequests}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Yêu cầu đã đóng"
                value={stats.closedRequests}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Card title="Yêu cầu gần đây" style={{ marginBottom: 24 }}>
          <Table 
            columns={columns} 
            dataSource={recentRequests} 
            pagination={false}
            rowKey="key"
          />
        </Card>
      </Spin>
    </MainLayout>
  );
}
