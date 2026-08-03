import React from 'react';
import { Button, Tabs } from '../../../shared/components/ui';
import './AIInterpretationPanel.css';

interface AIInterpretationPanelProps {
  selectedObjectName?: string;
}

export function AIInterpretationPanel({
  selectedObjectName = '未选择',
}: AIInterpretationPanelProps) {
  const [interpretation, setInterpretation] = React.useState('');

  const tabs = [
    {
      id: 'description',
      label: '描述',
      content: (
        <div className="tab-content">
          <p>
            {selectedObjectName}
            的详细描述会显示在这里。这是一个静态 UI，暂未接入 AI 服务。
          </p>
          <div className="interpretation-section">
            <h4>生成描述</h4>
            <p className="placeholder-text">
              根据选择的物体，AI 将生成相关的场景和应用描述。
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'suggestions',
      label: '建议',
      content: (
        <div className="tab-content">
          <div className="suggestion-list">
            <div className="suggestion-item">
              <span className="suggestion-icon">💡</span>
              <div>
                <h5>颜色搭配建议</h5>
                <p>选择与周围物体相呼应的颜色</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-icon">📏</span>
              <div>
                <h5>尺寸优化</h5>
                <p>根据场景调整物体的大小比例</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-icon">📍</span>
              <div>
                <h5>位置建议</h5>
                <p>根据美学原理推荐最佳放置位置</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="ai-interpretation-panel">
      <div className="panel-header">
        <h3>AI 解释</h3>
        <span className="selected-object">当前物体: {selectedObjectName}</span>
      </div>

      <Tabs tabs={tabs} defaultTab="description" />

      <div className="panel-footer">
        <textarea
          className="interpretation-input"
          placeholder="输入你的场景描述或需求..."
          value={interpretation}
          onChange={(e) => setInterpretation(e.target.value)}
        />
        <div className="button-group">
          <Button
            size="sm"
            variant="primary"
            disabled
            title="AI 功能暂未启用"
          >
            生成建议
          </Button>
          <Button size="sm" variant="outline">
            清除
          </Button>
        </div>
      </div>
    </div>
  );
}
