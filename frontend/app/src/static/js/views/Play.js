/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Play.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: joonasmykkanen <joonasmykkanen@student.    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/06/16 07:10:36 by jmykkane          #+#    #+#             */
/*   Updated: 2024/08/14 15:45:24 by joonasmykka      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Settings } from '../pong/objects/Settings.js';
import AbstractView from './AbstractView.js';

import Tournament from './Tournament.js';
import GameSetup from './GameSetup.js';
import GameMode from './GameMode.js';
import Result from './Result.js';
import Pong from './Pong.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Play');
    this.listeners = true;

    this.setupObj = null;
    this.gameMode = null;
    this.results = null;

    this.modes = {
      'pong2': 1,
      'gonp': 2,
      'pong4': 3,
      'tournament': 4,
    }
  }

  // Choose how to play here
  async ChooseGameMode() {
    const gameModeObj = new GameMode();
    this.gameMode = await gameModeObj.getUserInput();
  }

  // Launch 2p Gonp
  async GameSetup() {
        const gameSetupObj = new GameSetup(this.gameMode);
        this.setupObj = await gameSetupObj.getUserInput();
        await gameSetupObj.RemoveListeners();
  }

  async Pong() {
    const appElem = document.getElementById('app');
    if (!appElem) {
      this.Redirect('/500');
      return;
    }
    const pong = new Pong();
    await pong.AddListeners();

    const gameResults = await pong.launchGame(this.setupObj, appElem);
//    await pong.postResults(gameResults, this.gameMode);
    console.log(gameResults);

    await pong.RemoveListeners();
    const resultsView = new Result();
    await resultsView.getUserInput(gameResults);
  }

  async Gonp() {
    // gonp also posts it's results as pong will 
  }

  // Launch 4p tournament
  async Tournament() {
    const tournamentObject = new Tournament();
    const appElem = document.getElementById('app');
    if (!appElem) {
      return;
    }

    appElem.innerHTML = await tournamentObject.getHtml();

    if (await tournamentObject.initialize(this.setupObj) === -1) {
      this.Redirect('/500');
      return;
    }

    for (let i = 0; i <= 3; i++) {
      await tournamentObject.displayTournament();
      await tournamentObject.getUserInput();
     
      if (tournamentObject.level === 3) {
        await tournamentObject.displayWinner();
        break;
      }
      const players = tournamentObject.getNextPlayers();
      this.setupObj.players = players;
      const game = new Pong(); 
      const results = await game.fakeGame(this.setupObj);
      tournamentObject.saveResults(results);

      tournamentObject.level++;
    }
    await tournamentObject.postResults();
    // tournament also posts it's results as pong will 
    tournamentObject.RemoveListeners();
  }
  

  // This function will be responsible running the whole process
  // from setup to displaying stats after the game
  async app() {
    await this.ChooseGameMode();
    await this.GameSetup();

    switch (this.gameMode) {
      case this.modes.pong2:      // 2
        await this.Pong();
        break;
      case this.modes.pong4:      // 2
        await this.Pong();
        break;
      case this.modes.tournament: // 3
        await this.Tournament();
        break;
      case this.modes.gonp:       // 4
        await this.Gonp();
        break;
    }
  }

  // Used as init function here as router will call AddListeners()
  // and constructor has already been executed when originally loaded
  AddListeners() {
    this.gameDiv = document.getElementById('app');
    this.app();
  }
}
