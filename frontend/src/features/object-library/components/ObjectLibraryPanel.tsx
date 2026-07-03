import React from 'react';
import { SearchInput, Card } from '../../../shared/components/ui';
import './ObjectLibraryPanel.css';

interface LibraryObject {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
}

interface ObjectLibraryPanelProps {
  objects?: LibraryObject[];
  onSelectObject?: (object: LibraryObject) => void;
}

// 模拟数据
const mockObjects: LibraryObject[] = [
  { id: '1', name: '椅子', thumbnail: '🪑', category: '家具' },
  { id: '2', name: '桌子', thumbnail: '📦', category: '家具' },
  { id: '3', name: '灯泡', thumbnail: '💡', category: '照明' },
  { id: '4', name: '镜子', thumbnail: '🪞', category: '装饰' },
  { id: '5', name: '花瓶', thumbnail: '🏺', category: '装饰' },
  { id: '6', name: '书架', thumbnail: '📚', category: '家具' },
];

export function ObjectLibraryPanel({
  objects = mockObjects,
  onSelectObject,
}: ObjectLibraryPanelProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredObjects = objects.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="object-library-panel">
      <h2>物体库</h2>
      <SearchInput
        onSearch={setSearchTerm}
        placeholder="搜索物体..."
      />
      <div className="objects-grid">
        {filteredObjects.map((obj) => (
          <Card
            key={obj.id}
            className="object-card"
            onClick={() => onSelectObject?.(obj)}
          >
            <div className="object-thumbnail">{obj.thumbnail}</div>
            <p className="object-name">{obj.name}</p>
            <span className="object-category">{obj.category}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
