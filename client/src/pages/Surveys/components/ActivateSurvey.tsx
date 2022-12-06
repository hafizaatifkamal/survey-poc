import React, { useState } from "react";
import { Modal, Typography } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { getSurveys, updateSurveyStatus } from "../surveysSlice";

type ActivateSurveyProps = {
  open: boolean;
  onClose: () => void;
  row: any;
};

const ActivateSurvey: React.FC<ActivateSurveyProps> = ({
  open,
  onClose,
  row,
}) => {
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const modifiedData = { _id: row?._id, active: true };

  const onFinish = async () => {
    setConfirmLoading(true);
    await dispatch(updateSurveyStatus(modifiedData));
    await dispatch(getSurveys(false));
    setConfirmLoading(false);
    onClose();
  };

  return (
    <Modal
      title={"Activate Survey"}
      width={600}
      visible={open}
      onCancel={onClose}
      okType="danger"
      okText="Yes, Activate"
      cancelText="No, Wait"
      onOk={onFinish}
      confirmLoading={confirmLoading}
    >
      <Typography.Text>
        Do you want to activate this survey? {row?.name} <br />
      </Typography.Text>
    </Modal>
  );
};

export default ActivateSurvey;
