#!/bin/bash

git add .
git commit -m "$(date +"%c")"
git push -u origin master
