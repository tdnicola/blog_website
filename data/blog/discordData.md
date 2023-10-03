---
title: Discord insult bot
date: 2020/05/30
description: Discord bot that takes various commands to interact with APIS
tags: ['web development', 'discord', 'api']
draft: false
summary: 'Discord bot that takes various commands to interact with APIS'
---

# Discord bot that insults/praises + more to your friends.

![Robots are taking over](https://upload.wikimedia.org/wikipedia/commons/c/cd/HAL9000_I%27m_Sorry_Dave_Motivational_Poster.jpg)

## Throw a random insult/praise or just spice it up with a random/searched gif.

## [Discord Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=613364681750609943&permissions=0&scope=bot)

Problem ❓:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wanted to spice up a discord channel with some burns to players. And also I mean learn how to code some stuff.

Solution ✔️:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discord bot that quickly transformed into my favorite project.

---

I think any good way to continue to learn something is to have fun. You're much more motivated to continue to learn when you're having fun. An example where I learned that was math. I hated math in high school. It was so boring. I fucking sucked at it, I think I failed 3 years of it in highschool? My senior year I had to take a computer lab for math. They were like this guy is unteachable, let a computer teach him.

It's saying something if the computer lab was my favorite way to learn math.. It wasn't until college (I had to basically build my way with remedial math courses to get to college algebra) until I found out that math isn't that boring. The teachers that taught math were awful. They sucked at teaching it more than I sucked at learning it.

When someone is a good teacher you want to learn anything from them. I wish I could remember his name but my college algebra teacher was amazing. He talked about zombies, used pirates as examples, talked about movies. ALL in examples with math. This dude was a godsend in the math teaching world for me. I passed, and not only passed I enjoyed it. I remember writing a letter to him explaining how much of a good teacher he was to me. All because he made it fun. I try to keep that philosophy when learning new things, keep it fun and you will want to keep going at it. No one want's to suck at learning something.

##### Some highlights and things I've learned from this bot:

1. 5 different API's (insult, praise, gif, cowspeak, 8ball). Honestly if you know 1 API you know how to do it...
2. PostgreSQL queries to update and get statistics of bot usage.
3. Learned/implemented about object oriented programming and polymorphism on statistics.js.
4. Learned/implemented a command handler for ease of adding commands and just general code viewing.

```
/insult @person

/praise @person

/gif

/gif searchterm

/moo sentence

/timer 5 mins

/choose this or that?

/poll Which number is better? +1 +2

/comment hey can we add this feature?

/help for a list of commands


```

API links:

- [Insults](https://insult.mattbas.org/api/insult)
- [Praises](https://complimentr.com/api)
- [Gifs](https://api.giphy.com/v1/gifs/random)
- [CowSay](http://cowsay.morecode.org/)
- ~~[8Ball](https://8ball.delegator.com/)~~ Killed by heroku

## Requirements

1. [Need Node.js and Discord.js installed](https://discordjs.guide/preparations/#installing-node-js)
2. Create discord account for your bot and add it to your server. Add token to config.json

## Installation

1. git clone https://github.com/tdnicola/discord_insult-bot
2. npm i
3. update config.json file with tokens:

- Token: discord bot token
- Prefix: currently ! -- Moved to slash commands 12/19/22
- Giftoken: giphy token
- ConnectionString: heroku postgres string (if wanted to your own tracking. Would have to set up own server)

4. comment out stat api calls if no need for tracking stats
5. node bot.js

#### Final Heroku Postgres Stats 12/5/22: -RIP

###### Currently on 47 servers

| Command                     | Counts |
| --------------------------- | ------ |
| Insults:                    | 804    |
| Praises:                    | 446    |
| Gifs:                       | 704    |
| CowSpeaks:                  | 107    |
| Thanks given:               | 6      |
| 8Balls:                     | 146    |
| Incorrect channels (noobs): | 9      |

~~deployed on heroku~~ Local home server

> ## [code:](https://github.com/tdnicola/discord_insult-bot)
