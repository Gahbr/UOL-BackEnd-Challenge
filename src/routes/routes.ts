import { Request, Response } from "express";
import express from 'express';
import * as ApiController from '../controller/apiController';

export const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.sendFile(__dirname + "/public/index.html");
});

router.get("/lista", async (req: Request, res: Response) => {
  res.sendFile("jogadores.html", { root: "./src/public" });
});
  
router.get("/jogadores", ApiController.playerList);

router.post('/', ApiController.register);
 
router.delete('/:id', ApiController.deletePlayer);
 

