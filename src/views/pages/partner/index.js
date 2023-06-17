import React from 'react';
import { Space, Table, Button, Popconfirm, Input, message, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';


const { Search } = Input;
const partner = () => {
  const handleSearch = (data) => {
    setSearch(data);
  }
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    }, {
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
            onConfirm={() => onHandleDelete}
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone style={{ fontSize: '18px' }} /></Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      id: '1',
      name: 'John Brown',
      partner: 'abcccc',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      id: '3',
      name: 'Joe Black',
      partner: 'abcccc',
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      id: '4',
      name: 'Joe Black',
      partner: 'abcccc',
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }, {
      id: '5',
      name: 'Joe Black',
      partner: 'abcccc',
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }, {
      id: '6',
      name: 'Joe Black',
      partner: 'abcccc',
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }, {
      id: '7',
      name: 'Joe Black',
      partner: 'abcccc',
      phase: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      id: '8',
      name: 'Joe Black',
      partner: 'abcccc',
      phase: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      id: '9',
      name: 'Joe Black',
      partner: 'abcccc',
      phase: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }, {
      id: '10',
      name: 'Joe Black',
      partner: 'abcccc',
      phase: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }, {
      id: '11',
      name: 'Joe Black',
      partner: 'abcccc',
      phase: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div>
      <Button className="float-right mb-6 bg-primary text-light "> <Link to={`/admin/Add_dt`} className="no-underline">Thêm Mới</Link></Button>
      <Search className="float-right mb-4"
        placeholder="search"
        allowClear
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20, }}
      />
      <Table columns={columns} dataSource={data} />
    </div>

  );
};
export default partner;