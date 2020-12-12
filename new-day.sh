#!/bin/bash

day=$1

if [ "$day" == "" ]
then
    echo "Usage: $0 <day-number>"
    exit 1
fi

echo "Setting up day $day..."

mkdir src/day-$day

source_file=src/day-$day/day$day.ts
test_file=src/day-$day/day$day.test.ts
input_file=files/day$day.txt

echo "Creating $source_file"
echo "// const fs = require(\"fs\");" >> $source_file
echo "// const contents = fs.readFileSync(\"files/day$day.txt\", \"utf8\");" >> $source_file
echo >> $source_file
echo "// const input = contents.split(\"\\n\");" >> $source_file

echo "Creating $test_file"
echo "describe(\"\", () => {});" >> $test_file

echo "Creating $input_file"
touch $input_file
