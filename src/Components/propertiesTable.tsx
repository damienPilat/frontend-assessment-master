import { Table } from "antd";
import { Button } from "./common/button";

export const PropertiesTable: React.FC<Properties> = ({
  properties,
}: Properties) => {
  return <Table dataSource={properties} columns={columns} />;
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Details",
    render: (_: unknown, record: unknown) => <Button path="details">View</Button>,
  },
  {
    title: "Policies",
    render: (_: unknown, record: unknown) => <Button path="policies">View</Button>
  }
];

interface Property {
  name: string;
  id: string;
}

interface Properties {
  properties: Property[];
}
