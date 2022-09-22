#!/bin/sh
BUILD=$1
BRANCH=$2

VERSION=$(npm pkg get version | tr -d '"')
IFS='.'
read -a strarr <<< "$VERSION"
MAJOR="${strarr[0]}"
MINOR="${strarr[1]}"
PATCH=$BUILD
SUFFIX=''
if [ $BRANCH != "master" ] && [ $BRANCH != "develop" ]
then
    SUFFIX='-alpha'
fi

npm version "${MAJOR}.${MINOR}.${PATCH}${SUFFIX}" --no-commit-hooks --no-git-tag-version

