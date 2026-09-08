import React, { useRef, useEffect, useState } from 'react';
import { MOCK_CATEGORIES } from '../data/synapseData';
import { synth } from '../utils/audio';
import ThoughtPreview from './ThoughtPreview';

export default function ConstellationMap({ nodes, onSelectNode }) {
  const canvasRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [previewPos, setPreviewPos] = useState(null);

  const animationFrameId = useRef(null);
  const timeRef = useRef(0);

  const filteredNodes = nodes.filter(
    (node) => selectedCategory === 'all' || node.category === selectedCategory
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      timeRef.current += 0.006;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2 + transform.x, canvas.height / 2 + transform.y);
      ctx.scale(transform.scale, transform.scale);

      const hoveredId = hoveredNode ? hoveredNode.id : null;
      const connectedIds = new Set();
      if (hoveredNode && hoveredNode.connections) {
        hoveredNode.connections.forEach((c) => connectedIds.add(c.targetId));
      }

      // 1. Monochromatic Hairline Connecting Lines
      filteredNodes.forEach((node) => {
        const floatY = Math.sin(t + node.x * 0.004) * 3;
        const floatX = Math.cos(t + node.y * 0.004) * 2;
        const nodeX = node.x - 500 + floatX;
        const nodeY = node.y - 450 + floatY;

        if (node.connections) {
          node.connections.forEach((conn) => {
            const targetNode = filteredNodes.find((n) => n.id === conn.targetId);
            if (targetNode) {
              const targetFloatY = Math.sin(t + targetNode.x * 0.004) * 3;
              const targetFloatX = Math.cos(t + targetNode.y * 0.004) * 2;
              const targetX = targetNode.x - 500 + targetFloatX;
              const targetY = targetNode.y - 450 + targetFloatY;

              const isEdgeHighlighted =
                hoveredId && (node.id === hoveredId || conn.targetId === hoveredId);
              const isEdgeDimmed = hoveredId && !isEdgeHighlighted;

              ctx.save();
              ctx.globalAlpha = isEdgeDimmed ? 0.06 : isEdgeHighlighted ? 0.7 : 0.18;

              ctx.beginPath();
              ctx.moveTo(nodeX, nodeY);
              ctx.lineTo(targetX, targetY);
              ctx.strokeStyle = isEdgeHighlighted ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
              ctx.lineWidth = 0.5;
              ctx.stroke();

              ctx.restore();
            }
          });
        }
      });

      // 2. Typographic Thought Markers (Art Installation Style)
      filteredNodes.forEach((node, index) => {
        const floatY = Math.sin(t + node.x * 0.004) * 3;
        const floatX = Math.cos(t + node.y * 0.004) * 2;
        const nx = node.x - 500 + floatX;
        const ny = node.y - 450 + floatY;

        const isHovered = hoveredId === node.id;
        const isConnectedToHovered = connectedIds.has(node.id);
        const isDimmed = hoveredId && !isHovered && !isConnectedToHovered;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.12 : 1.0;

        // Small hairline marker point
        ctx.beginPath();
        ctx.arc(nx, ny, isHovered ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ff5500' : 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Index tag
        const nodeNum = String(index + 1).padStart(2, '0');
        ctx.font = '600 10px "Space Grotesk", monospace';
        ctx.fillStyle = isHovered ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.35)';
        ctx.textAlign = 'left';
        ctx.fillText(nodeNum, nx + (isHovered ? 12 : 8), ny - 4);

        // Typographic Thought Title
        ctx.font = isHovered
          ? '700 12px "Plus Jakarta Sans", sans-serif'
          : '500 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.65)';
        ctx.textAlign = 'left';

        const displayTitle = node.title.toUpperCase();
        ctx.fillText(displayTitle, nx + (isHovered ? 12 : 8), ny + 10);

        ctx.restore();
      });

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [filteredNodes, transform, hoveredNode]);

  const handleMouseDown = (e) => {
    if (e.target !== canvasRef.current) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - canvas.width / 2 - transform.x) / transform.scale;
    const mouseY = (e.clientY - rect.top - canvas.height / 2 - transform.y) / transform.scale;

    const t = timeRef.current;
    let found = null;

    filteredNodes.forEach((node) => {
      const floatY = Math.sin(t + node.x * 0.004) * 3;
      const floatX = Math.cos(t + node.y * 0.004) * 2;
      const nx = node.x - 500 + floatX;
      const ny = node.y - 450 + floatY;

      const dist = Math.hypot(mouseX - nx, mouseY - ny);
      if (dist <= 30) {
        found = node;
      }
    });

    if (found && (!hoveredNode || hoveredNode.id !== found.id)) {
      setHoveredNode(found);
      setPreviewPos({ x: e.clientX, y: e.clientY });
      synth.playTone(found.audioFrequency || 432, 0.25);
    } else if (found && hoveredNode) {
      setPreviewPos({ x: e.clientX, y: e.clientY });
    } else if (!found && hoveredNode) {
      setHoveredNode(null);
      setPreviewPos(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = () => {
    if (hoveredNode) {
      onSelectNode(hoveredNode);
    }
  };

  const resetTransform = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div className="constellation-art-container">
      {/* Category Spectrum Filter */}
      <div className="spectrum-bar-minimal font-mono">
        <span className="spectrum-label font-mono">SPECTRUM /</span>
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`spectrum-tab-minimal ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`constellation-canvas ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      />

      {/* Controls */}
      <div className="map-controls-minimal font-mono">
        <button onClick={() => setTransform((p) => ({ ...p, scale: Math.min(p.scale + 0.15, 2) }))}>
          +
        </button>
        <button onClick={() => setTransform((p) => ({ ...p, scale: Math.max(p.scale - 0.15, 0.6) }))}>
          −
        </button>
        <button onClick={resetTransform}>RESET</button>
      </div>

      {/* Hover Preview */}
      {hoveredNode && previewPos && (
        <ThoughtPreview node={hoveredNode} position={previewPos} />
      )}

      <style>{`
        .constellation-art-container {
          position: relative;
          width: 100%;
          height: 680px;
          border-top: 1px solid var(--border-hairline);
          border-bottom: 1px solid var(--border-hairline);
          overflow: hidden;
          background: transparent;
        }

        .spectrum-bar-minimal {
          position: absolute;
          top: 24px;
          left: 40px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 0.72rem;
        }

        .spectrum-label {
          color: #64748b;
          letter-spacing: 0.15em;
        }

        .spectrum-tab-minimal {
          background: transparent;
          border: none;
          color: #64748b;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 2px 0;
        }

        .spectrum-tab-minimal:hover, .spectrum-tab-minimal.active {
          color: #ffffff;
        }

        .spectrum-tab-minimal.active {
          color: var(--accent-orange);
          border-bottom: 1px solid var(--accent-orange);
        }

        .map-controls-minimal {
          position: absolute;
          bottom: 24px;
          right: 40px;
          z-index: 10;
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
        }

        .map-controls-minimal button {
          background: transparent;
          border: 1px solid var(--border-hairline);
          color: #94a3b8;
          padding: 4px 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .map-controls-minimal button:hover {
          border-color: #ffffff;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .constellation-art-container {
            height: 500px;
          }
          .spectrum-bar-minimal {
            left: 20px;
            top: 16px;
            gap: 12px;
            flex-wrap: wrap;
          }
          .map-controls-minimal {
            right: 20px;
            bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}
