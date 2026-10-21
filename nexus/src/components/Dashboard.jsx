import { useState } from "react";
import NetworkScene from "./NetworkScene";
import { networkNodes } from "../data/networkData";

export default function Dashboard() {
  const [selectedNode, setSelectedNode] = useState(null);

  const onlineCount = networkNodes.filter(
    (node) => node.status === "online",
  ).length;

  const warningCount = networkNodes.filter(
    (node) => node.status === "warning",
  ).length;

  const averageLoad = Math.round(
    networkNodes.reduce((total, node) => total + node.load, 0) /
      networkNodes.length,
  );

  return (
    <main className="dashboard">
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

      <section className="dashboard-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">OVERVIEW / NETWORK</p>
            <h2>Network Overview</h2>
            <p className="muted">Monitor your infrastructure at a glance.</p>
          </div>
        </div>

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

        <section className="network-panel">
          <div className="panel-heading">
            <div>
              <h3>Infrastructure Topology</h3>
              <p>Interactive 3D network visualisation</p>
            </div>
            <span className="live-badge">● SIMULATED DATA</span>
          </div>

          <NetworkScene
            onSelect={setSelectedNode}
            selectedNode={selectedNode}
          />

          <p className="interaction-hint">
            Drag to rotate · Scroll to zoom · Click a node to inspect
          </p>
        </section>

        <section className="details-panel">
          <h3>Node Details</h3>

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
            <p className="muted">
              Select a node in the 3D scene to inspect its details.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
