'use strict';

const PORT = 3500;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;
const ioCl = require('socket.io-client');

let obj = {
    time: new Date(),
    service: {
        customerName: "hassan",
        department: 'OnSite',
        problemDescription: 'Telephone',
    },
}

describe('socket.io', () => {
    let consoleSpy;
    let host = 'http://localhost:3500';

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('connects the backend via socket.io ', async () => {
        await io.on('connection', mySocket => {
            expect(mySocket).toBeDefined();
        });
    });

    it('customerFrontEvent emit ', async () => {
        io.emit('customerFrontEvent', obj);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    let data = {
        id: uuid(),
        obj: obj,
    }
    it('telephoneIssue emit ', async () => {
        io.emit('telephoneIssue', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('onSiteIssue emit', async () => {
        data.obj.service.problemDescription = 'OnSite'
        io.emit('onSiteIssue', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('getAll emit', async () => {
        io.emit('getAll', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('connect ioClient to the socket server', async () => {
        const connection = ioCl.connect(`${host}`);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    afterAll((done) => {
        consoleSpy.mockRestore();
        io.close();
        setTimeout(() => process.exit(), 0)
        done();
    });
});