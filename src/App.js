// App.js
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const exampleFiles = [
    {
      id: "folder1",
      title: "Example Folder",
      children: [
        { id: "file1", title: "Example File 1" },
        { id: "file2", title: "Example File 2" },
      ],
    },
    {
      id: "folder2",
      title: "Sample Folder",
      children: [
        {
          id: "subfolder1",
          title: "Folder",
          children: [
            { id: "file3", title: "Folder 123" },
            { id: "file4", title: "Example File 1" },
            { id: "file5", title: "Example File 2" },
          ],
        },
        { id: "file6", title: "Example File 321" },
      ],
    },
    { id: "file7", title: "Sample File" },
  ];

  const openFile = (fileId) => {
    if (!tabs.find((tab) => tab.id === fileId)) {
      const newTab = findFile(exampleFiles, fileId);
      if (newTab) {
        setTabs([...tabs, newTab]);
        setActiveTab(fileId);
      }
    } else {
      setActiveTab(fileId);
    }
  };

  const closeTab = (tabId) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    if (activeTab === tabId) {
      setActiveTab(updatedTabs[0]?.id || "");
    }
  };

  const findFile = (files, fileId) => {
    for (const file of files) {
      if (file.id === fileId) {
        return file;
      }
      if (file.children) {
        const foundFile = findFile(file.children, fileId);
        if (foundFile) {
          return foundFile;
        }
      }
    }
    return null;
  };

  const renderFiles = (files, level = 0) => {
    return files.map((file) => (
      <React.Fragment key={file.id}>
        {file.children ? (
          <>
            <div
              style={{ paddingLeft: `${level * 16}px` }}
              className="folder-title"
            >
              {file.title}
            </div>
            {renderFiles(file.children, level + 1)}
          </>
        ) : (
          <div
            style={{ paddingLeft: `${level * 16}px` }}
            className="file-title"
            onClick={() => openFile(file.id)}
          >
            {file.title}
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="app dark-theme">
      <nav className="navigation">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span>QuillShield</span>
        </div>
        <ul>
          <li className="active" style={{ color: "#007AFF" }}>
            AI Audit
          </li>
          <li>Manual Audit</li>
          <li>HotTeam</li>
          <li>Monitor</li>
          <li>Incident Response</li>
          <li style={{ paddingLeft: "20px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>{" "}
            </svg>
            Johnny Doe
          </li>
        </ul>
      </nav>
      <div className="path">
        <span>AI Audit &gt; My Projects &gt; Code Editor</span>
      </div>
      <header className="header">
        <h1>Sample Project</h1>
        <div>
          <button className="audit-button">Audit Now</button>
          <button className="options-button">Options</button>
        </div>
      </header>
      <div className="main-container">
        <div className="sidebar">
          <h3>Folders &amp; Files</h3>
          {renderFiles(exampleFiles)}
        </div>
        <div className="editor-wrapper">
          <div className="tab-container">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
              >
                <span onClick={() => setActiveTab(tab.id)}>{tab.title}</span>
                <span className="close-tab" onClick={() => closeTab(tab.id)}>
                  &times;
                </span>
              </div>
            ))}
          </div>
          <div className="editor-container">
            <Editor
              height="90vh"
              defaultLanguage="javascript"
              defaultValue="// some comment"
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
