import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Ministate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note,
      tag: "",
      tagging: false,
    };
  }

  closeModal = () => {
    this.setState({tagging: !this.state.tagging})
  }

  addTag = (id) => {
    this.state.note.tags.push(this.state.tag)
    axios
    .put(`https://killer-notes.herokuapp.com/note/edit/${id}`, {
      tags: this.state.note.tags
    })
    this.setState({tagging: false, tag:""})
   
  }

  deleteTag = (id, tagdelete) => {
    let tags = this.state.note.tags.filter(tag => {
        if (tag !== tagdelete){ 
        return tag}})
    axios
    .put(`https://killer-notes.herokuapp.com/note/edit/${id}`, {
      tags: tags
    })
    this.setState({[this.state.note.tags]: tags})
  }
  noteInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="note">
        <div className={this.state.tagging ? "tagModal" : "hide"}>
          New Tag
          <input name="tag" onChange={this.noteInput} />
          <button onClick={() => this.addTag(this.state.note._id)}>
            Add
          </button>
          <button onClick={this.closeModal}>Cancel</button>
        </div>
        <div className="tags">
          {this.state.note.tags.map(tag => (
            <div className="tag"><div className="tagx">{tag}<i onClick={()=> this.deleteTag(this.state.note._id, tag)}class="fas fa-times"></i></div>
            </div>
          ))}
          <div className="fas fa-plus-circle" onClick={this.closeModal}>
            {" "}
            Tag
          </div>
        </div>
        <Link className="notelink" to={`/notes/${this.state.note._id}`}>
          <div>
            <div className="note-contents">
              <p className="note-title">{this.state.note.title}</p>
              <p className="note-text">{this.state.note.textBody}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Ministate;