import React from 'react';

interface UndoRedoProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  historyCount: number;
}

const UndoRedo: React.FC<UndoRedoProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  historyCount,
}) => {
  return (
    <div className="undo-redo-controls">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="btn btn-secondary"
        title="Undo (Ctrl+Z)"
      >
        ↶ Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="btn btn-secondary"
        title="Redo (Ctrl+Y)"
      >
        ↷ Redo
      </button>
      <span className="history-count">History: {historyCount}</span>
    </div>
  );
};

export default UndoRedo;