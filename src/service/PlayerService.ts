
import { Player } from "../model/Player";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export const all = async ()=>{
    return  await Player.find();
}

export const createPlayer = async (nome: string, email: string,telefone: string, grupo: string, randomCodename: string)=>{
    const newPlayer = await Player.create({
        nome: nome,
        email: email,
        telefone: telefone,
        grupo: grupo,
        codinome: randomCodename
      });

    return newPlayer; 
    }

export const ligaDaJusticaAPI = async () =>{
  const listaLiga = await axios.get('http://raw.githubusercontent.com/uolhost/test-backEnd-Java/master/referencias/liga_da_justica.xml', {headers: {'Content-Type': 'application/xml', 'Accept': 'application/xml' }})
  const ligaData = await listaLiga.data;
  const parser = new XMLParser();
  const xml = await parser.parse(ligaData).liga_da_justica.codinomes.codinome;
  return xml;
}

export const vingadoresAPI = async ()=> {
  const listaVingadores = await axios.get('http://raw.githubusercontent.com/uolhost/test-backEnd-Java/master/referencias/vingadores.json');
  const data = await listaVingadores.data;

  var arrJSON: string[] = [];

  data.vingadores.map((x: { codinome: any }) => {
    arrJSON.push(x.codinome);
  });

  return arrJSON;
}
export const jogadoresAPI = async ()=> {
  const listaJogadores = await fetch("http://localhost:3000/jogadores");
  const listaJson = await listaJogadores.json();
  var arrDB: string[] = [];

  //inserindo os dados em um array
  listaJson.map((x: { codinome: any }) => {
    arrDB.push(x.codinome);
  });
  return arrDB;
}

export const deleteOne = async (id : string)=> {
 await Player.deleteOne({_id:id});
}