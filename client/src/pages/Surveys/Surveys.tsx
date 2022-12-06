import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  List,
  Menu,
  PageHeader,
  Select,
  Space,
  Typography,
} from "antd";
// import { currentUser, ROLES, type } from "../../utils/constants";
import "survey-core/modern.min.css";
import "antd/dist/antd.css";
import {
  ActivateSurvey,
  CompleteSurvey,
  CopyLinkModal,
  Loading,
  SurveyDetails,
  SurveyForm,
} from "./components";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSurveys, selectSurveys } from "./surveysSlice";
import { EyeFilled, MoreOutlined } from "@ant-design/icons";
import { currentUser, ROLES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Text, Link } = Typography;
type SurveysProps = {};

const Surveys: React.FC<SurveysProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, status } = useAppSelector(selectSurveys);
  const [surveyStatus, setSurveyStatus] = useState(true);
  const [createSurvey, setCreateSurvey] = useState<boolean>(false);
  const [surveyDetails, setSurveyDetails] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any>({});
  const [activateSurvey, setActivateSurvey] = useState<boolean>(false);
  const [completeSurvey, setCompleteSurvey] = useState<boolean>(false);
  const [copyLinkModal, setCopyLinkModal] = useState<boolean>(false);

  // const isAdmin = currentUser?.role === ROLES.ADMIN && currentUser?.isAdmin;
  const isAdmin = currentUser?.role === ROLES.ADMIN;

  const [form] = Form.useForm();

  const loading = status === "loading";

  const onCreateSurveys = () => setCreateSurvey(true);
  const onCloseSurveys = () => setCreateSurvey(false);

  const onClickSurveyDetails = (item: any) => {
    if (isAdmin) {
      setCurrentRow(item);
      setSurveyDetails(true);
    } else navigate(`/surveys/${item?._id}`);
  };

  const onSearch = () => {};
  const onCloseSurveyDetails = () => setSurveyDetails(false);
  const onCloseActivatedSurvey = () => setActivateSurvey(false);
  const onCloseCompleteSurvey = () => setCompleteSurvey(false);

  const onClickCopyLink = () => setCopyLinkModal(true);
  const onCloseCopyLink = () => setCopyLinkModal(false);

  let menuItems: any = [];

  if (surveyStatus) {
    menuItems = [
      {
        title: "Get Survey Link",
        icon: <EyeFilled />,
        onClick: (record: any) => () => {
          setCopyLinkModal(true);
          setCurrentRow(record);
        },
      },
      {
        title: "Complete",
        icon: <EyeFilled />,
        onClick: (record: any) => () => {
          setCompleteSurvey(true);
          setCurrentRow(record);
        },
      },
    ];
  } else {
    menuItems = [
      {
        title: "Activate",
        icon: <EyeFilled />,
        onClick: (record: any) => () => {
          setActivateSurvey(true);
          setCurrentRow(record);
        },
      },
    ];
  }

  let pageActions: any[] = [
    // <SearchInput
    //   placeholder="Type survey to search"
    //   onSearch={onSearch}
    //   allowClear
    //   enterButton
    // />,
  ];

  if (isAdmin) {
    pageActions = [
      ...pageActions,
      <StyledSpace>
        <Text>Status</Text>
        <Select
          value={surveyStatus}
          onChange={(value) => setSurveyStatus(value)}
          style={{ width: "125px" }}
        >
          <Select.Option value={true}>Active</Select.Option>
          <Select.Option value={false}>Completed</Select.Option>
        </Select>
      </StyledSpace>,
      <Button type="primary" onClick={onCreateSurveys}>
        Create Surveys
      </Button>,
    ];
  }

  const getDueDate = (dueDate: any) => {
    if (dueDate === undefined) {
      return "no date found!";
    } else {
      const due_date = moment(dueDate).format("YYYY-MM-DD");
      const current_date = moment().format("YYYY-MM-DD");
      const current_duration = moment(due_date).diff(
        moment(current_date),
        "days"
      );
      return current_duration + " days";
    }
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getSurveys(surveyStatus));
  }, [surveyStatus]);

  return (
    <>
      <Container>
        <PageHeader title="Surveys" extra={pageActions} />
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* ADMIN controls */}
            {isAdmin && (
              <StyledList
                // bordered
                size="large"
                itemLayout="horizontal"
                // loading={loading}
                dataSource={data}
                renderItem={(item: any) => (
                  <StyledCard bodyStyle={{ padding: 0 }}>
                    <List.Item
                      actions={[
                        <Link>
                          <Dropdown
                            overlay={
                              <Menu>
                                {menuItems.map((record: any) => (
                                  <Menu.Item
                                    key={record.title}
                                    onClick={record.onClick(item)}
                                  >
                                    {record.title}
                                  </Menu.Item>
                                ))}
                              </Menu>
                            }
                          >
                            <MoreIcon />
                          </Dropdown>
                        </Link>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Link
                            style={{ fontSize: "20px" }}
                            onClick={() => onClickSurveyDetails(item)}
                          >
                            {item?.surveyName}
                          </Link>
                        }
                        // description="Managed by HR Department, Valuebound"
                        description={`Deadline: ${getDueDate(item?.dueDate)}`}
                      />
                    </List.Item>
                  </StyledCard>
                )}
              />
            )}
          </>
        )}

        {createSurvey && (
          <SurveyForm open={createSurvey} onClose={onCloseSurveys} />
        )}
        {surveyDetails && (
          <SurveyDetails
            open={surveyDetails}
            onClose={onCloseSurveyDetails}
            row={currentRow}
          />
        )}
        {activateSurvey && (
          <ActivateSurvey
            open={activateSurvey}
            onClose={onCloseActivatedSurvey}
            row={currentRow}
          />
        )}
        {completeSurvey && (
          <CompleteSurvey
            open={completeSurvey}
            onClose={onCloseCompleteSurvey}
            row={currentRow}
          />
        )}
        {copyLinkModal && (
          <CopyLinkModal
            open={copyLinkModal}
            onClose={onCloseCopyLink}
            urlLink={currentRow?.longUrl}
            shortUrlLink={currentRow?.shortUrl}
            name={currentRow?.surveyName}
          />
        )}
      </Container>
    </>
  );
};

export default Surveys;

const Container = styled.div`
  width: 100%;
  padding: 30px;
`;

const StyledList = styled(List)`
  width: 100%;
`;

const StyledCard = styled(Card)`
  width: 100%;
  padding: 0px;
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

const MoreIcon = styled(MoreOutlined)`
  font-size: 25px;
`;

const SearchInput = styled(Input.Search)`
  width: 300px;
`;

const StyledSpace = styled(Space)`
  width: 100%;
  justify-content: flex-end;
`;
