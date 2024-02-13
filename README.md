Minesweeper
============

## Table of contents
* [General info](#general-info)
* [Game rules](#game-rules)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)

## General info
This project is the popular game Minesweeper. The game has 3 difficulty levels with different number of mines and board size. You can also choose to play in your custom mode. When you first enter the game, you can write the player's name. Later you can change it. For You can also view the leaderboard for each difficulty mode. The project is adapted for different screen sizes. You can check the project using the link to GitHub Pages.
![image](https://github.com/VitaFilimonova/Minesweeper-game/assets/114240442/ca62ca97-5ab5-4a94-8e70-e348289b5289)



## Game rules
The playing field is a rectangle of cells. At the start of the game, all cells are “closed” - there is nothing on them. When the game starts, mines are placed randomly under the cells without being visible to the player.

The player can click the left mouse button on any closed cell to open it, rules for opening cells:

If there is a mine in the cell, the player loses.
If there is at least one mine in the neighboring 8 cells bordering it at least by an angle, then the cell will show the number of mines in these cells.
The number should have a color depending on the number of mines around: 1 - blue, 2 - green, 3 - red, 4 - dark blue 5 - brown 6 - turquoise 7 - black 8 - white.
If the first two conditions are not met, then the cell automatically opens all eight cells around it and remains empty. So the cells should open until they reach the border of the playing field, or until they come across cells with numbers under them.
The player can right-click to place a mark on a closed cell. Available labels: “checkbox”, “question” and no label, change cyclically.

If all fields are either open or flagged and the counter is 0, then the player wins.

## Technologies
Project is created with:
* SCSS
* JavaScript
* React
* Redux Toolkit
* Prettier
	
## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can `npm start` start to start the application. You will then be able to access it at localhost:3000.
Or you just can open link to GitHub Pages and play there.
Enjoy the game!

