import csv

input_file_path = 'uc_berkeley_professors_rmp_cleaned.csv'
output_file_path = 'uc_berkeley_professors_rmp_cleaned.csv'

# Read CSV data
with open(input_file_path, 'r') as csv_file:
    reader = csv.DictReader(csv_file)

    # Remove duplicates
    unique_entries = []
    seen = set()
    for row in reader:
        identifier = (row['Name'], row['Department'])
        if identifier not in seen:
            seen.add(identifier)
            unique_entries.append(row)

# Write cleaned data back to a new CSV file
with open(output_file_path, 'w', newline='') as output_file:
    writer = csv.DictWriter(output_file, fieldnames=reader.fieldnames)
    writer.writeheader()
    writer.writerows(unique_entries)

print(f"Cleaned CSV data has been written to {output_file_path}")
