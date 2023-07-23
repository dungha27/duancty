import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PAGE_DEFAULT } from "../../../constants";
import http from "../../../http-common";
import { getUsers } from "../../../redux/actions/users";

const Users = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(users?.userDTOS);
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    address: "",
    dob: "",
    phoneNumber: "",
  });
  const { pageIndex, pageSize } = PAGE_DEFAULT;
  const [pageParams, setPageParams] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });
  const [formSearch] = Form.useForm();
  const handleSearch = (values) => {
    console.log(values)
    setSearchQuery({
      ...searchQuery,
      search: values?.search,
      address: values?.address,
      phoneNumber: values?.phoneNumber,
      dob: values?.dob ? moment(values?.dob?.$d).format("yyyy-MM-DDT00:00:00") : "",
    });
  };
  //list users
  useEffect(() => {
    dispatch(getUsers({ ...pageParams, query: searchQuery }));
  }, [dispatch, searchQuery, pageParams]);

  useEffect(() => {
    setUserData(users?.userDTOS);
  }, [users]);

  const getRole = (value) => {
    switch (value) {
      case "admin": {
        return <Tag color="error">{value.toUpperCase()}</Tag>;
      }
      case "employee": {
        return <Tag color="success">{value.toUpperCase()}</Tag>;
      }
      default:
        return;
    }
  };
  //delete
  const onHandleDelete = async (values) => {
    console.log("id", values);
    try {
      const response = await http.delete(`/users/${values}`);
      if (response.status === 200) {
        console.log("Xóa thành công");
        fetchData();
      } else {
        console.log("Xóa không thành công");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return index + 1;
      },
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
        return record === 0 ? "Nam" : "Nữ";
      },
    },
    {
      title: "Role",
      dataIndex: "role_Name",
      key: "role_Name",
      render: (record) => getRole(record),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (date) => moment(date).format("DD/MM/YYYY"),
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
          <Link to={`./update/${record.id}`}>
            <EditTwoTone style={{ fontSize: "20px", color: "#08c" }} />
          </Link>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onHandleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "text-light bg-primary" }}
          >
            <DeleteTwoTone style={{ fontSize: "18px" }} />{" "}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChangeDate = (values, name) => {
    formSearch.setFieldValue(name, values);
    console.log(values)
  };

  const onChangePage = (currentPage) => {
    setPageParams({ ...pageParams, pageIndex: currentPage });
  };

  return (
    <div>
      <Form
        form={formSearch}
        className="col-span-3 md:col-span-4 bg-gray-50"
        onFinish={handleSearch}
      >
        <div className="flex px-5 py-2 items-center">
          <div className="flex items-center space-x-4">
            <div className="p-1">
              <span className="font-bold text-sm">Fullname</span>
              <Form.Item name="search">
                <Input
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  type="text"
                  placeholder="Fullname"
                />
              </Form.Item>
            </div>
            {/* <div className="p-1"> ... </div> */}
            <div className="p-1">
              <span className="font-bold text-sm">Create</span>
              <Form.Item name="dob">
                <DatePicker className="w-full border border-gray-300 rounded-md px-4 py-2" onChange={(value) => onChangeDate(value, "createdAt")} allowClear />
              </Form.Item>
            </div>
            {/* <div className="p-1">
              <span className="font-bold text-sm">Date Of Birth</span>
              <Form.Item name="dob">
                <DatePicker
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  onChange={(values) => onChangeDate(values, "dob")}
                />
              </Form.Item>
            </div> */}
            <div className="p-1">
              <span className="font-bold text-sm">Phone Number</span>
              <Form.Item name="phoneNumber">
                <Input
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  type="text"
                />
              </Form.Item>
            </div>
            <div className="p-1">
              <span className="font-bold text-sm">Address</span>
              <Form.Item name="address">
                <Input
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  type="text"
                />
              </Form.Item>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white px-8 py-2 rounded-md"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </Form>

      <Button className="bg-blue-600 text-white rounded-md my-3 float-right">
        <Link
          to={`./create`}
          className="no-underline flex flex-col items-center"
        >
          <span>Thêm mới</span>
        </Link>
      </Button>
      <Table
        // style={{ height: "70vh" }}
        loading={loading}
        columns={columns}
        dataSource={userData}
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          total: users?.totalCount,
          defaultPageSize: pageSize,
          onChange: onChangePage,
        }}
      />
    </div>
  );
};
export default memo(Users);
