import { useState } from "react";

const NetworkNode = ({ node, onSelect, selected }) => {
  const [hovered, setHovered] = useState(false);
  const color = node.status === "warning" ? "#f59e0b" : "#38bdf8";

  return (
    <mesh
      position={node.position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(node);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      scale={selected ? 1.25 : hovered ? 1.2 : 1}
    >
      <sphereGeometry args={[0.35, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 1.2 : hovered ? 0.8 : 0.3}
        roughness={0.25}
        metalness={0.3}
      />
    </mesh>
  );
};

export default NetworkNode;
