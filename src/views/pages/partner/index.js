import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, Input, message, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, SearchOutlined } from '@ant-design/icons';
import { GetData } from '../../../api';
import { PAGE_DEFAULT } from '../../../constants';
import moment from 'moment';
import { DeleteData } from '../../../api';



const products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { Option } = Select;
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  // const [partner, setPartner] = useState([])
  const { pageIndex, pageSize } = PAGE_DEFAULT
  const [pageParams, setPageParams] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize
  });

  //list partner
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetData(`/partner?page=${pageIndex}&size=${pageSize}&search=${searchQuery}`);
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
      const response = await DeleteData(`/partner/${id}`);
      if (response.status === 200) {
        console.log("Xóa thành công");
        fetchData();
      } else {
        console.log('Xóa không thành công');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const columns = [
    {
      title: "No",
      // dataIndex: "id", 
      // key: "id",
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
          <Link to={`/admin/Edit_dt/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onHandleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "text-light bg-primary" }}
          >
            <DeleteTwoTone style={{ fontSize: '18px' }} /></Popconfirm>
        </Space>
      ),
    },
  ];
  const onChangePage = (currentPage) => {
    setPageParams({ ...pageParams, pageIndex: currentPage })
  }
  return (
    <div>
      <Form layout="inline" style={{ marginBottom: '16px' }}>
        <Search
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={() => fetchData()}
          enterButton={<SearchOutlined />}
          className="rounded-md bg-primary"
          allowClear
          style={{ width: 304 }}
        />
      </Form>
      <Button className="float-right mb-6 bg-primary text-light "> <Link to={`/admin/Add_dt`} className="no-underline">Thêm Mới</Link></Button>

      <Table loading={loading} columns={columns} dataSource={data} pagination={{ pageSize: data.pageSize, total: data.totalCount, onChange: onChangePage }} />
    </div>
  );
};
export default products;
