import json
import os

cur_dir = os.getcwd()
company_file_path = os.path.join(cur_dir, "data/mud_lead.json")


def load_data_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data


company_data = load_data_from_json(company_file_path)
