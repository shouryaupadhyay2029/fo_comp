/**
 * @fileoverview Global React Context State Management Provider for Thought Nodes.
 * @module ThoughtContext
 * @description Centralized React state management for spatial constellation nodes, private resonance journal, weaver modal, and active selection.
 * @author Frontend Odyssey Team
 */

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MOCK_NODES } from '../data/synapseData';

const ThoughtContext = createContext(null);

/**
 * Thought Context Provider Component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {React.ReactNode} props.children Child React nodes to wrap with context provider.
 * @returns {JSX.Element} Provider component wrapping application tree.
 */
export function ThoughtProvider({ children }) {
  const [nodes, setNodes] = useState(MOCK_NODES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [userResonances, setUserResonances] = useState([MOCK_NODES[0], MOCK_NODES[2]]);
  const [isWeaverOpen, setIsWeaverOpen] = useState(false);
  const [weaverParentNode, setWeaverParentNode] = useState(null);
  const [isResonanceOpen, setIsResonanceOpen] = useState(false);
  const [isCuriousOpen, setIsCuriousOpen] = useState(false);
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);

  const handleAddNode = useCallback((newNode) => {
    setNodes((prev) => [newNode, ...prev]);
  }, []);

  const handleExpandFromNode = useCallback((targetNode) => {
    setWeaverParentNode(targetNode);
    setSelectedNode(null);
    setIsWeaverOpen(true);
  }, []);

  const handleOpenWeaverGeneral = useCallback(() => {
    setWeaverParentNode(null);
    setIsWeaverOpen(true);
  }, []);

  const handleToggleResonate = useCallback((nodeToResonate) => {
    setUserResonances((prevResonances) => {
      const isCurrentlyResonated = prevResonances.some((r) => r.id === nodeToResonate.id);

      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          if (n.id === nodeToResonate.id) {
            const newCount = isCurrentlyResonated ? Math.max(1, n.resonanceCount - 1) : n.resonanceCount + 1;
            return { ...n, resonanceCount: newCount };
          }
          return n;
        })
      );

      if (isCurrentlyResonated) {
        return prevResonances.filter((r) => r.id !== nodeToResonate.id);
      } else {
        return [...prevResonances, nodeToResonate];
      }
    });

    setSelectedNode((prevSelected) => {
      if (prevSelected && prevSelected.id === nodeToResonate.id) {
        const isCurrentlyResonated = userResonances.some((r) => r.id === nodeToResonate.id);
        const newCount = isCurrentlyResonated ? Math.max(1, prevSelected.resonanceCount - 1) : prevSelected.resonanceCount + 1;
        return { ...prevSelected, resonanceCount: newCount };
      }
      return prevSelected;
    });
  }, [userResonances]);

  const value = useMemo(() => ({
    nodes,
    setNodes,
    selectedNode,
    setSelectedNode,
    userResonances,
    isWeaverOpen,
    setIsWeaverOpen,
    weaverParentNode,
    isResonanceOpen,
    setIsResonanceOpen,
    isCuriousOpen,
    setIsCuriousOpen,
    isMenuOverlayOpen,
    setIsMenuOverlayOpen,
    handleAddNode,
    handleExpandFromNode,
    handleOpenWeaverGeneral,
    handleToggleResonate
  }), [
    nodes,
    selectedNode,
    userResonances,
    isWeaverOpen,
    weaverParentNode,
    isResonanceOpen,
    isCuriousOpen,
    isMenuOverlayOpen,
    handleAddNode,
    handleExpandFromNode,
    handleOpenWeaverGeneral,
    handleToggleResonate
  ]);

  return (
    <ThoughtContext.Provider value={value}>
      {children}
    </ThoughtContext.Provider>
  );
}

ThoughtProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to consume the global ThoughtContext.
 *
 * @function useThoughtContext
 * @returns {Object} Context state object containing spatial node array, resonance state, and action dispatchers.
 * @throws {Error} Throws if hook is called outside a ThoughtProvider.
 */
export function useThoughtContext() {
  const context = useContext(ThoughtContext);
  if (!context) {
    throw new Error('useThoughtContext must be used within a ThoughtProvider');
  }
  return context;
}
