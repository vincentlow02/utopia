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

export function UtopiaCollectionScreen() {
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

        <button type="button" className="utopia-collection__user-button" aria-label="Open user menu" data-node-id="3:154">
          Q
        </button>
      </header>

      <section className="utopia-collection__grid" aria-label="Gallery collection" data-node-id="3:155" data-name="GalleryGrid">
        {galleryItems.map((item) => (
          <button type="button" className="utopia-collection__paper" aria-label="Open gallery item" key={item.id} />
        ))}
      </section>
    </main>
  )
}
