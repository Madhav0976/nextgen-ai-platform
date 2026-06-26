import { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  px: number; // Projected screen X
  py: number; // Projected screen Y
  pz: number; // Projected screen Z (for depth sorting)
  color: string;
  size: number;
}

interface Edge {
  u: number;
  v: number;
}

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Re-size observer for canvas (guarantees fluidity)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    // Initialize 3D nodes forming a beautiful neural core (dual-ring geosphere)
    const nodes: Node3D[] = [];
    const numNodes = 75;
    const radius = 180;

    for (let i = 0; i < numNodes; i++) {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Gradient color mapping based on index or position
      const colorIntensity = Math.floor(100 + (i / numNodes) * 155);
      const color = `rgba(${colorIntensity}, ${colorIntensity}, ${colorIntensity + 30}, `;

      nodes.push({
        x,
        y,
        z,
        px: 0,
        py: 0,
        pz: 0,
        color,
        size: Math.random() * 2 + 1.5,
      });
    }

    // Connect nodes that are close to each other
    const edges: Edge[] = [];
    for (let i = 0; i < numNodes; i++) {
      const neighbors: { index: number; dist: number }[] = [];
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 140) {
          neighbors.push({ index: j, dist });
        }
      }
      // Sort and pick closest 3 neighbors
      neighbors.sort((a, b) => a.dist - b.dist);
      neighbors.slice(0, 3).forEach((n) => {
        edges.push({ u: i, v: n.index });
      });
    }

    // Rotation angles
    let angleX = 0.001;
    let angleY = 0.0015;
    let angleZ = 0.0005;

    const focalLength = 400;

    // Track mouse position with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Clear with true black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base rotation + mouse interaction
      const currentAngleX = angleX + mouseRef.current.y * 0.0015;
      const currentAngleY = angleY + mouseRef.current.x * 0.0015;
      const currentAngleZ = angleZ;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosZ = Math.cos(currentAngleZ);
      const sinZ = Math.sin(currentAngleZ);

      // Rotate and Project Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Rotation on X
        let y1 = n.y * cosX - n.z * sinX;
        let z1 = n.y * sinX + n.z * cosX;

        // Rotation on Y
        let x2 = n.x * cosY + z1 * sinY;
        let z2 = -n.x * sinY + z1 * cosY;

        // Rotation on Z
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = x2 * sinZ + y1 * cosZ;

        // Save rotated coordinates back for next frame
        n.x = x3;
        n.y = y3;
        n.z = z2;

        // Translate to depth position
        const zOffset = z2 + 500;

        // 3D Perspective Projection
        const scale = focalLength / zOffset;
        n.px = width / 2 + x3 * scale;
        // Shift slightly offset downward for absolute hero centering
        n.py = height / 2 + y3 * scale + 30;
        n.pz = z2;
      }

      // Draw subtle background glowing radial aura
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2 + 30,
        10,
        width / 2,
        height / 2 + 30,
        Math.max(width, height) * 0.4
      );
      gradient.addColorStop(0, "rgba(20, 20, 25, 0.15)");
      gradient.addColorStop(0.5, "rgba(10, 10, 12, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Edges (with fine transparency based on depth)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const uNode = nodes[edge.u];
        const vNode = nodes[edge.v];

        // Depth-based transparency
        const avgZ = (uNode.pz + vNode.pz) / 2;
        // Map depth to opacity (z goes from -radius to +radius, i.e., -180 to 180)
        const opacity = Math.max(0.02, Math.min(0.28, 0.15 - avgZ / 500));

        ctx.strokeStyle = `rgba(134, 134, 139, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(uNode.px, uNode.py);
        ctx.lineTo(vNode.px, vNode.py);
        ctx.stroke();
      }

      // Draw Nodes (with depth sorting for accurate layered overlay)
      const sortedNodeIndices = Array.from({ length: nodes.length }, (_, idx) => idx).sort(
        (a, b) => nodes[b].pz - nodes[a].pz
      );

      for (let i = 0; i < sortedNodeIndices.length; i++) {
        const n = nodes[sortedNodeIndices[i]];
        const opacity = Math.max(0.1, Math.min(0.85, 0.6 - n.pz / 300));
        const renderedSize = Math.max(0.5, n.size * (focalLength / (n.pz + 500)));

        ctx.fillStyle = `${n.color}${opacity})`;
        ctx.beginPath();
        ctx.arc(n.px, n.py, renderedSize, 0, Math.PI * 2);
        ctx.fill();

        // Extra glowing ring for the core nodes
        if (sortedNodeIndices[i] % 15 === 0 && opacity > 0.4) {
          ctx.strokeStyle = `rgba(245, 245, 247, ${opacity * 0.25})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(n.px, n.py, renderedSize * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      id="scene-3d-bg"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
