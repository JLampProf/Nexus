import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState } from "react";
import { networkNodes } from "../data/networkData";
import NetworkNode from "./NetworkNode";

const NetworkConnections = () => {
  return (
    <group>
      {networkNodes.map((node) =>
        node.id !== "node-1" ? (
          <line key={node.id}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, ...node.position]), 3]}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#334155" transparent opacity={0.8} />
          </line>
        ) : null,
      )}
    </group>
  );
};

const SceneContents = ({ onSelect, selectedNode }) => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={30} />

      <Stars radius={60} depth={30} count={1000} factor={2} fade />

      <NetworkConnections />

      {networkNodes.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          selected={selectedNode?.id === node.id}
        />
      ))}
    </>
  );
};

const NetworkScene = ({ onSelect, selectedNode }) => {
  return (
    <div className="network-scene">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#080d18"]} />

        <SceneContents onSelect={onSelect} selectedNode={selectedNode} />

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
