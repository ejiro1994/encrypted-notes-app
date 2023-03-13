import styles from './App.module.scss'
import { JSONContent } from '@tiptap/react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Note } from './interfaces'
import NoteEditor from './components/NoteEditor'

export const App = () => {
  const [notes, setNotes] = useState<Record<string, Note>>({})
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const activeNote = activeNoteId ? notes[activeNoteId] : null

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

  const handleChangeNoteContent = (noteId: string, content: JSONContent) => {
    setNotes((notes) => ({
      ...notes,
      [noteId]: {
        ...notes[noteId],
        updatedAt: new Date(),
        content,
      },
    }))
  }
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
              className={
                note.id === activeNoteId
                  ? styles.sidebarItemActive
                  : styles.sidebarItem
              }
              onClick={() => {
                handleChangeActiveNotes(note.id)
              }}
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          onChange={(content) => {
            handleChangeNoteContent(activeNote.id, content)
          }}
        />
      ) : (
        <div>Create a note or select an existing one.</div>
      )}
    </div>
  )
}
