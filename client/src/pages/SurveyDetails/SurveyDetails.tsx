import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styled from "styled-components";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import {
  getSurveysDetails,
  selectSurveyDetails,
  postAnswers,
} from "./surveyDetailsSlice";

const { Option } = Select;

type SurveyDetailsProps = {};

const SurveyDetails: React.FC<SurveyDetailsProps> = () => {
  const dispatch = useAppDispatch();
  const { data, status, submitted, id } = useAppSelector(selectSurveyDetails);
  const loading = status === "loading";
  const params = useParams();
  const [form] = Form.useForm();

  const getFinalValue = (values: any) => {
    type tempObjType = {
      que: string;
      ans: any[];
      type: string;
    };
    let tempData: any = [];
    data?.questions?.forEach((question: any) => {
      let tempObj: tempObjType = {
        que: "",
        ans: [],
        type: "",
      };
      Object.keys(values).forEach((answers: any) => {
        if (question?.title === answers) {
          tempObj.que = question?.title;
          if (typeof values[answers] != "object") {
            tempObj.ans.push(values[answers]);
          } else tempObj.ans = values[answers];
          tempObj.type = question?.questionType;
        }
      });
      tempData.push(tempObj);
    });
    return tempData;
  };

  const onFinish = async (values: any) => {
    const submitData = { answers: getFinalValue(values) };
    console.log(submitData);
    await dispatch(postAnswers({ data: submitData, surveyID: id }));
    form.resetFields();
  };

  const GetFormItem = (props: any) => {
    const { questionData } = props;

    switch (questionData?.questionType) {
      case "mcq":
        return (
          <Form.Item
            label={questionData?.title}
            name={questionData?.title}
            // rules={[{ required: true, message: "Please input your answer!" }]}
          >
            <Select style={{ width: 200 }}>
              {questionData?.options?.map((option: any, index: number) => (
                <Option key={index} value={option?.optionText}>
                  {option?.optionText}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );

      case "Mmcq":
        return (
          <Form.Item
            label={questionData?.title}
            name={questionData?.title}
            // rules={[{ required: true, message: "Please input your answer!" }]}
          >
            <Checkbox.Group>
              {questionData?.options?.map((option: any, index: number) => (
                <Row>
                  <Col>
                    <Checkbox key={index} value={option?.optionText}>
                      {option?.optionText}
                    </Checkbox>
                  </Col>
                </Row>
              ))}
            </Checkbox.Group>

            {/* <Select style={{ width: 200 }}>
              {questionData?.options?.map((option: any, index: number) => (
                <Option key={index} value={option?.optionText}>
                  {option?.optionText}
                </Option>
              ))}
            </Select> */}
          </Form.Item>
        );

      case "boolean":
        return (
          <Form.Item
            label={questionData?.title}
            name={questionData?.title}
            // rules={[{ required: true, message: "Please input your answer!" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        );

      default:
        return (
          <Form.Item
            label={questionData?.title}
            name={questionData?.title}
            // rules={[{ required: true, message: "Please input your answer!" }]}
          >
            <Input placeholder="Enter your answer here" />
          </Form.Item>
        );
    }
  };

  useEffect(() => {
    dispatch(getSurveysDetails(params?.id));
  }, [dispatch, params]);

  console.log(data, "surveydata");

  return (
    <Container>
      {!submitted ? (
        <StyledCard
          title={
            loading ? (
              "Loading..."
            ) : data?.questions?.length > 0 ? (
              <Typography.Text style={{ fontSize: "25px" }}>{`${
                data?.surveyName || "Name not found"
              }`}</Typography.Text>
            ) : (
              "Not Found"
            )
          }
          loading={loading}
        >
          {!loading && data?.active && data?.questions?.length > 0 ? (
            <Form
              name="surveyQuestions"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              {data?.questions?.map((d: any, index: number) => {
                return <GetFormItem questionData={d} key={index} />;
              })}
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, Survey you visited does not exist."
            />
          )}
        </StyledCard>
      ) : (
        <Result
          status="success"
          title="Submitted"
          subTitle={`Your records have been submitted successfully! You can close the current tab`}
        />
      )}
    </Container>
  );
};

export default SurveyDetails;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #f0f2f5;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;
