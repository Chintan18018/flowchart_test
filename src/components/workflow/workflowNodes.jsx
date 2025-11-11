import React from 'react'

// src/components/Workflow/workflowNodes.js
export const workflowNodes = [
  {
    id: "1",
    type: "workflowNode",
    position: { x: 50, y: 0 },
    data: {
      title: "Submit Request",
      extraLabel: "First Step",
      assignedTo: "Employee",
      action: "Submit Form",
      sla: "3 Days",

      onEdit: () => alert("Edit Step 1"),
      onDelete: () => alert("Delete Step 1"),
    }
  },
  {
    id: "2",
    type: "workflowNode",
    position: { x: 50, y: 150 },
    data: {
      title: "Manager Approval",
      extraLabel: "Review Stage",
      assignedTo: "Manager",
      action: "Approve/Reject",
      sla: "2 Days",

      onEdit: () => alert("Edit Step 2"),
      onDelete: () => alert("Delete Step 2"),
    }
  },
  {
    id: "3",
    type: "workflowNode",
    position: { x: -150, y: 300 },
    data: {
      title: "Approve Request",
      extraLabel: "",
      assignedTo: "Employee",
      action: "Submit for HR",
      sla: "1 Day",

      onEdit: () => alert("Edit Step 3"),
      onDelete: () => alert("Delete Step 3"),
    }
  },
  {
    id: "4",
    type: "workflowNode",
    position: { x: 250, y: 300 },
    data: {
      title: "Reject Request",
      extraLabel: "",
      assignedTo: "Employee",
      action: "Notify",
      sla: "Immediate",

      onEdit: () => alert("Edit Step 4"),
      onDelete: () => alert("Delete Step 4"),
    }
  }
];

