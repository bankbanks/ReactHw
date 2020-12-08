import React, { Component } from "react";

class TodoList extends Component {
  
  render() {
    //console.log(this.props);
    console.log(this.selectedTodo);
    const styles = {
      todoList: {
        padding: "4px",
        border: "3px",
        color: "#adadad",
        background: "#fff",
        border: "solid 1px #e9e9e9",
        cursor: "pointer",
        boxshadow: "0px 0px 14px 0px rgba(0,0,0,0.1)",
        transition: "transform .2s ease",
      },
    };
    return (
      <ul style={styles.todoList}>
        {this.props.items.map((item) => {
          if (this.props.isEdit && this.props.selectedTodo === item.id) {
            return <input value={this.props.inputText} onChange={(e)=>this.props.setInputText(e.target.value)} type="text" />
                        ;
          } else {
            return (
              <li
                className={this.props.selectedTodo === item.id ? "ls1" : ""}
                onClick={() => {
                    if (!this.props.isEdit){
                        this.props.setInputText(item.text)
                        this.props.selectTodo(item.id)
                    }}}
                key={item.id}
              >
                {item.text}
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

export default TodoList;
