import React from "react";
import styled from "styled-components";
import { Space, Spin } from "antd";

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Container>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
