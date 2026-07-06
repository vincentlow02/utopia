import { useEffect, useState } from 'react'
import cameraIconUrl from '../../../assets/icons/utopia/camera.svg'
import chevronLeftIconUrl from '../../../assets/icons/utopia/chevron-left.svg'
import chevronRightIconUrl from '../../../assets/icons/utopia/chevron-right.svg'
import andesiteDetailApplicationIconUrl from '../../../assets/icons/utopia/andesite-detail-application.svg'
import andesiteDetailBackIconUrl from '../../../assets/icons/utopia/andesite-detail-back.svg'
import andesiteDetailKeywordsIconUrl from '../../../assets/icons/utopia/andesite-detail-keywords.svg'
import andesiteDetailSpatialIconUrl from '../../../assets/icons/utopia/andesite-detail-spatial.svg'
import detailGestureIconUrl from '../../../assets/icons/utopia/detail-gesture.svg'
import functionIconUrl from '../../../assets/icons/utopia/function.svg'
import furnitureIconUrl from '../../../assets/icons/utopia/furniture.svg'
import headerHintIconUrl from '../../../assets/icons/utopia/header-hint.svg'
import libraryCloseIconUrl from '../../../assets/icons/utopia/library-close.svg'
import libraryFilterIconUrl from '../../../assets/icons/utopia/library-filter.svg'
import librarySearchIconUrl from '../../../assets/icons/utopia/library-search.svg'
import linenDetailApplicationIconUrl from '../../../assets/icons/utopia/linen-detail-application.svg'
import linenDetailBackIconUrl from '../../../assets/icons/utopia/linen-detail-back.svg'
import linenDetailKeywordsIconUrl from '../../../assets/icons/utopia/linen-detail-keywords.svg'
import linenDetailSpatialIconUrl from '../../../assets/icons/utopia/linen-detail-spatial.svg'
import materialIconUrl from '../../../assets/icons/utopia/material.svg'
import moodIconUrl from '../../../assets/icons/utopia/mood.svg'
import naturalIconUrl from '../../../assets/icons/utopia/natural.svg'
import oakDetailApplicationIconUrl from '../../../assets/icons/utopia/oak-detail-application.svg'
import oakDetailBackIconUrl from '../../../assets/icons/utopia/oak-detail-back.svg'
import oakDetailKeywordsIconUrl from '../../../assets/icons/utopia/oak-detail-keywords.svg'
import oakDetailSpatialIconUrl from '../../../assets/icons/utopia/oak-detail-spatial.svg'
import paperDetailApplicationIconUrl from '../../../assets/icons/utopia/paper-detail-application.svg'
import paperDetailBackIconUrl from '../../../assets/icons/utopia/paper-detail-back.svg'
import paperDetailKeywordsIconUrl from '../../../assets/icons/utopia/paper-detail-keywords.svg'
import paperDetailSpatialIconUrl from '../../../assets/icons/utopia/paper-detail-spatial.svg'
import removeMaterialIconUrl from '../../../assets/icons/utopia/remove-material.svg'
import sendPhoneIconUrl from '../../../assets/icons/utopia/send-phone.svg'
import sparkleIconUrl from '../../../assets/icons/utopia/sparkle.svg'
import sphereDetailApplicationIconUrl from '../../../assets/icons/utopia/sphere-detail-application.svg'
import sphereDetailBackIconUrl from '../../../assets/icons/utopia/sphere-detail-back.svg'
import sphereDetailKeywordsIconUrl from '../../../assets/icons/utopia/sphere-detail-keywords.svg'
import sphereDetailSpatialIconUrl from '../../../assets/icons/utopia/sphere-detail-spatial.svg'
import takePhotoIconUrl from '../../../assets/icons/utopia/take-photo.svg'
import uploadImageIconUrl from '../../../assets/icons/utopia/upload-image.svg'
import { libraryCategories, materialsById, utopiaMaterials } from '../data/materials'
import { utopiaThemeDefinitions } from '../data/themes'
import { buildUtopiaPrompt } from '../prompt/buildUtopiaPrompt'
import type {
  LibraryCategoryId,
  MaterialId,
  MaterialMetadata,
  PromptBuildResult,
  UtopiaThemeAssignments,
  UtopiaThemeCardId,
  UtopiaThemeId,
} from '../types'
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

const themeIconUrls = {
  function: functionIconUrl,
  material: materialIconUrl,
  atmosphere: moodIconUrl,
  furniture: furnitureIconUrl,
  nature: naturalIconUrl,
} satisfies Record<UtopiaThemeId, string>

const utopiaElementCards = utopiaThemeDefinitions.map((theme) => ({
  ...theme,
  iconUrl: themeIconUrls[theme.id],
}))

const elementMenuOptions = [
  { id: 'upload-image', iconUrl: uploadImageIconUrl },
  { id: 'take-photo', iconUrl: takePhotoIconUrl },
  { id: 'send-phone', iconUrl: sendPhoneIconUrl },
] as const

const libraryItems = utopiaMaterials

const libraryDetailTotal = 20

type LanguageCode = (typeof languageOptions)[number]['code']
type LibraryItem = MaterialMetadata
type LibraryItemId = MaterialId
type ElementMenuOptionId = (typeof elementMenuOptions)[number]['id']
type UtopiaView = 'collection' | 'utopia'

type UtopiaCopy = {
  pageTitles: Record<UtopiaView, string>
  views: Record<UtopiaView, string>
  navigation: {
    collectionNavigation: string
    showUtopiaHome: string
    showCollection: string
    showObjectLibrary: string
  }
  account: {
    menuLabel: string
    close: string
    language: string
    languageOptions: string
    about: string
    help: string
    logout: string
    openUserMenu: string
  }
  home: {
    aria: string
    cameraReady: string
    cameraInstruction: string
    generate: string
    removeMaterialLabel: string
  }
  elements: Record<UtopiaThemeCardId, { title: string; description: string }>
  elementMenu: {
    ariaSuffix: string
    options: Record<ElementMenuOptionId, string>
  }
  library: {
    aria: string
    title: string
    search: string
    filter: string
    detailAria: string
    detailHint: string
    categories: Record<LibraryCategoryId, string>
    detailTags: Record<LibraryItemId, string>
    items: Record<LibraryItemId, string>
  }
}

