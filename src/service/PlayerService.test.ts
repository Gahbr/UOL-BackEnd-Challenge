
import mongoose, { Error } from 'mongoose';
import { IPlayer, Player } from '../model/Player';
import * as PlayerService from './PlayerService'
import dotenv from 'dotenv'
dotenv.config();
describe (' Testing Player service ', ()=>{
    let email = 'test@jest.com';
    let nome = 'tester';
    let grupo = 'Vingadores';
    let telefone = '99887766'
    let codename = 'Hulk'

    beforeAll(async ()=>{
        await mongoose.connect(process.env.TEST_URI as string);
        //dropar e criar uma nova table a cada execucao
        Player.collection.drop()
        Player.collection.ensureIndex
    })
 
    it('should create a new user', async ()=>{
        const newUser = await PlayerService.createPlayer(nome, email, telefone, grupo, codename ) 

        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('nome');
        expect(newUser).toHaveProperty('email');
        expect(newUser.email).toBe(email)
    });

    it('should not allow to create an user with an existing codename', async ()=>{
         await expect(async () => {
            const newUser = await PlayerService.createPlayer(nome, email, telefone, grupo, codename ); 
            const newUser2 = await PlayerService.createPlayer(nome, email, telefone, grupo, codename ); 
             await PlayerService.createPlayer(nome, email, telefone, grupo, codename ) as IPlayer
            }).rejects.toThrow('E11000 duplicate key error collection: mocks.players index: codinome_1 dup key: { codinome: \"Hulk\" }')
    });

    it('should get a list of users', async ()=>{
        const users = await PlayerService.all();
        expect(users.length).toBeGreaterThanOrEqual(1);

        for(let i  in users){
            expect(users[i]).toBeInstanceOf(Player)
        }
    }) 

    it('should get the avengers list', async ()=>{
        const avengers = await PlayerService.vingadoresAPI();
        expect(avengers.includes('Hulk')).toBeTruthy();
        expect(avengers.length).toBeGreaterThanOrEqual(1);
       
    }); 

    it('should get the justice league list', async ()=>{
        const ligaDaJustica = await PlayerService.ligaDaJusticaAPI();
        expect(ligaDaJustica.includes('Batman')).toBeTruthy();
        expect(ligaDaJustica.length).toBeGreaterThanOrEqual(1);
       
    }); 
    
    it('should delete an user', async ()=>{
        const users = await Player.findOne ({codename:'Hulk'})     
   
        if( users){
            const find = await Player.findById(users._id);
            const deleteP = await PlayerService.deleteOne(users._id.toString());
        }

        const find = await Player.find();
        console.log("tamanho" + find.length );
        expect(find.length).toBe(0);
    
    }) 
})