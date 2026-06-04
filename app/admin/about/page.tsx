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
    info: 'Aboutページのヒーローエリアと、TOPページのAboutセクション左カラムに使われるプロフィール情報です。',
    notionRequired: 'intro_top（TOPの自己紹介文）の強調テキストはNotionで設定が必要です。Notionを開き「body」フィールドの強調したい文字を選択して灰色などの色を付けてください。変更後5分で反映されます。',
  },
]

export default function AdminAboutPage() {
  return <SectionEditor pageTitle="Aboutページ管理" tabs={TABS} />
}
