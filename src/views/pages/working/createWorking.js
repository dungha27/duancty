import { Typography } from "antd";
import WorkingForm from "./components/workingForm";

const CreateWorking = () => {
  return (
    <div>
      <Typography.Title>Add Working List</Typography.Title>
      <WorkingForm type={"create"} onSave={() => {}} />
    </div>
  );
};

export default CreateWorking;
