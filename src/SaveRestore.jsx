// src/SaveRestore.jsx
import React, { useState, useCallback, useEffect } from "react";
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode";

const nodeTypes = { custom: CustomNode };
const flowKey = "example-flow";
const getNodeId = () => `node_${Date.now()}`;

const SaveRestore = ({ nodes: initialNodesProp, edges: initialEdgesProp }) => {
  /** Convert incoming nodes to custom nodes */
  const formattedNodes = initialNodesProp.map((n) => ({
    ...n,
    type: "custom",
    data: { ...n.data, subtitle: n.data.subtitle || "" },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(formattedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesProp);

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const [editNodeId, setEditNodeId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");

  const [newLabel, setNewLabel] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  /** DELETE NODE */
  const handleDelete = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    },
    [setNodes, setEdges]
  );

  /** EDIT NODE */
  const handleEdit = useCallback(
    (id) => {
      const node = nodes.find((n) => n.id === id);
      if (!node) return;

      setEditNodeId(id);
      setEditLabel(node.data.label);
      setEditSubtitle(node.data.subtitle);
      setShowInput(false);
    },
    [nodes]
  );

  /** SAVE EDIT */
  const saveEditedNode = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === editNodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label: editLabel,
                subtitle: editSubtitle,
                onEdit: handleEdit,
                onDelete: handleDelete,
              },
            }
          : node
      )
    );

    setEditNodeId(null);
  };

  /** CANCEL EDIT */
  const cancelEdit = () => {
    setEditNodeId(null);
    setEditLabel("");
    setEditSubtitle("");
  };

  /** ADD NODE */
  const onAdd = () => {
    if (!newLabel.trim()) return;

    const newId = getNodeId();
    const newNode = {
      id: newId,
      type: "custom",
      data: {
        label: newLabel,
        subtitle: newSubtitle,
        onEdit: handleEdit,
        onDelete: handleDelete,
      },
      position: { x: 0, y: nodes.length * 120 },
    };

    setNodes((nds) => nds.concat(newNode));

    // Auto-connect to last node
    if (nodes.length > 0) {
      const last = nodes[nodes.length - 1];
      setEdges((eds) =>
        eds.concat({
          id: `e${last.id}-${newId}`,
          source: last.id,
          target: newId,
        })
      );
    }

    setNewLabel("");
    setNewSubtitle("");
    setShowInput(false);
  };

  /** SAVE FLOW */
  const onSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  };

  /** RESTORE FLOW */
  const onRestore = () => {
    const flow = JSON.parse(localStorage.getItem(flowKey));
    if (flow) {
      const { x, y, zoom } = flow.viewport;

      setNodes(
        flow.nodes.map((n) => ({
          ...n,
          data: {
            ...n.data,
            onEdit: handleEdit,
            onDelete: handleDelete,
          },
        }))
      );

      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  };

  /** Inject edit/delete handlers once (NO infinite loop) */
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        type: "custom",
        data: {
          ...node.data,
          onEdit: handleEdit,
          onDelete: handleDelete,
        },
      }))
    );
  }, []);

  /** UI Rendering */
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
      fitView
    >
      <Background />

      <Panel position="top-right">
        <button onClick={onSave}>Save</button>
        <button onClick={onRestore}>Restore</button>

        {!showInput && <button onClick={() => setShowInput(true)}>Add</button>}

        {showInput && (
          <div style={{ padding: "10px", background: "white" }}>
            <input
              placeholder="Label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />

            <input
              placeholder="Subtitle"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
            />

            <button onClick={onAdd}>Save</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        )}

        {editNodeId && (
          <div style={{ padding: "10px", background: "white" }}>
            <strong>Edit Node</strong>

            <input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
            />
            <input
              value={editSubtitle}
              onChange={(e) => setEditSubtitle(e.target.value)}
            />

            <button onClick={saveEditedNode}>Update</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </Panel>
    </ReactFlow>
  );
};

export default (props) => (
  <ReactFlowProvider>
    <SaveRestore {...props} />
  </ReactFlowProvider>
);
