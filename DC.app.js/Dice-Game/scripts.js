/**
 * Buttons to play the game
 */
 const newGameButton = document.getElementById('startGame');
 const rollDice = document.getElementById('rollDice');
 const holdScore = document.getElementById('hold');

 /**
  * Variables for players names
  */
 let player1Name = document.getElementById('firstPlayerName');
 let player2Name = document.getElementById('secondPlayerName');

 /**
  * Variables for players scores
  */
 let firstPlayerGlobalScore = document.getElementById('firstPlayerGlobalScore');
 let firstPlayerCurrentScore = document.getElementById(
   'firstPlayerCurrentScore'
 );
 let secondPlayerGlobalScore = document.getElementById(
   'secondPlayerGlobalScore'
 );
 let secondPlayerCurrentScore = document.getElementById(
   'secondPlayerCurrentScore'
 );
 let firstPlayerTurn = document.getElementById('firstPlayerTurn');
 let secondPlayerTurn = document.getElementById('secondPlayerTurn');
 let playerTurnBgColor = document.getElementById('playerTurnColor');

 /**
  * Die face control
  */
 let dieFace = document.getElementById('dieFace');

 /**
  * HTML for die faces
  */
 const sixDieFaces = [
   `<div class="dice first-face"><span class="dot"></span></div>`,
   `<div class="dice second-face"><span class="dot"></span><span class="dot"></span></div>`,
   `<div class="dice third-face"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`,
   `<div class="dice fourth-face"><div class="column"><span class="dot"></span><span class="dot"></span></div><div class="column"><span class="dot"></span><span class="dot"></span></div></div>`,
   `<div class="dice fifth-face"><div class="column"><span class="dot"></span><span class="dot"></span></div><div class="column"><span class="dot"></span></div><div class="column"><span class="dot"></span><span class="dot"></span></div></div>`,
   `<div class="dice fourth-face"><div class="column"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="column"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>`,
 ];




/*
 * Variables to play the game
 */
 let activePlayer;
 let gamePlaying = false;
 let currentScore = 0;
 let globalScore = 0;

 /*
  * Objets to represent players
  */
 let player1 = {
   name: player1Name,
   currentScore: firstPlayerCurrentScore,
   globalScore: firstPlayerGlobalScore,
   winner: false,
 };
 let player2 = {
   name: player2Name,
   currentScore: secondPlayerCurrentScore,
   globalScore: secondPlayerGlobalScore,
   winner: false,
 };

 /*
  * Initialisation of a game
  * Setting players names + scores to 0
  */
 const startNewGame = () => {
   player1Name.innerHTML = prompt(
     'Choisissez un nom pour le premier joueur (si le nom fait plus de 9 caractères, il sera découpé)'
   ).slice(0, 9);
   player2Name.innerHTML = prompt(
     'Choisissez un nom pour le deuxiéme joueur (si le nom fait plus de 9 caractères, il sera découpé)'
   ).slice(0, 9);
   activePlayer = player1;
   firstPlayerTurn.classList.add('player-turn');
   playerTurnBgColor.classList.add('player-1-turn');
   gamePlaying = true;
   firstPlayerCurrentScore.textContent = 0;
   secondPlayerCurrentScore.textContent = 0;
   firstPlayerGlobalScore.textContent = 0;
   secondPlayerGlobalScore.textContent = 0;
   player1.winner = false;
   player2.winner = false;
   presentModal();
 };

 newGameButton.addEventListener('click', startNewGame);

 /**
  * Die roll
  */
 const rollTheDie = () => {
   if (gamePlaying) {
     let randomNumber = Math.floor(Math.random() * 6) + 1;
     dieFace.innerHTML = sixDieFaces[randomNumber - 1];
     if (randomNumber !== 1) {
       currentScore += randomNumber;
       activePlayer.currentScore.textContent = currentScore;
     } else {
       currentScore = 0;
       activePlayer.currentScore.textContent = currentScore;
       nextPlayer();
     }
   }
 };

 rollDice.addEventListener('click', rollTheDie);

 /**
  * Hold button
  */
 const holdButton = () => {
   if (gamePlaying) {
     activePlayer.globalScore.textContent =
       currentScore + Number(activePlayer.globalScore.textContent);
     if (activePlayer.globalScore.textContent >= 100) {
       activePlayer.winner = true;
       alert(`${activePlayer.name.textContent} is the winner`);
       gamePlaying = false;
     } else {
       currentScore = 0;
       activePlayer.currentScore.textContent = currentScore;
       nextPlayer();
     }
   }
 };

 holdScore.addEventListener('click', holdButton);

 /**
  * Next player function
  */
 const nextPlayer = () => {
   if (activePlayer === player1) {
     activePlayer = player2;
     secondPlayerTurn.classList.add('player-turn');
     firstPlayerTurn.classList.remove('player-turn');
     playerTurnBgColor.classList.add('player-2-turn');
     playerTurnBgColor.classList.remove('player-1-turn');
   } else {
     activePlayer = player1;
     firstPlayerTurn.classList.add('player-turn');
     secondPlayerTurn.classList.remove('player-turn');
     playerTurnBgColor.classList.add('player-1-turn');
     playerTurnBgColor.classList.remove('player-2-turn');
   }
 };

 /*--------End Function---------*/


