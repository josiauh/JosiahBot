
//"birthday" is on 9/14/2020
var SHELL_STATE = 0
var user_home = ""
var rps_home = ""
var rps_choice = ""
var name_lastUsed = 0
var choices_list = ["rock", "paper", "scissors"]
const text = require('./text.json'); // the random sayings file
userDat = {}
const VERSION = "3.8"
var home = ""
var apicall = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=Pet_door&formatversion=2&exintro=1&explaintext=1"
var io = require('socket.io-client');
console.log("Loaded socket-io")
const facts = require('facts-quiz');
console.log("Loaded facts-quiz ")
var LOLSPEAK = require("lolspeak");
console.log("Loaded lolspeak")
let Parser = require('rss-parser');
console.log("Loaded rss-parser")
const moment = require("moment")
console.log("Loaded moment")
var sleep = require('sleep');
console.log("Loaded sleep")
var he = require("he")
console.log("Loaded he")
var duckwords = ["nigger", "nigg3r", "nigg3rs", "n¡gger", "n1ggers", "n1gger", "n¡ggers", "niggers", "nigga", "/", "*", "fuck", "discord", "exe"]
users = []
const quote = require('find-quote');
let parser = new Parser();
var wpapi = require("superagent");
console.log("Loaded superagent")
var crypto = require("crypto")
console.log("Loaded crypto")
var tbheaders = require('trollbox-headers').headers();
console.log("Loaded tbheaders")
const { meme } = require("memejs");
console.log("Loaded memejs")

