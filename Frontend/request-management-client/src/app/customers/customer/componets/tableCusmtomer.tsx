"use client";
import React, { useState, useEffect } from "react";
import { Table, Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface IProps {
  loading: boolean;
  data?: CUSTOMERGROUPS.GROUPS[];
}

const TableCustomer: React.FC<IProps> = (props) => {
  const columns: ColumnsType<CUSTOMERGROUPS.GROUPS> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: CUSTOMERGROUPS.GROUPS) => {
    // Implement edit functionality
    console.log("Edit record:", record);
  };

  const handleDelete = (record: CUSTOMERGROUPS.GROUPS) => {
    // Implement delete functionality
    console.log("Delete record:", record);
  };

  useEffect(() => {
    // Implement API call to fetch data
    // Example:
    // fetchCustomerGroups();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
};

export default TableCustomer;
