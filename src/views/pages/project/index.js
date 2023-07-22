// import React, { useEffect, useState } from "react";
// import { Space, Table, Button, Popconfirm, Input, message, Form, Select } from "antd";
// import { Link } from "react-router-dom";
// import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, SearchOutlined } from '@ant-design/icons';
// import { GetData } from '../../../api';
// import { PAGE_DEFAULT } from '../../../constants';
// import moment from 'moment';
// import { DeleteData } from '../../../api';


// const products = () => {
//   const { Search } = Input;
//   const [searchQuery, setSearchQuery] = useState("");
//   const { Option } = Select;
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([])
//   const [partner, setPartner] = useState([])
//   const { pageIndex, pageSize } = PAGE_DEFAULT
//   const [pageParams, setPageParams] = useState({
//     pageIndex: pageIndex,
//     pageSize: pageSize
//   });
//   //list users
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await GetData(`/project?page=${pageIndex}&size=${pageSize}&search=${searchQuery}`);
//       setData(response.data);
//       setLoading(false)
//     } catch (error) {
//       setLoading(false);
//       console.error('Error:', error);
//     }
//   };
//   useEffect(() => {
//     GetData(`/partner?page=0&size`)
//       .then(response => {
//         setPartner(response.data);
//       })
//       .catch(error => {
//         console.error('Lỗi khi gọi API:', error);
//       });
//   }, []);

//   const onHandleDelete = async (id) => {
//     console.log("id", id)
//     try {
//       const response = await DeleteData(`/project/${id}`);
//       if (response.status === 200) {
//         console.log("Xóa thành công");
//         fetchData();
//       } else {
//         console.log('Xóa không thành công');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   const columns = [
//     {
//       title: "No",
//       // dataIndex: "id", 
//       // key: "id",
//       render: (_, record, index) => {
//         return index + 1;
//       }
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Partner',
//       dataIndex: 'partner_id',
//       key: 'partner_id',
//       render: (record) => {
//         return partner.filter((item) => item.id === record)[0]?.name;
//       }
//     },
//     {
//       title: 'Technology',
//       dataIndex: 'technology',
//       key: 'technology',
//     },
//     // {
//     //   title: 'Phase',
//     //   dataIndex: 'phase',
//     //   key: 'phase',
//     // },
//     // {
//     //   title: 'requiredMember',
//     //   dataIndex: 'requiredMember',
//     //   key: 'requiredMember',
//     // },
//     {
//       title: 'StartDate',
//       dataIndex: 'startDate',
//       key: 'startDate',
//       render: (date) => moment(date).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'EndDate',
//       dataIndex: 'endDate',
//       key: 'endDate',
//       render: (date) => moment(date).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (record) => (
//         <Space size="middle">
//           <Link to={`/admin/Edit_duan/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>
//           <Popconfirm
//             title="Delete the task"
//             description="Are you sure to delete this task?"
//             onConfirm={() => onHandleDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//             okButtonProps={{ className: "text-light bg-primary" }}
//           >
//             <DeleteTwoTone style={{ fontSize: '18px' }} /></Popconfirm>
//         </Space>
//       ),
//     },
//   ];
//   const onChangePage = (currentPage) => {
//     setPageParams({ ...pageParams, pageIndex: currentPage })
//   }
//   return (
//     <div>
//       <Form layout="inline" style={{ marginBottom: '16px' }}>
//         <Search
//           placeholder="search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onSearch={() => fetchData()}
//           enterButton={<SearchOutlined />}
//           className="rounded-md bg-primary"
//           allowClear
//           style={{ width: 304 }}
//         />
//       </Form>
//       <Button className="float-right mb-6 bg-primary text-light "> <Link to={`/admin/Add_duan`} className="no-underline">Thêm Mới</Link></Button>

//       <Table loading={loading} columns={columns} dataSource={data} pagination={{ pageSize: data.pageSize, total: data.totalCount, onChange: onChangePage }} />
//     </div>
//   );
// };
// export default products;


import { DeleteTwoTone, EditTwoTone, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Select, Space, Table } from "antd";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from '../../../http-common';


const Projects = () => {
  const { Search } = Input;
  const [searchQuery, setSearchQuery] = useState("");
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [partner, setPartner] = useState([]);
  const [pageParams] = useState({
    pageIndex: 0,
    pageSize: 0
  });


  useEffect(() => {
    fetchData();
    fetchPartner();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await http.get(`/project?page=${pageParams.pageIndex}&size=${pageParams.pageSize}&search=${searchQuery}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const fetchPartner = async () => {
    try {
      const response = await http.get(`/partner?page=0&size`);
      setPartner(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onHandleDelete = async (id) => {
    console.log("id", id)
    try {
      const response = await http.delete(`/project/${id}`);
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
          <Link to={`/admin/Edit_duan/${record.id}`}><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>
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
      <Button className="float-right mb-6 bg-primary text-light ">
        <Link to={`/admin/Add_duan`} className="no-underline">Thêm Mới</Link>
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Projects;
