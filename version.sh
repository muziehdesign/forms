#!/bin/sh
BUILD=$1
BRANCH=$2

VERSION=$(npm pkg get version | tr -d '"')
ARR=($(echo $VERSION | tr '.' "\n"))
MAJOR="${ARR[0]}"
MINOR="${ARR[1]}"
PATCH=$BUILD
SUFFIX=''
if [ $BRANCH != "master" ] && [ $BRANCH != "develop" ]
then
    SUFFIX='-alpha'
fi

npm version "${MAJOR}.${MINOR}.${PATCH}${SUFFIX}" --no-commit-hooks --no-git-tag-version

