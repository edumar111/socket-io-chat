class Users {
    constructor() {
        this.persons = [];
    }

    addPerson(id, name, room) {

        let person = { id, name, room };

        this.persons.push(person);

        return this.persons;
    }

    getPerson(id) {
        let person = this.persons.filter(personSearch => {
            return personSearch.id === id;
        })[0];
        return person;
    }

    getAllPerson() {
        return this.persons;
    }

    getPersonsByRoom(room) {
        let personsRoom = this.persons.filter(personSearch => {
            return personSearch.room === room
        });
        return personsRoom;

    }

    removePerson(id) {
        let personRemove = this.getPerson(id);

        this.persons = this.persons.filter(personSearch => {
            return personSearch.id != id
        });

        return personRemove;
    }

}

module.exports = {
    Users
}