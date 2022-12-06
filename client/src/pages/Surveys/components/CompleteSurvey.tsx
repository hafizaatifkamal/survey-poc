import React, { useState } from "react";
import { Card, Modal, Typography } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { getSurveys, updateSurveyStatus } from "../surveysSlice";

type CompleteSurveyProps = {
  open: boolean;
  onClose: () => void;
  row: any;
};

const CompleteSurvey: React.FC<CompleteSurveyProps> = ({
  open,
  onClose,
  row,
}) => {
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const modifiedData = { _id: row?._id, active: false };

  const onFinish = async () => {
    setConfirmLoading(true);
    await dispatch(updateSurveyStatus(modifiedData));
    await dispatch(getSurveys(true));
    setConfirmLoading(false);
    onClose();
  };

  return (
    <Modal
      title={"Complete this Survey"}
      width={600}
      visible={open}
      onCancel={onClose}
      okType="primary"
      okText="Yes, Complete it"
      cancelText="No, Wait"
      onOk={onFinish}
      confirmLoading={confirmLoading}
    >
      <Card>
        <Typography.Text>
          Do you want to complete this survey? {row?.surveyName} <br />
        </Typography.Text>
      </Card>
    </Modal>
  );
};

export default CompleteSurvey;
