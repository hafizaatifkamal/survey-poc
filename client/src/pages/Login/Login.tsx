import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Button, Card, Divider, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import VBLogo from "../../assets/vb_logo.svg";
import { ROUTES } from "../../utils/routes.enum";
import { ROLES, USER_KEY_CONSTANT } from "../../utils/constants";
import FormBuilder from "../../components/FormBuilder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAuth, loginAsync } from "./loginSlice";
import authContext from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticated } = useContext(authContext);
  const { status } = useAppSelector(selectAuth);
  const loading = status === "loading";

  const onRegisterClick = () => {
    navigate(`/register`);
  };

  const onSubmit = async (values: any) => {
    await dispatch(loginAsync(values)).then(() => {
      const userDetails = JSON.parse(
        String(localStorage.getItem(USER_KEY_CONSTANT))
      );
      if (userDetails) window.location.replace(ROUTES.SURVEYS);
    });
  };

  useEffect(() => {
    if (authenticated) {
      window.location.replace(ROUTES.SURVEYS);
    }
  }, [authenticated]);

  return (
    <Container>
      <LoginCard title="Login">
        <FormContainer>
          <FormBuilder
            name="Login"
            width={"100%"}
            btnLoading={loading}
            btnBlock={false}
            btnOffest={10}
            onFinish={onSubmit}
            submitButtonTitle="Login"
            formItems={[
              {
                initialValue: null,
                label: "Email",
                name: "email",
                rules: [{ required: true, type: "email" }],
                type: {
                  name: "input",
                  props: {
                    type: "email",
                    prefix: <MailOutlined />,
                  },
                },
              },
              {
                initialValue: null,
                label: "Password",
                name: "password",
                rules: [{ required: true }],
                type: {
                  name: "password",
                  props: {
                    type: "password",
                    prefix: <LockOutlined />,
                  },
                },
              },
            ]}
          />
          <Divider>OR</Divider>
          <Button onClick={onRegisterClick}>Create an Account</Button>
          <StyledFooter>
            Created by <img src={VBLogo} alt="Valuebound" width={30} />{" "}
            Valuebound
          </StyledFooter>
        </FormContainer>
      </LoginCard>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooter = styled(Typography.Text)`
  padding: 20px;
  padding-bottom: 0px;
  /* position: absolute;
  bottom: 10px; */
`;

const LoginCard = styled(Card)`
  width: 50%;
  max-width: 400px;
  background-color: transparent;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 5px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
