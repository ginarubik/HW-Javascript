Snake game
Exercise - discover HTML5 Canvas
Run index.html in browser from /snake-server/src/main/resources/public/index.html You should see a drawing canvas with a blue and a red rectangle.

in game.js draw() method try a couple of things you can draw on a HTML5 canvas, eg. how to draw circles, rectangles, coloring etc. Search Google how to use javascript to draw onto the HTML5 Canvas! (~30 minutes)
Hands-on - Snake game
Snake game: Noika 3210 and 3310 had that snake game, you remember. We gonna create a similar one. We draw 10x10 pixels rectangles side-by-side for the snake's tail. And a 500x500 pixels canvas (50x50 coordinate system).

1 - create a tail global variable storing the tail's coordinates:

    const tail = [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1}
    ];
2 - draw the tail onto the canvas:

    tail.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });
3 - move the snake, by creating a move() function.

    let direction = {
       dx: 0, dy: 1  //default right direction
    };
    const move = () => {
        const oldHead = tail[tail.length - 1];
        const newHead = {
            x: oldHead.x + direction.dx,
            y: oldHead.y + direction.dy
        };
        tail.shift(); //remove first element
        tail.push(newHead); //add the new head
        draw();
    }
5 - change direction in the keydown event handler.

6 - call it every 50ms with setInterval(). Add the following to DOMContentLoaded event handler:

let timerId = setInterval(move, 50);
Workhsop - add fruit
Add a fruit object and check if the 'newHead' eats it. If yes, don't reduce the tail, but find a new random place for the fruit.

let fruit = {
    x: 12, y: 11
};
Exercise - game over and other features
add check for Game Over:
if snake hits the border
or its tail
snake should not turn to the opposite direction
add button or hotkey to restart the game
change speed by time or by eaten fruits
add scores
any own ideas
Hands-on - multiplayer snake
Server side
Start server running: snake-server/src/main/java/com/progmasters/snake/SnakeServerApplication.java
Open http://localhost:8080 in browser.
The server receives the a player's name and tail coordinates and returns a map with all the players and coordinates. So this would not be a real game, just every client can display others snakes on its canvas.

1 - Create an others global variable:

let others = {
    "snakeA": {
        "name": "snakeA",
        "coordinates": []
    },
    "snakeB": {
        "name": "snakeB",
        "coordinates": []
    }
};
2 - Draw other snakes with different colors. Change "Szabi" to your nick name!

    for (let key in others) {
         const snakeData = others[key];
         ctx.fillStyle = getRandomColor(key);
         if (snakeData.name !== "Szabi") {
             snakeData.coordinates.forEach((coord) => {
                 ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
             });
         }
     }
 //this code is from google search
 const getRandomColor = (name) => {
     var color = '#';
     for (var i = 0; i < Math.min(6, name.length); i++) {
         color += name[i].charCodeAt(0) % 10; //convert char to 0-10 numbers
     }
     while (color.length < 6) color = "0" + color;
     return color;
 };
3 - add multiplayes.js link to index.htlm

4 - call serverUpdate every 100ms.

  let serverSyncTimerId = setInterval(
     () => {
         serverUpdate(callback, tail);
     },
     100);
5 - create a callback() function and log the server respone. Overwrite others variable

 const callback = (jsonData) => {
     console.log("Server respone: ", jsonData);
     others = jsonData;
 };
6 - Edit multiplayer.js: - change host to the server address! (e.g. http://localhost:8080/snake or http://fakesnake.progmasters.hu/snake) - change "Szabi" to your nick name!

7 - Examine server response by coping it into an online JSON viewer and format/beautify it (search one in Google).

8 - Check if the dummy snakes from the server appears.

Workshop - one server, many clients
Change the IP address in multiplayer.js to the IP address of the mentor's PC and have fun! :)

4__________________________________________________________________________________5
