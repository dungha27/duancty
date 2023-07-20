import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PAGE_DEFAULT } from "../../../constants";
import http from "../../../http-common";
import { getWorkingList } from "../../../redux/actions/workingList";

const Working = () => {
  const { workingList, loading, error } = useSelector(
    (state) => state.workingList
  );
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { pageIndex, pageSize } = PAGE_DEFAULT;
  const [pageParams, setPageParams] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });
  useEffect(() => {
    dispatch(getWorkingList(pageParams));
    if (error?.status === 401) {
      Navigate("/auth/login");
    }
  }, [dispatch]);

  const getShift = (shift) => {
    switch (shift) {
      case 1:
        return <Tag color="success">{`Morning (8h00-12h)`}</Tag>;
      case 2:
        return <Tag color="warning">{`Afternoon (13h30-17h30)`}</Tag>;
      case 3:
        return <Tag color="error">{`Full Time (8h00-17h30)`}</Tag>;
    }
  };

  const onHandleDelete = async (id) => {
    try {
      const response = await http.delete(`/working-days/${id}`);
      if (response.status === 200) {
        console.log("Xóa thành công");
        fetchData();
      } else {
        console.log("Xóa không thành công");
      }
    } catch (error) {
      console.log("Error deleting data:", error);
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
      title: "Employee",
      dataIndex: "user",
      key: "user",
      render: (row) => row.fullname,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      render: (row) => getShift(row),
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (row) => (row ? moment(row).format("HH:mm:ss") : "-"),
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (row) => (row ? moment(row).format("HH:mm:ss") : "-"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/Editwk/${record.id}`}>
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
            <DeleteTwoTone style={{ fontSize: "18px" }} />
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
      <Button className="float-right mb-6 bg-primary text-light ">
        {" "}
        <Link to={`/Working/Add`} className="no-underline">
          Thêm Mới
        </Link>
      </Button>

      <Table
        loading={loading}
        columns={columns}
        dataSource={workingList?.workingListDTOS}
        pagination={{
          pageSize: pageParams.pageSize,
          total: workingList?.totalCount,
          onChange: onChangePage,
        }}
      />
    </div>
  );
};
export default Working;
