import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import View from "./View";
import Edit from "./Edit";

import "./item.css";

const NOTES_QUERY = gql`
  query {
    notes {
      _id
      title
      detail
    }
  }
`;

const NOTES_MUTATION = gql`
  mutation Note(
    $title: String!
    $detail: String!
    $created_at: String!
    $updated_at: String!
  ) {
    createNote(
      title: $title
      detail: $detail
      created_at: $created_at
      updated_at: $updated_at
    ) {
      title
      detail
    }
  }
`;

const stringDate = new Date();
const newDate = stringDate.toISOString();

const Create = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [created_at, setCreated_at] = useState(newDate);
  const [updated_at, setUpdated_at] = useState(newDate);
  const [dialog, setDialog] = useState(false);
  const [button, setButton] = useState(true);

  function show() {
    setDialog(true);
    setButton(false);
  }

  function hide() {
    setTitle("");
    setDetail("");
    setCreated_at("");
    setUpdated_at("");
    setDialog(false);
    setButton(true);
  }

  const [addNote] = useMutation(NOTES_MUTATION, {
    refetchQueries: [
      {
        query: NOTES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });
  return (
    <>
      {button && (
      <div className="addbtn text-right">
      <span onClick={show} className="fa-stack fa-lg ">
        <i className="fas fa-circle fa-stack-2x"></i>
        <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
      </span>
    </div>
      )}



      {dialog && (
        <div className="backdrop">
          <div className=" inner">
            <div className="text-right mt-1">
              <>
                <input
                  type="text"
                  className="input-control"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  value={title}
                />

                <textarea
                  type="text"
                  className="input-control"
                  onChange={(e) => setDetail(e.target.value)}
                  value={detail}
                  placeholder="Detail"
                  required
                />

                <div className="mt-3">
                  <button
                    className="btn  btn-outline-danger btn-sm mr-2"
                    onClick={hide}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      addNote({
                        variables: { title, detail, created_at, updated_at },
                      });

                      hide();
                    }}
                  >
                    Add Post
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}

      <div>
        <Edit />
      </div>
    </>
  );
};

export default Create;
