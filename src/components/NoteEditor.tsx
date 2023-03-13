import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Note } from '../interfaces'
import styles from './NoteEditor.module.scss'

interface Props {
  note: Note
  onChange: (content: JSONContent) => void
}
const NoteEditor = ({ note, onChange }: Props) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: note.content,
      editorProps: {
        attributes: {
          class: styles.textEditor,
        },
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getJSON())
      },
    },
    [note.id]
  )

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run()
  }
  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run()
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button onClick={toggleBold} className={styles.toolbarButton}>
          Bold
        </button>
        <button onClick={toggleItalic} className={styles.toolbarButton}>
          Italic
        </button>
      </div>
      <EditorContent editor={editor} className={styles.textEditorContent} />
    </div>
  )
}

export default NoteEditor
