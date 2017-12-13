"""This module converts AQI data (in csv format) from the EPA into a JSON file.

This file can be modified to read directly into a DB instead of using the JSON file as the intermediate format.

Link to zip file in Drive:
https://drive.google.com/a/doc.ai/file/d/1FQUTpz6Rsy-NHbG6sOJGc7KYpBX3bpnT/view?usp=sharing
"""

import json
import pandas as pd

epa_aqi_datafile_name_template = "./raw/daily_aqi_by_county_{}.csv"
output_json_file = "./json/data.json"

years = [year for year in range(1980, 2017)]  # Does not include 2017
county2date2aqi_info = {}


result = []


for year in years:
    with open(epa_aqi_datafile_name_template.format(year), "r") as f:
        aqi_df = pd.read_csv(f)

    # This creates a list of "YYYY-MM-DD" strings. TODO: check it's robust for leap years
    # dates_in_current_year = pd.date_range("January 1, {}".format(year), "December 31, {}".format(year)).astype(str)

    # Get the "State, County" values covered in this df
    states = list(aqi_df["State Name"])
    counties = list(aqi_df["county Name"])
    # Assuming these preserve order
    state_counties = set([(state, county) for state, county in zip(states, counties)])
    # state_counties = zip(states, counties)
    print(year, "\n*****************\n")
    print(state_counties)
    # print(counties)
    
    # print(counties)
    # Loop through state_county, populate a dict with known AQI values
    for state, county in state_counties:
        # print("year: {}, state: {}, county: {}".format(year, state, county))
        # If the county isn't in our global dict, initialize its date2aqi dict.
        # Note that we use the global dict since we're reading in yearly data
        # county_year_dict = county2date2aqi_info.get(state_county, {})
        # state, county = state_county.split(", ")
        sub_df = aqi_df[(aqi_df["State Name"] == state) & (aqi_df["county Name"] == county)]
        for date, aqi, category in zip(sub_df["Date"], sub_df["AQI"], sub_df["Category"]):
            # Note: need to cast AQI value as int since pandas gives numpy.int64, which is not JSON serializable.
            # If we create the db straight from this dict instead of using JSON as an intermediate step, can remove the
            # cast
            # county_year_dict[date] = {"AQI": int(aqi), "Category": category}
            entry = {}
            entry["state"] = state
            entry["county"] = county
            entry["date"] = date
            entry["AQI"] = int(aqi)
            entry["Category"] = category

            result.append(entry)

        # Next, fill in the remaining dates of this year for which there isn't AQI data
        # for date in dates_in_current_year:
        #     if not county_year_dict.get(date, None):
        #         # If this date isn't in the dict, it means we don't have info for it!
        #         # TODO: is there a better filler than -1?
        #         county_year_dict[date] = {"AQI": -1, "Category": "unk"}

        # Update the global dict with this year's updates
        # county2date2aqi_info[state_county] = county_year_dict
        # break

    # break

# print("{} counties in dict".format(len(county2date2aqi_info)))

with open(output_json_file, "w") as f:
    json.dump(result, f)