/**
 * Creation of the modal with its content
 */
const definedElemenstModalPage = customElements.define(
    'modal-page',

    class ModalPage extends HTMLElement {
      connectedCallback() {
        console.log('modal-page::connectedCallback')
        this.innerHTML = this.getMarkup();
        const closeBtn = this.querySelector('.modal-close-btn')
        closeBtn && closeBtn.addEventListener('click', this.handleCloseClick.bind(this));
      }

      disconnectedCallback() {
        console.log('modal-page::disconnectedCallback')
        const closeBtn = this.querySelector('.modal-close-btn')
        closeBtn && closeBtn.removeEventListener('click', this.handleCloseClick.bind(this));
      }

      handleCloseClick() {
        console.log('modal-page::handleCloseClick')
        this.dismissModal();
      }

      /**
       * Function to dismiss the modal
       */
      dismissModal () {
        console.log('modal-page::dismissModal');

        let ionModal = this.parentElement;

        while (ionModal.tagName !== 'ION-MODAL') {
          ionModal = this.parentElement;
        }

        ionModal.parentElement.removeChild(ionModal);
      }

      getMarkup() {
        return `
        <ion-header>
          <ion-toolbar>
            <ion-title>Dice-Game</ion-title>
            <ion-buttons slot="primary">
              <ion-button class="modal-close-btn">
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>Le jeu est simple :
            <ul>
              <li>Le premier joueur à obtenir 100 points dans son score global gagne.</li>
              <li>Pour cela, lancez le dé. Vous pouvez le faire rouler autant de fois que vous le souhaitez.
              Le résultat s'ajoute à votre score actuel. Cependant, si vous lancez le dé
              et obtenez 1, votre score actuel est perdu, et c'est la fin de votre tour. <br/>
              Si vous êtes satisfait de votre score actuel, vous pouvez le conserver en cliquant sur le bouton
              bouton 'Hold', pour l'ajouter à votre score global, et c'est la fin de votre
              tour.
              </li>
              <li>Le point rouge à droite du nom du joueur et le fond gris
              montrer à qui c'est le tour.
              </li>
              <li>Essayez d'être stratégique avec vos rouleaux, et ne soyez pas trop gourmand.</li>
              <li>Pour fermer cette boîte de dialogue et commencer à jouer, cliquez sur le « X » en haut à droite
              coin.
              </li>
              Bonne chance et amusez-vous bien.
            </ul>
          </p>
        </ion-content>`;
      }
    }
  );

  /**
   * Function to present the modal
   */
  const presentModal = () => {
    // create the modal with the `modal-page` component
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'my-custom-class';
    modalElement.id = 'ion-modal-rules';
    modalElement.isOpen = true;

    // present the modal
    document.body.appendChild(modalElement);
    modalElement.present();
  };
