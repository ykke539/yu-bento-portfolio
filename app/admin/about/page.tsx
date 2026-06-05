import SectionEditor from '../_components/SectionEditor'
import type { TabDef } from '../_components/SectionEditor'

const TABS: TabDef[] = [
  {
    id: 'journey',
    label: 'Journey（経歴）',
    info: 'Aboutページの「歩み」セクションに表示されます。年代ラベル・タイトル・本文の3フィールドで1件を構成します。',
  },
  {
    id: 'misc',
    label: 'Misc／リンク',
    info: 'AboutページのElsewhereセクションに表示される外部リンク一覧です。SNS・ブログなどのURLを登録してください。',
  },
  {
    id: 'skills',
    label: 'Skills（スキル）',
    info: 'Aboutページのスキルリストです。グループ名（Design / Engineering / Product）で列が分かれます。グループ名が変わると自動で新しい列に分類されます。',
  },
  {
    id: 'profile',
    label: 'Profile（プロフィール）',
    info: 'Aboutページのヒーローエリアと、TOPページのAboutセクション左カラムに使われるプロフィール情報です。\n\nキー一覧：catch_copy（キャッチコピー）／intro（自己紹介文・TOPとAbout共通）／Base・Available・Type（ステータス）／og_image（SNSシェア用OGP画像URL・1200×630 横長）／avatar（プロフィール顔写真URL・正方形推奨、Aboutページと管理画面アイコンに使用）',
    notionRequired: 'intro の強調テキスト（色付き）はNotionで設定が必要です。body フィールドで強調したい文字を選択して灰色などの色を付けてください。\nog_image・avatar の画像は、Imgurやドライブなど外部ホスティングのURLを使用してください（Notionにアップした画像は1時間で期限切れになります）。',
  },
]

export default function AdminAboutPage() {
  return <SectionEditor pageTitle="Aboutページ管理" tabs={TABS} />
}
