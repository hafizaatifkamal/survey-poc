import React from "react";
import {
  Button,
  Card,
  message,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { CopyOutlined, MailFilled } from "@ant-design/icons";

const { Link, Text } = Typography;

type CopyLinkModalProps = {
  open: boolean;
  onClose: () => void;
  urlLink: string;
  shortUrlLink: string;
  name: string;
};

const CopyLinkModal: React.FC<CopyLinkModalProps> = ({
  open,
  onClose,
  shortUrlLink,
  name,
}) => {
  const onCopyFunction = (providedLink: string) => {
    navigator.clipboard.writeText(providedLink);
    message.success("link copied!");
  };

  return (
    <Modal
      title={`${name}`}
      width={600}
      visible={open}
      onCancel={onClose}
      footer={null}
    >
      <Card>
        <Row>
          <Text>
            Survey Link:{" "}
            <Link href={shortUrlLink} target="_blank">
              {shortUrlLink}
            </Link>{" "}
            <Tooltip title="copy">
              <Button
                icon={<CopyOutlined />}
                onClick={() => onCopyFunction(shortUrlLink)}
                shape="circle"
                size="small"
              />
            </Tooltip>
          </Text>
        </Row>
        <Space>
          <Text>Share : </Text>
          <Link
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${name}&body=Go+to+the+link+${shortUrlLink}`}
            target="_blank"
          >
            <Tooltip title="Share via mail">
              <Button icon={<MailFilled />} shape="circle" size="large" />
            </Tooltip>
          </Link>
        </Space>
      </Card>
    </Modal>
  );
};

export default CopyLinkModal;
