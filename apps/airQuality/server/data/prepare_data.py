import os
import csv
import json

dir_path = os.path.dirname(os.path.realpath(__file__)) + '/'

result = []
with open(dir_path + 'raw.csv', newline='') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        result.append({
            'city': row[0],
            'a': row[1],
            'b': row[2],
            'c': row[3]
        })

with open(dir_path + 'data.json', 'w') as outfile:
    json.dump(result, outfile, indent=4, sort_keys=True)
