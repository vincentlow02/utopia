import React from 'react';
import { Card } from '../../../shared/components/ui';
import './GenerationPreview.css';

interface GenerationPreviewProps {
  isGenerating?: boolean;
  previewImage?: string;
  generationPrompt?: string;
}

export function GenerationPreview({
  isGenerating = false,
  previewImage,
  generationPrompt = '等待生成预览...',
}: GenerationPreviewProps) {
  return (
    <Card className="generation-preview">
      <div className="preview-header">
        <h3>生成预览</h3>
        {isGenerating && <span className="generating-badge">生成中...</span>}
      </div>

      <div className="preview-area">
        {previewImage ? (
          <div className="preview-image">{previewImage}</div>
        ) : (
          <div className="preview-placeholder">
            <div className="placeholder-icon">🎨</div>
            <p>点击下方按钮开始生成</p>
          </div>
        )}
      </div>

      <div className="preview-info">
        <p className="prompt-label">当前提示词:</p>
        <p className="prompt-text">{generationPrompt}</p>
      </div>
    </Card>
  );
}
