import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function WorkflowViewer({ nodes, edges }) {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      />
    </div>
  );
}
