const DESKTOP_APP_WINDOW_SCALE = 0.8;

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%238cb6ff'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%235d74d6'/%3E%3Cpath d='M14 54c3.4-12 11-18 18-18s14.6 6 18 18' fill='%235d74d6'/%3E%3C/svg%3E";

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

const WorkspaceChevronIcon = ({ open = false }) => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d={open ? 'M5 12.5 10 7.5 15 12.5' : 'M5 7.5 10 12.5 15 7.5'}
      stroke="currentColor"
      strokeWidth="1.7"
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
              <div className="desktop-workspace-shell">
                <button type="button" className="desktop-workspace-name-button">
                  <span className="desktop-workspace-trigger-label">Untitled 3</span>
                </button>
                <button type="button" className="desktop-workspace-menu-button" aria-haspopup="menu" aria-expanded="false">
                  <span className="desktop-workspace-trigger-chevron">
                    <WorkspaceChevronIcon />
                  </span>
                </button>
              </div>
            </div>

            <div className="desktop-minimal-date-nav-wrap">
              <div className="desktop-minimal-date-nav" role="group" aria-label="View navigation">
                <button type="button" className="desktop-minimal-date-nav-button" aria-label="Show Canvas" aria-pressed="false">
                  <HeaderChevronIcon direction="left" />
                </button>
                <button type="button" className="desktop-minimal-date-nav-label" aria-label="Collection View">
                  Collection View
                </button>
                <button type="button" className="desktop-minimal-date-nav-button is-active" aria-label="Show Collection View" aria-pressed="true">
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
                  <section className="desktop-collection-empty-state" aria-label="Collection View">
                    <h1>Collection View</h1>
                    <p>Collections in this workspace will appear here.</p>
                  </section>
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
