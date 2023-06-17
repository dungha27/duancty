import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, Input, message, Form } from "antd";
import { GetData } from '../../../api';
import { PAGE_DEFAULT } from '../../../constants';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";
import moment from 'moment';
import { DeleteData } from '../../../api';
import { AudioOutlined } from '@ant-design/icons';


const products = () => {
  useEffect(() => {
    // Gọi API để lấy dữ liệu  
    GetData(`/users?roleId&page=0&size`)
      .then(response => {
        setData(response.data);
        // Áp dụng logic filter ban đầu cho dữ liệu trả về từ API
        setFilteredData(response.data.filter(item => item.condition === true));
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []);

  //search
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    // Áp dụng logic tìm kiếm
    const filtered = data.filter(item =>
      item.fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.dob.includes(searchValue)
      //phone
      // item.phone_number.toLowerCase().includes(searchPhone.toLowerCase()) ||
      // item.phone_number.includes(setSearchPhone)

    );
    setFilteredData(filtered);
  };
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const { pageIndex, pageSize } = PAGE_DEFAULT
  const [pageParams, setPageParams] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize
  });
  //list users

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetData(`/users?page=${pageIndex}&size=${pageSize}?search`);
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };
  //delete
  const onHandleDelete = async (values) => {
    console.log("id", values)
    try {
      const response = await DeleteData(`/users/${values}`);
      if (response.status === 200) {
        message.success("Xóa thành công");
        fetchData();
      } else {
        message.error('Xóa không thành công');
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
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (record) => {
        return record === 0 ? 'Nam' : 'Nữ';
      }
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (record) => {
        return record?.role_name
      }
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle" className="">
          <Link to={`/admin/Edit/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onHandleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone style={{ fontSize: '18px' }} />              </Popconfirm>
        </Space>
      ),
    },
  ];


  const onChangePage = (currentPage) => {
    setPageParams({ ...pageParams, pageIndex: currentPage })
  }

  return (
    <div>
      <form className="col-span-3 md:col-span-2 bg-gray-100" onSubmit={handleSearch}>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="p-1">Fullname:
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="Fullname"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
          <div className="p-1" >Role:
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="role_id"
            // value={searchValue}
            // onChange={e => setSearchValue(e.target.value)}
            />

          </div>
          <div className="p-1">Create:
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="date"
              placeholder="createdAt"
            // value={searchValue}
            // onChange={e => setSearchValue(e.target.value)}
            /></div>
          <div className="p-1">DOB:
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="date"
              placeholder="dob"
            // value={searchValue}
            // onChange={e => setSearchValue(e.target.value)}
            /></div>

          <div className="p-1">Phone:
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="phone_number"
              value={searchPhone}
              onChange={e => setSearchPhone(e.target.value)}
            /></div>

          <div className="p-1">Address:
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="address"
            // value={searchValue}
            // onChange={e => setSearchValue(e.target.value)}
            /></div>
        </div>
        <div class="flex justify-center">
          <button class="bg-blue-500 text-white px-3 py-2 rounded-md mt-2" type="submit">
            Search
          </button>
        </div>
      </form>
      <Button className="bg-blue-600 text-white rounded-md mt-3 float-right">
        <Link to={`/admin/Add`} className="no-underline flex flex-col items-center">
          <span>Thêm mới</span>
        </Link>
      </Button>
      <br></br>
      <br></br>
      <br></br>
      {filteredData.length > 0 && (
        <Table loading={loading} columns={columns} dataSource={filteredData} pagination={{ pageSize: data.pageSize, total: data.totalCount, onChange: onChangePage }} />
      )}
    </div>

  );
};
export default products;
