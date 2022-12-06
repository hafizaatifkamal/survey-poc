import React, { useEffect } from "react";
import {
  Card,
  Col,
  Collapse,
  List,
  Modal,
  PageHeader,
  Progress,
  Row,
  Statistic,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getSurveysDetails, selectSurveys } from "../surveysSlice";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  LikeOutlined,
} from "@ant-design/icons";

type SurveyDetailsProps = {
  open: boolean;
  onClose: () => void;
  row: any;
};

const { Panel } = Collapse;

const SurveyDetails: React.FC<SurveyDetailsProps> = ({
  open,
  onClose,
  row,
}) => {
  const dispatch = useAppDispatch();
  const { surveyWithStats, status } = useAppSelector(selectSurveys);
  const loading = status === "loading";

  useEffect(() => {
    dispatch(getSurveysDetails(row?._id));
  }, [dispatch, row?._id]);

  return (
    <Modal
      title="Survey Details"
      width={1200}
      style={{ top: 20 }}
      visible={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      <Card loading={loading}>
        <PageHeader
          title={row?.surveyName}
          extra={
            <Statistic
              title="Total Responses"
              style={{ textAlign: "right" }}
              valueStyle={{ color: "Highlight" }}
              value={surveyWithStats?.totalResponse}
              prefix={<LikeOutlined />}
            />
          }
        />
        {surveyWithStats?.totalCountData?.map((element: any, index: number) => {
          return (
            <Card key={index}>
              <Row>
                <Col span={20}>
                  <Typography.Title level={5}>
                    {index + 1}. {element?.que}
                  </Typography.Title>
                </Col>
                <Col span={4}>
                  <Statistic
                    // title="Responses"
                    valueStyle={{ color: "lightgreen" }}
                    value={element?.Count || 0}
                    style={{ textAlign: "right" }}
                    prefix={<CheckCircleOutlined type="success" />}
                  />
                </Col>
              </Row>
              {element?.type === "text" ? (
                <Collapse>
                  <Panel header="Answers" key="1">
                    <List
                      dataSource={surveyWithStats?.answerList}
                      renderItem={(item: any) =>
                        item?.que === element?.que && (
                          <List.Item>{item?.ans}</List.Item>
                        )
                      }
                    />
                  </Panel>
                </Collapse>
              ) : element?.type === "boolean" ? (
                <Row>
                  {surveyWithStats?.finalData?.map(
                    (option: any, index: number) => {
                      return (
                        option?.que === element?.que && (
                          <>
                            {option?.ans?.toString() === "true" ? (
                              <Col span={10} offset={1}>
                                <Statistic
                                  title={`${option?.ans?.toString()}`}
                                  valueStyle={{ color: "#3f8600" }}
                                  prefix={<ArrowUpOutlined />}
                                  value={
                                    Math.ceil(
                                      (option?.Count / element?.Count) * 100
                                    ) || 0
                                  }
                                  precision={2}
                                  suffix="%"
                                />
                              </Col>
                            ) : (
                              <Col span={10} offset={1}>
                                <Statistic
                                  title={`${option?.ans?.toString()}`}
                                  valueStyle={{ color: "#cf1322" }}
                                  prefix={<ArrowDownOutlined />}
                                  value={
                                    Math.ceil(
                                      (option?.Count / element?.Count) * 100
                                    ) || 0
                                  }
                                  precision={2}
                                  suffix="%"
                                />
                              </Col>
                            )}
                          </>
                        )
                      );
                    }
                  )}
                </Row>
              ) : (
                <Row>
                  {surveyWithStats?.finalData?.map(
                    (option: any, index: number) => {
                      return (
                        option?.que === element?.que && (
                          <>
                            <Col span={5} offset={1}>
                              <Typography.Title level={5}>
                                {option?.ans?.toString()}
                                {/* {typeof option?.Count === "number"
                                  ? option?.Count
                                  : "Responses count error"} */}
                              </Typography.Title>
                            </Col>

                            <Col span={15} offset={1}>
                              <Progress
                                percent={
                                  Math.ceil(
                                    (option?.Count / element?.Count) * 100
                                  ) || 0
                                }
                                size="small"
                                strokeColor={{
                                  from: "#108ee9",
                                  to: "#87d068",
                                }}
                              />
                            </Col>
                          </>
                        )
                      );
                    }
                  )}
                </Row>
              )}
            </Card>
          );
        })}
      </Card>
    </Modal>
  );
};

export default SurveyDetails;
