// src/CustomNode.jsx
import { Handle, Position } from "@xyflow/react";

export default function CustomNode({ id, data }) {
  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "10px",
        background: "white",
        border: "1px solid #dcdcdc",
        width: "220px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      {/* Edit/Delete Buttons */}
      <div
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          display: "flex",
          gap: 6,
        }}
      >
        <button onClick={() => data.onEdit(id)} style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",       // <-- smaller icon
            padding: "2px",
            opacity: 0.8,
          }}>✏️</button>
        <button onClick={() => data.onDelete(id)} style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",        // <-- smaller icon
            padding: "2px",
            opacity: 0.8,
          }}>🗑️</button>
      </div>

      {/* Title */}
      <div style={{ fontWeight: 600 }}>{data.label}</div>

      {/* Subtitle */}
      <div style={{ fontSize: "12px", opacity: 0.7 }}>{data.subtitle}</div>

      {/* TOP = INPUT */}
      <Handle type="target" position={Position.Top} />

      {/* BOTTOM = OUTPUT */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
