import React from 'react'

// src/components/Workflow/WorkflowNode.jsx
export default function WorkflowNode({ data }) {
  const {
    title,
    assignedTo,
    action,
    sla,
    extraLabel,
    onEdit,
    onDelete
  } = data;

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "10px",
        background: "white",
        border: "1px solid #dcdcdc",
        width: "240px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
        position: "relative",
        fontFamily: "Inter, sans-serif"
      }}
    >
      {/* Top-right action buttons */}
      <div style={{ position: "absolute", right: "6px", top: "6px", display: "flex", gap: "6px" }}>
        <button
          onClick={onEdit}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          ✏️
        </button>

        <button
          onClick={onDelete}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          🗑️
        </button>
      </div>

      {/* Title */}
      <div style={{ fontWeight: 600, marginBottom: "8px" }}>{title}</div>

      {/* Extra label */}
      {extraLabel && (
        <div style={{ marginBottom: "6px", fontSize: "13px", opacity: 0.7 }}>
          {extraLabel}
        </div>
      )}

      {/* Assigned To */}
      <div style={{ fontSize: "13px", opacity: 0.8 }}>
        Assigned to: <span style={{ color: "#e85a5a" }}>{assignedTo}</span>
      </div>

      {/* Action */}
      <div style={{ marginTop: "4px", fontSize: "12px", opacity: 0.7 }}>
        Action: {action}
      </div>

      {/* SLA */}
      <div style={{ marginTop: "4px", fontSize: "12px", opacity: 0.7 }}>
        SLA: {sla}
      </div>
    </div>
  );
}

