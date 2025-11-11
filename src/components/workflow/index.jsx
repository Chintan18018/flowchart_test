// src/components/Workflow/index.jsx
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

import WorkflowNode from "./WorkflowNode";
import { workflowNodes } from "./workflowNodes";
import { workflowEdges } from "./workflowEdges";

const nodeTypes = {
  workflowNode: WorkflowNode,
};

export default function Workflow() {
  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        background: "#fafafa",
        display: "flex",
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        border: "3px solid green" // debug
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <ReactFlow
          nodes={workflowNodes}
          edges={workflowEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 1 }}
        />
      </div>
    </div>
  );
}

