import { useMemo, useState } from 'react';
import { looseItems, packs } from './mockData.js';

const MAX_PREVIEW_ITEMS = 6;

const itemTypeMeta = {
  pdf: { label: 'PDF', color: '#F42632', bg: '#FFE1E4', icon: PdfIcon },
  text: { label: 'Text', color: '#F4A51C', bg: '#FFF0D2', icon: TextIcon },
  link: { label: 'Link', color: '#8E64FF', bg: '#EFE8FF', icon: LinkIcon },
  doc: { label: 'Doc', color: '#A43AF6', bg: '#F1DEFF', icon: DocumentIcon },
  image: { label: 'Image', color: '#2EAD68', bg: '#DFF4E8', icon: ImageIcon },
};

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7z" fill="currentColor" />
      <path d="M14 3v5h5" fill="rgba(255,255,255,0.35)" />
      <text x="7.4" y="16" fill="#fff" fontSize="5.2" fontWeight="800">PDF</text>
    </svg>
  );
}

function TextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor" />
      <path d="M8 8.5h8M12 8.5v7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.4 14.6l5.2-5.2M10.6 7.2l1.1-1.1a4 4 0 015.7 5.7l-1.1 1.1M13.4 16.8l-1.1 1.1a4 4 0 01-5.7-5.7l1.1-1.1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7z" fill="currentColor" />
      <path d="M14 3v5h5" fill="rgba(255,255,255,0.36)" />
      <path d="M9 12h7M9 15h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="3" fill="currentColor" />
      <path d="M7 16l3.1-3.1 2.2 2.2 2.8-3.5L18 16" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.3" fill="#fff" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="18" cy="5" r="2.4" fill="currentColor" />
      <circle cx="6" cy="12" r="2.4" fill="currentColor" />
      <circle cx="18" cy="19" r="2.4" fill="currentColor" />
      <path d="M8.2 10.9L15.8 6.1M8.2 13.1L15.8 17.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8H5.8C4.8 8 4 8.8 4 9.8v8.4C4 19.2 4.8 20 5.8 20h8.4c1 0 1.8-.8 1.8-1.8V16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.8 4h8.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H9.8C8.8 16 8 15.2 8 14.2V5.8C8 4.8 8.8 4 9.8 4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 18L18 6M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ItemIcon({ type }) {
  const meta = itemTypeMeta[type] || itemTypeMeta.text;
  const Icon = meta.icon;

  return (
    <span className="item-icon" style={{ '--icon-bg': meta.bg, '--icon-color': meta.color }} aria-hidden="true">
      <Icon />
    </span>
  );
}

function filterByQuery(query, packList, itemList) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return { filteredPacks: packList, filteredItems: itemList };
  }

  const filteredPacks = packList
    .map((pack) => {
      const matchingItems = pack.items.filter((item) => item.title.toLowerCase().includes(normalized));
      const packMatches = pack.title.toLowerCase().includes(normalized) || pack.description.toLowerCase().includes(normalized);
      return packMatches ? pack : { ...pack, items: matchingItems };
    })
    .filter((pack) => pack.title.toLowerCase().includes(normalized) || pack.description.toLowerCase().includes(normalized) || pack.items.length > 0);

  const filteredItems = itemList.filter((item) => (
    item.title.toLowerCase().includes(normalized) || item.source.toLowerCase().includes(normalized)
  ));

  return { filteredPacks, filteredItems };
}

function PackCard({ pack, onShare }) {
  const previewItems = pack.items.slice(0, MAX_PREVIEW_ITEMS);
  const hiddenCount = Math.max(0, pack.items.length - previewItems.length);

  return (
    <article className="pack-card">
      <div className="pack-card-header">
        <div>
          <h2>{pack.title}</h2>
          <p>{pack.description}</p>
        </div>
        <div className="pack-actions">
          <span className="count-pill">{pack.items.length} {pack.items.length === 1 ? 'item' : 'items'}</span>
          <button className="text-action" type="button">Export</button>
          <button className="icon-action" type="button" aria-label={`Share ${pack.title}`} onClick={() => onShare(pack)}>
            <ShareIcon />
          </button>
        </div>
      </div>

      <div className="pack-preview-grid">
        {previewItems.map((item) => (
          <button className="preview-item" type="button" key={item.id}>
            <ItemIcon type={item.type} />
            <span>{item.title}</span>
          </button>
        ))}
        {hiddenCount > 0 ? <span className="more-count">+ {hiddenCount} more</span> : null}
      </div>
    </article>
  );
}

