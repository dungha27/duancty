import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PAGE_DEFAULT } from "../../../constants";
import { getUsers } from "../../../redux/actions/users";
import http from "../../../http-common";

const Users = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");

  const { pageIndex, pageSize } = PAGE_DEFAULT;
  const [pageParams, setPageParams] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    // fetchData();
  };
  //list users
  useEffect(() => {
    dispatch(getUsers({ ...pageParams, search: searchQuery }));
  }, [dispatch]);
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
      // dataIndex: "id",
      // key: "id",
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
      dataIndex: "role_id",
      key: "role_id",
      render: (record) => {
        return record?.role_name;
      },
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
          <Link to={`/admin/Edit/${record.id}`}>
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

  const onChangePage = (currentPage) => {
    setPageParams({ ...pageParams, pageIndex: currentPage });
  };

  return (
    <div>
      <form
        className="col-span-3 md:col-span-4 bg-gray-50"
        onSubmit={handleSearch}
      >
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="p-1">
              <span className="font-bold text-sm">Fullname</span>
              <Input
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                type="text"
                placeholder="Fullname"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={() => fetchData()}
              />
            </div>
            {/* <div className="p-1"> ... </div> */}
            <div className="p-1">
              <span className="font-bold text-sm">Create</span>
              <input
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                type="date"
                placeholder="createdAt"
                // value={searchCreatedAt}
                // onChange={(e) => setSearchCreatedAt(e.target.value)}
              />
            </div>
            <div className="p-1">
              <span className="font-bold text-sm">Dob</span>
              <input
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                type="date"
                placeholder="dob"
                // value={searchDob}
                // onChange={(e) => setSearchDob(e.target.value)}
              />
            </div>
            <div className="p-1">
              <span className="font-bold text-sm">Phone</span>
              <input
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                type="text"
                placeholder="phone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
            <div className="p-1">
              <span className="font-bold text-sm">Address</span>
              <input
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                type="text"
                placeholder="address"
              />
            </div>
            <div className="flex justify-center mt-3 p-2">
              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-md mt-2"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>

      <Button className="bg-blue-600 text-white rounded-md mt-3 float-right">
        <Link
          to={`/admin/Add`}
          className="no-underline flex flex-col items-center"
        >
          <span>Thêm mới</span>
        </Link>
      </Button>
      <br></br>
      <br></br>
      <br></br>
      {users?.length > 0 && (
        <Table
          loading={loading}
          columns={columns}
          dataSource={users}
          pagination={{
            pageSize: users?.pageSize,
            total: users?.totalCount,
            onChange: onChangePage,
          }}
        />
      )}
    </div>
  );
};
export default Users;
