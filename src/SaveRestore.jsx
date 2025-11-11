import React, { useState, useCallback } from "react";
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

// Register custom node
const nodeTypes = {
  custom: CustomNode,
};

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const SaveRestore = () => {
  // ---------------------------
  // A) STATE
  // ---------------------------

  // initial nodes without handlers
  const initialNodes = [
    {
      id: "1",
      type: "custom",
      data: {
        label: "Node 1",
        subtitle: "Description of node 1",
      },
      position: { x: 0, y: -50 },
    },
    {
      id: "2",
      type: "custom",
      data: {
        label: "Node 2",
        subtitle: "Description of node 2",
      },
      position: { x: 0, y: 50 },
    },
  ];

  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const [editNodeId, setEditNodeId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");

  // ---------------------------
  // B) EDIT / DELETE handlers
  // ---------------------------

  const handleDelete = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    },
    [setNodes, setEdges]
  );

  const handleEdit = useCallback(
    (id) => {
      const node = nodes.find((n) => n.id === id);
      if (!node) return;

      // open edit panel with existing values
      setEditNodeId(id);
      setEditLabel(node.data.label);
      setEditSubtitle(node.data.subtitle);
      setShowInput(false); // hide add form if open
    },
    [nodes]
  );

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
    setEditLabel("");
    setEditSubtitle("");
  };

  const cancelEdit = () => {
    setEditNodeId(null);
    setEditLabel("");
    setEditSubtitle("");
  };

  // inject handlers into nodes
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onEdit: handleEdit,
          onDelete: handleDelete,
        },
      }))
    );
  }, []);

  // ---------------------------
  // C) ADD NODE FORM
  // ---------------------------

  const [newLabel, setNewLabel] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const onAdd = useCallback(() => {
    if (!newLabel.trim()) return;

    const newNode = {
      id: getNodeId(),
      type: "custom",
      data: {
        label: newLabel,
        subtitle: newSubtitle,
        onEdit: handleEdit,
        onDelete: handleDelete,
      },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setNewLabel("");
    setNewSubtitle("");
    setShowInput(false);
  }, [newLabel, newSubtitle, setNodes, handleEdit, handleDelete]);

  // ---------------------------
  // D) SAVE / RESTORE
  // ---------------------------

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const flow = JSON.parse(localStorage.getItem(flowKey));
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;

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
  }, [setNodes, setViewport, handleEdit, handleDelete]);

  // ---------------------------
  // E) RENDER UI
  // ---------------------------

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
      fitView
      fitViewOptions={{ padding: 2 }}
    >
      <Background />

      <Panel position="top-right">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>

        {!showInput && (
          <button onClick={() => setShowInput(true)}>add node</button>
        )}

        {showInput && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              background: "white",
              padding: "10px",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Enter node label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter subtitle"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
            />

            <button onClick={onAdd} disabled={!newLabel.trim()}>
              Save Node
            </button>

            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        )}

        {editNodeId && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              background: "white",
              padding: "10px",
              borderRadius: "6px",
              marginTop: "10px",
              width: "200px",
            }}
          >
            <strong>Edit Node</strong>

            <input
              type="text"
              placeholder="Title"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              style={{
                padding: "5px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <input
              type="text"
              placeholder="Subtitle"
              value={editSubtitle}
              onChange={(e) => setEditSubtitle(e.target.value)}
              style={{
                padding: "5px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <button className="xy-theme__button" onClick={saveEditedNode}>
              Update
            </button>

            <button className="xy-theme__button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </Panel>
    </ReactFlow>
  );
};

// Wrapper
export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
