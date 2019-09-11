#! /bin/bash

LOAD_DATA="${LOAD_DATA:-0}"

if [ $LOAD_DATA = 1 ]; then
  echo "--- Loading initial data ---"
  echo " 1) Clearing database"
  ./manage.py flush --no-input
  echo " 2) Importing data"
  ./manage.py loaddata setup_data.json
else
  echo "Not loading initial data."
fi
