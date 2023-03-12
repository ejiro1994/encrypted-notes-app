import styles from './App.module.scss'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Note } from './interfaces'

function App() {
  const [notes, setNotes] = useState<Record<string, Note>>({})
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello world!</p>',
    editorProps: {
      attributes: {
        class: styles.textEditor,
      },
    },
  })

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run()
  }
  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run()
  }

  const handleCreateNewNotes = () => {
    const newNote = {
      id: uuid(),
      title: 'New note',
      content: `<h1>New note</h1>`,
      updatedAt: new Date(),
    }
    setNotes((notes) => ({
      ...notes,
      [newNote.id]: newNote,
    }))
  }

  const handleChangeActiveNotes = (id: string) => {
    setActiveNoteId(id)
  }

  const notesList = Object.values(notes).sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  )
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <button className={styles.sidbarButton} onClick={handleCreateNewNotes}>
          New Notes
        </button>
        <div className={styles.sidebarList}>
          {notesList.map((note) => (
            <div
              key={note.id}
              role='button'
              tabIndex={0}
              className={styles.sidebarItem}
              onClick={() => {
                handleChangeActiveNotes(note.id)
              }}
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>
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
    </div>
  )
}

export default App
