import React, { Component } from "react";
import "./App.css";

import TodoList from "./components/TodoList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      noteText: "",
      runningId: 1,
      selectedTodo: null,
      isEdit: false,
      inputText: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

selectTodo = (id)=>{
    this.setState({selectedTodo:id})
}
  
  setInputText =(text) => {
    this.setState({inputText:text})
  }

  handleChange(e) {
    this.setState({ noteText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.noteText.length) {
      return;
    }

    const newItem = {
      text: this.state.noteText,
      id: this.state.runningId,
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      noteText: "",
      runningId: prevState.runningId + 1,
    }));
  }

  handleDelete = (id) => {
    const newItems = this.state.items.filter((item) => {
      return item.id !== id;
    });
    this.setState({items:newItems})
  };

  handleEdit = () => {
    if(this.state.selectedTodo){

      this.setState({isEdit:true})
    }

  }

  handleDone = () => {
    let newTodo = [...this.state.items]
    const index = newTodo.findIndex((item)=>{
      return item.id === this.state.selectedTodo

    })
    newTodo[index].text= this.state.inputText
    
    
    this.setState({isEdit:false,
      selectedTodo:null,items:newTodo})

  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="header">React Todo Application</div>
          <TodoList items={this.state.items} 
                    selectedTodo={this.state.selectedTodo}
                    selectTodo={this.selectTodo}
                    setInputText={this.setInputText}
                    isEdit={this.state.isEdit}
                    inputText={this.state.inputText}
                    />

          <form>
            <input
              type="text"
              placeholder="What needs to be done? ..."
              ref={(input) => {
                this.textInput = input;
              }}
              className="textInput"
              value={this.state.noteText}
              onChange={this.handleChange}
            />
            <div className="btn" onClick={this.handleSubmit}>
              {" "}
              +{" "}
            </div>
            <div className="btn1" onClick={()=>this.handleDelete(this.state.selectedTodo)}>
              {" "}
              -{" "}
            </div>
            { this.state.isEdit && this.state.selectedTodo ?  <div className="btn2" onClick={this.handleDone}>
              {" "}
              Done
            </div>:

              <div className="btn2" onClick={this.handleEdit}>
              {" "}
              Edit
            </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default App;