const translations = {
  EN: {
    pageTitles: { collection: 'Gallery', utopia: 'Library' },
    views: { collection: 'Collection', utopia: 'Utopia' },
    navigation: {
      collectionNavigation: 'Collection navigation',
      showUtopiaHome: 'Show Utopia home',
      showCollection: 'Show collection',
      showObjectLibrary: 'Show object library',
    },
    account: {
      menuLabel: 'Account menu',
      close: 'Close account menu',
      language: 'Language',
      languageOptions: 'Language options',
      about: 'About Utopia',
      help: 'Help & Feedback',
      logout: 'Log out',
      openUserMenu: 'Open user menu',
    },
    home: {
      aria: 'Utopia home',
      cameraReady: 'Camera Ready',
      cameraInstruction: 'Place the object on the disc',
      generate: 'Generate Image',
      removeMaterialLabel: 'Remove {item} from {element}',
    },
    elements: {
      function: { title: 'Function', description: 'what the space for it' },
      material: { title: 'Material', description: 'what it is made of' },
      mood: { title: 'Mood', description: 'How it feels' },
      furniture: { title: 'Furniture', description: 'How it furnished' },
      natural: { title: 'Natural', description: 'How nature appears' },
    },
    elementMenu: {
      ariaSuffix: 'input options',
      options: {
        'upload-image': 'Upload Image',
        'take-photo': 'Take Photo',
        'send-phone': 'Send from phone',
      },
    },
    library: {
      aria: 'Object library',
      title: 'Object Library',
      search: 'Search',
      filter: 'Filter object library',
      detailAria: 'Material details',
      detailHint: 'Double-click to view details',
      categories: {
        all: 'All',
        material: 'Material',
        nature: 'Nature',
        form: 'Form',
        texture: 'Texture',
        other: 'Other',
      },
      detailTags: {
        'oak-wood': 'Natural material',
        'andesite-pebble': 'Natural material',
        sphere: 'Form',
        'linen-fabric': 'Texture',
        'paper-lantern': 'Other',
      },
      items: {
        'oak-wood': 'Oak Wood',
        'andesite-pebble': 'Andesite Pebble',
        sphere: 'Sphere',
        'linen-fabric': 'Linen Fabric',
        'paper-lantern': 'Paper Lantern',
      },
    },
  },
  JA: {
    pageTitles: { collection: 'ギャラリー', utopia: 'ライブラリ' },
    views: { collection: 'コレクション', utopia: 'Utopia' },
    navigation: {
      collectionNavigation: 'コレクションナビゲーション',
      showUtopiaHome: 'Utopia ホームを表示',
      showCollection: 'コレクションを表示',
      showObjectLibrary: 'オブジェクトライブラリを表示',
    },
    account: {
      menuLabel: 'アカウントメニュー',
      close: 'アカウントメニューを閉じる',
      language: '言語',
      languageOptions: '言語オプション',
      about: 'Utopia について',
      help: 'ヘルプとフィードバック',
      logout: 'ログアウト',
      openUserMenu: 'ユーザーメニューを開く',
    },
    home: {
      aria: 'Utopia ホーム',
      cameraReady: 'Camera Ready',
      cameraInstruction: '物体を円盤の上に置いてください',
      generate: '画像を生成',
      removeMaterialLabel: '{element} から {item} を削除',
    },
    elements: {
      function: { title: 'Function', description: '空間の用途' },
      material: { title: 'Material', description: '何でできているか' },
      mood: { title: 'Mood', description: 'どんな感覚か' },
      furniture: { title: 'Furniture', description: 'どのように備えるか' },
      natural: { title: 'Natural', description: '自然がどう現れるか' },
    },
    elementMenu: {
      ariaSuffix: '入力オプション',
      options: {
        'upload-image': '画像をアップロード',
        'take-photo': '写真を撮る',
        'send-phone': 'スマホから送信',
      },
    },
    library: {
      aria: 'オブジェクトライブラリ',
      title: 'オブジェクトライブラリ',
      search: '検索する',
      filter: 'オブジェクトライブラリを絞り込む',
      detailAria: '素材の詳細',
      detailHint: 'ダブルクリックで詳細を見る',
      categories: {
        all: 'すべて',
        material: '素材',
        nature: '自然',
        form: '形',
        texture: '質感',
        other: 'その他',
      },
      detailTags: {
        'oak-wood': '自然素材',
        'andesite-pebble': '自然素材',
        sphere: '形',
        'linen-fabric': '質感',
        'paper-lantern': 'ほか',
      },
      items: {
        'oak-wood': 'オーク材',
        'andesite-pebble': '安山岩の玉石',
        sphere: '球体',
        'linen-fabric': 'リネン生地',
        'paper-lantern': '和紙',
      },
    },
  },
  SC: {
    pageTitles: { collection: '档案', utopia: '物件库' },
    views: { collection: '收藏', utopia: 'Utopia' },
    navigation: {
      collectionNavigation: '收藏导航',
      showUtopiaHome: '显示 Utopia 首页',
      showCollection: '显示收藏',
      showObjectLibrary: '显示物件库',
    },
    account: {
      menuLabel: '账户菜单',
      close: '关闭账户菜单',
      language: '语言',
      languageOptions: '语言选项',
      about: '关于 Utopia',
      help: '帮助与反馈',
      logout: '退出登录',
      openUserMenu: '打开用户菜单',
    },
    home: {
      aria: 'Utopia 首页',
      cameraReady: '相机准备就绪',
      cameraInstruction: '请将物体放在圆盘上',
      generate: '生成图像',
      removeMaterialLabel: '从{element}删除{item}',
    },
    elements: {
      function: { title: '功能', description: '空间的用途' },
      material: { title: '材质', description: '由什么构成' },
      mood: { title: '氛围', description: '感受如何' },
      furniture: { title: '家具', description: '如何布置' },
      natural: { title: '自然', description: '自然如何出现' },
    },
    elementMenu: {
      ariaSuffix: '输入选项',
      options: {
        'upload-image': '上传图片',
        'take-photo': '拍照',
        'send-phone': '从手机发送',
      },
    },
    library: {
      aria: '物件库',
      title: '物件库',
      search: '搜索',
      filter: '筛选物件库',
      detailAria: '材料详情',
      detailHint: '双击查看详情',
      categories: {
        all: '全部',
        material: '素材',
        nature: '自然',
        form: '形状',
        texture: '质感',
        other: '其他',
      },
      detailTags: {
        'oak-wood': '自然素材',
        'andesite-pebble': '自然素材',
        sphere: '形状',
        'linen-fabric': '质感',
        'paper-lantern': '其他',
      },
      items: {
        'oak-wood': '橡木',
        'andesite-pebble': '安山岩卵石',
        sphere: '球体',
        'linen-fabric': '亚麻布',
        'paper-lantern': '和纸灯笼',
      },
    },
  },
  TC: {
    pageTitles: { collection: '檔案', utopia: '物件庫' },
    views: { collection: '收藏', utopia: 'Utopia' },
    navigation: {
      collectionNavigation: '收藏導覽',
      showUtopiaHome: '顯示 Utopia 首頁',
      showCollection: '顯示收藏',
      showObjectLibrary: '顯示物件庫',
    },
    account: {
      menuLabel: '帳戶選單',
      close: '關閉帳戶選單',
      language: '語言',
      languageOptions: '語言選項',
      about: '關於 Utopia',
      help: '幫助與回饋',
      logout: '登出',
      openUserMenu: '開啟使用者選單',
    },
    home: {
      aria: 'Utopia 首頁',
      cameraReady: '相機準備就緒',
      cameraInstruction: '請將物體放在圓盤上',
      generate: '生成圖像',
      removeMaterialLabel: '從{element}刪除{item}',
    },
    elements: {
      function: { title: '功能', description: '空間的用途' },
      material: { title: '材質', description: '由什麼構成' },
      mood: { title: '氛圍', description: '感受如何' },
      furniture: { title: '家具', description: '如何佈置' },
      natural: { title: '自然', description: '自然如何出現' },
    },
    elementMenu: {
      ariaSuffix: '輸入選項',
      options: {
        'upload-image': '上傳圖片',
        'take-photo': '拍照',
        'send-phone': '從手機傳送',
      },
    },
    library: {
      aria: '物件庫',
      title: '物件庫',
      search: '搜尋',
      filter: '篩選物件庫',
      detailAria: '材料詳情',
      detailHint: '雙擊查看詳情',
      categories: {
        all: '全部',
        material: '素材',
        nature: '自然',
        form: '形狀',
        texture: '質感',
        other: '其他',
      },
      detailTags: {
        'oak-wood': '自然素材',
        'andesite-pebble': '自然素材',
        sphere: '形狀',
        'linen-fabric': '質感',
        'paper-lantern': '其他',
      },
      items: {
        'oak-wood': '橡木',
        'andesite-pebble': '安山岩卵石',
        sphere: '球體',
        'linen-fabric': '亞麻布',
        'paper-lantern': '和紙燈籠',
      },
    },
  },
  TH: {
    pageTitles: { collection: 'แกลเลอรี', utopia: 'คลังวัตถุ' },
    views: { collection: 'คอลเลกชัน', utopia: 'Utopia' },
    navigation: {
      collectionNavigation: 'การนำทางคอลเลกชัน',
      showUtopiaHome: 'แสดงหน้าแรก Utopia',
      showCollection: 'แสดงคอลเลกชัน',
      showObjectLibrary: 'แสดงคลังวัตถุ',
    },
    account: {
      menuLabel: 'เมนูบัญชี',
      close: 'ปิดเมนูบัญชี',
      language: 'ภาษา',
      languageOptions: 'ตัวเลือกภาษา',
      about: 'เกี่ยวกับ Utopia',
      help: 'ความช่วยเหลือและข้อเสนอแนะ',
      logout: 'ออกจากระบบ',
      openUserMenu: 'เปิดเมนูผู้ใช้',
    },
    home: {
      aria: 'หน้าแรก Utopia',
      cameraReady: 'กล้องพร้อมแล้ว',
      cameraInstruction: 'วางวัตถุไว้บนจานวงกลม',
      generate: 'สร้างภาพ',
      removeMaterialLabel: 'ลบ {item} จาก {element}',
    },
    elements: {
      function: { title: 'ฟังก์ชัน', description: 'พื้นที่นี้ใช้ทำอะไร' },
      material: { title: 'วัสดุ', description: 'ทำมาจากอะไร' },
      mood: { title: 'อารมณ์', description: 'ให้ความรู้สึกอย่างไร' },
      furniture: { title: 'เฟอร์นิเจอร์', description: 'จัดวางอย่างไร' },
      natural: { title: 'ธรรมชาติ', description: 'ธรรมชาติปรากฏอย่างไร' },
    },
    elementMenu: {
      ariaSuffix: 'ตัวเลือกอินพุต',
      options: {
        'upload-image': 'อัปโหลดรูปภาพ',
        'take-photo': 'ถ่ายภาพ',
        'send-phone': 'ส่งจากโทรศัพท์',
      },
    },
    library: {
      aria: 'คลังวัตถุ',
      title: 'คลังวัตถุ',
      search: 'ค้นหา',
      filter: 'กรองคลังวัตถุ',
      detailAria: 'รายละเอียดวัสดุ',
      detailHint: 'ดับเบิลคลิกเพื่อดูรายละเอียด',
      categories: {
        all: 'ทั้งหมด',
        material: 'วัสดุ',
        nature: 'ธรรมชาติ',
        form: 'รูปทรง',
        texture: 'พื้นผิว',
        other: 'อื่น ๆ',
      },
      detailTags: {
        'oak-wood': 'วัสดุธรรมชาติ',
        'andesite-pebble': 'วัสดุธรรมชาติ',
        sphere: 'รูปทรง',
        'linen-fabric': 'พื้นผิว',
        'paper-lantern': 'อื่น ๆ',
      },
      items: {
        'oak-wood': 'ไม้โอ๊ก',
        'andesite-pebble': 'กรวดแอนดีไซต์',
        sphere: 'ทรงกลม',
        'linen-fabric': 'ผ้าลินิน',
        'paper-lantern': 'โคมกระดาษ',
      },
    },
  },
} satisfies Record<LanguageCode, UtopiaCopy>

