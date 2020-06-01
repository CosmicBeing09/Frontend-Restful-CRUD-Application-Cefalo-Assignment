import React from 'react';
import './InputField.css';

const InputField = (props) => (
  <div className="form">
    <input
      className="input"
      type="text"
      name="comment"
      placeholder="Write a comment..."
      value = {props.value}
      onChange = {props.onChange}
    />
    <button className="sendButton" onClick={props.onSubmit}>Comment</button>
  </div>
)

export default InputField;