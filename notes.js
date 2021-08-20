const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your Notes...'

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find ((note) => note.title === title  )

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added!!!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!!!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed'))
    } else {
        console.log(chalk.red.inverse('No Note found!!'))
    } 
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue.inverse('Your Notes'))

    notes.forEach( (note) => {
        console.log(chalk.yellow(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find( (note) => note.title === title)
    if (noteToRead) {
        console.log(chalk.blue.inverse(noteToRead.title) + "\n")
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red('No Note found'))
    }
}

const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataString)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = { 
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}