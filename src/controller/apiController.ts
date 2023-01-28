import { Request, Response } from "express";
import { Player } from "../model/Player";
import * as PlayerService from "../service/PlayerService";


export const playerList = async (req: Request, res: Response) => {
  const listPlayers = await PlayerService.all();
  res.json(listPlayers);
};

export const register = async (req: Request, res: Response) => {
  const { nome, email, telefone, grupo } = req.body;

  try {
    const listaJogadores = await PlayerService.jogadoresAPI();
    if (grupo == "Vingadores") {
      const json = await PlayerService.vingadoresAPI();
      let difference = json.filter((x) => !listaJogadores.includes(x));
      const randomCodename = difference[Math.floor(Math.random() * difference.length)];

      if (randomCodename) {
        const newPlayer = await PlayerService.createPlayer(nome, email, telefone ,grupo, randomCodename)
      } else {
        return res.json("Grupo dos Vingadores está cheio!");
      }
    }

    if (grupo == "Liga da Justiça") {
      let xml = await PlayerService.ligaDaJusticaAPI();
      let difference = xml.filter((x: string) => !listaJogadores.includes(x));
      const randomCodename = difference[Math.floor(Math.random() * difference.length)];
      
      if (randomCodename) {
        const newPlayer = await PlayerService.createPlayer(nome, email, telefone ,grupo, randomCodename)
      } else {
        return res.json("Grupo da Liga da justiça está cheio!");
      }
    }
  } catch (error: any) {
      console.log(error.message);
      console.log(error);
      return res.status(500).send("Houve erro ao cadastrar");
  }
  res.redirect("/lista");
};

export const deletePlayer = async (req: Request, res: Response) => {
  const id = req.params.id;
  Player.findById(id, (err: any, data: any) => {
    if (err || !data) {
      console.log(err);
      res.send("Jogador não encontrado.");
    } else {
     PlayerService.deleteOne(id);
      res.json("Jogador deletado.");
    }
  });
};
