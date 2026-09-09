import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MOCK_CATEGORIES } from '../data/synapseData';
import { synth } from '../utils/audio';
import ThoughtPreview from './ThoughtPreview';
import { Noise } from './GradientBackground';
import '../styles/components/ConstellationMap.css';

function ConstellationMap({ nodes, onSelectNode }) {
  const canvasRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
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
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (document.hidden) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }
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

      // Draw Connections
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
              ctx.globalAlpha = isEdgeDimmed ? 0.08 : isEdgeHighlighted ? 0.9 : 0.35;

              ctx.beginPath();
              ctx.moveTo(nodeX, nodeY);
              ctx.lineTo(targetX, targetY);
              ctx.strokeStyle = isEdgeHighlighted ? '#ffffff' : 'rgba(255, 235, 230, 0.45)';
              ctx.lineWidth = isEdgeHighlighted ? 1.5 : 0.8;
              ctx.stroke();

              ctx.restore();
            }
          });
        }
      });

      // Draw Nodes
      filteredNodes.forEach((node, index) => {
        const floatY = Math.sin(t + node.x * 0.004) * 3;
        const floatX = Math.cos(t + node.y * 0.004) * 2;
        const nx = node.x - 500 + floatX;
        const ny = node.y - 450 + floatY;

        const isHovered = hoveredId === node.id;
        const isConnectedToHovered = connectedIds.has(node.id);
        const isDimmed = hoveredId && !isHovered && !isConnectedToHovered;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.2 : 1.0;

        ctx.beginPath();
        ctx.arc(nx, ny, isHovered ? 5.5 : 3.0, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ff7700' : '#ffffff';
        ctx.fill();

        ctx.font = '500 9px var(--font-mono)';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(String(index + 1).padStart(2, '0'), nx + 8, ny - 6);

        ctx.font = isHovered ? '700 12px var(--font-sans)' : '600 11px var(--font-sans)';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(node.title.toUpperCase(), nx + 8, ny + 8);

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
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setHasMoved(true);
      setTransform({
        ...transform,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - canvas.width / 2 - transform.x) / transform.scale;
    const mouseY = (e.clientY - rect.top - canvas.height / 2 - transform.y) / transform.scale;

    let found = null;
    const t = timeRef.current;

    for (let node of filteredNodes) {
      const floatY = Math.sin(t + node.x * 0.004) * 3;
      const floatX = Math.cos(t + node.y * 0.004) * 2;
      const nx = node.x - 500 + floatX;
      const ny = node.y - 450 + floatY;

      const dist = Math.hypot(mouseX - nx, mouseY - ny);
      if (dist < 40) {
        found = node;
        break;
      }
    }

    if (found !== hoveredNode) {
      setHoveredNode(found);
      if (found) {
        synth.playHover();
        setPreviewPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      } else {
        setPreviewPos(null);
      }
    } else if (found) {
      setPreviewPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseUp = () => {
    if (!hasMoved && hoveredNode && onSelectNode) {
      synth.playClick();
      onSelectNode(hoveredNode);
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setHasMoved(false);
      setDragStart({ x: touch.clientX - transform.x, y: touch.clientY - transform.y });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setHasMoved(true);
      setTransform({
        ...transform,
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!hasMoved && hoveredNode && onSelectNode) {
      synth.playClick();
      onSelectNode(hoveredNode);
    }
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale + zoomDelta, 0.6), 2.2),
    }));
  };

  const handleZoom = (delta) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale + delta, 0.6), 2.2),
    }));
  };

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
    setSelectedCategory('all');
  };

  return (
    <div
      className="constellation-art-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <Noise patternAlpha={45} intensity={0.9} patternRefreshInterval={2} />

      <div className="spectrum-bar-minimal">
        <span className="spectrum-label">SPECTRUM /</span>
        <button
          className={`spectrum-tab-minimal ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          ALL THOUGHT SPHERES
        </button>
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

      <canvas ref={canvasRef} className="constellation-canvas-art" />

      {hoveredNode && previewPos && (
        <ThoughtPreview node={hoveredNode} position={previewPos} />
      )}

      <div className="map-controls-minimal">
        <button onClick={() => handleZoom(0.15)} title="Zoom In">+</button>
        <button onClick={() => handleZoom(-0.15)} title="Zoom Out">-</button>
        <button onClick={handleReset} title="Reset View">RESET</button>
      </div>
    </div>
  );
}

ConstellationMap.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      connections: PropTypes.array
    })
  ).isRequired,
  onSelectNode: PropTypes.func
};

export default React.memo(ConstellationMap);

