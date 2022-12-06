import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";
import { Layout, Menu, Row } from "antd";
import styled from "styled-components";
import { ROUTES } from "../utils/routes.enum";
import SurveyAnimatedPage from "./SurveyAnimatedPage";
import Navbar from "./Navbar";

type SurveyAppSkeletonProps = {};

const { Sider, Content, Footer } = Layout;

const SurveyAppSkeleton: React.FC<SurveyAppSkeletonProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const logoUrl = "https://www.valuebound.com/themes/custom/vb360/logo.svg";
  const logoUrl =
    "https://media-exp1.licdn.com/dms/image/C4E0BAQFXurrY90D9HA/company-logo_200_200/0/1519871469430?e=2147483647&v=beta&t=OJMXPWLP65ydXZi7iqnRAlwODRhWyRCBBffYZWD2YUA";
  let sideMenu: any[] = [];

  // conditions to followed later on
  sideMenu = [
    ...sideMenu,
    { title: "Surveys", route: ROUTES.SURVEYS, icon: <BarChartOutlined /> },
  ];

  const currentMenuItem = () => {
    if (location.pathname === "/") {
      return [sideMenu[0]?.title];
    }
    const path = location.pathname.substring(1, location.pathname.length);
    return [sideMenu.filter((menu) => menu.route === path)[0]?.title];
  };

  const handleNavigate = (route: string) => () => navigate(route);

  return (
    <Layout style={{ margin: 0 }}>
      <Sider collapsible breakpoint="lg">
        <LogoArea>
          <Logo src={logoUrl} onClick={handleNavigate(ROUTES.SURVEYS)} />
        </LogoArea>
        <Menu theme="dark" defaultSelectedKeys={currentMenuItem()}>
          {sideMenu.map((item) => (
            <Menu.Item
              key={item.title}
              icon={item.icon}
              onClick={handleNavigate(item.route)}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ position: "relative", minWidth: "250px" }}>
        <Navbar />
        <StyledContent>
          <SurveyAnimatedPage>
            <Outlet />
          </SurveyAnimatedPage>
        </StyledContent>
        <Footer>
          <Row justify="center">
            <b>Copyrights @2022. Valuebound. All rights reserved</b>
          </Row>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SurveyAppSkeleton;

const StyledContent = styled(Content)`
  margin: 0;
  min-height: 100vh;
`;

const LogoArea = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 15px;
  background-color: #ee6c4d;
  cursor: pointer;
`;
