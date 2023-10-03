---
title: End of an Discord bot era
date: 2022/10/25
description: Heroku is removing free tier dynos. To self host or not?
tags: ['web development', 'discord', 'api', 'hosting']
draft: false
summary: 'Heroku is removing free dynos. Find an alternative? Or self host... Hmm '
---

## RIP free dynos

Problem ❓:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Free Heroku dynos going away.

Solution ✔️:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do it yourself?

On August 25th Heroku announced the end of [free dynos](https://blog.heroku.com/next-chapter). I've always used heroku for my hobby tier projects. It's one of those too good to be true situations. I understand the idea behind it to increase revenue. But damn it hurts to see it happen.

My favorite and probably most used project, [discord bot](/blog/discordData), is hosted on Heroku. I'm using the free worker dyno and the hobby postgres database for some data tracking. In November Heroku will start shutting these down if you do not transfer to a paid subscription.

![Heroku's future for hobby servers..](http://driving-tests.org/wp-content/uploads/2020/09/shutterstock_1740923465.jpg)
I've got a small home server that primarily runs a plex movie server. I'm wondering if I should host the discord bot on that and try to learn some new skills in keeping it running and learning more about logging events. Or try another server like google cloud VMS, webHorizon, Deta.sh, or fly.io. I'm cheap and like to learn, so it will most likely be locally.

The problem that I'm having is if it somehow crashes I'd like for the process to restart it self and keep itself running. I think this can easily be obtained with some bash scripting but that is also something that I'd have to learn.

With changing it to locally it also brings more questions on the data side of things. It currently uses postgres to just track the amount of times a command has been called. Super basic. But do I want to rebuild that and see who makes the most calls? What server uses it the most? If I'm going to redo the database side do I just want to completely redo it? It's not super indepth but do I really want that info?

I think I'll report back when I figure these out..

Update: 12/19/22:

I've been using [PM2](https://app.pm2.io) to keep the discord server up on my local server. Has been working like a charm. Still have not replaced the postgres server. That will be my next step. But alas insult bot is alive again!!
