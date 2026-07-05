import { useEffect, useState } from 'react'
import cameraIconUrl from '../../../assets/icons/utopia/camera.svg'
import chevronLeftIconUrl from '../../../assets/icons/utopia/chevron-left.svg'
import chevronRightIconUrl from '../../../assets/icons/utopia/chevron-right.svg'
import functionIconUrl from '../../../assets/icons/utopia/function.svg'
import furnitureIconUrl from '../../../assets/icons/utopia/furniture.svg'
import headerHintIconUrl from '../../../assets/icons/utopia/header-hint.svg'
import libraryCloseIconUrl from '../../../assets/icons/utopia/library-close.svg'
import libraryFilterIconUrl from '../../../assets/icons/utopia/library-filter.svg'
import librarySearchIconUrl from '../../../assets/icons/utopia/library-search.svg'
import materialIconUrl from '../../../assets/icons/utopia/material.svg'
import moodIconUrl from '../../../assets/icons/utopia/mood.svg'
import naturalIconUrl from '../../../assets/icons/utopia/natural.svg'
import removeMaterialIconUrl from '../../../assets/icons/utopia/remove-material.svg'
import sendPhoneIconUrl from '../../../assets/icons/utopia/send-phone.svg'
import sparkleIconUrl from '../../../assets/icons/utopia/sparkle.svg'
import takePhotoIconUrl from '../../../assets/icons/utopia/take-photo.svg'
import uploadImageIconUrl from '../../../assets/icons/utopia/upload-image.svg'
import andesitePebbleImageUrl from '../../../assets/images/utopia-library/andesite-pebble.png'
import linenFabricImageUrl from '../../../assets/images/utopia-library/linen-fabric.png'
import oakWoodImageUrl from '../../../assets/images/utopia-library/oak-wood.png'
import paperLanternImageUrl from '../../../assets/images/utopia-library/paper-lantern.png'
import sphereImageUrl from '../../../assets/images/utopia-library/sphere.png'
import './UtopiaCollectionScreen.css'

const galleryItems = Array.from({ length: 10 }, (_, index) => ({
  id: `utopia-gallery-paper-${index + 1}`,
}))

const languageOptions = [
  { code: 'EN', label: 'English' },
  { code: 'JA', label: '日本語' },
  { code: 'SC', label: '简体中文' },
  { code: 'TC', label: '繁體中文' },
  { code: 'TH', label: 'ไทย' },
] as const

const utopiaElementCards = [
  { id: 'function', title: 'Function', description: 'what the space for it', iconUrl: functionIconUrl },
  { id: 'material', title: 'Material', description: 'what it is made of', iconUrl: materialIconUrl },
  { id: 'mood', title: 'Mood', description: 'How it feels', iconUrl: moodIconUrl },
  { id: 'furniture', title: 'Furniture', description: 'How it furnished', iconUrl: furnitureIconUrl },
  { id: 'natural', title: 'Natural', description: 'How nature appears', iconUrl: naturalIconUrl },
] as const

const elementMenuOptions = [
  { id: 'upload-image', label: 'Upload Image', iconUrl: uploadImageIconUrl },
  { id: 'take-photo', label: 'Take Photo', iconUrl: takePhotoIconUrl },
  { id: 'send-phone', label: 'Send from phone', iconUrl: sendPhoneIconUrl },
] as const

const libraryCategories = ['すべて', '素材', '自然', '形', '質感', 'その他'] as const

const libraryItems = [
  {
    id: 'oak-wood',
    title: 'オーク材',
    subtitle: 'Oak Wood',
    imageUrl: oakWoodImageUrl,
  },
  {
    id: 'andesite-pebble',
    title: '安山岩の玉石',
    subtitle: 'Andesite pebble',
    imageUrl: andesitePebbleImageUrl,
  },
  {
    id: 'sphere',
    title: '球体',
    subtitle: 'Sphere',
    imageUrl: sphereImageUrl,
  },
  {
    id: 'linen-fabric',
    title: 'リネン生地',
    subtitle: 'Linen Fabric',
    imageUrl: linenFabricImageUrl,
  },
  {
    id: 'paper-lantern',
    title: '和紙',
    subtitle: 'Paper Lantern',
    imageUrl: paperLanternImageUrl,
  },
] as const

type LanguageOption = (typeof languageOptions)[number]
type LibraryItem = (typeof libraryItems)[number]
type UtopiaElementId = (typeof utopiaElementCards)[number]['id']
type UtopiaElementAssignments = Partial<Record<UtopiaElementId, LibraryItem>>
type UtopiaView = 'collection' | 'utopia'

type ChevronIconProps = {
  direction: 'left' | 'right'
}

