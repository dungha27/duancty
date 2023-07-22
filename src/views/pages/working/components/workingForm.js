import { Calendar, Form, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/actions/users";
import { PAGE_DEFAULT } from "../../../../constants";
import { getWorkingDays } from "../../../../redux/actions/workingDay";
import moment from "moment";

const WorkingForm = ({ type, onSave }) => {
  const [formWorking] = Form.useForm();
  const { users } = useSelector((state) => state.users);
  const { workingday } = useSelector((state) => state.workingDay);
  const dispatch = useDispatch();
  const initialValues = {
    userIds: [],
    workingDayId: null,
    shift: null,
  };
  const selectUsers =
    users?.length > 0 &&
    users.map((user) => {
      return {
        label: user.fullname,
        value: user.id,
      };
    });
  const selectWorkingDays =
    workingday?.length > 0 &&
    workingday.map((day) => {
      return {
        label: moment(day.date).format("dddd - DD/MM/yyyy"),
        value: day.id,
      };
    });
  useEffect(() => {
    dispatch(getUsers({ ...PAGE_DEFAULT, search: "" }));
    dispatch(getWorkingDays({}));
  }, [dispatch]);
  const disabledDate = (currentDate) => {
    return !currentDate && workingday.map(date => moment(date.date) !== moment(currentDate));
  }
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ flex: 1, padding: "10px" }}>
        <Form
          form={formWorking}
          initialValues={initialValues}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            name="userIds"
            rules={[
              {
                required: true,
                message: "Employee is required",
              },
            ]}
          >
            <Select
              mode="multiple"
              size={users?.length}
              placeholder="Select Employee"
              options={selectUsers}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="workingDayId"
            rules={[
              {
                required: true,
                message: "Working Day is required",
              },
            ]}
          >
            <Select
              placeholder="Select Working Day"
              options={selectWorkingDays}
              allowClear
            />
          </Form.Item>
        </Form>
      </div>
      <div style={{ flex: 1 }}>
        <Calendar disabledDate={disabledDate} />
      </div>
    </div>
  );
};

export default WorkingForm;
