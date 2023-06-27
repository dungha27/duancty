import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, Input, message, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { GetData } from '../../../api';
import { PAGE_DEFAULT } from '../../../constants';
import moment from 'moment';
// import { DeleteData } from '../../../api';


const working = () => {
    //list
    const [loading, setLoading] = useState(false);
    // const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([])
    const { pageIndex, pageSize } = PAGE_DEFAULT
    const [pageParams, setPageParams] = useState({
        pageIndex: pageIndex,
        pageSize: pageSize
    });
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await GetData(`/working-days?page=${pageIndex}&size=${pageSize}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //   const onHandleDelete = async (id) => {
    //     console.log("id", id)
    //     try {
    //       const response = await DeleteData(`/partner/${id}`);
    //       if (response.status === 200) {
    //         message.success("Xóa thành công");
    //         fetchData();
    //       } else {
    //         message.error('Xóa không thành công');
    //       }
    //     } catch (error) {
    //       console.error('Error deleting data:', error);
    //     }
    //   };
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
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'ExpectedStart',
            dataIndex: 'expectedStart',
            key: 'expectedStart',
            render: (expectedStart) => moment(expectedStart).format('DD/MM/YYYY'),
        },
        {
            title: 'ExpectedEnd',
            dataIndex: 'expectedEnd',
            key: 'expectedEnd',
            render: (expectedEnd) => moment(expectedEnd).format('DD/MM/YYYY'),
        },
        {
          title: 'Action',
          key: 'action',
        //   render: (record) => (
        //     <Space size="middle">
        //       <Link to={`/admin/Edit_dt/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>     
        //          <Popconfirm
        //         title="Delete the task"
        //         description="Are you sure to delete this task?"
        //         onConfirm={() => onHandleDelete(record.id)}
        //         okText="Yes"
        //         cancelText="No"
        //         okButtonProps={{ className: "text-light bg-primary" }}

        //       >
        //         <DeleteTwoTone style={{ fontSize: '18px' }} /></Popconfirm>
        //     </Space>
        //   ),
        },
    ];
    const onChangePage = (currentPage) => {
        setPageParams({ ...pageParams, pageIndex: currentPage })
    }
    return (
        <div>

            <Button className="float-right mb-6 bg-primary text-light "> <Link to={`/admin/Add_dt`} className="no-underline">Thêm Mới</Link></Button>

            <Table loading={loading} columns={columns} dataSource={data} pagination={{ pageSize: data.pageSize, total: data.totalCount, onChange: onChangePage }} />
        </div>
    );
};
export default working;
