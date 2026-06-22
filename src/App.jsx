import { useState } from 'react';

const DESKTOP_APP_WINDOW_SCALE = 0.8;

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%238cb6ff'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%235d74d6'/%3E%3Cpath d='M14 54c3.4-12 11-18 18-18s14.6 6 18 18' fill='%235d74d6'/%3E%3C/svg%3E";

const GENERATED_COLLECTION_ITEMS = Array.from({ length: 10 }, (_, index) => ({
  id: `generated-photo-${index + 1}`,
  tone: index % 4,
}));

const UTOPIA_CARDS = [
  { id: 'preference', title: '好み' },
  { id: 'material', title: '材料' },
  { id: 'space', title: '空間' },
  { id: 'relationship', title: '関係' },
];

const UPLOAD_ACTIONS = [
  { id: 'upload', title: 'Upload Image', detail: '写真をアップロード', icon: 'image' },
  { id: 'camera', title: 'Take Photo', detail: 'カメラで撮影', icon: 'camera' },
  { id: 'gallery', title: 'From Gallery', detail: 'ギャラリーから選択', icon: 'image' },
];

const HeaderChevronIcon = ({ direction = 'left' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
    <path
      d={direction === 'left' ? 'M9.75 3.5L5.25 8L9.75 12.5' : 'M6.25 3.5L10.75 8L6.25 12.5'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.625 16.625L13.1812 13.1812M15.0417 8.70833C15.0417 12.2061 12.2061 15.0417 8.70833 15.0417C5.21053 15.0417 2.375 12.2061 2.375 8.70833C2.375 5.21053 5.21053 2.375 8.70833 2.375C12.2061 2.375 15.0417 5.21053 15.0417 8.70833Z"
      stroke="#1E1E1E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = ({ size = 26 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" style={{ width: size, height: size }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CameraFocusIcon = () => (
  <svg width="64" height="64" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M23 18H18V23" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M49 18H54V23" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M23 54H18V49" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M49 54H54V49" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="36" cy="36" r="7" stroke="currentColor" strokeWidth="2.4" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 2L11.9 7.7L17.5 10L11.9 12.3L10 18L7.8 12.3L2.5 10L7.8 7.7L10 2Z" fill="currentColor" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.65 3.25L12.75 6.35L5.58 13.52L2.4 13.6L2.48 10.42L9.65 3.25Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.65 4.25L11.75 7.35" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
  </svg>
);

const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3.2" y="4" width="13.6" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 13.2L8.6 10.5L11 12.7L12.2 11.5L15.1 14.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="13" cy="7.4" r="1.1" fill="currentColor" />
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6.8 5.4L8 3.8H12L13.2 5.4H15.2C16.1 5.4 16.8 6.1 16.8 7V14.3C16.8 15.2 16.1 15.9 15.2 15.9H4.8C3.9 15.9 3.2 15.2 3.2 14.3V7C3.2 6.1 3.9 5.4 4.8 5.4H6.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="10.7" r="2.4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function App() {
  const [activeView, setActiveView] = useState('collection');
  const isCollectionView = activeView === 'collection';

  return (
    <div className="desktop-root-viewport">
      <div
        className="desktop-scale-shell"
        style={{
          width: `${100 / DESKTOP_APP_WINDOW_SCALE}vw`,
          height: `${100 / DESKTOP_APP_WINDOW_SCALE}dvh`,
          transform: `scale(${DESKTOP_APP_WINDOW_SCALE})`,
          transformOrigin: 'top left',
        }}
      >
        <div
          className="desktop-app desktop-app-light"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: 'var(--desktop-root-bg)',
            color: 'var(--desktop-root-text)',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <header className="desktop-minimal-header">
            <div className="desktop-minimal-brand">
              {isCollectionView ? (
                <div className="desktop-workspace-shell">
                  <button type="button" className="desktop-workspace-name-button">
                    <span className="desktop-workspace-trigger-label">Gallery</span>
                  </button>
                </div>
              ) : null}
            </div>

            <div className="desktop-minimal-date-nav-wrap">
              <div className="desktop-minimal-date-nav" role="group" aria-label="View navigation">
                <button
                  type="button"
                  className={`desktop-minimal-date-nav-button ${!isCollectionView ? 'is-active' : ''}`}
                  aria-label="Show Utopia"
                  aria-pressed={!isCollectionView}
                  onClick={() => setActiveView('utopia')}
                >
                  <HeaderChevronIcon direction="left" />
                </button>
                <button type="button" className="desktop-minimal-date-nav-label" aria-label={isCollectionView ? 'Collection' : 'Utopia'}>
                  {isCollectionView ? 'Collection' : 'Utopia'}
                </button>
                <button
                  type="button"
                  className={`desktop-minimal-date-nav-button ${isCollectionView ? 'is-active' : ''}`}
                  aria-label="Show Collection"
                  aria-pressed={isCollectionView}
                  onClick={() => setActiveView('collection')}
                >
                  <HeaderChevronIcon direction="right" />
                </button>
              </div>
            </div>

            <div className="desktop-topbar-actions">
              <button type="button" className="desktop-header-icon-button" aria-label="Search">
                <SearchIcon />
              </button>
              <button type="button" className="desktop-profile-trigger desktop-header-avatar-button">
                <img src={DEFAULT_AVATAR} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            </div>
          </header>

          <div className="desktop-stage-row">
            <div className="desktop-main-stage">
              <div className="desktop-main-stage-inner">
                <main
                  className={`desktop-collection-view ${isCollectionView ? 'is-collection-mode' : 'is-utopia-mode'}`}
                  style={{ flex: 1, minHeight: 0 }}
                >
                  {isCollectionView ? (
                    <section className="desktop-generated-collection" aria-label="Collection">
                      <div className="desktop-generated-grid" aria-label="Generated photo collection">
                        {GENERATED_COLLECTION_ITEMS.map((item, index) => (
                          <button
                            type="button"
                            key={item.id}
                            className={`desktop-generated-photo-tile tone-${item.tone}`}
                            aria-label={`Generated photo ${index + 1}`}
                            style={{ '--tile-index': index }}
                          />
                        ))}
                      </div>
                      <div className="desktop-collection-more-indicator" aria-hidden="true">...</div>
                    </section>
                  ) : (
                    <section className="desktop-utopia-blank-surface" aria-label="Utopia">
                      <div className="desktop-utopia-workspace-frame desktop-utopia-workspace-frame-empty">
                        <div className="desktop-utopia-status-pill desktop-utopia-status-in-frame" aria-label="AI Prompt Connected">
                          <span className="desktop-utopia-status-dot" />
                          <span>AI Prompt Connected</span>
                        </div>
                        <div className="desktop-utopia-panel">
                          <div className="desktop-utopia-heading">
                            <h1>What is your Utopia?</h1>
                            <p>Describe the world you want to create.</p>
                          </div>

                          <button type="button" className="desktop-utopia-camera-box" aria-label="Camera Ready">
                            <CameraFocusIcon />
                            <span className="desktop-utopia-camera-title">Camera Ready</span>
                            <span className="desktop-utopia-camera-copy">Place an object on the platform</span>
                          </button>

                          <div className="desktop-utopia-detecting" role="status">
                            <span className="desktop-utopia-spinner" aria-hidden="true" />
                            <span>Detecting objects...</span>
                          </div>

                          <div className="desktop-utopia-card-row" aria-label="Detected prompt fields">
                            {UTOPIA_CARDS.map((card, index) => (
                              <button
                                type="button"
                                key={card.id}
                                className="desktop-utopia-card desktop-utopia-card-empty"
                                style={{ '--utopia-card-index': index }}
                              >
                                <span className="desktop-utopia-card-edit" aria-hidden="true">
                                  <EditIcon />
                                </span>
                                <span className="desktop-utopia-card-title">{card.title}</span>
                              </button>
                            ))}
                            <div className="desktop-upload-picker desktop-utopia-upload-picker">
                              <button type="button" className="desktop-upload-card">
                                <span className="desktop-upload-edit" aria-hidden="true">
                                  <EditIcon />
                                </span>
                                <span className="desktop-upload-title">雰囲気</span>
                                <span className="desktop-upload-plus">
                                  <PlusIcon size={28} />
                                </span>
                                <span className="desktop-upload-primary">Upload Image</span>
                                <span className="desktop-upload-secondary">or change</span>
                              </button>
                              <div className="desktop-upload-menu" role="menu" aria-label="Upload options">
                                {UPLOAD_ACTIONS.map((action) => (
                                  <button type="button" className="desktop-upload-menu-item" key={action.id} role="menuitem">
                                    <span className="desktop-upload-menu-icon">
                                      {action.icon === 'camera' ? <CameraIcon /> : <ImageIcon />}
                                    </span>
                                    <span className="desktop-upload-menu-copy">
                                      <span className="desktop-upload-menu-title">{action.title}</span>
                                      <span className="desktop-upload-menu-detail">{action.detail}</span>
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button type="button" className="desktop-utopia-generate-button">
                            <SparkleIcon />
                            <span>Generate Utopia</span>
                          </button>
                        </div>
                      </div>
                    </section>
                  )}
                </main>
              </div>
            </div>
          </div>

          {isCollectionView ? (
            <button type="button" aria-label="Add task" className="desktop-floating-add-button">
              <PlusIcon />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
