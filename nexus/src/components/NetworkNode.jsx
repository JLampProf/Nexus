import { useState } from "react";

// Represents a single node in the 3D network.
const NetworkNode = ({ node, onSelect, selected }) => {
  // Tracks whether the node is being hovered over.
  const [hovered, setHovered] = useState(false);

  // Warning nodes are orange; all other nodes are blue.
  const color = node.status === "warning" ? "#f59e0b" : "#38bdf8";

  return (
    <mesh
      // Places the node at its position from the data.
      position={node.position}
      // Handles clicks on the node.
      onClick={(event) => {
        // Prevents the click from affecting objects behind this node.
        event.stopPropagation();

        // Sends the clicked node back to the parent component.
        onSelect(node);
      }}
      // Handles the pointer moving over the node.
      onPointerOver={(event) => {
        event.stopPropagation();

        // Resets the hover state.
        setHovered(true);

        // Resets the mouse cursor to its default appearance.
        document.body.style.cursor = "auto";
      }}
      // Handles the pointer moving off a node.
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      // Enlarges the node when selected or hovered over.
      // Selected takes priority over hovered.
      scale={selected ? 1.25 : hovered ? 1.2 : 1}
    >
      {/* Creates the node's spherical shape. */}
      <sphereGeometry args={[0.35, 24, 24]} />

      {/* Controls the node's colour, glow and surface appearance. */}
      <meshStandardMaterial
        color={color}
        emissive={color}
        // Makes the selected node glow more brightly.
        emissiveIntensity={selected ? 1.2 : hovered ? 0.8 : 0.3}
        // Controls how rough or smooth the surface looks.
        roughness={0.25}
        // Adds a metallic appearance to the material.
        metalness={0.3}
      />
    </mesh>
  );
};

export default NetworkNode;
