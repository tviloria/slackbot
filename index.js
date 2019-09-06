const slackbot = require('slackbots'); 
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();


const bot = new slackbot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'inspiration'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':anonymous:'
    };

    bot.postMessageToUser(
        'tviloria',
        'Get inspired mate',
        params
    );
}),

bot.on('error', (err) => {
    console.log(err);
})

bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

function handleMessage(message) {
    if(message.includes(' inspire me')) {
        inspireMe();
    }
//    else if(message.includes(' random joke')) {
//         randomJoke();
//     }
//     else if(message.includes(' help')) {
//         runHelp();
//     }
}

//function elon() 
// use axios to get JSON data just like the inspireMe function 


function inspireMe() {
    axios.get('https://raw.githubusercontent.com/tviloria/slackbot/master/elon-quotes.json')
      .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }
        
            bot.postMessageToUser(
                'tviloria',
                `:zap: ${quote} - *${author}*`,
                params
            );

      })
}