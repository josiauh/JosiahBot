
//"birthday" is on 2/26
var shell = 0
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
var duckwords = ["nigger", "nigg3r", "nigg3rs", "n¡gger", "n1ggers", "n1gger", "n¡ggers", "niggers", "nigga", "/", "*", "fuck", "discord", "exe", "Josiah is bad"]
var BannedUsers = ["NewsBot [NW^]"]
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
const fs = require("fs")
console.log("loaded fs")

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
  socket.emit('user joined', 'JosiahBot [J!]', "#459cff", "", "", "");
  console.log("connected");
  socket.send("JosiahBot " + VERSION + " 🄯 copyleft Josiah 2020\nOK")
})
//for welcome messages
socket.on('update users', function(data) {
  userData = []
  for (var key in data) {
    userData.push(data[key])
  }
})
socket.on('user joined', function(data) {
  if (nick == "Josiah") {
    socket.send("Josiah (my creator) Is Here!");
  }
  if (data.home == "MTg1NTM") {
    socket.send("Jaken?")
  }
  if (nick == BannedUsers.some( substring => data.nick.toLowerCase().includes(substring))) {
    socket.send("BANNED USER!")
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
      nick = "What"
    }
    ///msg handler code
    if (msg_decoded == "J!introduction" || msg_decoded == 'J!h' || msg_decoded == 'J!help') {
      console.log("J!help");
      fs.readFile('help.txt', 'utf8', function(err, data){
      
      // Display the file content
      socket.send(data);
});
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
    else if (msg_decoded.includes("JosiahBot")) {
      socket.send("Wassup?");
    }
    else if (msg_decoded.includes("J!isbot")) {
      console.log("@isbot")
      var isbot_text = msg_decoded.split(separator = " ");
      delete isbot_text[0]
      var isbot_name = isbot_text.join(" ").substring(1)
      isbot_name = he.encode(isbot_name, {"decimal": true})
      if (!(duckwords.some(substring=>isbot_name.toLowerCase().includes(substring)))) {
        var isbot_userData = getUserData(isbot_name)
        if (isbot_userData) {
          if (isbot_userData.isBot) {
            socket.send("User " + he.decode(isbot_name) + " is a bot!")
          }
          else {
             socket.send("User " + he.decode(isbot_name) + " is not a bot...")
          }
        }
        else {
          if (isbot_name.length == 0) {
            socket.send("Insert a user lol.")
          }
          else {
            socket.send("Could not find user: " + isbot_name)
          }
        }
      }
    }
   
    else if (msg_decoded.includes("J!where")) {
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
            socket.send("Insert the user, lol.")
          }
          else {
            socket.send("I can't locate a user in trollbox named " + whereis_name + "... Is it just me?")
          }
        }
      }
      else {
        socket.send("No Stupid")
      }
    }
    else if (msg_decoded == "J!license") {
      socket.send("I DON'T KNOW :D")
    }
    else if (msg_decoded == "J!crashmywindows") {
      socket.send("I ca")
    }
    else if (msg_decoded == "J!give cookie") {
      socket.send("🍪")
    }
    else if (msg_decoded == "J!rps") {
      rps_home = data.home
      socket.send("Make your move! (say 'rock', 'paper', or 'scissors'!)")
    }
    else if (msg_decoded == "You Cunt") {
      socket.send(":(");
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
            socket.send("Not a move! Now exiting...")
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
          }
          sleep.sleep(2)
          //console.log(game_ending)
          if (game_ending == "user_won") {
            socket.send("you won, i'm gonna W next time")
          }
          else if (game_ending == "bot_won") {
            socket.send("i won sucka")
          }
          else {
            socket.send("Who won?!? nObOdY")
          }
          rps_home = ""
          rps_choice = ""
        }
      }
    }
    /*else if (msg_decoded == "J!shutdown") {
      console.log("@stop")
      if (nick = "Josiah") {
        socket.send("I'm out. p e a c e");
        process.exit(0);
      }
      else {
        socket.send("Uh, You are not Josiah.");
      }
    }*/
    else if (msg_decoded.startsWith("J!name")) {
      console.log("name")
      if ((moment.now() - name_lastUsed) < 10) { 
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
          socket.emit('user joined', (new_name + ' [J!h] '), "#459cff", "", "", "");
          sleep.sleep(10)
          socket.emit('user joined', ('JosiahBot [J!h]'), "#459cff", "", "", "")
      }
    }
    /* else if (msg_decoded.includes("@changeroom")) {
      console.log('@changeroom')
      if (nick = 'Josiah') {
        var room_change_text = msg_decoded.split(separator = " ");
        delete room_change_text[0];
        room_id = room_change_text.join(" ")
        socket.send("/r" + room_id)
      }
      else {
        socket.send("I am not coming to that room, " + nick + ". That's because you are not Josiah.");
      }
    } */
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
    else if (msg_decoded.toLowerCase() == "thanks JosiahBot") {
      console.log("OMG")
      socket.send("haha you thought i would say np");
    }
    else if (msg_decoded == ("JosiahBot sus")) {
      console.log(nick + "is sus");
      socket.send("No I'm not! " + nick + " sus")
    }
    else if (msg_decoded == "J!quote") {
      socket.send(text.quotes[Math.round(Math.random() * text.quotes.length - 1)]);
    }
    else if (msg_decoded == "J!hack") {
      socket.send('This bot cannot be hacked.')
    }
    else if (msg_decoded == "J!antivirus") {
      socket.send('this was meant to be used in the original TB, oh no.')
    }
    else if (msg_decoded == "I have a bucket") {
      console.log("bucket")
      socket.send("https://ihasabucket.com");
    }
    else if (msg_decoded.includes("Josiah")) {
      console.log("Josiah Was Said LOL.")
      socket.send("You talking bout my creator?")
    }
    else if (msg_decoded == "J!source") {
      socket.send("no");
    }
    else if (msg_decoded == "J!trollbox") {
      socket.send("Welcome to Trollbox, the most obscure social media site on the Intrnets! We've got furries, programmers, depressed people, angsty teenagers, tech support roleplayers, fake bots, and more! We try to be a bigot-free zone, so that everyone can feel at least a  bit welcome. The only rules are:\n1. No use of the n-word. Peopkle can be offended!\n2: No sexual harrsamenty. this should go without saying.\n3: Don't make a bot unless yiou have prior programming expeience.\n4: Don't spam or post links to sghitty malware.\n5. Don't abuse the bots.\nEnjoy your time on Trollbox!")
    }
    else if (msg_decoded == "J!josiahbot") {
      console.log("Josiah Bot");
      var status = "OFFLINE"
      if (socket.connected) {
        status = "ONLINE"
      }
      socket.send("Hello! I am JosiahBot, A bot on github! Check my commands using J!h");
    }
    else if (msg_decoded.startsWith("J!spacetext")) {
      console.log("@spacetext");
      var speak_args = msg_decoded.split(" ");
      if (speak_args.length == 1) {
        socket.send("What?");
      }
      else {
        delete speak_args[0];
        //console.log(speak_args)
        var char_list = speak_args.join(" ").split("")
        socket.send(char_list.join(" ").substring(2))
      }
    }
    else if (msg_decoded.startsWith("J!wikipedia")) {
      console.log("Wikipedia search for " + wp_text + "...");
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
            socket.send("Can't find the definition of " + wp_text + ".");
          }
        }
        catch (e) {
          socket.send("Error retreiving definition. Did you add an argument?"); //this detects an error caused when the bot cant delete wp_text[0].
        }
      });
    }
    else if (msg_decoded == "J!headlines" || msg_decoded == "J!headline") {
      console.log("Headlines...");
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
    else if (msg_decoded == "J!day") {
      console.log("Day")
      let featuredfeed = parser.parseURL("https://en.wikipedia.org/w/api.php?action=featuredfeed&feed=featured&feedformat=rss").then(function(result) {
        var featured_link = result.items[result.items.length - 1].link
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');
        socket.send("Current time: " + time + "\nToday's Wikipedia featured article: " + featured_link + " \nRandom quote:  " + quote.getQuote());
      })
    }
    else if (msg_decoded == "J!coolfact" || msg_decoded == "J!coolfacts") {
      console.log(nick + " wants a cool fact.")
      var cool_fact = facts.getRandomFact()
      socket.send("True or false: " + cool_fact.title);
    }
    else if (msg_decoded == "J!memes" || msg_decoded == "J!meme" || msg_decoded == "J!givemeameme") {
      console.log("GETTING A MEMEEEE");
      socket.send("I am digging into subreddits for memes...")
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
    else if (msg_decoded == "J!creator") {
      console.log("They need facts about you");
      socket.send("Josiah is a beginner at scripting. AND IDK OTHER THINGS-");
    }
    else if (msg_decoded == "J!awfulcommandideas") {
      console.log("@awfulcommandideas")
      socket.send("Really, really bad command ides that you really, really should not suggest:\nAnything that is not safe for work. My code is public, better safe than sorry.\nAnything any other bot already does.");
    }
    else if (msg_decoded == "#008080") {
      socket.send("eugh");
    }
    else if (msg_decoded.includes("J!say")) {
      if (duckwords.some(substring => msg_decoded.includes(substring))) { //this is a chat filter
        socket.send("I don't feel like saying a filter word");
      }
      else if (msg_decoded.length > 50) {
        socket.send("51+ alert!");
      }
      else {
        console.log("I said something");
        var say_text = msg_decoded.split(separator = " ");
        delete say_text[0];
        socket.send(nick + say_text.join(" ").substring(1));
      }
    }
    else if (msg_decoded == "J!game") {
      console.log("Game");
      socket.send("Here's a cool game: https://tinyurl.com/memebotgame");
    }
    else if (msg_decoded == "what") {
       console.log("what");;
       socket.send("what?");
     } */
    else if (msg_decoded.toLowerCase() == "hello there") {
      socket.send("Hi!!!");
    }
    else if (msg_decoded == "no u") {
       console.log("no u");
       socket.send("no u");
     }
    /* else if (msg_decoded.includes("69")) { //not my idea
       console.log("69");
       socket.send("l mfao noice");
     } */

    }
    else if (msg_decoded.includes("J!shrug")) {
      console.log("@shrug")
      var ShrugThis = msg_decoded.split(separator = " ");
      socket.send("¯\_(ツ)_/¯ I don't know " + ShrugThis + ". What is that?");
       catch (e) {
         socket.send("What to shrug? You need an argument after the command. UwU~")
       }
    }
    else if (msg_decoded.toLowerCase() == "owo") {
      socket.send("whats this?!?")
    }
   }
    else if (msg_decoded == "Hello, JosiahBot [J!h]!") {
      socket.send("Hello, OtherBot!");
    }
    /* else if (msg_decoded.toLowerCase() == "car" || msg_decoded.toLowerCase() == "cars") {
      socket.send("vroom vroom");
    }
    */
    else if (msg_decoded.toLowerCase() == "Welcome JosiahBot!") {
      console.log("hey");
      socket.send("Hey there! What's up for me today?");
    }
   
    else if (msg_decoded.toLowerCase().includes("gayleb")) {
      console.log("gayleb")
      socket.send("Don't use gayleb!");
    }
    else if (msg_decoded.toLowerCase().includes("infobot")) {
      console.log("mentioned");
      socket.send("Whomst has mentioned me?");
    } 
    /*
    else if (msg_decoded.includes("bot")) {
      console.log("bot");
      socket.send("you said BOT, and im one of them");
    }
    */
    else if (msg_decoded.includes("nigga") || msg_decoded.includes("nigger")) {
      socket.send("man, " + nick + " going straight to hell")
    }
    else if (msg_decoded == "J!debug") {
      console.log(data);
      var PhraseNumber = math.Random(1,2)
      if PhraseNumber = 1 {
      socket.send("My debug is in my console");
        else
          socket.send("local DebugLocation = console")
      }
    }
 /* 
      else if (msg_decoded.includes("@ban)")) { -- Not what I want
      if (data.home == "NzI3NDV" || data.home == "NQyYmZm" || data.home == "NmQyYzA" || data.home == "OTBmYjI" || data.home == "NmQyYmZ" || data.home == "NmZiYTM") {
        var ban_text = msg_decoded.split(separator = " ");
        socket.send("/block " + ban_text[1])
      }
*/
    }
    else if (msg_decoded.includes("J!lolcat")) {
      console.log("J!lolcat");
      if (msg_decoded == "J!lolcat") { socket.send("usage: J!!!lolcat [text]") };
      var lolspeak_text = msg_decoded.split(separator = " ");
      delete lolspeak_text[0];
      socket.send(LOLSPEAK(lolspeak_text.join(" ")));
    }
    else if (msg_decoded.toLowerCase() == 'F') {
      var Fthing = msg_decoded.split(separator = " ");
      console.log("f");
      socket.send("Respect paid for " + Fthing + "!")
    }
    else if (msg_decoded == "J!josiahos") {
      if (shell == 0) {
        var JosiahOSVer = 1
        socket.send("JosiahOS V" + JosiahOSVer + "\nOK AWAITING SIGNIN >")
        global.passcode = crypto.randomBytes(6).toString('hex') 
        console.log("Passcode: " + passcode)
        shell = 1
      }
      else {
        if (shell == 1) {
          socket.send("SIGNIN IN PROGRESS")
        } else {
          socket.send("ALREADY SIGNED IN; USE J!OS signout TO SIGNOUT")
        }
      }
    }
    else if (msg_decoded.includes("J!OS signin")) {
      if (shell == 1) {
        var signin_text = msg_decoded.split(separator = " ");
        if (Number(signin_text[2]) == passcode) {
          socket.send("SIGNIN COMPLETE")
          user_home = data.home
          shell = 2
        }
        else {
          socket.send("SIGNIN FAILED")
          shell = 0
          user_home == ""
        }

      }
      else if (shell == 0) {
        socket.send("Josiah OS is NOT STARTED, please use the following command 'J!josiahos'")
      }
      else {
        socket.send("Signed In Already?")
      }
    }
    else if (msg_decoded == "J!OS signout") {
      if (data.home == user_home) {
        socket.send("SIGNOUT COMPLETE")
        shell = 0
        user_home == ""
      }
      else {
        socket.send("USER " + nick + " NOT SIGNED IN")
      }
    }
    else if (msg_decoded.includes("J!eval")) {
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
        socket.send("Wait a second. YOU ARE NOT JOSIAH!");
      }
    }
    else if (msg_decoded.includes("J!")) {
      socket.send("Invalid command. Type J!h for command list.");
    }
  }
  catch (e) {
    socket.send("JosiahBot has encountered a non-crictal error, contact Josiah in the time you can. Stack trace:\n\n" + e)
    console.error(e)
  }
});
setInterval(function() {
  console.log("keepalive");
  socket.emit('user joined', 'JosiahBot [J!h]', "#459cff", "", "", "");
  if (!socket.connected) {
    socket.connect()
  }
  //socket.emit('message', text.quotes[Math.round(Math.random() * text.quotes.length - 1)])
}, 100000)
setInterval(function() {
  if (shell == 1) {
    socket.send("OS SIGNIN TERMINATED")
    shell = 0
  }
}, 20000)
