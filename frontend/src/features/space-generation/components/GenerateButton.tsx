import React from 'react';
import { Button } from '../../../shared/components/ui';
import './GenerateButton.css';

interface GenerateButtonProps {
  isGenerating?: boolean;
  onGenerate?: () => void;
  onDownload?: () => void;
}

export function GenerateButton({
  isGenerating = false,
  onGenerate,
  onDownload,
}: GenerateButtonProps) {
  return (
    <div className="generate-button-group">
      <Button
        variant="primary"
        size="md"
        onClick={onGenerate}
        disabled={isGenerating}
        className="generate-btn"
      >
        {isGenerating ? '生成中...' : '生成空间预览'}
      </Button>
      <Button
        variant="outline"
        size="md"
        onClick={onDownload}
        disabled={isGenerating}
        className="download-btn"
      >
        📥 下载
      </Button>
    </div>
  );
}
