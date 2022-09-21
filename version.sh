#!/bin/sh
BUILD=$1
BRANCH=$2

if [ $BRANCH = "master" ]
then
    npm version minor --no-commit-hooks --no-git-tag-version
elif [ $BRANCH = "develop" ]
then
    npm version patch --no-commit-hooks --no-git-tag-version
else
    VERSION=$(npm pkg get version)
    VERSION="${VERSION}-${BUILD}"
    VERSION=$(echo "$VERSION" | tr -d '"')
    echo ${VERSION}
    npm version "${VERSION}" --no-commit-hooks --no-git-tag-version
fi


