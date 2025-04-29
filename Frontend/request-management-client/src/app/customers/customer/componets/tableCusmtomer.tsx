"use client";
import React, { Fragment } from "react";
import { Card, Col, Row, Skeleton } from "antd";

interface IProps {
  loading: boolean;
  data?: CUSTOMERGROUPS.GROUPS[];
}

const TableCustomer: React.FC<IProps> = (props) => {
  return (
    <Fragment>
      {props.data && props.data.length > 0 ? (
        <Skeleton loading={props.loading} active paragraph={{ rows: 5 }}>
          <Row gutter={[16, 16]}>
            {props.data.map((item, index) => (
              <Col xl={6} lg={12} md={12} sm={24} xs={24} key={index}>
                <Card hoverable>
                  <b>{item.groupName}</b>
                </Card>
              </Col>
            ))}
          </Row>
        </Skeleton>
      ) : null}
    </Fragment>
  );
};

export default TableCustomer;
