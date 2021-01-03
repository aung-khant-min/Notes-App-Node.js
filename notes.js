const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your Notes'))
    notes.map(note => console.log(chalk.blue(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if(note){
    console.log(chalk.green.inverse(note.title))
    console.log(chalk.blue(note.body))
    }else{
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find(note => note.title === title)

    if (!duplicate) {
        notes.push({ title: title, body: body })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note Added!'))
    } else {
        console.log(chalk.red.inverse('Title Already Taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const modifiedNotes = notes.filter(note => note.title !== title)
    if (notes.length > modifiedNotes.length) {
        saveNotes(modifiedNotes)
        console.log(chalk.green.inverse('Note Removed!'))
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}