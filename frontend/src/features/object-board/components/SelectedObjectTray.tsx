import React from 'react';
import { Card, Button } from '../../../shared/components/ui';
import './SelectedObjectTray.css';

interface SelectedObject {
  id: string;
  name: string;
  thumbnail: string;
  x: number;
  y: number;
}

interface SelectedObjectTrayProps {
  selectedObjects?: SelectedObject[];
  onRemove?: (id: string) => void;
  onUpdatePosition?: (id: string, x: number, y: number) => void;
}

export function SelectedObjectTray({
  selectedObjects = [],
  onRemove,
  onUpdatePosition,
}: SelectedObjectTrayProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValues, setEditValues] = React.useState({ x: 0, y: 0 });

  const handleEdit = (obj: SelectedObject) => {
    setEditingId(obj.id);
    setEditValues({ x: obj.x, y: obj.y });
  };

  const handleSave = () => {
    if (editingId) {
      onUpdatePosition?.(editingId, editValues.x, editValues.y);
      setEditingId(null);
    }
  };

  return (
    <div className="selected-object-tray">
      <div className="tray-header">
        <h3>已选择物体 ({selectedObjects.length})</h3>
      </div>
      {selectedObjects.length === 0 ? (
        <p className="empty-message">选择物体以编辑位置和属性</p>
      ) : (
        <div className="objects-list">
          {selectedObjects.map((obj) => (
            <Card key={obj.id} className="selected-object-item">
              <div className="item-header">
                <span className="item-thumbnail">{obj.thumbnail}</span>
                <span className="item-name">{obj.name}</span>
                <button
                  className="remove-small"
                  onClick={() => onRemove?.(obj.id)}
                >
                  ✕
                </button>
              </div>

              {editingId === obj.id ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>X 位置</label>
                    <input
                      type="number"
                      value={editValues.x}
                      onChange={(e) =>
                        setEditValues((v) => ({
                          ...v,
                          x: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Y 位置</label>
                    <input
                      type="number"
                      value={editValues.y}
                      onChange={(e) =>
                        setEditValues((v) => ({
                          ...v,
                          y: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <Button size="sm" variant="primary" onClick={handleSave}>
                      保存
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="item-info">
                  <p>X: {obj.x}px, Y: {obj.y}px</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(obj)}
                  >
                    编辑位置
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