function ChevronIcon({ direction }: ChevronIconProps) {
  const iconUrl = direction === 'left' ? chevronLeftIconUrl : chevronRightIconUrl

  return (
    <img
      aria-hidden="true"
      className="utopia-collection__chevron"
      src={iconUrl}
      alt=""
    />
  )
}

function HeaderHintIcon() {
  return (
    <img aria-hidden="true" className="utopia-collection__header-hint" src={headerHintIconUrl} alt="" />
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
      <path
        d="M3.2 8H12.8M8 2.9C9.35 4.28 10.04 5.98 10.04 8S9.35 11.72 8 13.1M8 2.9C6.65 4.28 5.96 5.98 5.96 8S6.65 11.72 8 13.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__item-icon" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.4 3.7H6.7C7.42 3.7 8 4.28 8 5V12.2C8 11.48 7.42 10.9 6.7 10.9H3.4V3.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        d="M12.6 3.7H9.3C8.58 3.7 8 4.28 8 5V12.2C8 11.48 8.58 10.9 9.3 10.9H12.6V3.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg aria-hidden="true" className="utopia-account-panel__item-icon" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6.55 6.55C6.65 5.7 7.22 5.2 8.06 5.2C8.94 5.2 9.5 5.72 9.5 6.46C9.5 7.08 9.17 7.45 8.55 7.82C8.12 8.08 7.94 8.33 7.94 8.85V9.12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
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
      <path
        d="M6.8 3.2H4.6C4.05 3.2 3.6 3.65 3.6 4.2V11.8C3.6 12.35 4.05 12.8 4.6 12.8H6.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path d="M7.35 8H12.35M10.35 5.95L12.4 8L10.35 10.05" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="utopia-language-menu__check" viewBox="0 0 7 6" fill="none">
      <path d="M1 3.05L2.6 4.65L6 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  )
}

function CameraIcon() {
  return <img aria-hidden="true" className="utopia-home__camera-icon" src={cameraIconUrl} alt="" />
}

function SparkleIcon() {
  return <img aria-hidden="true" className="utopia-home__generate-icon" src={sparkleIconUrl} alt="" />
}

type ElementActionMenuProps = {
  elementTitle: string
}

function ElementActionMenu({ elementTitle }: ElementActionMenuProps) {
  return (
    <div className="utopia-element-menu" role="menu" aria-label={`${elementTitle} input options`} data-node-id="266:528" data-name="exportmenu">
      <div className="utopia-element-menu__options" data-node-id="266:529">
        {elementMenuOptions.map((option) => (
          <button type="button" className="utopia-element-menu__option" role="menuitem" key={option.id}>
            <img
              aria-hidden="true"
              className={`utopia-element-menu__icon utopia-element-menu__icon--${option.id}`}
              src={option.iconUrl}
              alt=""
            />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

type ObjectLibraryPanelProps = {
  onMaterialDragStart: (item: LibraryItem) => void
}

function ObjectLibraryPanel({ onMaterialDragStart }: ObjectLibraryPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof libraryCategories)[number]>('すべて')

  return (
    <aside className="utopia-object-library" aria-label="Object library" data-node-id="286:597">
      <div className="utopia-object-library__content" data-node-id="287:842">
        <header className="utopia-object-library__header" data-node-id="286:599">
          <h2>オブジェクトライブラリ</h2>
          <span className="utopia-object-library__close-button" aria-hidden="true">
            <img src={libraryCloseIconUrl} alt="" />
          </span>
        </header>

        <div className="utopia-object-library__controls" data-node-id="286:603">
          <div className="utopia-object-library__search-row" data-node-id="286:604">
            <label className="utopia-object-library__search" data-node-id="286:605">
              <img aria-hidden="true" src={librarySearchIconUrl} alt="" />
              <span>検索する</span>
            </label>
            <button type="button" className="utopia-object-library__filter-button" aria-label="Filter object library" data-node-id="286:608">
              <img aria-hidden="true" src={libraryFilterIconUrl} alt="" />
            </button>
          </div>

          <div className="utopia-object-library__tabs" aria-label="Object categories" data-node-id="286:610">
            {libraryCategories.map((category) => (
              <button
                type="button"
                className="utopia-object-library__tab"
                data-selected={selectedCategory === category}
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="utopia-object-library__grid" data-node-id="287:841">
          {libraryItems.map((item) => (
            <button
              type="button"
              className="utopia-object-library__card"
              data-item-id={item.id}
              draggable
              key={item.id}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = 'copy'
                event.dataTransfer.setData('application/x-utopia-library-item', item.id)
                event.dataTransfer.setData('text/plain', item.title)
                onMaterialDragStart(item)
              }}
            >
              <span className="utopia-object-library__image-wrap">
                <img src={item.imageUrl} alt="" />
              </span>
              <span className="utopia-object-library__copy">
                <span>{item.title}</span>
                <span>{item.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

type AccountPanelOverlayProps = {
  onClose: () => void
}

function AccountPanelOverlay({ onClose }: AccountPanelOverlayProps) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(languageOptions[0])

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
          <button
            type="button"
            className="utopia-account-panel__item"
            aria-expanded={isLanguageMenuOpen}
            aria-haspopup="listbox"
            onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
          >
            <span className="utopia-account-panel__item-left">
              <GlobeIcon />
              <span>Language</span>
            </span>
            <span className="utopia-account-panel__item-right">
              <span>{selectedLanguage.code}</span>
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

        {isLanguageMenuOpen ? (
          <div className="utopia-language-menu" role="listbox" aria-label="Language options" data-node-id="266:512" data-name="language options">
            {languageOptions.map((language) => (
              <button
                type="button"
                className="utopia-language-menu__option"
                role="option"
                aria-selected={language.code === selectedLanguage.code}
                key={language.code}
                onClick={() => {
                  setSelectedLanguage(language)
                  setIsLanguageMenuOpen(false)
                }}
              >
                <span>{language.label}</span>
                {language.code === selectedLanguage.code ? <CheckIcon /> : null}
              </button>
            ))}
          </div>
        ) : null}

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

type UtopiaHomeViewProps = {
  assignments: UtopiaElementAssignments
  onDropMaterial: (elementId: UtopiaElementId, itemId: LibraryItem['id']) => void
  onRemoveMaterial: (elementId: UtopiaElementId) => void
}

function UtopiaHomeView({ assignments, onDropMaterial, onRemoveMaterial }: UtopiaHomeViewProps) {
  const [openElementMenu, setOpenElementMenu] = useState<UtopiaElementId | null>(null)
  const [activeDropZone, setActiveDropZone] = useState<UtopiaElementId | null>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenElementMenu(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section className="utopia-home" aria-label="Utopia home" data-node-id="268:210" data-name="utopiahome" onClick={() => setOpenElementMenu(null)}>
      <div className="utopia-home__camera-panel" data-node-id="266:136">
        <div className="utopia-home__camera-content" data-node-id="266:137">
          <CameraIcon />
          <div className="utopia-home__camera-copy" data-node-id="266:141">
            <p>Camera Ready</p>
            <p>物体を円盤の上に置いてください</p>
          </div>
        </div>
      </div>

      <div className="utopia-home__workflow" data-node-id="268:205">
        <div className="utopia-home__elements" data-node-id="266:110">
          {utopiaElementCards.map((card) => {
            const assignedItem = assignments[card.id]

            return (
            <article
              className="utopia-home__element-card"
              data-filled={assignedItem ? 'true' : 'false'}
              data-drop-active={activeDropZone === card.id}
              key={card.id}
              onDragEnter={(event) => {
                event.preventDefault()
                setActiveDropZone(card.id)
              }}
              onDragOver={(event) => {
                event.preventDefault()
                event.dataTransfer.dropEffect = 'copy'
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setActiveDropZone(null)
                }
              }}
              onDrop={(event) => {
                event.preventDefault()
                event.stopPropagation()
                const droppedItemId = event.dataTransfer.getData('application/x-utopia-library-item') as LibraryItem['id']
                if (droppedItemId) {
                  onDropMaterial(card.id, droppedItemId)
                }
                setActiveDropZone(null)
                setOpenElementMenu(null)
              }}
            >
              <button
                type="button"
                className="utopia-home__element-trigger"
                aria-haspopup="menu"
                aria-expanded={openElementMenu === card.id}
                onClick={(event) => {
                  event.stopPropagation()
                  setOpenElementMenu((currentElement) => (currentElement === card.id ? null : card.id))
                }}
              >
                {assignedItem ? (
                  <>
                    <span className="utopia-home__dropped-image-wrap" data-item-id={assignedItem.id}>
                      <img src={assignedItem.imageUrl} alt="" />
                    </span>
                    <span className="utopia-home__dropped-copy">
                      <span>{assignedItem.title}</span>
                      <span>{card.title}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      aria-hidden="true"
                      className={`utopia-home__element-icon utopia-home__element-icon--${card.id}`}
                      src={card.iconUrl}
                      alt=""
                    />
                    <div className="utopia-home__element-copy">
                      <h2>{card.title}</h2>
                      <p>{card.description}</p>
                    </div>
                  </>
                )}
              </button>

              {assignedItem ? (
                <button
                  type="button"
                  className="utopia-home__remove-material-button"
                  aria-label={`Remove ${assignedItem.subtitle} from ${card.title}`}
                  data-node-id="287:959"
                  onClick={(event) => {
                    event.stopPropagation()
                    onRemoveMaterial(card.id)
                    setOpenElementMenu(null)
                  }}
                >
                  <img aria-hidden="true" src={removeMaterialIconUrl} alt="" />
                </button>
              ) : null}

              {openElementMenu === card.id ? <ElementActionMenu elementTitle={card.title} /> : null}
            </article>
            )
          })}
        </div>

        <button type="button" className="utopia-home__generate-button" data-node-id="266:144">
          <SparkleIcon />
          <span>Generate Image</span>
        </button>
      </div>
    </section>
  )
}

export function UtopiaCollectionScreen() {
  const [isAccountPanelOpen, setIsAccountPanelOpen] = useState(false)
  const [isObjectLibraryOpen, setIsObjectLibraryOpen] = useState(false)
  const [draggedLibraryItem, setDraggedLibraryItem] = useState<LibraryItem | null>(null)
  const [elementAssignments, setElementAssignments] = useState<UtopiaElementAssignments>({})
  const [activeView, setActiveView] = useState<UtopiaView>('collection')
  const switcherLabel = activeView === 'collection' ? 'Collection' : 'Utopia'
  const titleLabel = activeView === 'collection' ? 'Gallery' : 'Hello'

  function handleDropMaterial(elementId: UtopiaElementId, itemId: LibraryItem['id']) {
    const droppedItem = libraryItems.find((item) => item.id === itemId) ?? draggedLibraryItem

    if (!droppedItem) {
      return
    }

    setElementAssignments((currentAssignments) => ({
      ...currentAssignments,
      [elementId]: droppedItem,
    }))
    setDraggedLibraryItem(null)
  }

  function handleRemoveMaterial(elementId: UtopiaElementId) {
    setElementAssignments((currentAssignments) => {
      const nextAssignments = { ...currentAssignments }
      delete nextAssignments[elementId]
      return nextAssignments
    })
  }

  return (
    <main
      className="utopia-collection"
      data-node-id="3:150"
      data-name="collectionpage"
      data-active-view={activeView}
      data-library-open={isObjectLibraryOpen}
    >
      {activeView === 'utopia' && isObjectLibraryOpen ? <ObjectLibraryPanel onMaterialDragStart={setDraggedLibraryItem} /> : null}

      <div className="utopia-collection__stage">
        <header className="utopia-collection__header" data-node-id="268:211">
          <div className="utopia-collection__header-side utopia-collection__header-side--left" data-node-id="268:225">
            <h1 className="utopia-collection__title" data-node-id="268:300">
              {titleLabel}
            </h1>
            {activeView === 'utopia' ? (
              <button
                type="button"
                className="utopia-collection__header-hint-button"
                aria-label="Show object library"
                onClick={() => setIsObjectLibraryOpen(true)}
              >
                <HeaderHintIcon />
              </button>
            ) : null}
          </div>

          <div className="utopia-collection__header-center" data-node-id="268:227">
            <nav className="utopia-collection__switcher" aria-label="Collection navigation" data-node-id="268:213">
              <button
                type="button"
                className="utopia-collection__switcher-button"
                aria-label="Show Utopia home"
                onClick={() => {
                  setActiveView('utopia')
                  setIsObjectLibraryOpen(false)
                }}
              >
                <ChevronIcon direction="left" />
              </button>
              <span className="utopia-collection__switcher-label">{switcherLabel}</span>
              <button
                type="button"
                className="utopia-collection__switcher-button"
                aria-label="Show collection"
                onClick={() => {
                  setActiveView('collection')
                  setIsObjectLibraryOpen(false)
                }}
              >
                <ChevronIcon direction="right" />
              </button>
            </nav>
          </div>

          <div className="utopia-collection__header-side utopia-collection__header-side--right" data-node-id="268:226">
            <button
              type="button"
              className="utopia-collection__user-button"
              aria-label="Open user menu"
              aria-expanded={isAccountPanelOpen}
              data-node-id="257:97"
              onClick={() => setIsAccountPanelOpen(true)}
            >
              Q
            </button>
          </div>
        </header>

        {activeView === 'utopia' ? (
          <UtopiaHomeView
            assignments={elementAssignments}
            onDropMaterial={handleDropMaterial}
            onRemoveMaterial={handleRemoveMaterial}
          />
        ) : (
          <section className="utopia-collection__grid" aria-label="Gallery collection" data-node-id="3:155" data-name="GalleryGrid">
            {galleryItems.map((item) => (
              <button type="button" className="utopia-collection__paper" aria-label="Open gallery item" key={item.id} />
            ))}
          </section>
        )}
      </div>

      {isAccountPanelOpen ? <AccountPanelOverlay onClose={() => setIsAccountPanelOpen(false)} /> : null}
    </main>
  )
}
