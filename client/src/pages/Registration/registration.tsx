import styled from "styled-components";
import { Card, Typography } from "antd";
import FormBuilder from "../../components/FormBuilder";
import { registerUser } from "./registrationSlice";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { userRegister } from "./registrationSlice";
import { ROUTES } from "../../utils/routes.enum";
import { useContext, useEffect } from "react";
import authContext from "../../utils/AuthContext";

import VBLogo from "../../assets/vb_logo.svg";

const Registration: React.FC = () => {
  const { status } = useAppSelector(registerUser);
  const { authenticated } = useContext(authContext);
  const loading = status === "loading";
  const dispatch = useAppDispatch();
  const onSubmit = async (values: any) => {
    await dispatch(userRegister(values));
    window.location.replace(ROUTES.LOGIN);
  };
  console.log(authenticated);
  useEffect(() => {
    if (authenticated) {
      window.location.replace(ROUTES.SURVEYS);
    }
  }, [authenticated]);

  return (
    <>
      <Container>
        <RegisterCard title="Register">
          <FormBuilder
            name="Login"
            width={"100%"}
            btnLoading={loading}
            btnBlock={false}
            onFinish={onSubmit}
            submitButtonTitle="Register"
            formItems={[
              {
                initialValue: null,
                label: "firstName",
                name: "firstName",
                rules: [{ required: true }],
                type: {
                  name: "input",
                  props: {
                    type: "input",
                    prefix: <UserOutlined />,
                  },
                },
              },
              {
                initialValue: null,
                label: "surname",
                name: "surname",
                rules: [{ required: true }],
                type: {
                  name: "input",
                  props: {
                    type: "input",
                    prefix: <UserOutlined />,
                  },
                },
              },
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
        </RegisterCard>
        <StyledFooter>
          Created by <img src={VBLogo} alt="Valuebound" width={30} />
          Valuebound
        </StyledFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooter = styled(Typography.Text)`
  padding: 20px;
  position: absolute;
  bottom: 10px;
`;

const RegisterCard = styled(Card)`
  width: 50%;
  max-width: 400px;
`;

export default Registration;
