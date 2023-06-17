
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import { GetData, PostData } from '../../../../api';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';



// Schema validation using Yup
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
  username: Yup.string().required('UserName is required'),
  password: Yup.string().required('Password is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.string().required('DOB is required'),
  phone_number: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

const Add = () => {
  const navigate = useNavigate()

  // Initial form values
  const initialData = {
    username: "",
    password: "",
    fullname: "",
    dob: "",
    role: 2,
    department: 1,
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    province: "hà nội",
    district: "",
    ward: "",
  };

  const handleSubmit = async (data, { resetForm }) => {
    // Perform the API call or any other logic to add the employee
    console.log('Submitted values:', data);
    const result = await PostData("/users", { ...data, gender: Number(data.gender) });
    navigate('/admin/products')
    result.then((res) => console.log(res.data)).catch((err) => console.log(err.response.data))
    resetForm();
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh
    GetData(`/provinces`)
      .then(data => {

        const formattedOptionsProvinces = data.data.map(option => ({
          value: option.id,
          label: option.name
        }));

        setProvinces(formattedOptionsProvinces)
      });
  }, []);


  const handleProvinceChange = id => {
    // Lấy danh sách huyện từ API dựa trên tỉnh đã chọn
    GetData(`/province/${id}/districts`)
      .then(response => {
        const formattedOptionsDistricts = response.data.map(option => ({
          value: option.id,
          label: option.name
        }));
        setDistricts(formattedOptionsDistricts);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // xã phường
  const handleDistrictChange = id => {
    // Lấy danh sách phường từ API dựa trên huyện đã chọn
    GetData(``)
      .then(response => {

        const formattedOptionsWards = response.data.map(option => ({
          value: option.id,
          label: option.name
        }));

        setWards(formattedOptionsWards);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}

      onSubmit={handleSubmit}
    >

      <Form className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700'>
        <div>
          <label htmlFor="fullname">Full Name :</label>
          <Field type="text" id="fullname" name="fullname" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="fullname" component="div" className="text-danger" />
        </div>
        <br></br>
        <div>
          <label htmlFor="username">User Name :</label>
          <Field type="string" id="username" name="username" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="username" component="div" className="text-danger" />
        </div>
        <br></br>

        <div>
          <label htmlFor="password">Passeword:</label>
          <Field type="string" id="password" name="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="password" component="div" className="text-danger" />
        </div>
        <br></br>

        <div>
          <label htmlFor="gender">Gender :</label>
          <Field as="select" id="gender" name="gender" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value="">Select</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
          </Field>
          <ErrorMessage name="gender" component="div" className="text-danger" />
        </div>
        <br></br>

        <div>
          <label htmlFor="dob">DOB</label>
          <Field type="date" name="dob" id="dob" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="dob" component="div" className="text-danger" />
        </div>
        <br></br>

        <div>
          <label htmlFor="phone_number">Phone :</label>
          <Field type="string" id="phone_number" name="phone_number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="phone_number" component="div" className="text-danger" />
        </div>
        <br></br>

        <div>
          <label htmlFor="email">Email :</label>
          <Field type="email($email)" id="email" name="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>
        <br></br>

        <div style={{ display: 'flex', alignItems: 'center' }}>

          <label htmlFor="province" style={{ marginRight: '25px' }}>Tỉnh/Thành phố</label>
          <Field
            name="province"
            component={Select}
            options={provinces}
            onChange={option => {
              // console.log('object',option)
              handleProvinceChange(option.value);
              // Reset giá trị huyện và phường khi tỉnh thay đổi
              setDistricts([]);
              setWards([]);
            }}
          />

          <label htmlFor="district" style={{ marginRight: '15px', marginLeft: '50px', textAlign: 'right' }}>Quận/Huyện</label>
          <Field
            name="district"
            component={Select}
            options={districts}
            onChange={option => {
              handleDistrictChange(option.value);
              // Reset giá trị phường khi huyện thay đổi
              setWards([]);
            }}
          // isDisabled={!initialData.province}
          />
          <label htmlFor="ward" style={{ marginRight: '15px', marginLeft: '50px', textAlign: 'right' }}>Phường/Xã</label>
          <Field
            name="ward"
            component={Select}
            options={wards}
          // isDisabled={!values.district}
          />
        </div>
        <br></br>

        <div>
          <label htmlFor="address">Address:</label>
          <Field
            type="text"
            id="address"
            name="address"
            className='bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="address" component="div" className="text-danger" />
        </div>

        <br></br>
        <br></br>
        <Button type="primary" htmlType="submit" className='bg-primary'>Thêm Mới</Button>

      </Form>
    </Formik>
  );
};

export default Add;

