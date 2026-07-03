import React from 'react';
import { Modal, Button } from '../../../shared/components/ui';
import './ObjectDetailModal.css';

interface ObjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  objectName?: string;
}

export function ObjectDetailModal({
  isOpen,
  onClose,
  objectName = '物体',
}: ObjectDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${objectName} 详情`}>
      <div className="object-detail">
        <div className="detail-section">
          <h3>基本信息</h3>
          <p>物体名称: {objectName}</p>
          <p>分类: 待定义</p>
          <p>描述: 这是一个 {objectName} 的详细信息面板</p>
        </div>
        <div className="detail-section">
          <h3>操作</h3>
          <div className="button-group">
            <Button variant="primary" onClick={() => {}}>
              添加到场景
            </Button>
            <Button variant="outline" onClick={onClose}>
              关闭
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
