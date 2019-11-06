import React from "react";
import FlipMove from "react-flip-move";

function TodoItems(props) {
  const deleteItem = key => {
    props.delete(key);
  };

  const createTasks = item => {
    return (
      <li onClick={() => deleteItem(item._id)} key={item.key}>
        {item.name}
      </li>
    );
  };

  var todoEntries = props.entries;
  var listItem = todoEntries.map(createTasks);

  return (
    <ul className="List">
      <FlipMove duration={250} easing="ease-out">
        {listItem}
      </FlipMove>
    </ul>
  );
}

export default TodoItems;
