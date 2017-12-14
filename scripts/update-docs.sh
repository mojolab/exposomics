#!/bin/bash

SOURCE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
WWW_DIR="www/"
TARGET_BRANCH="gh-pages"

INITIAL_COMMIT=$(git rev-list --max-parents=0 HEAD | tail -n 1)

rm -rf $WWW_DIR
./node_modules/.bin/esdoc
git branch $TARGET_BRANCH $INITIAL_COMMIT
git checkout $TARGET_BRANCH
git add $WWW_DIR
git commit -m 'Update documentation'
git push --set-upstream origin -f $TARGET_BRANCH
git checkout $SOURCE_BRANCH
git branch -D $TARGET_BRANCH
