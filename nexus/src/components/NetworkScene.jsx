import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState } from "react";
import { networkNodes } from "../data/networkData";
import NetworkNode from "./NetworkNode";

// Creates lines connecting the network nodes.
const NetworkConnections = () => {
  return (
    <group>
      {/* Loop through every node and create a connection line. */}
      {networkNodes.map((node) =>
        // Skip the first node because it has no connection line.
        node.id !== "node-1" ? (
          <line key={node.id}>
            <bufferGeometry>
              <bufferAttribute
                // Defines the start and end points of the line.
                // Starts at [0, 0, 0] and ends at the node's position.
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, ...node.position]), 3]}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>

            {/* Sets the line's colour and transparency. */}
            <lineBasicMaterial color="#334155" transparent opacity={0.8} />
          </line>
        ) : null,
      )}
    </group>
  );
};

// Holds the objects that appear inside the 3D scene.
const SceneContents = ({ onSelect, selectedNode }) => {
  return (
    <>
      {/* Provides general lighting throughout the scene. */}
      <ambientLight intensity={0.7} />

      {/* Adds a point light from a specific position. */}
      <pointLight position={[5, 5, 5]} intensity={30} />

      {/* Adds stars to create a space-like background. */}
      <Stars radius={60} depth={30} count={1000} factor={2} fade />

      {/* Renders the lines connecting the nodes. */}
      <NetworkConnections />

      {/* Creates a NetworkNode component for every node in the data. */}
      {networkNodes.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          // Marks the node as selected if its ID matches selectedNode.
          selected={selectedNode?.id === node.id}
        />
      ))}
    </>
  );
};

// Creates the canvas and sets up the camera and scene controls.
const NetworkScene = ({ onSelect, selectedNode }) => {
  return (
    <div className="network-scene">
      {/* Creates the area where the 3D scene is rendered. */}
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Sets the scene's background colour. */}
        <color attach="background" args={["#080d18"]} />

        {/* Adds the lights, stars, connections and network nodes. */}
        <SceneContents onSelect={onSelect} selectedNode={selectedNode} />

        {/* Allows the user to rotate and zoom around the scene. */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={16}
          minPolarAngle={0.4}
          maxPolarAngle={Math.PI - 0.4}
        />
      </Canvas>
    </div>
  );
};

export default NetworkScene;
