import React from 'react';
import { Card, Button } from '../../../shared/components/ui';
import './ObjectCard.css';

interface ObjectCardProps {
  name: string;
  thumbnail: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
}

export function ObjectCard({
  name,
  thumbnail,
  isSelected = false,
  onSelect,
  onRemove,
}: ObjectCardProps) {
  return (
    <Card className={`object-card-item ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <div className="thumbnail-large">{thumbnail}</div>
        <button className="remove-btn" onClick={onRemove}>
          ✕
        </button>
      </div>
      <p className="card-name">{name}</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onSelect}
        className="card-action"
      >
        {isSelected ? '已选中' : '选中'}
      </Button>
    </Card>
  );
}
