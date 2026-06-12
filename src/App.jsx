function HeaderChevronIcon({ direction }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M8.75 3.5L5.25 7L8.75 10.5' : 'M5.25 3.5L8.75 7L5.25 10.5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path
        d="M16.625 16.625L13.1812 13.1812M15.0417 8.70833C15.0417 12.2061 12.2061 15.0417 8.70833 15.0417C5.21053 15.0417 2.375 12.2061 2.375 8.70833C2.375 5.21053 5.21053 2.375 8.70833 2.375C12.2061 2.375 15.0417 5.21053 15.0417 8.70833Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  return (
    <main className="desktop-shell" aria-label="IntoDay Collection View prototype">
      <header className="desktop-topbar">
        <div className="workspace-control">
          <button className="workspace-name" type="button">
            <span>Untitled 3</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4.5 5.75L7 8.25L9.5 5.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className="view-nav" aria-label="View navigation">
          <button className="view-nav-button" type="button" aria-label="Show Canvas" aria-pressed="false">
            <HeaderChevronIcon direction="left" />
          </button>
          <button className="view-nav-label" type="button" aria-label="Collection View">
            Collection View
          </button>
          <button className="view-nav-button is-active" type="button" aria-label="Show Collection View" aria-pressed="true">
            <HeaderChevronIcon direction="right" />
          </button>
        </nav>

        <div className="topbar-actions">
          <button className="round-button" type="button" aria-label="Search">
            <SearchIcon />
          </button>
          <button className="avatar-button" type="button" aria-label="Q X">
            <span>q</span>
          </button>
        </div>
      </header>

      <section className="collection-view" aria-label="Collection View">
        <div className="collection-empty-state">
          <h1>Collection View</h1>
          <p>Collections in this workspace will appear here.</p>
        </div>
      </section>
    </main>
  );
}