function LooseItem({ item }) {
  return (
    <button className="loose-item" type="button">
      <ItemIcon type={item.type} />
      <span className="loose-item-title">{item.title}</span>
      <span className="loose-item-source">{item.source}</span>
    </button>
  );
}

function ShareLinkModal({ pack, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!pack) return null;

  const shareUrl = `${window.location.origin}/share/${pack.id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="share-overlay" role="presentation" onClick={onClose}>
      <section className="share-modal" role="dialog" aria-modal="true" aria-label={`${pack.title} share link`} onClick={(event) => event.stopPropagation()}>
        <div className="share-header">
          <h2>{pack.title}</h2>
          <button type="button" className="share-close" aria-label="Close share modal" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="share-divider" />

        <div className="share-link-row">
          <span title={shareUrl}>{shareUrl}</span>
          <button type="button" onClick={copyLink}>
            <CopyIcon />
            {copied ? '\u30b3\u30d4\u30fc\u6e08\u307f' : '\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc'}
          </button>
        </div>

        <div className="share-note">
          <span className="info-dot">i</span>
          <p>
            {'\u516c\u958b\u30ea\u30f3\u30af\u306f\u8ab0\u3067\u3082\u30a2\u30af\u30bb\u30b9\u53ef\u80fd\u3067\u3059\u3002\u5171\u6709\u306f'}
            <strong>{'\u81ea\u5df1\u8cac\u4efb'}</strong>
            {'\u3067\u884c\u3063\u3066\u304f\u3060\u3055\u3044\u3002'}
            <strong>{'\u524a\u9664'}</strong>
            {'\u306f\u3044\u3064\u3067\u3082\u53ef\u80fd\u3067\u3059\u3002\u7b2c\u4e09\u8005\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u3067\u5171\u6709\u3059\u308b\u5834\u5408\u3001\u305d\u306e\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u30dd\u30ea\u30b7\u30fc\u304c\u9069\u7528\u3055\u308c\u307e\u3059\u3002'}
          </p>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sharePack, setSharePack] = useState(null);

  const { filteredPacks, filteredItems } = useMemo(() => (
    filterByQuery(query, packs, looseItems)
  ), [query]);

  const visiblePacks = activeTab === 'items' ? [] : filteredPacks;
  const visibleItems = activeTab === 'packs' ? [] : filteredItems;

  return (
    <main className="app-shell">
      <section className="collection-panel" aria-label="Collection View">
        <header className="collection-header">
          <div>
            <span className="eyebrow">IntoDay Prototype</span>
            <h1>Collection View</h1>
          </div>
          <div className="summary-chip">{filteredPacks.length} packs / {filteredItems.length} items</div>
        </header>

        <div className="search-bar">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search packs and items"
            aria-label="Search collections"
          />
        </div>

        <nav className="tabs" aria-label="Collection filters">
          {['all', 'packs', 'items'].map((tab) => (
            <button
              type="button"
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="collection-content">
          {visiblePacks.length === 0 && visibleItems.length === 0 ? (
            <div className="empty-state">
              <h2>No matching collections</h2>
              <p>Try a different search term or switch filters.</p>
            </div>
          ) : null}

          {visiblePacks.length > 0 ? (
            <section className="result-section">
              <div className="section-label">Packs</div>
              <div className="pack-list">
                {visiblePacks.map((pack) => (
                  <PackCard key={pack.id} pack={pack} onShare={setSharePack} />
                ))}
              </div>
            </section>
          ) : null}

          {visibleItems.length > 0 ? (
            <section className="result-section">
              <div className="section-label">Items</div>
              <div className="loose-list">
                {visibleItems.map((item) => <LooseItem key={item.id} item={item} />)}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <ShareLinkModal pack={sharePack} onClose={() => setSharePack(null)} />
    </main>
  );
}
