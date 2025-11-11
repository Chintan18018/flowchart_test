import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Workflow from "./components/workflow";
import WorkflowViewer from "./WorkflowViewer";

function App() {

  const nodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Submit Request" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Manager Approval" } },
  { id: "3", position: { x: -150, y: 200 }, data: { label: "Approve Request" } },
  { id: "4", position: { x: 150, y: 200 }, data: { label: "Reject Request" } },
  { id: "5", position: { x: -150, y: 300 }, data: { label: "HR Final Approval" } },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
];

  return (
    <>
      <div>Hiiii</div>
      {/* <Workflow /> */}
      <WorkflowViewer nodes={nodes} edges={edges} />
    </>
  );
}

export default App;
