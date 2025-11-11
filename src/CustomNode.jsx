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
        position: "relative"
      }}
    >
      {/* Edit/Delete top-right */}
      <div
        style={{
          position: "absolute",
          right: "6px",
          top: "6px",
          display: "flex",
          gap: "6px"
        }}
      >
        <button
          onClick={() => data.onEdit(id)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer"
          }}
        >
          ✏️
        </button>

        <button
          onClick={() => data.onDelete(id)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer"
          }}
        >
          🗑️
        </button>
      </div>

      {/* Title */}
      <div style={{ fontWeight: 600, fontSize: "14px" }}>{data.label}</div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: "4px",
          fontSize: "12px",
          opacity: 0.7
        }}
      >
        {data.subtitle}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
      />
    </div>
  );
}