function formatTranslatedLabel(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((label, [key, value]) => label.replace(`{${key}}`, value), template)
}

type OakDetailBackCopy = {
  back: string
  materialLabel: string
  materialValue: string
  keywordsLabel: string
  keywords: string[]
  spatialLabel: string
  spatial: string[]
  applicationLabel: string
  applications: string[]
  aboutTitle: string
  aboutBody: string
}

const oakDetailBackCopies = {
  EN: {
    back: 'Back to material card',
    materialLabel: 'Material',
    materialValue: 'Natural Wood',
    keywordsLabel: 'Keywords',
    keywords: ['Natural', 'Warm', 'Organic'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Calm', 'Comfort', 'Minimal'],
    applicationLabel: 'Typical Application',
    applications: ['Floor', 'Furniture', 'Wall', 'Ceiling'],
    aboutTitle: 'About Oak Wood',
    aboutBody: 'With distinct grain and warm tones, oak wood is suited for creating natural and calm spaces.',
  },
  JA: {
    back: '素材カードに戻る',
    materialLabel: 'Material',
    materialValue: 'Natural Wood',
    keywordsLabel: 'Keywords',
    keywords: ['Natural', 'Warm', 'Organic'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Calm', 'Comfort', 'Minimal'],
    applicationLabel: 'Typical Application',
    applications: ['Floor', 'Furniture', 'Wall', 'Ceiling'],
    aboutTitle: 'About Oak Wood',
    aboutBody: 'はっきりとした木目と温かみのある色合いを持ち、自然で落ち着いた空間をつくるのに適しています。',
  },
  SC: {
    back: '返回材料卡片',
    materialLabel: '材料',
    materialValue: '天然木材',
    keywordsLabel: '关键词',
    keywords: ['自然', '温暖', '有机'],
    spatialLabel: '空间印象',
    spatial: ['平静', '舒适', '极简'],
    applicationLabel: '典型应用',
    applications: ['地板', '家具', '墙面', '天花板'],
    aboutTitle: '关于橡木',
    aboutBody: '橡木具有清晰木纹与温暖色调，适合营造自然、安静且舒适的空间。',
  },
  TC: {
    back: '返回材料卡片',
    materialLabel: '材料',
    materialValue: '天然木材',
    keywordsLabel: '關鍵詞',
    keywords: ['自然', '溫暖', '有機'],
    spatialLabel: '空間印象',
    spatial: ['平靜', '舒適', '極簡'],
    applicationLabel: '典型應用',
    applications: ['地板', '家具', '牆面', '天花板'],
    aboutTitle: '關於橡木',
    aboutBody: '橡木具有清晰木紋與溫暖色調，適合營造自然、安靜且舒適的空間。',
  },
  TH: {
    back: 'กลับไปที่การ์ดวัสดุ',
    materialLabel: 'วัสดุ',
    materialValue: 'ไม้ธรรมชาติ',
    keywordsLabel: 'คำสำคัญ',
    keywords: ['ธรรมชาติ', 'อบอุ่น', 'ออร์แกนิก'],
    spatialLabel: 'ความรู้สึกของพื้นที่',
    spatial: ['สงบ', 'สบาย', 'มินิมัล'],
    applicationLabel: 'การใช้งานทั่วไป',
    applications: ['พื้น', 'เฟอร์นิเจอร์', 'ผนัง', 'เพดาน'],
    aboutTitle: 'เกี่ยวกับไม้โอ๊ก',
    aboutBody: 'ไม้โอ๊กมีลายไม้ชัดเจนและโทนสีอบอุ่น เหมาะสำหรับสร้างพื้นที่ที่เป็นธรรมชาติและสงบ',
  },
} satisfies Record<LanguageCode, OakDetailBackCopy>

const andesiteDetailBackCopies = {
  EN: {
    back: 'Back to material card',
    materialLabel: 'Material',
    materialValue: 'Andesite Pebble',
    keywordsLabel: 'Keywords',
    keywords: ['Natural', 'Solid', 'Organic'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Calm', 'Stable', 'Zen'],
    applicationLabel: 'Typical Application',
    applications: ['Garden', 'Furniture', 'Entrance', 'Decoration'],
    aboutTitle: 'About Andestie Pebble',
    aboutBody: 'With natural roundness and a weighted texture, andesite pebbles are suited for quiet, stable spaces. Used in gardens or near floors, they create a calm natural impression.',
  },
  JA: {
    back: '素材カードに戻る',
    materialLabel: 'Material',
    materialValue: 'Andesite Pebble',
    keywordsLabel: 'Keywords',
    keywords: ['Natural', 'Solid', 'Organic'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Calm', 'Stable', 'Zen'],
    applicationLabel: 'Typical Application',
    applications: ['Garden', 'Furniture', 'Entrance', 'Decoration'],
    aboutTitle: 'About Andestie Pebble',
    aboutBody: '自然な丸みと重みのある質感を持ち、静かで安定感のある空間をつくるのに適しています。庭や床まわりに取り入れることで、落ち着いた自然の印象を与えます',
  },
  SC: {
    back: '返回材料卡片',
    materialLabel: '材料',
    materialValue: '安山岩卵石',
    keywordsLabel: '关键词',
    keywords: ['自然', '坚实', '有机'],
    spatialLabel: '空间印象',
    spatial: ['平静', '稳定', '禅意'],
    applicationLabel: '典型应用',
    applications: ['庭院', '家具', '入口', '装饰'],
    aboutTitle: '关于安山岩卵石',
    aboutBody: '安山岩卵石具有自然圆润的形态与沉稳质感，适合营造安静且稳定的空间。用于庭院或地面周边时，会带来沉静的自然印象。',
  },
  TC: {
    back: '返回材料卡片',
    materialLabel: '材料',
    materialValue: '安山岩卵石',
    keywordsLabel: '關鍵詞',
    keywords: ['自然', '堅實', '有機'],
    spatialLabel: '空間印象',
    spatial: ['平靜', '穩定', '禪意'],
    applicationLabel: '典型應用',
    applications: ['庭院', '家具', '入口', '裝飾'],
    aboutTitle: '關於安山岩卵石',
    aboutBody: '安山岩卵石具有自然圓潤的形態與沉穩質感，適合營造安靜且穩定的空間。用於庭院或地面周邊時，會帶來沉靜的自然印象。',
  },
  TH: {
    back: 'กลับไปที่การ์ดวัสดุ',
    materialLabel: 'วัสดุ',
    materialValue: 'กรวดแอนดีไซต์',
    keywordsLabel: 'คำสำคัญ',
    keywords: ['ธรรมชาติ', 'มั่นคง', 'ออร์แกนิก'],
    spatialLabel: 'ความรู้สึกของพื้นที่',
    spatial: ['สงบ', 'มั่นคง', 'เซน'],
    applicationLabel: 'การใช้งานทั่วไป',
    applications: ['สวน', 'เฟอร์นิเจอร์', 'ทางเข้า', 'ของตกแต่ง'],
    aboutTitle: 'เกี่ยวกับกรวดแอนดีไซต์',
    aboutBody: 'กรวดแอนดีไซต์มีรูปทรงกลมตามธรรมชาติและสัมผัสที่มีน้ำหนัก เหมาะสำหรับพื้นที่ที่สงบและมั่นคง เมื่อนำไปใช้ในสวนหรือบริเวณพื้น จะให้ความรู้สึกเป็นธรรมชาติที่นิ่งสงบ',
  },
} satisfies Record<LanguageCode, OakDetailBackCopy>

const sphereDetailBackCopies = {
  EN: {
    back: 'Back to shape card',
    materialLabel: 'Shape',
    materialValue: 'Sphere',
    keywordsLabel: 'Keywords',
    keywords: ['Round', 'Soft', 'Balanced'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Harmony', 'Flow', 'Friendly'],
    applicationLabel: 'Typical Application',
    applications: ['Lighting', 'Furniture', 'Sculpture', 'Decoration'],
    aboutTitle: 'About Sphere',
    aboutBody: 'A rounded form suggests softness, balance, and harmony. When placed in a space, it creates a calm and approachable atmosphere.',
  },
  JA: {
    back: '形状カードに戻る',
    materialLabel: 'Shape',
    materialValue: 'Sphere',
    keywordsLabel: 'Keywords',
    keywords: ['Round', 'Soft', 'Balanced'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Harmony', 'Flow', 'Friendly'],
    applicationLabel: 'Typical Application',
    applications: ['Lighting', 'Furniture', 'Sculpture', 'Decoration'],
    aboutTitle: 'About Sphere',
    aboutBody: '丸みのある形状は、柔らかさやバランス、調和を感じさせます。空間に取り入れることで、落ち着きのある親しみやすい雰囲気を演出します。',
  },
  SC: {
    back: '返回形状卡片',
    materialLabel: '形状',
    materialValue: '球体',
    keywordsLabel: '关键词',
    keywords: ['圆润', '柔和', '平衡'],
    spatialLabel: '空间印象',
    spatial: ['和谐', '流动', '亲和'],
    applicationLabel: '典型应用',
    applications: ['灯光', '家具', '雕塑', '装饰'],
    aboutTitle: '关于球体',
    aboutBody: '圆润的形状会带来柔和、平衡与和谐的感受。放入空间中时，可以营造安静且亲切的氛围。',
  },
  TC: {
    back: '返回形狀卡片',
    materialLabel: '形狀',
    materialValue: '球體',
    keywordsLabel: '關鍵詞',
    keywords: ['圓潤', '柔和', '平衡'],
    spatialLabel: '空間印象',
    spatial: ['和諧', '流動', '親和'],
    applicationLabel: '典型應用',
    applications: ['燈光', '家具', '雕塑', '裝飾'],
    aboutTitle: '關於球體',
    aboutBody: '圓潤的形狀會帶來柔和、平衡與和諧的感受。放入空間中時，可以營造安靜且親切的氛圍。',
  },
  TH: {
    back: 'กลับไปที่การ์ดรูปทรง',
    materialLabel: 'รูปทรง',
    materialValue: 'ทรงกลม',
    keywordsLabel: 'คำสำคัญ',
    keywords: ['กลม', 'นุ่มนวล', 'สมดุล'],
    spatialLabel: 'ความรู้สึกของพื้นที่',
    spatial: ['กลมกลืน', 'ลื่นไหล', 'เป็นมิตร'],
    applicationLabel: 'การใช้งานทั่วไป',
    applications: ['แสงไฟ', 'เฟอร์นิเจอร์', 'ประติมากรรม', 'ของตกแต่ง'],
    aboutTitle: 'เกี่ยวกับทรงกลม',
    aboutBody: 'รูปทรงกลมให้ความรู้สึกนุ่มนวล สมดุล และกลมกลืน เมื่อนำไปใช้ในพื้นที่ จะช่วยสร้างบรรยากาศที่สงบและเป็นมิตร',
  },
} satisfies Record<LanguageCode, OakDetailBackCopy>

const linenFabricDetailBackCopies = {
  EN: {
    back: 'Back to texture card',
    materialLabel: 'Texture',
    materialValue: 'Linen Fabric',
    keywordsLabel: 'Keywords',
    keywords: ['Natural', 'Soft', 'Woven'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Cozy', 'Relaxing', 'Warm'],
    applicationLabel: 'Typical Application',
    applications: ['Sofa', 'Curtain', 'Cushion', 'Bedding'],
    aboutTitle: 'About Linen Fabric',
    aboutBody: 'With a natural woven texture and a soft touch, linen fabric creates a warm, calm, and comfortable space.',
  },
  JA: {
    back: '質感カードに戻る',
    materialLabel: '質感',
    materialValue: 'リネン生地',
    keywordsLabel: 'キーワード',
    keywords: ['自然', '柔らかい', '織り'],
    spatialLabel: '空間印象',
    spatial: ['居心地よい', 'リラックス', '温かい'],
    applicationLabel: '主な用途',
    applications: ['ソファ', 'カーテン', 'クッション', '寝具'],
    aboutTitle: 'リネン生地について',
    aboutBody: '自然な織り目と柔らかな手触りを持ち、温かく落ち着いた居心地のよい空間を演出します。',
  },
  SC: {
    back: '返回质感卡片',
    materialLabel: '质感',
    materialValue: '亚麻布',
    keywordsLabel: '关键词',
    keywords: ['自然', '柔软', '编织'],
    spatialLabel: '空间印象',
    spatial: ['舒适', '放松', '温暖'],
    applicationLabel: '典型应用',
    applications: ['沙发', '窗帘', '靠垫', '床品'],
    aboutTitle: '关于亚麻布',
    aboutBody: '亚麻布具有自然织纹与柔软触感，适合营造温暖、安静且舒适的空间氛围。',
  },
  TC: {
    back: '返回質感卡片',
    materialLabel: '質感',
    materialValue: '亞麻布',
    keywordsLabel: '關鍵詞',
    keywords: ['自然', '柔軟', '編織'],
    spatialLabel: '空間印象',
    spatial: ['舒適', '放鬆', '溫暖'],
    applicationLabel: '典型應用',
    applications: ['沙發', '窗簾', '靠墊', '床品'],
    aboutTitle: '關於亞麻布',
    aboutBody: '亞麻布具有自然織紋與柔軟觸感，適合營造溫暖、安靜且舒適的空間氛圍。',
  },
  TH: {
    back: 'กลับไปที่การ์ดพื้นผิว',
    materialLabel: 'พื้นผิว',
    materialValue: 'ผ้าลินิน',
    keywordsLabel: 'คำสำคัญ',
    keywords: ['ธรรมชาติ', 'นุ่ม', 'ทอ'],
    spatialLabel: 'ความรู้สึกของพื้นที่',
    spatial: ['อบอุ่น', 'ผ่อนคลาย', 'อุ่นสบาย'],
    applicationLabel: 'การใช้งานทั่วไป',
    applications: ['โซฟา', 'ผ้าม่าน', 'หมอนอิง', 'เครื่องนอน'],
    aboutTitle: 'เกี่ยวกับผ้าลินิน',
    aboutBody: 'ผ้าลินินมีลายทอตามธรรมชาติและสัมผัสที่นุ่ม เหมาะสำหรับสร้างพื้นที่ที่อบอุ่น สงบ และน่าอยู่',
  },
} satisfies Record<LanguageCode, OakDetailBackCopy>

const paperLanternDetailBackCopies = {
  EN: {
    back: 'Back to other card',
    materialLabel: 'Other',
    materialValue: 'Paper Lantern',
    keywordsLabel: 'Keywords',
    keywords: ['Japan', 'Warm Light', 'Traditional'],
    spatialLabel: 'Spatial Impression',
    spatial: ['Soft', 'Calm', 'Intimate'],
    applicationLabel: 'Typical Application',
    applications: ['Lighting', 'Decoration', 'Corner', 'Entrance'],
    aboutTitle: 'About Paper Lantern',
    aboutBody: 'Paper lanterns cast a soft glow through washi paper, creating a quiet and warm space. They add a Japanese impression and a calm atmosphere.',
  },
  JA: {
    back: 'その他カードに戻る',
    materialLabel: 'ほか',
    materialValue: '和紙灯籠',
    keywordsLabel: 'キーワード',
    keywords: ['日本', '温かい光', '伝統的'],
    spatialLabel: '空間印象',
    spatial: ['柔らかい', '静か', '親密'],
    applicationLabel: '主な用途',
    applications: ['照明', '装飾', '隅', '入口'],
    aboutTitle: '和紙灯籠について',
    aboutBody: '和紙を通した柔らかな光を持ち、静かで温かみのある空間を演出します。日本的な印象や落ち着いた雰囲気を加える要素として適しています。',
  },
  SC: {
    back: '返回其他卡片',
    materialLabel: '其他',
    materialValue: '和纸灯笼',
    keywordsLabel: '关键词',
    keywords: ['日本', '暖光', '传统'],
    spatialLabel: '空间印象',
    spatial: ['柔和', '平静', '亲密'],
    applicationLabel: '典型应用',
    applications: ['照明', '装饰', '角落', '入口'],
    aboutTitle: '关于和纸灯笼',
    aboutBody: '和纸灯笼透出柔和光线，适合营造安静、温暖的空间。它也能为空间加入日式印象与沉静氛围。',
  },
  TC: {
    back: '返回其他卡片',
    materialLabel: '其他',
    materialValue: '和紙燈籠',
    keywordsLabel: '關鍵詞',
    keywords: ['日本', '暖光', '傳統'],
    spatialLabel: '空間印象',
    spatial: ['柔和', '平靜', '親密'],
    applicationLabel: '典型應用',
    applications: ['照明', '裝飾', '角落', '入口'],
    aboutTitle: '關於和紙燈籠',
    aboutBody: '和紙燈籠透出柔和光線，適合營造安靜、溫暖的空間。它也能為空間加入日式印象與沉靜氛圍。',
  },
  TH: {
    back: 'กลับไปที่การ์ดอื่น ๆ',
    materialLabel: 'อื่น ๆ',
    materialValue: 'โคมกระดาษ',
    keywordsLabel: 'คำสำคัญ',
    keywords: ['ญี่ปุ่น', 'แสงอบอุ่น', 'ดั้งเดิม'],
    spatialLabel: 'ความรู้สึกของพื้นที่',
    spatial: ['นุ่มนวล', 'สงบ', 'ใกล้ชิด'],
    applicationLabel: 'การใช้งานทั่วไป',
    applications: ['แสงไฟ', 'ของตกแต่ง', 'มุมห้อง', 'ทางเข้า'],
    aboutTitle: 'เกี่ยวกับโคมกระดาษ',
    aboutBody: 'โคมกระดาษให้แสงนุ่มผ่านกระดาษ สร้างพื้นที่ที่เงียบและอบอุ่น เหมาะสำหรับเพิ่มกลิ่นอายแบบญี่ปุ่นและบรรยากาศสงบ',
  },
} satisfies Record<LanguageCode, OakDetailBackCopy>

type DetailBackAssets = {
  applicationIconUrl: string
  backIconUrl: string
  keywordsIconUrl: string
  spatialIconUrl: string
}

const detailBackAssets: Partial<Record<LibraryItemId, DetailBackAssets>> = {
  'oak-wood': {
    applicationIconUrl: oakDetailApplicationIconUrl,
    backIconUrl: oakDetailBackIconUrl,
    keywordsIconUrl: oakDetailKeywordsIconUrl,
    spatialIconUrl: oakDetailSpatialIconUrl,
  },
  'andesite-pebble': {
    applicationIconUrl: andesiteDetailApplicationIconUrl,
    backIconUrl: andesiteDetailBackIconUrl,
    keywordsIconUrl: andesiteDetailKeywordsIconUrl,
    spatialIconUrl: andesiteDetailSpatialIconUrl,
  },
  sphere: {
    applicationIconUrl: sphereDetailApplicationIconUrl,
    backIconUrl: sphereDetailBackIconUrl,
    keywordsIconUrl: sphereDetailKeywordsIconUrl,
    spatialIconUrl: sphereDetailSpatialIconUrl,
  },
  'linen-fabric': {
    applicationIconUrl: linenDetailApplicationIconUrl,
    backIconUrl: linenDetailBackIconUrl,
    keywordsIconUrl: linenDetailKeywordsIconUrl,
    spatialIconUrl: linenDetailSpatialIconUrl,
  },
  'paper-lantern': {
    applicationIconUrl: paperDetailApplicationIconUrl,
    backIconUrl: paperDetailBackIconUrl,
    keywordsIconUrl: paperDetailKeywordsIconUrl,
    spatialIconUrl: paperDetailSpatialIconUrl,
  },
}

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
  copy: UtopiaCopy
}

function ElementActionMenu({ elementTitle, copy }: ElementActionMenuProps) {
  return (
    <div className="utopia-element-menu" role="menu" aria-label={`${elementTitle} ${copy.elementMenu.ariaSuffix}`} data-node-id="266:528" data-name="exportmenu">
      <div className="utopia-element-menu__options" data-node-id="266:529">
        {elementMenuOptions.map((option) => (
          <button type="button" className="utopia-element-menu__option" role="menuitem" key={option.id}>
            <img
              aria-hidden="true"
              className={`utopia-element-menu__icon utopia-element-menu__icon--${option.id}`}
              src={option.iconUrl}
              alt=""
            />
            <span>{copy.elementMenu.options[option.id]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

type ObjectLibraryPanelProps = {
  copy: UtopiaCopy
  onClose: () => void
  onMaterialSelect: (item: LibraryItem) => void
  onMaterialDragStart: (item: LibraryItem) => void
}

type LibraryDetailCardProps = {
  backCopies: Partial<Record<LibraryItemId, OakDetailBackCopy>>
  copy: UtopiaCopy
  item: LibraryItem
  onClose: () => void
}

type OakDetailBackCardProps = {
  assets: DetailBackAssets
  copy: OakDetailBackCopy
  item: LibraryItem
  itemTitle: string
  onBack: () => void
}

function OakDetailBackCard({ assets, copy, item, itemTitle, onBack }: OakDetailBackCardProps) {
  return (
    <aside
      className="utopia-library-detail-card utopia-library-detail-card--back"
      role="dialog"
      aria-modal="true"
      aria-label={copy.aboutTitle}
      data-item-id={item.id}
      data-node-id="275:580"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="utopia-library-detail-back__stack" data-node-id="275:581">
        <button
          type="button"
          className="utopia-library-detail-back__button"
          aria-label={copy.back}
          data-node-id="275:582"
          onClick={onBack}
        >
          <img aria-hidden="true" src={assets.backIconUrl} alt="" />
        </button>

        <div className="utopia-library-detail-back__content" data-node-id="275:584">
          <section className="utopia-library-detail-back__summary" data-node-id="275:585">
            <div className="utopia-library-detail-back__material-image">
              <img src={item.imageUrl} alt="" />
            </div>
            <div className="utopia-library-detail-back__summary-copy" data-node-id="275:587">
              <p data-node-id="275:588">{copy.materialLabel}</p>
              <p data-node-id="275:589">{copy.materialValue}</p>
            </div>
          </section>

          <div className="utopia-library-detail-back__details" data-node-id="275:590">
            <div className="utopia-library-detail-back__rows" data-node-id="275:591">
              <DetailBackRow
                iconUrl={assets.keywordsIconUrl}
                iconVariant="image"
                label={copy.keywordsLabel}
                chips={copy.keywords}
                nodeId="275:592"
              />
              <DetailBackRow
                iconUrl={assets.spatialIconUrl}
                iconVariant="boxed"
                label={copy.spatialLabel}
                chips={copy.spatial}
                nodeId="275:606"
              />
              <DetailBackRow
                iconUrl={assets.applicationIconUrl}
                iconVariant="boxed"
                label={copy.applicationLabel}
                chips={copy.applications}
                isWrapped
                nodeId="275:620"
              />
            </div>

            <section className="utopia-library-detail-back__about" data-node-id="275:636">
              <h2 data-node-id="275:638">{copy.aboutTitle}</h2>
              <p data-node-id="275:640">{copy.aboutBody}</p>
            </section>
          </div>
        </div>
      </div>
      <span className="utopia-library-detail-back__sr-only">{itemTitle}</span>
    </aside>
  )
}

type DetailBackRowProps = {
  chips: string[]
  iconUrl: string
  iconVariant: 'boxed' | 'image'
  isWrapped?: boolean
  label: string
  nodeId: string
}

function DetailBackRow({ chips, iconUrl, iconVariant, isWrapped = false, label, nodeId }: DetailBackRowProps) {
  return (
    <section className="utopia-library-detail-back__row" data-node-id={nodeId}>
      <div className="utopia-library-detail-back__icon-box" data-variant={iconVariant}>
        <img aria-hidden="true" src={iconUrl} alt="" />
      </div>
      <div className="utopia-library-detail-back__row-copy">
        <p>{label}</p>
        <div className="utopia-library-detail-back__chips" data-wrapped={isWrapped}>
          {chips.map((chip) => (
            <span className="utopia-library-detail-back__chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function LibraryDetailCard({ backCopies, copy, item, onClose }: LibraryDetailCardProps) {
  const [isBackVisible, setIsBackVisible] = useState(false)
  const itemIndex = libraryItems.findIndex((libraryItem) => libraryItem.id === item.id) + 1
  const itemTitle = copy.library.items[item.id]
  const backCopy = backCopies[item.id]
  const backAssets = detailBackAssets[item.id]
  const canShowBack = Boolean(backCopy && backAssets)

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

  useEffect(() => {
    setIsBackVisible(false)
  }, [item.id])

  return (
    <div className="utopia-library-detail-overlay" role="presentation" onClick={onClose}>
      {isBackVisible ? (
        <OakDetailBackCard
          assets={backAssets as DetailBackAssets}
          copy={backCopy as OakDetailBackCopy}
          item={item}
          itemTitle={itemTitle}
          onBack={() => setIsBackVisible(false)}
        />
      ) : (
      <aside
        className="utopia-library-detail-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${copy.library.detailAria}: ${itemTitle}`}
        data-node-id="275:539"
        onDoubleClick={() => {
          if (canShowBack) {
            setIsBackVisible(true)
          }
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="utopia-library-detail-card__inner" data-node-id="275:540">
          <div className="utopia-library-detail-card__counter" data-node-id="275:541">
            <span data-node-id="275:542">{itemIndex}/{libraryDetailTotal}</span>
          </div>

          <div className="utopia-library-detail-card__image" data-item-id={item.id} data-node-id="284:503">
            <img src={item.imageUrl} alt="" />
          </div>

          <div className="utopia-library-detail-card__content" data-node-id="275:543">
            <div className="utopia-library-detail-card__body" data-node-id="275:544">
              <div className="utopia-library-detail-card__copy" data-node-id="275:545">
                <div className="utopia-library-detail-card__title-group" data-node-id="275:546">
                  <p data-node-id="275:547">{itemTitle}</p>
                  <p data-node-id="275:548">{item.name}</p>
                </div>
                <div className="utopia-library-detail-card__tag" data-node-id="275:549">
                  <span data-node-id="275:550">{copy.library.detailTags[item.id]}</span>
                </div>
              </div>
            </div>

            <footer className="utopia-library-detail-card__footer" data-node-id="275:551">
              <div className="utopia-library-detail-card__rule" data-node-id="275:552" />
              <div className="utopia-library-detail-card__hint" data-node-id="275:554">
                <img aria-hidden="true" src={detailGestureIconUrl} alt="" />
                <span data-node-id="275:558">{copy.library.detailHint}</span>
              </div>
            </footer>
          </div>
        </div>
      </aside>
      )}
    </div>
  )
}

function ObjectLibraryPanel({ copy, onClose, onMaterialSelect, onMaterialDragStart }: ObjectLibraryPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategoryId>('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <aside className="utopia-object-library" aria-label={copy.library.aria} data-node-id="286:597">
      <div className="utopia-object-library__content" data-node-id="287:842">
        <header className="utopia-object-library__header" data-node-id="286:599">
          <h2>{copy.library.title}</h2>
          <button
            type="button"
            className="utopia-object-library__close-button"
            aria-label="Collapse"
            onClick={onClose}
          >
            <img src={libraryCloseIconUrl} alt="" />
          </button>
        </header>

        <div className="utopia-object-library__controls" data-node-id="286:603">
          <div className="utopia-object-library__search-row" data-node-id="286:604">
            <div className="utopia-object-library__search" data-node-id="286:605">
              <img aria-hidden="true" src={librarySearchIconUrl} alt="" />
              <input
                type="text"
                placeholder={copy.library.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="utopia-object-library__search-input"
              />
            </div>
            <button type="button" className="utopia-object-library__filter-button" aria-label={copy.library.filter} data-node-id="286:608">
              <img aria-hidden="true" src={libraryFilterIconUrl} alt="" />
            </button>
          </div>

          <div className="utopia-object-library__tabs" aria-label={copy.library.aria} data-node-id="286:610">
            {libraryCategories.map((category) => (
              <button
                type="button"
                className="utopia-object-library__tab"
                data-selected={selectedCategory === category}
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {copy.library.categories[category]}
              </button>
            ))}
          </div>
        </div>

        <div className="utopia-object-library__grid" data-node-id="287:841">
          {libraryItems
            .filter((item) => selectedCategory === 'all' || item.category === selectedCategory)
            .filter((item) => {
              if (!searchQuery) return true
              const name = copy.library.items[item.id].toLowerCase()
              const subtitle = item.name.toLowerCase()
              const q = searchQuery.toLowerCase()
              return name.includes(q) || subtitle.includes(q)
            })
            .map((item) => (
            <button
              type="button"
              className="utopia-object-library__card"
              data-item-id={item.id}
              draggable
              key={item.id}
              onClick={() => onMaterialSelect(item)}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = 'copy'
                event.dataTransfer.setData('application/x-utopia-library-item', item.id)
                event.dataTransfer.setData('text/plain', copy.library.items[item.id])
                onMaterialDragStart(item)
              }}
            >
              <span className="utopia-object-library__image-wrap">
                <img src={item.imageUrl} alt="" />
              </span>
              <span className="utopia-object-library__copy">
                <span>{copy.library.items[item.id]}</span>
                <span>{item.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

type AccountPanelOverlayProps = {
  copy: UtopiaCopy
  selectedLanguageCode: LanguageCode
  onClose: () => void
  onLanguageChange: (languageCode: LanguageCode) => void
}

function AccountPanelOverlay({ copy, selectedLanguageCode, onClose, onLanguageChange }: AccountPanelOverlayProps) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const selectedLanguage = languageOptions.find((language) => language.code === selectedLanguageCode) ?? languageOptions[0]

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
        aria-label={copy.account.menuLabel}
        data-node-id="255:119"
        data-name="accountpanel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="utopia-account-panel__close-row" data-node-id="255:120" data-name="closebutton">
          <button type="button" className="utopia-account-panel__close-button" aria-label={copy.account.close} onClick={onClose}>
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
              <span>{copy.account.language}</span>
            </span>
            <span className="utopia-account-panel__item-right">
              <span>{selectedLanguage.code}</span>
              <ArrowIcon />
            </span>
          </button>
          <button type="button" className="utopia-account-panel__item utopia-account-panel__item--bordered">
            <span className="utopia-account-panel__item-left">
              <BookIcon />
              <span>{copy.account.about}</span>
            </span>
            <ArrowIcon />
          </button>
        </div>

        {isLanguageMenuOpen ? (
          <div className="utopia-language-menu" role="listbox" aria-label={copy.account.languageOptions} data-node-id="266:512" data-name="language options">
            {languageOptions.map((language) => (
              <button
                type="button"
                className="utopia-language-menu__option"
                role="option"
                aria-selected={language.code === selectedLanguageCode}
                key={language.code}
                onClick={() => {
                  onLanguageChange(language.code)
                  setIsLanguageMenuOpen(false)
                }}
              >
                <span>{language.label}</span>
                {language.code === selectedLanguageCode ? <CheckIcon /> : null}
              </button>
            ))}
          </div>
        ) : null}

        <div className="utopia-account-panel__card utopia-account-panel__card--single" data-node-id="255:175" data-name="helpcard">
          <button type="button" className="utopia-account-panel__item">
            <span className="utopia-account-panel__item-left">
              <HelpIcon />
              <span>{copy.account.help}</span>
            </span>
          </button>
        </div>

        <button type="button" className="utopia-account-panel__logout" data-node-id="255:184" data-name="logout">
          <LogoutIcon />
          <span>{copy.account.logout}</span>
        </button>
      </section>
    </div>
  )
}

type UtopiaHomeViewProps = {
  copy: UtopiaCopy
  assignments: UtopiaThemeAssignments
  generatedPrompt: string
  generatedThemeSections: PromptBuildResult['themeSections']
  onGeneratePrompt: () => void
  onDropMaterial: (themeId: UtopiaThemeId, itemId: MaterialId) => void
  onRemoveMaterial: (themeId: UtopiaThemeId) => void
}

function UtopiaHomeView({
  assignments,
  copy,
  generatedPrompt,
  generatedThemeSections,
  onDropMaterial,
  onGeneratePrompt,
  onRemoveMaterial,
}: UtopiaHomeViewProps) {
  const [openElementMenu, setOpenElementMenu] = useState<UtopiaThemeId | null>(null)
  const [activeDropZone, setActiveDropZone] = useState<UtopiaThemeId | null>(null)

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
    <section className="utopia-home" aria-label={copy.home.aria} data-node-id="268:210" data-name="utopiahome" onClick={() => setOpenElementMenu(null)}>
      <div className="utopia-home__camera-panel" data-node-id="266:136">
        <div className="utopia-home__camera-content" data-node-id="266:137">
          <CameraIcon />
          <div className="utopia-home__camera-copy" data-node-id="266:141">
            <p>{copy.home.cameraReady}</p>
            <p>{copy.home.cameraInstruction}</p>
          </div>
        </div>
        {generatedPrompt ? (
          <section className="utopia-home__prompt-debug" aria-label="Generated prompt preview">
            <div className="utopia-home__prompt-debug-header">
              <span>Prompt Preview</span>
              <span>{generatedThemeSections.length ? `${generatedThemeSections.length} theme cues` : 'Base fallback'}</span>
            </div>
            {generatedThemeSections.length ? (
              <ul className="utopia-home__prompt-sections">
                {generatedThemeSections.map((section) => (
                  <li key={`${section.themeId}-${section.materialId}`}>
                    <span>{section.themeId}</span>
                    <p>{section.text}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="utopia-home__prompt-text">{generatedPrompt}</p>
          </section>
        ) : null}
      </div>

      <div className="utopia-home__workflow" data-node-id="268:205">
        <div className="utopia-home__elements" data-node-id="266:110">
          {utopiaElementCards.map((card) => {
            const assignedMaterialId = assignments[card.id]
            const assignedItem = assignedMaterialId ? materialsById[assignedMaterialId] : undefined
            const elementCopy = copy.elements[card.cardId]
            const assignedItemTitle = assignedItem ? copy.library.items[assignedItem.id] : ''

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
                const droppedItemId = event.dataTransfer.getData('application/x-utopia-library-item') as MaterialId
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
                      <span>{assignedItemTitle}</span>
                      <span>{elementCopy.title}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      aria-hidden="true"
                      className={`utopia-home__element-icon utopia-home__element-icon--${card.cardId}`}
                      src={card.iconUrl}
                      alt=""
                    />
                    <div className="utopia-home__element-copy">
                      <h2>{elementCopy.title}</h2>
                      <p>{elementCopy.description}</p>
                    </div>
                  </>
                )}
              </button>

              {assignedItem ? (
                <button
                  type="button"
                  className="utopia-home__remove-material-button"
                  aria-label={formatTranslatedLabel(copy.home.removeMaterialLabel, {
                    item: assignedItemTitle,
                    element: elementCopy.title,
                  })}
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

              {openElementMenu === card.id ? <ElementActionMenu copy={copy} elementTitle={elementCopy.title} /> : null}
            </article>
            )
          })}
        </div>

        <button type="button" className="utopia-home__generate-button" data-node-id="266:144" onClick={onGeneratePrompt}>
          <SparkleIcon />
          <span>{copy.home.generate}</span>
        </button>
      </div>
    </section>
  )
}

export function UtopiaCollectionScreen() {
  const [isAccountPanelOpen, setIsAccountPanelOpen] = useState(false)
  const [isObjectLibraryOpen, setIsObjectLibraryOpen] = useState(false)
  const [draggedLibraryItem, setDraggedLibraryItem] = useState<LibraryItem | null>(null)
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<LibraryItem | null>(null)
  const [themeAssignments, setThemeAssignments] = useState<UtopiaThemeAssignments>({})
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [generatedThemeSections, setGeneratedThemeSections] = useState<PromptBuildResult['themeSections']>([])
  const [activeView, setActiveView] = useState<UtopiaView>('utopia')
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<LanguageCode>('EN')
  const copy = translations[selectedLanguageCode]
  const materialBackCopies = {
    'oak-wood': oakDetailBackCopies[selectedLanguageCode],
    'andesite-pebble': andesiteDetailBackCopies[selectedLanguageCode],
    sphere: sphereDetailBackCopies[selectedLanguageCode],
    'linen-fabric': linenFabricDetailBackCopies[selectedLanguageCode],
    'paper-lantern': paperLanternDetailBackCopies[selectedLanguageCode],
  } satisfies Partial<Record<LibraryItemId, OakDetailBackCopy>>
  const switcherLabel = copy.views[activeView]
  const titleLabel = copy.pageTitles[activeView]

  function handleDropMaterial(themeId: UtopiaThemeId, itemId: MaterialId) {
    const droppedMaterial = materialsById[itemId] ?? draggedLibraryItem

    if (!droppedMaterial) {
      return
    }

    setThemeAssignments((currentAssignments) => ({
      ...currentAssignments,
      [themeId]: droppedMaterial.id,
    }))
    setDraggedLibraryItem(null)
  }

  function handleRemoveMaterial(themeId: UtopiaThemeId) {
    setThemeAssignments((currentAssignments) => {
      const nextAssignments = { ...currentAssignments }
      delete nextAssignments[themeId]
      return nextAssignments
    })
  }

  function handleGeneratePrompt() {
    const promptResult = buildUtopiaPrompt(themeAssignments)
    setGeneratedPrompt(promptResult.promptText)
    setGeneratedThemeSections(promptResult.themeSections)
  }

  return (
    <main
      className="utopia-collection"
      data-node-id="3:150"
      data-name="collectionpage"
      data-active-view={activeView}
      data-library-open={isObjectLibraryOpen}
    >
      {activeView === 'utopia' && isObjectLibraryOpen ? (
        <>
          <ObjectLibraryPanel
            copy={copy}
            onClose={() => setIsObjectLibraryOpen(false)}
            onMaterialSelect={setSelectedLibraryItem}
            onMaterialDragStart={setDraggedLibraryItem}
          />
          {selectedLibraryItem ? (
            <LibraryDetailCard
              backCopies={materialBackCopies}
              copy={copy}
              item={selectedLibraryItem}
              onClose={() => setSelectedLibraryItem(null)}
            />
          ) : null}
        </>
      ) : null}

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
                aria-label={copy.navigation.showObjectLibrary}
                onClick={() => setIsObjectLibraryOpen(true)}
              >
                <HeaderHintIcon />
              </button>
            ) : null}
          </div>

          <div className="utopia-collection__header-center" data-node-id="268:227">
            <nav className="utopia-collection__switcher" aria-label={copy.navigation.collectionNavigation} data-node-id="268:213">
              <button
                type="button"
                className="utopia-collection__switcher-button"
                aria-label={copy.navigation.showUtopiaHome}
                onClick={() => {
                  setActiveView('utopia')
                  setIsObjectLibraryOpen(false)
                  setSelectedLibraryItem(null)
                }}
              >
                <ChevronIcon direction="left" />
              </button>
              <span className="utopia-collection__switcher-label">{switcherLabel}</span>
              <button
                type="button"
                className="utopia-collection__switcher-button"
                aria-label={copy.navigation.showCollection}
                onClick={() => {
                  setActiveView('collection')
                  setIsObjectLibraryOpen(false)
                  setSelectedLibraryItem(null)
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
              aria-label={copy.account.openUserMenu}
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
            copy={copy}
            assignments={themeAssignments}
            generatedPrompt={generatedPrompt}
            generatedThemeSections={generatedThemeSections}
            onGeneratePrompt={handleGeneratePrompt}
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

      {isAccountPanelOpen ? (
        <AccountPanelOverlay
          copy={copy}
          selectedLanguageCode={selectedLanguageCode}
          onClose={() => setIsAccountPanelOpen(false)}
          onLanguageChange={setSelectedLanguageCode}
        />
      ) : null}
    </main>
  )
}
