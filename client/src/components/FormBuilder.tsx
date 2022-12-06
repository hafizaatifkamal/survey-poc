import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Checkbox,
  DatePicker,
  FormRule,
  ButtonProps,
  InputProps,
  DatePickerProps,
  InputNumberProps,
  SelectProps,
  CheckboxProps,
  SwitchProps,
} from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
// import { validateMessages } from "../utils/constants";

type SelectOption = {
  name: string;
  value: string;
};

type FormItem = {
  initialValue?: any;
  label?: string;
  name: string;
  rules?: [FormRule];
  hidden?: boolean;
  valuePropName?: string;
  type: {
    name:
      | "input"
      | "number"
      | "password"
      | "select"
      | "switch"
      | "textarea"
      | "checkbox"
      | "range"
      | "date";
    props:
      | InputProps
      | InputNumberProps
      | DatePickerProps
      | SelectProps
      | CheckboxProps
      | SwitchProps
      | { options: SelectOption[] };
  };
};

type FormBuilderProps = {
  name: string;
  width?: number | string;
  onFinish: (values: any) => void;
  onFinishFailed?: () => void;
  initialValues?: any;
  btnLoading?: boolean;
  btnOffest?: number;
  btnDisabled?: boolean;
  btnBlock?: boolean;
  btnProps?: ButtonProps;
  submitButtonTitle?: string;
  formItems: FormItem[];
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  name,
  btnDisabled = false,
  btnLoading = false,
  btnBlock = true,
  btnProps,
  btnOffest = 0,
  formItems = [],
  initialValues = {},
  onFinish,
  onFinishFailed = () => null,
  submitButtonTitle = "Submit",
  width,
}) => {
  const { Item } = Form;

  const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: btnOffest, span: 24 },
  };

  const renderFormItem = (type: string, props: any, label?: string) => {
    switch (type) {
      case "input":
        return <Input size="middle" {...props} />;

      case "number":
        return <Input size="middle" type="number" {...props} />;

      case "password":
        return (
          <Input.Password
            {...props}
            size="middle"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        );

      case "switch":
        return <Switch {...props} />;

      case "checkbox":
        return <Checkbox {...props}>{label}</Checkbox>;

      case "select":
        return (
          <Select {...props}>
            {props.options.map(({ name, value }: any) => (
              <Select.Option value={name}>{value}</Select.Option>
            ))}
          </Select>
        );
      case "textarea":
        return <Input.TextArea {...props} />;
      case "range":
        return <DatePicker.RangePicker {...props} style={{ width: "100%" }} />;
      default:
        break;
    }
  };

  return (
    <>
      <Form
        {...layout}
        name={name}
        layout="vertical"
        // validateMessages={validateMessages}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width }}
      >
        {formItems.map(({ initialValue, hidden, label, name, rules, type }) => (
          <>
            {type.name === "checkbox" ? (
              <Item
                key={label}
                initialValue={initialValue}
                label=""
                name={name}
                rules={rules}
                hidden={hidden}
                valuePropName="checked"
                style={{ marginBottom: 10 }}
              >
                {renderFormItem(type.name, type.props, label)}
              </Item>
            ) : (
              <Item
                key={label}
                initialValue={initialValue}
                label={label}
                name={name}
                rules={rules}
                hidden={hidden}
                style={{ marginBottom: 10 }}
              >
                {renderFormItem(type.name, type.props, label)}
              </Item>
            )}
          </>
        ))}
        <Item {...tailLayout}>
          <Button
            block={btnBlock}
            loading={btnLoading}
            disabled={btnDisabled}
            type="primary"
            htmlType="submit"
            size={btnProps?.size}
          >
            {submitButtonTitle}
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default FormBuilder;
