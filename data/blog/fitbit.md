---
title: Fitbit application
date: '6/1/21'
description: See your FitBit data in a new way..
tags: ['web development', 'FitBit', 'api']
draft: false
summary: 'See your FitBit data in a new way..'
---

## FitBit data

Check it out at: [github fitbit](tdnicola.github.io/fitbit_api/)

> Web app for displaying personal Fitbit data. Or Guest Data if no fitbit login.

Problem ❓:  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wanted to see my fitbit information in a different way other than the app/watch.


Solution ✔️:  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create a web app for it.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I had a lot of fun with this app. It was fun to start to use data that I was interested in and make it more visual than the watch itself. 

Guest user will show information from a state of my fitbit device: 

![fitbitguestdata](https://i.ibb.co/3YW0VB4/fitbitapi.png "fitbit guest data picture")

Login with credentials will redirect user to the fitbit authentication login screen. Once authorized will display their data: 

![fitbitApi](https://i.ibb.co/nzv9kzF/fitbitconsent.png "FitbitApi authentication")

If you're interested yourself at installing/using use below information.

[Github repo](https://github.com/tdnicola/Fitbit_api)
To install

```
npm i
```

To Start/run

```
npm start
```

## Dependencies

```
    "@material-ui/core",
    "@material-ui/icons"
    "@testing-library/jest-dom"
    "@testing-library/react"
    "@testing-library/user-event"
    "axios",
    "enzyme",
    "enzyme-adapter-react-16",
    "react"",
    "react-dom"",
    "react-scripts"
    "recharts"
```