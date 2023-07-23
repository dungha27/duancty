import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TrimInput from "../../../../components/Input/TrimInput";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/actions/auth";
import { toast } from "react-toastify";
const Login = () => {
  const { loading, userInfo, accessToken, error, success } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (userInfo && accessToken && success) {
      toast.success("Login Success!");
      Navigate("/user-management/users");
    }
  }, [error, success]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (values) => {
    dispatch(login(values));
  };
  const [loginForm] = Form.useForm();
  return (
    <section className="vh-100 d-flex ">
      <div className="container h-custom">
        <div className="row justify-content-evenly align-items-center h-100">
          <div className="col-7">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image"
            />
          </div>
          <div className="col">
            <Stack
              direction="vertical"
              gap={8}
              className="shadow-sm p-5 bg-white rounded"
            >
              <Typography
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                }}
              >
                Login
              </Typography>
              <Form
                name="basic"
                form={loginForm}
                initialValues={initialValues}
                onFinish={onSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please enter username!",
                    },
                  ]}
                >
                  <TrimInput>
                    <Input
                      style={{ padding: "10px" }}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                    />
                  </TrimInput>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Password!",
                    },
                  ]}
                >
                  <TrimInput>
                    <Input.Password
                      style={{ padding: "10px" }}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="********"
                    />
                  </TrimInput>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: loading ? "#91caff" : "#1677ff",
                    }}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button"
                    disabled={loading}
                    loading={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Stack>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