console.log("Finished loading libraries")

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getUserData(name) {
  for (var item in userData) {
    if (userData[item].nick == name) {
      return userData[item]
    }

  }

}
console.log("Functions defined")
//start the server
const socket = io('http://www.windows93.net:8081', tbheaders);
console.log("Started socket.io client, waiting for connection...")
socket.on('_connected', function(data) { 
  socket.emit('user joined', 'InfoBot [@h] 🎄', "#459cff", "", "", "");
  console.log("connected");
  socket.send("InfoBot " + VERSION + " 🄯 copyleft blue 2020\nOK")
})
//for welcome messages
socket.on('update users', function(data) {
  userData = []
  for (var key in data) {
    userData.push(data[key])
  }
})
socket.on('user joined', function(data) {
  if (data.color == "blue; screw yall im awesome") {
    socket.send("Welcome back, creator");
  }
  if (data.home == "MTg1NTM") {
    socket.send("Welcome, Janken the Almighty")
  }
});
socket.on('message', function(data) {
  try {
    //filters and stuff so bot not die
    msg_decoded = he.decode(data.msg)
    if (!(duckwords.some(substring => data.nick.toLowerCase().includes(substring)))) {
      nick = he.decode(data.nick)
    }
    else {
      nick = "💩"
    }
    ///msg handler code
    if (msg_decoded == "@help" || msg_decoded == '@h') {
      console.log("@help");
      socket.send('Hello, I\'m InfoBot!\n\nAPI commands:\n@wp [text]: Pulls a definition from Wikipedia.\n@memes/@meme: Gives a link to a meme.\n@headlines/@headline: Gets a set of headlines from WikiNews\n@day: A bit of info about the day.\n\nTB commands: \n@trollbox: The Trollbox Survival Guide\n@whereis [username]: Finds what room a user is in.\n@cookie.js: exe for cookie\n@antivirus: Delete the REDDITOR virus\n@crasher: crash ur windows93\n\nFun commands: \n@rockpaperscissors: Shoot!\n@bucket: I HAS A BUCKET\n@game: Lets you play a cool game\n@therapy: Therapy time!\n@spacetext [text]: s p a c e  t e x t\n@quote: A quote from me!\n@name: Change the bot\'s name\n@shrug: ¯\_(ツ)_/¯\n@lolcat [text]: lolcatifies text\n@say [text]: Repeats whatever you tell me\n@coolfact/@coolfacts: Cool facts that may or may not be true\n@awfulcommandideas: Really, really bad command ideas you really, really should not suggest\n@cutiemark: idk what this does, it wasnt my idea, blame england\n\nBot commands:\n@infobot: Info on myself\n@license: License info\n@source: Link to the source code\n@creator: About Blue\n@hack: Why this bot is "hack" proof\n\nShell commands: \n@shell start: Start the InfoOS Commandline\n@shell signin [passcode]: Signin to the shell\n@shell signout: Signout from the shell\n\nOwner commands (enabled by @shell signin):\n@stop: EMERGENCY BOT SHUTOFF BUTTON\n@changeroom [room]: Change the room\n@eval [js]: Evaluates 1 line of Javascript (To the 10 year olds trying to "hack" it, good luck XD)\n\nThis bot was made by blue');
    }
    /* else if (msg_decoded == "@failsafe") {
      socket.send(data.date + " failsafe protecc")
    }
    else if (msg_decoded.includes("failsafe protecc")) {
      if (process.uptime() < 1) {
        socket.send("clone failsafe triggered")
        process.exit(1)
      }
      else {
        socket.send("nice try idiot")
      }
    } */
    else if (msg_decoded.includes("@@")) {
      socket.send("w h a t");
    }
    /*else if (msg_decoded.includes("@isbot")) {
      console.log("@isbot")
      var isbot_text = msg_decoded.split(separator = " ");
      delete isbot_text[0]
      var isbot_name = isbot_text.join(" ").substring(1)
      isbot_name = he.encode(isbot_name, {"decimal": true})
      if (!(duckwords.some(substring=>isbot_name.toLowerCase().includes(substring)))) {
        var isbot_userData = getUserData(isbot_name)
        if (isbot_userData) {
          if (isbot_userData.isBot) {
            socket.send("User " + he.decode(isbot_name) + " is a bot.")
          }
          else {
             socket.send("User " + he.decode(isbot_name) + " is not a bot.")
          }
        }
        else {
          if (isbot_name.length == 0) {
            socket.send("insert a parameter duck")
          }
          else {
            socket.send("Could not find user: " + isbot_name)
          }
        }
      }
    }
    */
    else if (msg_decoded.includes("@whereis")) {
      console.log("@whereis")
      var whereis_text = msg_decoded.split(separator = " ");
      delete whereis_text[0]
      var whereis_name = whereis_text.join(" ").substring(1)
      whereis_name = he.encode(whereis_name, { "decimal": true })
      if (!(duckwords.some(substring => whereis_name.toLowerCase().includes(substring)))) {
        var whereis_userData = getUserData(whereis_name)
        if (whereis_userData) {
          socket.send("User " + he.decode(whereis_name) + " is in room: " + whereis_userData.room)
        }
        else {
          if (whereis_name.length == 0) {
            socket.send("insert a parameter duck")
          }
          else {
            socket.send("Could not find user: " + whereis_name)
          }
        }
      }
      else {
        socket.send("lolnope stupid")
      }
    }
    else if (msg_decoded == "@license") {
      socket.send("This work is licensed under The Gnu General Pub")
    }
    else if (msg_decoded.toLowerCase() == "im blue" || msg_decoded.toLowerCase() == "i'm blue") {
      socket.send("daba dee daba die");
    }
    else if (msg_decoded == "@crasher") {
      socket.send("/exe js while (true) {$alert(\"this will crash ur windows93\");}")
    }
    else if (msg_decoded == "@cookie.js") {
      socket.send("/exe js data:text/javascript;base64,ZnVuY3Rpb24gY29va2llKGRhdGEpIHsgaWYgKGRhdGEpIHskYWxlcnQuaW5mbygiKmdpdmVzIGNvb2tpZSogaGVyZSB5YSBnbyEgOikiKTt9IGVsc2UgeyRhbGVydCgiQXd3d3d3Li4uIDstOyIpO319OyAkY29uZmlybSgiV2FudCBhIGNvb2tpZT8/PyIsIGNhbGxiYWNrPWNvb2tpZSk=");
    }
    else if (msg_decoded == "@rockpaperscissors") {
      rps_home = data.home
      socket.send("Make your move! (say 'rock', 'paper', or 'scissors')")
    }
    else if (msg_decoded == "Welcome cunt") {
      socket.send("hey hey hey cunt's back");
    }
    else if (msg_decoded.includes('rock') || msg_decoded.includes('paper') || msg_decoded.includes('scissors')) {
      if (data.home == rps_home) {
        switch (msg_decoded.toLowerCase()) {
          case "rock":
            rps_choice = "rock"
            break;
          case "paper":
            rps_choice = "paper"
            break;
          case "scissors":
            rps_choice = "scissors"
            break;
          default:
            socket.send("Invalid move. Exiting game...")
            rps_home = ""
            var _invalidmove = true
        }
        if (!_invalidmove) {
          var bot_move = choices_list[Math.round(Math.random() * choices_list.length - 1)]
          var game_ending = ""
          socket.send("I choose " + bot_move + "!")
          switch (bot_move) {
            case "rock":
              //console.log("rock")
              //console.log(rps_choice)
              if (rps_choice == "paper") {
                game_ending = "user_won"
              }
              else if (rps_choice == "scissors") {
                game_ending = "bot_won"
              }
              else {
                game_ending = "tie"
              }
              break;
            case "paper":
              //console.log(rps_choice)
              //console.log("paper")
              if (rps_choice == "scissors") {
                game_ending = "user_won"
              }
              else if (rps_choice == "rock") {
                game_ending = "bot_won"
              }
              else {
                game_ending = "tie"
              }
              break;
            case "scissors":
              //console.log(rps_choice)
              //console.log("scissors")
              if (rps_choice == "rock") {
                game_ending = "user_won"
              }
              else if (rps_choice == "paper") {
                game_ending = "bot_won"
              }
              else {
                game_ending = "tie"
              }
              break;
            default:
              socket.send("An error has occured")
          }
          sleep.sleep(2)
          //console.log(game_ending)
          if (game_ending == "user_won") {
            socket.send("You won! Great job!")
          }
          else if (game_ending == "bot_won") {
            socket.send("You lost. Better luck next time!")
          }
          else {
            socket.send("That's a tie.")
          }
          rps_home = ""
          rps_choice = ""
        }
      }
    }
    else if (msg_decoded == "@stop") {
      console.log("@stop")
      if (data.home == user_home) {
        socket.send("STOPPING");
        process.exit(0);
      }
      else {
        socket.send("PERM_ERR: " + nick + " DOES NOT HAVE REQUIRED PERMISSON LEVEL");
      }
    }
    else if (msg_decoded.includes("@name")) {
      console.log("name")
      if ((moment.now() - name_lastUsed) < 10000) { 
        socket.send("This command is on cooldown.")
      }
      else {
        name_lastUsed = moment.now()
        if (msg_decoded.length > 25) {
          socket.send("Looks like that's too long...");
        }
        else if (duckwords.some(substring => msg_decoded.toLowerCase().includes(substring))) {
          socket.send("i think not")
        }
        else {
          var name_text = msg_decoded.split(separator = " ");
          delete name_text[0]
          var new_name = name_text.join(" ")
          socket.emit('user joined', (new_name + ' [@h] ☆'), "#459cff", "", "", "");
        }
      }
    }
    else if (msg_decoded.includes("@changeroom")) {
      console.log('@changeroom')
      if (data.home == user_home) {
        var room_change_text = msg_decoded.split(separator = " ");
        delete room_change_text[0];
        room_id = room_change_text.join(" ")
        socket.send("/r" + room_id)
      }
      else {
        socket.send("PERM_ERR: " + nick + " DOES NOT HAVE REQUIRED PERMISSON LEVEL");
      }
    }
    /*
    else if (msg_decoded == "@reconnect") {
      if (data.home == "NzI3NDV" || data.home == "NQyYmZm" || data.home == "NmQyYzA" || data.home == "NmQyYmZ" ||  data.home == "OTBmYjI") {
        socket.send("Restarting socket...");
        socket.disconnect();
        sleep.sleep(2)
        socket.connect();
        socket.send("Online");
      }
      else {
        socket.send("You're not too admin")
      }
    }*/
    else if (msg_decoded.toLowerCase() == "thanks InfoBot") {
      console.log("thanks")
      socket.send("No problem!");
    }
    else if (msg_decoded.includes("sus")) {
      console.log("sus");
      socket.send(nick + " sus")
    }
    else if (msg_decoded == "@quote") {
      socket.send(text.quotes[Math.round(Math.random() * text.quotes.length - 1)]);
    }
    else if (msg_decoded == "@hack") {
      socket.send('Why this bot is "hacker"-proof:\n1. It has a list of banned words in the @name and @say commands, to provent illegal names and sentences like "*hugs*".\n2. The bot\'s @eval and @stop functions are protected by a randomly-changing 4-digit password that has never been guessed.\n3. The bot has been tested numerous times by some friends of the creators, and has been found to be well-protected.\nGood luck 10 yr olds')
    }
    else if (msg_decoded == "@antivirus") {
      socket.send('/exe js $db.set("boot/Windows93 Speedup.js", "")')
    }
    else if (msg_decoded == "@bucket") {
      console.log("bucket")
      socket.send("https://ihasabucket.com");
    }
    else if (msg_decoded.includes("blue")) {
      console.log("blue")
      //socket.send("You talking bout my creator?")
    }
    else if (msg_decoded == "@source") {
      socket.send("Source code at https://repl.it/@tehgingergod/InfoBot#index.js");
    }
    else if (msg_decoded == "@trollbox") {
      socket.send("Welcome to Trollbox, the most obscure social media site on the Intrnets! We've got furries, programmers, depressed people, angsty teenagers, tech support roleplayers, fake bots, and more! We try to be a bigot-free zone, so that everyone can feel at least a  bit welcome. The only rules are:\n1. No use of the n-word. Peopkle can be offended!\n2: No sexual harrsamenty. this should go without saying.\n3: Don't make a bot unless yiou have prior programming expeience.\n4: Don't spam or post links to sghitty malware.\n5. Don't abuse the bots.\nEnjoy your time on Trollbox!")
    }
    else if (msg_decoded == "@infobot") {
      console.log("@InfoBot");
      var status = "OFFLINE"
      if (socket.connected) {
        status = "ONLINE"
      }
      socket.send("InfoBot " + VERSION + " made by blue, powered by Node.JS and Reddit. Now a member of star gang! \nUse @help to get help\n\nDEBUG:\nSTATUS: " + status + "\nUPTIME: " + process.uptime() + "\nSOCKID: " + socket.id + "\nLIBS_LOADED: 13/13\nSERVER: http://www.windows93.net\nPORT: 8081");
    }
    else if (msg_decoded.includes("@spacetext")) {
      console.log("@spacetext");
      var speak_args = msg_decoded.split(" ");
      if (speak_args.length == 1) {
        socket.send("u need a parameter my guy");
      }
      else {
        delete speak_args[0];
        //console.log(speak_args)
        var char_list = speak_args.join(" ").split("")
        socket.send(char_list.join(" ").substring(2))
      }
    }
    else if (msg_decoded.includes("@wp")) {
      console.log("@wp");
      var wp_text = msg_decoded.split(separator = " ");
      delete wp_text[0];
      wp_text = wp_text.join("_")
      var apicall = "https://en.wikipedia.org/w/api.php?action=query&format=json&exsentences=3&prop=extracts&titles=" + wp_text + "&formatversion=2&exintro=1&explaintext=1" //the default api call
      //console.log(apicall)
      //console.log(wp_text)
      wpapi.get(apicall, (err, res) => {
        console.log(err);
        try {
          var pagelist = JSON.parse(res.text).query.pages; //this is the list of pages. it should be 1 item long
          //console.log(pagelist[0].extract);
          if (pagelist[0].extract) {
            socket.send("Definition of \"" + wp_text.split("_").join(" ").substring(1) + "\": " + pagelist[0].extract + " -Wikipedia");
          }
          else {
            socket.send("Unable to find definition");
          }
        }
        catch (e) {
          socket.send("Error retreiving definition. Did you add an argument?"); //this detects an error caused when the bot cant delete wp_text[0].
        }
      });
    }
    else if (msg_decoded == "@headlines" || msg_decoded == "@headline") {
      console.log("@headlines");
      socket.send("Acessing headlines, please wait...")
      sleep.sleep(1)
      let feed = parser.parseURL('https://en.wikinews.org/w/index.php?title=Special:NewsFeed&feed=rss&categories=Published&notcategories=No%20publish%7CArchived%7cAutoArchived%7cdisputed&namespace=0&count=15&ordermethod=categoryadd&stablepages=only').then(function(result) { //this uses an rss feed to get the headlines
        var titlecounter;
        var headlines = "";
        for (titlecounter = 0; titlecounter < result.items.length; titlecounter++) { //loops through all the headlines
          headlines += result.items[titlecounter].title + " | Published on " + result.items[titlecounter].pubDate + "\n";
          //console.log(result.items[titlecounter].title);
        }
        socket.send("Recent headlines:\n\n" + headlines)
      });
    }
    else if (msg_decoded == "@day") {
      console.log("@day")
      let featuredfeed = parser.parseURL("https://en.wikipedia.org/w/api.php?action=featuredfeed&feed=featured&feedformat=rss").then(function(result) {
        var featured_link = result.items[result.items.length - 1].link
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');
        socket.send("Current time: " + time + "\nToday's Wikipedia featured article: " + featured_link + " \nRandom quote:  " + quote.getQuote());
      })
    }
    else if (msg_decoded == "@coolfact" || msg_decoded == "@coolfacts") {
      console.log("@coolfacts")
      var cool_fact = facts.getRandomFact()
      socket.send("True or false: " + cool_fact.title);
    }
    else if (msg_decoded == "@memes" || msg_decoded == "@meme") {
      console.log("@meme");
      socket.send("Getting a meme, please wait...")
      meme(function(err, data) {
        if (err) return console.error(err);
        console.log("Got a meme")
        console.log(data);
        socket.send("Here's \"" + data.title + "\" (from the r/" + data.subreddit + " subreddit, created by " + data.author + "): " + data.url);
      });
    }
    /* else if (msg_decoded.includes("@google")) {
      var google_text = msg_decoded.split(" ")
      delete google_text[0]
      google("banana", function(err, res) {
        if (err) {
          socket.send("Error while searching: " + err)
        }
        else {
          console.log(res.links)
          //var top_res = res.links[0]
          //socket.send('Top result: ' + top_res.title + " | " + top_res.href)
        }
      })
    } */
    else if (msg_decoded == "@creator") {
      console.log("@creator");
      socket.send("All you need to know about Blue:\n1. Programmer\n2. Ginger");
    }
    else if (msg_decoded == "@awfulcommandideas") {
      console.log("@awfulcommandideas")
      socket.send("Really, really bad command ides that you really, really should not suggest:\nAnything that is not safe for work. InfoBot's code is public, better safe than sorry.\nAnything any other bot already does.");
    }
    else if (msg_decoded == "#008080") {
      socket.send("eugh");
    }
    else if (msg_decoded.includes("@say")) {
      if (duckwords.some(substring => msg_decoded.includes(substring))) { //this is a chat filter
        socket.send("thats illegal u duck");
      }
      else if (msg_decoded.length > 50) {
        socket.send("Looks like that's too long...");
      }
      else {
        console.log("@say");
        var say_text = msg_decoded.split(separator = " ");
        delete say_text[0];
        socket.send(say_text.join(" ").substring(1));
      }
    }
    else if (msg_decoded == "@game") {
      console.log("@game");
      socket.send("Here's a cool game: https://tinyurl.com/memebotgame");
    }
    /*  else if (msg_decoded == "what") {
       console.log("what");;
       socket.send("what?");
     } */
    else if (msg_decoded.toLowerCase() == "hello there") {
      socket.send("General Kenobi!");
    }
    /*  else if (msg_decoded == "no u") {
       console.log("no u");
       socket.send("no u");
     }
     else if (msg_decoded.includes("69")) { //not my idea
       console.log("69");
       socket.send("l mfao noice");
     } */
    else if (msg_decoded == "@cutiemark") {
      console.log("@cutiemark")
      socket.send("https://www.youtube.com/watch?v=bWFkW29hOfg");
    }
    else if (msg_decoded.includes("@shrug")) {
      console.log("@shrug")
      socket.send("¯\_(ツ)_/¯");
    }
    else if (msg_decoded.toLowerCase() == "owo") {
      socket.send("whats this")
    }
    else if (msg_decoded == '@therapy') {
      console.log("@therapy");
      socket.send("https://www.youtube.com/watch?v=GjUJ_ud3toM");
    }
    else if (msg_decoded == "Hello, InfoBot [@h] ☆!") {
      socket.send("Hello, OtherBot!");
    }
    /* else if (msg_decoded.toLowerCase() == "car" || msg_decoded.toLowerCase() == "cars") {
      socket.send("vroom vroom");
    }
    */
    else if (msg_decoded.toLowerCase() == "hello infobot") {
      console.log("hey");
      socket.send("Hey there!");
    }
    /*
    else if (msg_decoded.toLowerCase().includes("gayleb")) {
      console.log("gayleb")
      socket.send("Gayleb is the best");
    }
    else if (msg_decoded.toLowerCase().includes("infobot")) {
      console.log("mentioned");
      socket.send("Whomst has mentioned me?");
    } */
    /*
    else if (msg_decoded.includes("bot")) {
      console.log("bot");
      socket.send("you said BOT, and im one of them");
    }
    */
    else if (msg_decoded.includes("nigga") || msg_decoded.includes("nigger")) {
      socket.send("man, " + nick + " going straight to hell")
    }
    else if (msg_decoded == "@debug") {
      console.log(data);
      socket.send("Printed debug to console");
    }
    else if (msg_decoded.includes("@ban)")) {
      if (data.home == "NzI3NDV" || data.home == "NQyYmZm" || data.home == "NmQyYzA" || data.home == "OTBmYjI" || data.home == "NmQyYmZ" || data.home == "NmZiYTM") {
        var ban_text = msg_decoded.split(separator = " ");
        socket.send("/block " + ban_text[1])
      }

    }
    else if (msg_decoded.includes("@lolcat")) {
      console.log("@lolcat");
      if (msg_decoded == "@lolcat") { socket.send("usage: @lolcat [text]") };
      var lolspeak_text = msg_decoded.split(separator = " ");
      delete lolspeak_text[0];
      socket.send(LOLSPEAK(lolspeak_text.join(" ")));
    }
    else if (msg_decoded.toLowerCase() == 'f') {
      console.log("f");
      socket.send("Respect paid!")
    }
    else if (msg_decoded == "@shell start") {
      if (SHELL_STATE == 0) {
        socket.send("InfoOS cmndline © blue 2020\nOK AWAITING SIGNIN >")
        global.passcode = crypto.randomBytes(6).toString('hex') 
        console.log("Passcode: " + passcode)
        SHELL_STATE = 1
      }
      else {
        if (SHELL_STATE == 1) {
          socket.send("SIGNIN IN PROGRESS")
        } else {
          socket.send("ALREADY SIGNED IN; USE @shell signout TO SIGNOUT")
        }
      }
    }
    else if (msg_decoded.includes("@shell signin")) {
      if (SHELL_STATE == 1) {
        var signin_text = msg_decoded.split(separator = " ");
        if (Number(signin_text[2]) == passcode) {
          socket.send("SIGNIN COMPLETE")
          user_home = data.home
          SHELL_STATE = 2
        }
        else {
          socket.send("SIGNIN FAILED")
          SHELL_STATE = 0
          user_home == ""
        }

      }
      else if (SHELL_STATE == 0) {
        socket.send("SHELL NOT STARTED")
      }
      else {
        socket.send("SHELL ALREADY SIGNED IN")
      }
    }
    else if (msg_decoded == "@shell signout") {
      if (data.home == user_home) {
        socket.send("SIGNOUT COMPLETE")
        SHELL_STATE = 0
        user_home == ""
      }
      else {
        socket.send("USER " + nick + " NOT SIGNED IN")
      }
    }
    else if (msg_decoded.includes("@eval")) {
      if (data.home == user_home) {
        var eval_text = msg_decoded.split(separator = " ");
        delete eval_text[0]
        //console.log(eval_text)
        try {
          socket.send(eval(eval_text.join(" ")));
        }
        catch (e) {
          socket.send("Error while evaluating: " + e)
          //console.error(e)
        }
      }
      else {
        socket.send("PERM_ERR: " + nick + " DOES NOT HAVE REQUIRED PERMISSON LEVEL");
      }
    }
    else if (msg_decoded.includes("@")) {
      socket.send("Invalid command. Type @h for command list.");
    }
  }
  catch (e) {
    socket.send("InfoBot has encountered a noncritical error. Please contact blue as soon as possible. Stack trace:\n\n" + e)
    console.error(e)
  }
});
setInterval(function() {
  console.log("keepalive");
  socket.emit('user joined', 'InfoBot [@h] 🎄', "#459cff", "", "", "");
  if (!socket.connected) {
    socket.connect()
  }
  //socket.emit('message', text.quotes[Math.round(Math.random() * text.quotes.length - 1)])
}, 100000)
setInterval(function() {
  if (SHELL_STATE == 1) {
    socket.send("SHELL SIGNIN TERMINATED")
    SHELL_STATE = 0
  }
}, 20000)
