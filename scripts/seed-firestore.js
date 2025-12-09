/**
 * Firestoreにモックデータを投入するスクリプト
 * 
 * 使い方:
 * 1. Firebaseエミュレーターを起動: npm run firebase:emulators
 * 2. 別のターミナルでこのスクリプトを実行: node scripts/seed-firestore.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, connectFirestoreEmulator } = require('firebase/firestore');

// Firebase設定（エミュレーター用）
const firebaseConfig = {
  projectId: 'demo-taikan',
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// エミュレーターに接続（必ず初期化直後に実行）
try {
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.log('🔌 Firestoreエミュレーターに接続しました');
} catch (error) {
  console.log('ℹ️  既にエミュレーターに接続済みです');
}

// モックデータ
const mockGyms = [
  {
    id: 1,
    name: '渋谷区スポーツセンター',
    distance: '現在地から 1.2km',
    area: '渋谷区',
    address: '東京都渋谷区西原1-40-18',
    tel: '03-3468-9051',
    courts: { badminton: 6, tableTennis: 12 },
    tags: ['バドミントン', '卓球', 'プール'],
    schedule: [
      { time: '09:00', status: '○', status_code: 'available' },
      { time: '11:00', status: '△', status_code: 'few' },
      { time: '13:00', status: '×', status_code: 'full' },
      { time: '15:00', status: '○', status_code: 'available' },
      { time: '17:00', status: '○', status_code: 'available' },
      { time: '19:00', status: '×', status_code: 'full' },
    ],
    format: '個人開放（当日受付）',
    restrictions: [
      '中学生以下は保護者同伴',
      '室内シューズ必須',
      'ラケット・ボール等は持参',
    ],
    parking: 'あり（30台・有料）',
  },
  {
    id: 2,
    name: '新宿コズミックセンター',
    distance: '現在地から 2.5km',
    area: '新宿区',
    address: '東京都新宿区大久保3-1-2',
    tel: '03-3232-7701',
    courts: { basketball: 2, badminton: 8 },
    tags: ['バスケットボール', 'バドミントン'],
    schedule: [
      { time: '09:00', status: '×', status_code: 'full' },
      { time: '11:00', status: '○', status_code: 'available' },
      { time: '13:00', status: '○', status_code: 'available' },
      { time: '15:00', status: '△', status_code: 'few' },
      { time: '17:00', status: '×', status_code: 'full' },
      { time: '19:00', status: '×', status_code: 'full' },
    ],
    format: '個人開放（事前予約制）',
    restrictions: [
      '高校生以上',
      '予約は1週間前から',
      '室内シューズ必須',
    ],
    parking: 'なし（近隣にコインパーキングあり）',
  },
  {
    id: 3,
    name: '中央区立総合スポーツセンター',
    distance: '現在地から 4.8km',
    area: '中央区',
    address: '東京都中央区日本橋浜町2-59-1',
    tel: '03-3666-1501',
    courts: { tableTennis: 20, badminton: 4 },
    tags: ['卓球', 'バドミントン', '弓道'],
    schedule: [
      { time: '09:00', status: '○', status_code: 'available' },
      { time: '11:00', status: '○', status_code: 'available' },
      { time: '13:00', status: '○', status_code: 'available' },
      { time: '15:00', status: '○', status_code: 'available' },
      { time: '17:00', status: '△', status_code: 'few' },
      { time: '19:00', status: '○', status_code: 'available' },
    ],
    format: '個人開放（当日受付・予約可）',
    restrictions: [
      '小学生以上',
      '室内シューズ必須',
      '用具レンタルあり（有料）',
    ],
    parking: 'あり（50台・有料）',
  },
];

const mockAreas = [
  { name: '渋谷区' },
  { name: '新宿区' },
  { name: '中央区' },
  { name: '港区' },
  { name: '世田谷区' },
  { name: '杉並区' },
  { name: '品川区' },
  { name: '目黒区' },
];

const mockSports = [
  { name: 'バドミントン' },
  { name: '卓球' },
  { name: 'バスケットボール' },
  { name: 'バレーボール' },
  { name: 'フットサル' },
  { name: 'テニス' },
  { name: 'プール' },
  { name: '弓道' },
];

async function seedData() {
  console.log('🌱 データ投入を開始します...');

  try {
    // 体育館データの投入
    console.log('\n📍 体育館データを投入中...');
    for (const gym of mockGyms) {
      await addDoc(collection(db, 'gyms'), gym);
      console.log(`  ✓ ${gym.name}`);
    }

    // エリアデータの投入
    console.log('\n🗺️  エリアデータを投入中...');
    for (const area of mockAreas) {
      await addDoc(collection(db, 'areas'), area);
      console.log(`  ✓ ${area.name}`);
    }

    // 競技データの投入
    console.log('\n🏃 競技データを投入中...');
    for (const sport of mockSports) {
      await addDoc(collection(db, 'sports'), sport);
      console.log(`  ✓ ${sport.name}`);
    }

    console.log('\n✅ データ投入が完了しました！');
    console.log('\n📊 投入されたデータ:');
    console.log(`  - 体育館: ${mockGyms.length}件`);
    console.log(`  - エリア: ${mockAreas.length}件`);
    console.log(`  - 競技: ${mockSports.length}件`);
    console.log('\n🔗 Firebaseエミュレーター UI: http://localhost:4000');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

// スクリプト実行
seedData();

