import React from "react";
import { Outlet, Link } from "react-router-dom";
import Card from "../client/reactComponents/Card";
import AddNoteForm from "../client/reactComponents/AddNoteForm";

function Test() {
    return (
    <div>
      <Card />
      <AddNoteForm />
    </div>);
}

export default Test;