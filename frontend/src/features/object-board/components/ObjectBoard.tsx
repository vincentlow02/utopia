import React from 'react';
import './ObjectBoard.css';

interface PlacedObject {
  id: string;
  name: string;
  x: number;
  y: number;
  thumbnail: string;
}

interface ObjectBoardProps {
  objects?: PlacedObject[];
  onSelectObject?: (id: string) => void;
  selectedObjectId?: string;
}

export function ObjectBoard({
  objects = [],
  onSelectObject,
  selectedObjectId,
}: ObjectBoardProps) {
  return (
    <div className="object-board">
      <div className="board-header">
        <h2>放置区域</h2>
        <span className="object-count">{objects.length} 个物体</span>
      </div>
      <div className="board-canvas">
        {objects.length === 0 ? (
          <div className="empty-state">
            <p>从左侧物体库拖放物体到此处</p>
          </div>
        ) : (
          <div className="objects-container">
            {objects.map((obj) => (
              <div
                key={obj.id}
                className={`placed-object ${
                  selectedObjectId === obj.id ? 'selected' : ''
                }`}
                style={{
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                }}
                onClick={() => onSelectObject?.(obj.id)}
              >
                <div className="object-content">{obj.thumbnail}</div>
                <p className="object-label">{obj.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
