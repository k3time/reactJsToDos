import React, { Component } from "react";
import "./index.css";

export default class NotesApp extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      title: "",
      status: "",
      currentTab: "all",
      otherNotes: [],
      activeNotes: [],
      completedNotes: []
    };
  }

  render() {
    const { title, status } = this.state;
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input
            data-testid="input-note-name"
            type="text"
            className="large mx-8"
            placeholder="Note Title"
            value={title}
            onChange={this.onTitleInputChange}
          />
          <input
            data-testid="input-note-status"
            type="text"
            className="large mx-8"
            placeholder="Note Status"
            value={status}
            onChange={this.onStatusInputChange}
          />
          <button
            className=""
            data-testid="submit-button"
            // disabled={!title || !status}
            onClick={this.addNote}
          >
            Add Note
          </button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li
              className="tab-item slide-up-fade-in active"
              data-testid="allButton"
              onClick={this.showAllNotes}
            >
              All
            </li>
            <li
              className="tab-item slide-up-fade-in"
              data-testid="activeButton"
              onClick={this.showActiveNotes}
            >
              Active
            </li>
            <li
              className="tab-item slide-up-fade-in"
              data-testid="completedButton"
              onClick={this.showCompletedNotes}
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {this.getTodos().map(({ title, status }, index) => (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  onTitleInputChange = (e) => {
    const title = e.target.value;
    this.setState({ title });
  };

  onStatusInputChange = (e) => {
    const status = e.target.value;
    this.setState({ status });
  };

  showAllNotes = () => {
    const { activeNotes, completedNotes, otherNotes } = this.state;
    const allNotes = [...activeNotes, ...completedNotes, ...otherNotes];
    this.setState({ list: allNotes, currentTab: "all" });
  };

  showActiveNotes = () => {
    const { activeNotes } = this.state;
    this.setState({ list: activeNotes, currentTab: "active" });
  };

  showCompletedNotes = () => {
    const { completedNotes } = this.state;
    this.setState({ list: completedNotes, currentTab: "completed" });
  };

  addNote = () => {
    const {
      completedNotes,
      activeNotes,
      otherNotes,
      currentTab,
      status,
      title,
      list
    } = this.state;
    const note = {
      title,
      status
    };

    let active = [...activeNotes];
    let completed = [...completedNotes];
    let other = [...otherNotes];

    if (status.toLowerCase() === "active") {
      active.push(note);
      this.setState({ activeNotes: active });
    } else if (status.toLowerCase() === "completed") {
      completed.push(note);
      this.setState({ completedNotes: completed });
    } else {
      other.push(note);
      this.setState({ otherNotes: other });
    }

    this.setState({ title: "", status: "" });
  };

  getTodos = () => {
    const { currentTab, activeNotes, completedNotes, otherNotes } = this.state;
    if (currentTab === "all")
      return activeNotes.concat(completedNotes).concat(otherNotes);
    if (currentTab === "active") return activeNotes;
    if (currentTab === "completed") return completedNotes;
    return [];
  };
}
