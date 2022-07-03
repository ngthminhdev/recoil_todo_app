import { Button, Col, Input, Row, Select, Tag } from "antd";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addTodo, statusFilterList } from "../../recoil/todoListState";
import Todo from "../Todo";

export default function TodoList() {
  const filterList = useRecoilValue(statusFilterList);
  const addNewTodo = useSetRecoilState(addTodo);

  const [priority, setPriority] = useState("Medium");
  const [todoName, setTodoName] = useState("");

  let id = 5;
  function getId() {
    return id++;
  }

  const handleAddTodo = () => {
    const newTodo = {
      name: todoName,
      priority: priority,
      completed: false,
      id: getId(),
    };
    addNewTodo(newTodo);
    setTodoName("");
    setPriority("Medium");
  };

  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col
        className="mt-4"
        span={24}
        style={{ height: "calc(100% - 40px)", overflowY: "auto" }}
      >
        {filterList.map((todo, index) => {
          return (
            <div key={index}>
              <Todo
                name={todo.name}
                priority={todo.priority}
                completed={todo.completed}
                id={todo.id}
              />
            </div>
          );
        })}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleTodoNameChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
