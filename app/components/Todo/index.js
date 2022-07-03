import { Checkbox, Row, Tag } from "antd";
import { useSetRecoilState } from "recoil";
import { toggleTodoStatus } from "../../recoil/todoListState";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ name, priority, completed, id }) {
  const toggleStatus = useSetRecoilState(toggleTodoStatus);

  const toggleCheckbox = () => {
    toggleStatus(id);
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(completed ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={completed} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
}
