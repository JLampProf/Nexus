import { useState } from "react";
import NetworkScene from "./NetworkScene";
import { networkNodes } from "../data/networkData";

// Main dashboard component.
export default function Dashboard() {
  // Stores the currently selected node.
  // Starts as null because no node is selected initially.
  const [selectedNode, setSelectedNode] = useState(null);

  // Counts how many nodes have an online status.
  const onlineCount = networkNodes.filter(
    (node) => node.status === "online",
  ).length;

  // Counts how many nodes have a warning status.
  const warningCount = networkNodes.filter(
    (node) => node.status === "warning",
  ).length;

  // Adds together all node loads, divides by the number
  // of nodes, and rounds the result to the nearest integer.
  const averageLoad = Math.round(
    networkNodes.reduce((total, node) => total + node.load, 0) /
      networkNodes.length,
  );

  return (
    <main className="dashboard">
      {/* Top navigation bar containing the brand and demo status. */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">N</span>
          <div>
            <h1>NEXUS</h1>
            <p>Infrastructure Intelligence</p>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot" />
          DEMO ENVIRONMENT
        </div>
      </header>

      {/* Contains the main dashboard content. */}
      <section className="dashboard-content">
        {/* Page title and introductory text. */}
        <div className="page-heading">
          <div>
            <p className="eyebrow">OVERVIEW / NETWORK</p>
            <h2>Network Overview</h2>
            <p className="muted">Monitor your infrastructure at a glance.</p>
          </div>
        </div>

        {/* Displays summary statistics about the network. */}
        <section className="stats-grid">
          <article className="stat-card">
            <p>Total Nodes</p>
            <strong>{networkNodes.length}</strong>
            <span>Registered infrastructure</span>
          </article>

          <article className="stat-card">
            <p>Online Systems</p>
            <strong>{onlineCount}</strong>
            <span className="positive">Operational</span>
          </article>

          <article className="stat-card">
            <p>Warnings</p>
            <strong>{warningCount}</strong>
            <span className="warning-text">Needs attention</span>
          </article>

          <article className="stat-card">
            <p>Average Load</p>
            <strong>{averageLoad}%</strong>
            <span>Across all nodes</span>
          </article>
        </section>

        {/* Contains the interactive 3D network visualisation. */}
        <section className="network-panel">
          <div className="panel-heading">
            <div>
              <h3>Infrastructure Topology</h3>
              <p>Interactive 3D network visualisation</p>
            </div>
            <span className="live-badge">● SIMULATED DATA</span>
          </div>

          {/* Passes the selection handler and selected node to NetworkScene. */}
          <NetworkScene
            onSelect={setSelectedNode}
            selectedNode={selectedNode}
          />

          {/* Explains how to interact with the 3D scene. */}
          <p className="interaction-hint">
            Drag to rotate · Scroll to zoom · Click a node to inspect
          </p>
        </section>

        {/* Displays information about the selected node. */}
        <section className="details-panel">
          <h3>Node Details</h3>

          {/* Show node information if a node is selected. */}
          {selectedNode ? (
            <div className="node-details">
              <div>
                <p className="muted">Selected infrastructure</p>
                <h4>{selectedNode.name}</h4>
              </div>

              <div>
                <p className="muted">Status</p>
                <strong>{selectedNode.status}</strong>
              </div>

              <div>
                <p className="muted">Resource load</p>
                <strong>{selectedNode.load}%</strong>
              </div>

              <div>
                <p className="muted">Node type</p>
                <strong>{selectedNode.type}</strong>
              </div>
            </div>
          ) : (
            // Show this message when no node has been selected.
            <p className="muted">
              Select a node in the 3D scene to inspect its details.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
