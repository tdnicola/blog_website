---
title: AutoHotKey workflow
date: 6/13/21
description: Current set up with AutoHotKey for work
tags: ['automation', 'autohotkey']
draft: false
summary: 'Current workflow of AutoHotKey for work'
---

## AutoHotKey shortcuts for workflow

I never thought I'd like AutoHotKey as much as I would.

My first mechanical keyboard was/is a Ducky One 2 mini. It took me forever to decide on a 60% vs a 65% keyboard. I really enjoyed using the arrow keys and thought I would hate not having dedicated arrow keys. I was pretty wrong about that. Once I switched and got used to it, I haven't looked back.

The Ducky One 2 mini has a function layer for the arrow keys to be fn + jkli. Super convenient.

![JKLI as arrow keys](/static/images/arrowKeys.png)

`Credit to https://tonsky.me/blog/cursor-keys/ for the picture `

After using and getting used to the ducky, and just typing on my laptop/work laptop keyboard. I didn't have those short cut keys. I was constantly typing JKLIL trying to navigate code/documents. Super frustrating.. This lead to find a blog post about how to fix that from [Tonsky](https://tonsky.me/blog/cursor-keys/) Which he has a great write up on how to do this for mac that I use as well.

Using the script he provides was my intro to always having the autoHotKey scripts on:

```
SetCapsLockState, AlwaysOff

CapsLock & j::Send, {blind}{Left}
CapsLock & k::Send, {blind}{Down}
CapsLock & l::Send, {blind}{Right}
CapsLock & i::Send, {blind}{Up}
CapsLock & h::Send, {blind}{Backspace}
```

I had seen some other things that people had used autohotkey for but thought it was a bit too niche for my uses. Then it slowly started to click and I saw opportunities for it to come into play. Here are some of the things I use it for in automation:

I'm part of a group inbox in gmail and I reply from it often.

> Problem ❓: My problem was having to copy and paste my signature at each new email was a bit annoying.  
> Solution ✔️: 2 step autoHotKey script to automatically paste signature into new emails.

1st Script: "the setup"

1. Step 1 copy your signature.
2. Run script gmailSigScript.ahk
   - This should create a rtf file that contains your signature

<details>
<summary>Script</summary>

```
 ; Script Function:

 ; Copy formatted text to the Clipboard, then save it to a file

 ; Then Load this file anytime to the Clipboard and paste it to Gmail

 FileAppend, %ClipboardAll%, gmailSig.rtf

 return
```

</details>

2nd Script: "the execution"

1. Script workFlow.ahk will use this file when window + a is pressed.
2. Pastes your signature without having to copy/paste it.

<details>
<summary>Script</summary>

```
#a:: ;Windows+a is the trigger

; LOAD file2clipboard
FileRead, clipboard, *c gmailSig.rtf

; ---
; paste
Send ^v
return
```

</details>

> Some minor problems I have with this script. Sometimes it will just paste a non html version of my signature. I find that if I just rerun script 1 it will work again. I seem to have this problem on computer restart..

Other shortcut contains:

- I liked the ducky format so much I made it my standard
  - I like to have capslock as a fn key. Shuts off capslock to be able to use it with other keys.
  - Caps lock and jkli as arrow keys.
- Windows q opens salesforce report used very often.
- Windows w with use clipboard of 15 digit salesforce id and convert to 18 digits though [admin booster](www.adminbooster.com/tool/15to18) and copy back to clipboard
- For some reason the word eligibility gives me trouble. So a replacement for a word I misspell.

> ## [code:](https://github.com/tdnicola/AutoHokKeyWorkFlow)
