import { JSONContent } from '@tiptap/react'
import { Note } from './interfaces'

interface Props {
  note: Note
  onChange: (content: JSONContent) => void
}
const NoteEditor = ({ note, onChange }: Props) => {
  return <div>NoteEditor</div>
}

export default NoteEditor
