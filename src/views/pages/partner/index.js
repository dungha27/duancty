import { DeleteTwoTone, EditTwoTone, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from '../../../http-common';

const Partners = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { Option } = Select;
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageParams] = useState({
    pageIndex: 0,
    pageSize: 0
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await http.get(`/partner?page=${pageParams.pageIndex}&size=${pageParams.pageSize}&search=${searchQuery}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const onHandleDelete = async (id) => {
    console.log("id", id)
    try {
      const response = await http.delete(`/partner/${id}`);
      if (response.status === 200) {
        console.log("Xóa thành công");
        fetchData();
      } else {
        console.log('Xóa không thành công');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return index + 1;
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Link to={`../update/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onHandleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "text-light bg-primary" }}
          >
            <DeleteTwoTone style={{ fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form layout="inline" style={{ marginBottom: '16px' }}>
        <Search
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={() => fetchData()}
          enterButton={<SearchOutlined />}
          className="rounded-md bg-primary"
          allowClear
          style={{ width: 304 }}
        />
      </Form>
      <Button className="float-right mb-6 bg-primary text-light ">
        <Link to={`../createpartner`} className="no-underline">Thêm Mới</Link>
      </Button>
      <Table loading={loading} columns={columns} dataSource={data} />
    </div>
  );
};

export default Partners;

