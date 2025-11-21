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
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Edit/Delete Action Buttons */}
      <div
        style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          display: "flex",
          gap: "6px",
        }}
      >
        <button onClick={() => data.onEdit(id)} style={{ background: "none", border: "none" }}>
          ✏️
        </button>

        <button onClick={() => data.onDelete(id)} style={{ background: "none", border: "none" }}>
          🗑️
        </button>
      </div>

      {/* Title */}
      <div style={{ fontWeight: "600" }}>{data.label}</div>

      {/* Subtitle */}
      <div style={{ fontSize: "12px", opacity: 0.7 }}>{data.subtitle}</div>

      {/* TOP TARGET handle */}
      <Handle
        id="input"
        type="target"
        position={Position.Top}
        style={{
          width: 10,
          height: 10,
          background: "#888",
          borderRadius: "50%",
        }}
      />

      {/* BOTTOM SOURCE handle */}
      <Handle
        id="output"
        type="source"
        position={Position.Bottom}
        style={{
          width: 10,
          height: 10,
          background: "#888",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
