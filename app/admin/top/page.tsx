import SectionEditor from '../_components/SectionEditor'
import type { TabDef } from '../_components/SectionEditor'

const TABS: TabDef[] = [
  {
    id: 'philosophy',
    label: 'Philosophy（哲学）',
    info: 'TOPページの「なぜ〜か」セクションに表示されます。問い・答え・説明文の3フィールドで1件を構成します。',
    notionRequired: '答えの強調テキスト（色付き）はNotionで設定が必要です。Notionを開き該当ページの「body」フィールドで強調したい文字を選択して灰色などの色を付けてください。この管理画面での編集はプレーンテキストとして保存されます。',
  },
  {
    id: 'process',
    label: 'Process（プロセス）',
    info: 'TOPページの制作プロセスセクションに表示されます。英語名・日本語名・説明文の3フィールドで1件を構成します。表示順（order）が番号（01, 02...）として使われます。',
  },
  {
    id: 'about_stats',
    label: 'About欄（スタッツ）',
    info: 'TOPページのAboutセクション右カラムに表示されるKey-Valueテーブルです。Role / Focus / Stack / Belief などのキーと値のペアを管理します。値は改行対応です（Enterで改行）。',
  },
]

export default function AdminTopPage() {
  return <SectionEditor pageTitle="TOPページ管理" tabs={TABS} />
}
