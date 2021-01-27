const request = require('request');
const fs = require('fs');
const prompt = require('prompt');
const lineReader = require('line-reader');

if (process.argv[2] == 'leaderboard'){
    var jokesArray = [];
    lineReader.eachLine('./dadJokes.txt', function(line) {
        jokesArray.push(line);
    });

    setTimeout(()=>{
        var mf = 1;
        var m = 0;
        var item;
        for (var i=0; i<jokesArray.length; i++)
        {
            for (var j=i; j<jokesArray.length; j++)
            {
                if (jokesArray[i] == jokesArray[j])
                    m++;
                if (mf<m)
                {
                    mf=m;
                    item = jokesArray[i];
                }
            }
            m=0;
        }
        console.log(item+" ( " +mf +" times ) ") ;
    },500)

}

else{
    prompt.start();
    prompt.get(['searchTerm'], (err, result)=>{

        const options = {
            url: 'https://icanhazdadjoke.com/search?term=' + result.searchTerm,
            headers: {
                'Accept': 'application/json'
            }
        };

        request(options, function(error, response, body){
            if(!error && response.statusCode == 200){

                if(JSON.parse(body).results.length == 0){
                    console.log("No jokes found");
                }
                else{
                    JSON.parse(body).results.forEach((joke) => {
                        console.log(joke.joke);
                        fs.appendFile("dadJokes.txt", joke.joke + "\n", (err) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                }

            }
        })
    })

}



