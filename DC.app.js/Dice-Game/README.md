# Studi Evaluation Javascript : Creating a browser game using the DOM

Rules of the game: The game consists of 2 players on a single screen. Each player has a temporary score (ROUND) and an overall score (GLOBAL). On each turn, the player has his ROUND initialized to 0 and can roll a dice as many times as he wishes. The result of a throw is added to the ROUND.

Technologies used: HTML5, CSS3, JavaScript, Ionic.

Constraints: Respect for the model, a structured code, the game must be functional, use of the Lato font from Google Font, use of the Ionic framework.

Using Git: a main branch and a second dev.

* Why I should use Ionic?
With Ionic, comes the flexibility of building cross platform apps without any problem. It's far more easier to build high-end user interfaces with added functionalities and reuse the same code to build apps for different platforms. As the rewriting of code is not required, it saves a lot of time and effort.

* In the first time I started by declaring my variables, I used the "getElementById" to retrieve the id's on the DOM.
I created the dice variable with the 6 faces of the dice in html.
Creation of the startGame variable ith fuction with the alerts so that the players can enter their names "0.9 character or the name is decomposed and insid eI put call too fuction presentModal(). Fuction creation for nextPlayer, oldButton and rollTheDie.

* THE MODAL
I had trouble with the modal because I couldn't make it disappear.
Notice how it mounts with a binding mechanism. Then removes it on the unmount. Then, in the bound handler, it calls the dismiss mechanic, which finds the ion modal element and removes the dom element.
Doing  event handlers in this manner allows for greater understanding. Where you can answer, "what do we need to do when the close button is clicked?"
It also adds increased flexibility/expansion as well as allowing a function to only do one thing (as they ought to do). Currently it just dismisses but could be other actions such as dismiss() and fire('modal-closed') as a custom event for the application to do what it needs to do based on that.

* Optional method which is not in the code------------------------
Example
const diceGame = Object.create(DiceGame, {
  `gameScore: 200,`
  `players: [Player1, Player2]`
});

diceGame.initialize();
diceGame.addPlayer(player3);
diceGame.onExit(() => { diceGame.destruct() })
diceGame.render();
*/

const DiceGame = {
 gameScore: 0,
  
  initialize() {
    // set up defaults
    // - this can also be very specific to the instance like `this.gameScore = 0` or `this.dieFace = 1`
    // call any render methods; these can be grouped into a `renderUI()` method
    // call any binding methods; these can be grouped into a `bindUI()` method
  },
  
  destruct() {
    // remove elements, unbind elements, stop timers, etc
  },
  
    example of life cycle methods for creating and updating. These methods would ideally call methods
      which do specific tasks. For example: this.renderGameScore()

  render() {
    renderUI();
    bindUI();
    updateUI();
  },
  
  renderUI() {
    // create all elements and push it onto the DOM
    //
    // store elements within the app/game which need to be modified
    //   these can be stored on `this` such as `this.gameScoreEl` OR within an object `this.elements = {}; this.elements.gameScore...`
  },
  bindUI() {
    // using the stored elements. bind the event handlers to the element for what ever needs to happen
  },
  updateUI() {
    // this gets called when state updates which impacts ui
    // example: `this.updateGameScore()`
  },

    example methods for a "game" with a "player"
  
   array of players

  players: [],
  
    get player name; could be in a prompt
    @example
    const name = prompt('Name?');

    this.players.push({ name, score: 0 });
    
    @example
    const player1 = Object.create(Player, { name, score: 0})
    this.players.push(player1);
  
  addPlayer() {
  },
  
 if there's a notion of a player leaving the table
    @example
    this.players.splice(index, 1);
  
  removePlayer(index) {},
  
  gets player information and renders it to the screen

  renderPlayer(index) {},
  
  updates player ui based on score, current player, winner, etc

  updatePlayer(index) {},
  
    Other logic methods can go in here. Methods like the player methods above could interact with 
    another module, such as `Player`, to call things like`this.players[index].updateUI()`.
