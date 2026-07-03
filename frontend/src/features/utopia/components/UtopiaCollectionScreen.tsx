import { useEffect, useState } from 'react'
import './UtopiaCollectionScreen.css'

const galleryItems = Array.from({ length: 10 }, (_, index) => ({
  id: `utopia-gallery-paper-${index + 1}`,
}))

type ChevronIconProps = {
  direction: 'left' | 'right'
}

function ChevronIcon({ direction }: ChevronIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="utopia-collection__chevron"
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === 'left' ? 'M5 1L1 4.5L5 8' : 'M1 1L5 4.5L1 8'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__close-icon" viewBox="0 0 12 12" fill="none">
      <path d="M3.3 3.3L8.7 8.7M8.7 3.3L3.3 8.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__item-icon" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.2 8H12.8M8 2.9C9.35 4.28 10.04 5.98 10.04 8S9.35 11.72 8 13.1M8 2.9C6.65 4.28 5.96 5.98 5.96 8S6.65 11.72 8 13.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__item-icon" viewBox="0 0 16 16" fill="none">
      <path d="M3.4 3.7H6.7C7.42 3.7 8 4.28 8 5V12.2C8 11.48 7.42 10.9 6.7 10.9H3.4V3.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
      <path d="M12.6 3.7H9.3C8.58 3.7 8 4.28 8 5V12.2C8 11.48 8.58 10.9 9.3 10.9H12.6V3.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__item-icon" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.55 6.55C6.65 5.7 7.22 5.2 8.06 5.2C8.94 5.2 9.5 5.72 9.5 6.46C9.5 7.08 9.17 7.45 8.55 7.82C8.12 8.08 7.94 8.33 7.94 8.85V9.12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      <path d="M8 10.85H8.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__arrow-icon" viewBox="0 0 14 14" fill="none">
      <path d="M5.5 3.8L8.7 7L5.5 10.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__logout-icon" viewBox="0 0 16 16" fill="none">
      <path d="M6.8 3.2H4.6C4.05 3.2 3.6 3.65 3.6 4.2V11.8C3.6 12.35 4.05 12.8 4.6 12.8H6.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      <path d="M7.35 8H12.35M10.35 5.95L12.4 8L10.35 10.05" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  )
}

type AccountPanelOverlayProps = {
  onClose: () => void
}

function AccountPanelOverlay({ onClose }: AccountPanelOverlayProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="utopia-account-overlay" role="presentation" onClick={onClose}>
      <section
        className="utopia-account-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Account menu"
        data-node-id="255:119"
        data-name="accountpanel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="utopia-account-panel__close-row" data-node-id="255:120" data-name="closebutton">
          <button type="button" className="utopia-account-panel__close-button" aria-label="Close account menu" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="utopia-account-panel__profile" data-node-id="255:122" data-name="profilesection">
          <div className="utopia-account-panel__avatar" aria-hidden="true" />
          <h2 className="utopia-account-panel__name">Q X</h2>
          <p className="utopia-account-panel__email">lowvincent8@gmail.com</p>
        </div>

        <div className="utopia-account-panel__card" data-node-id="255:137" data-name="settingcard">
          <button type="button" className="utopia-account-panel__item">
            <span className="utopia-account-panel__item-left">
              <GlobeIcon />
              <span>Language</span>
            </span>
            <span className="utopia-account-panel__item-right">
              <span>EN</span>
              <ArrowIcon />
            </span>
          </button>
          <button type="button" className="utopia-account-panel__item utopia-account-panel__item--bordered">
            <span className="utopia-account-panel__item-left">
              <BookIcon />
              <span>About Utopia</span>
            </span>
            <ArrowIcon />
          </button>
        </div>

        <div className="utopia-account-panel__card utopia-account-panel__card--single" data-node-id="255:175" data-name="helpcard">
          <button type="button" className="utopia-account-panel__item">
            <span className="utopia-account-panel__item-left">
              <HelpIcon />
              <span>{`Help & Feedback`}</span>
            </span>
          </button>
        </div>

        <button type="button" className="utopia-account-panel__logout" data-node-id="255:184" data-name="logout">
          <LogoutIcon />
          <span>Log out</span>
        </button>
      </section>
    </div>
  )
}

export function UtopiaCollectionScreen() {
  const [isAccountPanelOpen, setIsAccountPanelOpen] = useState(false)

  return (
    <main className="utopia-collection" data-node-id="3:150" data-name="collectionpage">
      <header className="utopia-collection__header" data-node-id="3:222" data-name="header">
        <h1 className="utopia-collection__title" data-node-id="3:224">
          Gallery
        </h1>

        <nav className="utopia-collection__switcher" aria-label="Collection navigation" data-node-id="3:153">
          <button type="button" className="utopia-collection__switcher-button" aria-label="Previous collection">
            <ChevronIcon direction="left" />
          </button>
          <span className="utopia-collection__switcher-label">Collection</span>
          <button type="button" className="utopia-collection__switcher-button" aria-label="Next collection">
            <ChevronIcon direction="right" />
          </button>
        </nav>

        <button
          type="button"
          className="utopia-collection__user-button"
          aria-label="Open user menu"
          aria-expanded={isAccountPanelOpen}
          data-node-id="3:154"
          onClick={() => setIsAccountPanelOpen(true)}
        >
          Q
        </button>
      </header>

      <section className="utopia-collection__grid" aria-label="Gallery collection" data-node-id="3:155" data-name="GalleryGrid">
        {galleryItems.map((item) => (
          <button type="button" className="utopia-collection__paper" aria-label="Open gallery item" key={item.id} />
        ))}
      </section>

      {isAccountPanelOpen ? <AccountPanelOverlay onClose={() => setIsAccountPanelOpen(false)} /> : null}
    </main>
  )
}
