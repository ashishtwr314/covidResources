import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Message,
  TextArea,
} from "semantic-ui-react";
import shortid from "shortid";
import { firebaseApp } from "./firebase";
import firebase from "firebase";

function PostResources({ setShowSidebar }) {
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (name && loc && contact && message) {
      setErr(false);
      setLoading(true);
      firebaseApp
        .database()
        .ref(`myData/${shortid.generate()}`)
        .set(
          {
            name,
            loc,
            contact,
            message,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          },
          (err) => {
            if (err) {
              setErr(true);
              setLoading(false);
            } else {
              setSuccess(true);
              setName("");
              setLoc("");
              setContact("");
              setMessage("");
              setLoading(false);
              setTimeout(() => {
                setErr(false);
                setSuccess(false);
              }, 2000);
            }
          }
        );
    } else {
      setErr(true);
    }
  };

  return (
    <div className="formpage-flex">
      <div className="form">
        {err ? (
          <Message className="message" color="red" error>
            <Message.Header>Error</Message.Header>
            <p>Please fill in all the fields</p>
          </Message>
        ) : success ? (
          <Message className="message" color="green">
            <Message.Header>Your post has been added !</Message.Header>
            <p>Thank you for your post, This could helps lives!!</p>
          </Message>
        ) : loading ? (
          <Message className="message">
            <Message.Header>Hold On Adding Yout Post!</Message.Header>
          </Message>
        ) : (
          <Message className="message">
            <Message.Header>Thank You!</Message.Header>
            <p>
              You are doing a great job! Cheers to you, please fill in the below
              form, to help the community
            </p>
          </Message>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              required
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder="Location"
            />
          </Form.Field>
          <Form.Field>
            <label>Contact Number</label>
            <input
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Phone Number"
            />
          </Form.Field>
          <Form.Field>
            <label>Tell us what services/products do you provide</label>
            <TextArea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more"
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
      <div className="sidebar-toggle" onClick={() => setShowSidebar(true)}>
        <Icon name="sidebar" size="big" />
      </div>
    </div>
  );
}

export default PostResources;
