---
title: Cleaning files with python
date: '2021-06-24'
tags: ['python', 'automation']
draft: true
summary: 'Learning how to clean txt/csv files with python.'
images: []
---

# Python txt/csv file cleaner

Problem ❓:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manually cleaning lots of files for small changes in txt/csv files.

Solution ✔️:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create python script to clean files for you.

## Currently replaces words with double pipe.

Add words you'd like to be replaced in the replace_these_words array.  

### Currently searching through pipe delimited files.  

Cleaning files is not really a hard task. It can just take a bit of time. Doing it over and over every day. It can be tedious..
I wanted to work on this mini project for awhile but was always stuck on how to actually have it work. If we have a file with the following information:

> |10/25/2012|some somewhat important info|NULL|boring information|general info|*declined|0|1|

Take that line of text and multiple it by 110k of lines. If we wanted to remove all NULL words from the file opening the file in a text editor find and replace all |NULL| with || (to not offset the file with the delimiter) isn't really time consuming but just tedious. Now if we have 6-7 files that need the same thing the loading of the files takes a bit longer and the replacing also takes a bit longer. Now if we have files in different folders that have similar problems it adds just a bit more of tediousness.



If you wanted to use comma delimited you would need to change what is being replaced:  
```python
line = line.replace(word, "||")
```

### Examples: of words I would place inside that array |Null| (case sensitive) 

```python
replace_these_words = [
    '|Null|',
    '|None|',
] 
```

### If you wanted to skip a folder to not alter add the folder name to (case sensitive):

```python
folders_to_exclude = [
    'exampleFolder'
]
```

Script would replace the above words with empty ||


### Here is where the magic happens

```python
for line in fin:
    # line = line.lower() # easier to catch all same case words but alters the file output file to lowercase. May or may not want depending on case sensitivity 
    for word in replace_these_words:
        line = line.replace(word, "||")
    fout.write(line)
```

### Currently set up to search through main directory of client directories
    
    |--MainDirectory
        |--ClientA
            |--Archive(dir)
            --Filestobecleaned.txt
        |--ClientB
            |--Archive(dir)
            --Filestobecleaned.txt
            --Filestobecleaned.txt
            --Filestobecleaned.txt
        |--ClientC
            |--Archive(dir)
            --Filestobecleaned.txt