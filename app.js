const yargs = require('yargs')

const {listNotes,addNote,removeNote,readNote} = require('./notes')

yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
       removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes.',
    handler(){
        listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        readNote(argv.title)
    }
})

yargs.parse()
