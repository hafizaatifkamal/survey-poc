import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { questionTypeOptions } from "../../../utils/constants";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { createSurveys, getSurveys } from "../surveysSlice";
import styled from "styled-components";

type SurveyFromProps = {
  open: boolean;
  onClose: () => void;
};

const { Item, List } = Form;

const SurveyFrom: React.FC<SurveyFromProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    try {
      await dispatch(createSurveys(values));
      console.log(values);

      await dispatch(getSurveys(true));
      onClose();
      setConfirmLoading(false);
    } catch (error) {
      console.log("Error creating Surveys", error);
    }
  };

  const QuestionField = ({ field, i, remove }: any) => {
    const fieldType = Form.useWatch(
      ["questions", field.name, "questionType"],
      form
    );

    const renderFieldType = (type: string) => {
      switch (type) {
        case "boolean":
          return null;
        // return (
        //   <Row gutter={[8, 8]} align="middle">
        //     <Col span={12}>
        //       <Item label="Yes Answer" name={[field.name, "yesAnswer"]}>
        //         <Input />
        //       </Item>
        //     </Col>
        //     <Col span={12}>
        //       <Item label="No Answer" name={[field.name, "noAnswer"]}>
        //         <Input />
        //       </Item>
        //     </Col>
        //   </Row>
        // );

        case "mcq":
          return (
            <List
              name={[field.name, "options"]}
              initialValue={[{ optionText: "" }]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((nestedField, i) => (
                    <Row key={nestedField.key} gutter={[8, 8]}>
                      <Col span={8}>
                        <Item
                          name={[nestedField.name, "optionText"]}
                          rules={[
                            {
                              required: true,
                              message: "You must provide an option!",
                            },
                          ]}
                        >
                          <Input placeholder={`Option ${i + 1}`} />
                        </Item>
                      </Col>
                      <Col span={1}>
                        <StyledMinusIcon
                          onClick={() => remove(nestedField.name)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Item>
                    <Button type="link" onClick={() => add()}>
                      + Add Option
                    </Button>
                  </Item>
                </>
              )}
            </List>
          );

        case "text":
          return null;

        case "Mmcq":
          return (
            <List
              name={[field.name, "options"]}
              initialValue={[{ optionText: "" }]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((nestedField, i) => (
                    <Row key={nestedField.key} gutter={[8, 8]}>
                      <Col span={10}>
                        <Item
                          name={[nestedField.name, "optionText"]}
                          rules={[
                            {
                              required: true,
                              message: "You must provide an option!",
                            },
                          ]}
                        >
                          <Input placeholder={`Option ${i + 1}`} />
                        </Item>
                      </Col>
                      <Col span={1}>
                        <StyledMinusIcon
                          onClick={() => remove(nestedField.name)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Item>
                    <Button type="link" onClick={() => add()}>
                      <PlusCircleOutlined /> Add an option
                    </Button>
                  </Item>
                </>
              )}
            </List>
          );

        default:
          return null;
      }
    };

    return (
      <>
        <Row key={field.key} gutter={[8, 8]} align="middle">
          <Col span={20}>
            <Item
              {...field}
              name={[field.name, "title"]}
              label={`Question ${i + 1}`}
              rules={[
                { required: true, message: "Question title is mandatory!" },
              ]}
            >
              <Input placeholder="Example: What is your name?" />
            </Item>
          </Col>
          <Col span={3}>
            <Item
              {...field}
              label="Question Type"
              initialValue={questionTypeOptions[0].value}
              name={[field.name, "questionType"]}
            >
              <Select>
                {questionTypeOptions.map(({ label, value }) => (
                  <Select.Option value={value}>{label}</Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={1}>
            <StyledMinusIcon onClick={() => remove(field.name)} />
          </Col>
        </Row>
        <Row style={{ paddingLeft: 20 }}>
          <Col span={24}>{renderFieldType(fieldType)}</Col>
        </Row>
      </>
    );
  };

  return (
    <Modal
      title="Create a Survey"
      width={1200}
      style={{ top: 20 }}
      visible={open}
      onOk={form.submit}
      okText="Create Survey"
      okButtonProps={{ loading: confirmLoading }}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        wrapperCol={{ span: 25 }}
        // initialValues={{ surveyName: null, questions: [] }}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[8, 8]} align="middle">
          <Col span={20}>
            <Item
              label="Survey Title"
              initialValue={null}
              name="surveyName"
              rules={[
                { required: true, message: "Survet title must be provided!" },
              ]}
            >
              <Input placeholder="Example: Employee survey" />
            </Item>
          </Col>
          <Col span={4}>
            <Item
              label="Due Date"
              name="dueDate"
              tooltip="Optional"
              rules={[{ required: false, message: "Optional!" }]}
            >
              <DatePicker />
            </Item>
          </Col>
        </Row>

        <List name="questions" initialValue={[]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <QuestionField field={field} i={i} remove={remove} />
              ))}
              <Item>
                <Button type="link" onClick={() => add()}>
                  + Add next question
                </Button>
              </Item>
            </>
          )}
        </List>
      </Form>
    </Modal>
  );
};
export default SurveyFrom;

const StyledMinusIcon = styled(MinusCircleOutlined)`
  margin-left: 10px;
`;
