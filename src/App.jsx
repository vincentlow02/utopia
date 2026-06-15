import { useState } from 'react';

const DESKTOP_APP_WINDOW_SCALE = 0.8;

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%238cb6ff'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%235d74d6'/%3E%3Cpath d='M14 54c3.4-12 11-18 18-18s14.6 6 18 18' fill='%235d74d6'/%3E%3C/svg%3E";

const GENERATED_COLLECTION_ITEMS = Array.from({ length: 10 }, (_, index) => ({
  id: `generated-photo-${index + 1}`,
  tone: index % 4,
}));

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
              <button type="button" className="desktop-header-icon-button">
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
                <main className="desktop-collection-view" style={{ flex: 1, minHeight: 0 }}>
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
                    <section className="desktop-utopia-blank-surface" aria-label="Utopia" />
                  )}
                </main>
              </div>
            </div>
          </div>

          <button type="button" aria-label="Add task" className="desktop-floating-add-button">
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
