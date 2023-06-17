import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, Input, message, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { GetData } from '../../../api';
import { PAGE_DEFAULT } from '../../../constants';
import moment from 'moment';


const { Search } = Input;
const products = () => {
  const handleSearch = (data) => {
    setSearch(data);
  }

  //list users
   useEffect(() => {
    fetchData();
  }, []);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const [partner, setPartner] = useState([])
  const { pageIndex, pageSize } = PAGE_DEFAULT
  const [pageParams, setPageParams] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize
  });
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetData(`/project?page=${pageIndex}&size=${pageSize}`);
      setData(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    GetData(`/partner?page=0&size`)
      .then(response => {
        setPartner(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []);
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
      title: 'Partner',
      dataIndex: 'partner_id',
      key: 'partner_id',
      render: (record) => {
        return partner.filter((item) => item.id === record)[0]?.name;
      }
    }, 
    {
      title: 'Technology',
      dataIndex: 'technology',
      key: 'technology',
    },
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
    },
    {
      title: 'StartDate',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => moment(date).format('DD/MM/YYYY'),

    },
    {
      title: 'EndDate',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/Edit/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onHandleDelete}
            okText="Yes"
            cancelText="No"
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
      <Button className="float-right mb-6 bg-primary text-light "> <Link to={`/admin/Add_duan`} className="no-underline">Thêm Mới</Link></Button>
      
      <Table loading={loading} columns={columns} dataSource={data} pagination={{ pageSize: data.pageSize, total: data.totalCount, onChange: onChangePage }} />
    </div>
  );
};
export default products;
{/* <Form.Item label="Công nghệ" name="technology">
<Select mode="tags" placeholder="Chọn công nghệ">
  <Option value="react">React</Option>
  <Option value="angular">Angular</Option>
  <Option value="vue">Vue</Option> */}
{/* Các option công nghệ khác */ }
// </Select>
// </Form.Item>