import csv
import json
import requests
import time
import re
import html
from pathlib import Path

path = Path(__file__).resolve().parent

array_columns = {"Data Level Methods", "Model Level Methods", "Learning Level Methods"}

def clean_abstract(text):
    """Clean Crossref/Semantic Scholar abstracts (often XML/HTML)."""
    if not text:
        return ""
    text = re.sub(r"<jats:p[^>]*>", "\n", text, flags=re.I)
    text = re.sub(r"</jats:p>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()

def reconstruct_openalex_abstract(inverted_index):
    """Convert OpenAlex abstract_inverted_index into plain text."""
    if not inverted_index:
        return ""
    positions = {}
    for word, indexes in inverted_index.items():
        for index in indexes:
            positions[index] = word
    return " ".join(positions[index] for index in sorted(positions))

def crossref(doi, timeout=20):
    response = requests.get(
        f"https://api.crossref.org/works/{doi}",
        timeout=timeout,
        headers={"User-Agent": "DOIAbstractRetriever/1.0"}
    )
    response.raise_for_status()
    item = response.json()["message"]
    return {
        "title": (item.get("title") or [""])[0],
        "authors": ", ".join(
            " ".join(filter(None, [a.get("given"), a.get("family")]))
            for a in item.get("author", [])
        ),
        "year": (item.get("published", {}).get("date-parts") or [[""]])[0][0],
        "venue": (item.get("container-title") or [""])[0],
        "abstract": clean_abstract(item.get("abstract", "")),
    }

def openalex(doi, timeout=20):
    response = requests.get(
        f"https://api.openalex.org/works/https://doi.org/{doi}",
        timeout=timeout,
        headers={"User-Agent": "DOIAbstractRetriever/1.0"}
    )
    response.raise_for_status()
    item = response.json()
    source = (item.get("primary_location") or {}).get("source") or {}
    return {
        "title": item.get("title", ""),
        "authors": ", ".join(
            a.get("author", {}).get("display_name", "")
            for a in item.get("authorships", [])
        ),
        "year": item.get("publication_year", ""),
        "venue": source.get("display_name", ""),
        "abstract": reconstruct_openalex_abstract(
            item.get("abstract_inverted_index")
        ),
    }

def semantic_scholar(doi, timeout=20):
    response = requests.get(
        f"https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}",
        params={"fields": "title,abstract,authors,year,venue"},
        timeout=timeout,
        headers={"User-Agent": "DOIAbstractRetriever/1.0"}
    )
    response.raise_for_status()
    item = response.json()
    return {
        "title": item.get("title", ""),
        "authors": ", ".join(a.get("name", "") for a in item.get("authors", [])),
        "year": item.get("year", ""),
        "venue": item.get("venue", ""),
        "abstract": clean_abstract(item.get("abstract", "")),
    }

def get_paper_metadata(doi, timeout=20, pause=0.2):
    """
    Fallback order: Crossref -> OpenAlex -> Semantic Scholar.
    Stop at the first provider returning a non-empty abstract.
    """
    doi = str(doi).strip()
    doi = doi = re.sub(r'^(?:https?://(?:dx\.)?doi\.org/|doi:\s*)', '', doi, flags=re.IGNORECASE)


    providers = [
        ("Crossref", crossref),
        ("OpenAlex", openalex),
        ("Semantic Scholar", semantic_scholar),
    ]
    log = []

    for provider_name, provider_func in providers:
        try:
            metadata = provider_func(doi, timeout=timeout)
            abstract = metadata.get("abstract", "").strip()

            if abstract:
                print(f"{provider_name}: abstract found")
                return {
                    "DOI": doi,
                    **metadata,
                    "abstract_source": provider_name,
                    "status": "success",
                    "retrieval_log": " -> ".join(log + [f"{provider_name}: abstract found"]),
                }

            log.append(f"{provider_name}: abstract empty")

        except requests.exceptions.HTTPError as error:
            status_code = error.response.status_code if error.response is not None else "unknown"
            log.append(f"{provider_name}: HTTP {status_code}")
        except requests.exceptions.RequestException as error:
            log.append(f"{provider_name}: request error ({type(error).__name__})")
        except Exception as error:
            log.append(f"{provider_name}: error ({type(error).__name__}: {error})")

        time.sleep(pause)

    return {
        "DOI": doi,
        "title": "",
        "authors": "",
        "year": "",
        "venue": "",
        "abstract": "",
        "abstract_source": "",
        "status": "not_found",
        "retrieval_log": " -> ".join(log),
    }

def import_csv(csv_loc):
    with open(csv_loc, "r", encoding='utf-8-sig') as file:
        # dikke oneliner
        rows = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True, delimiter=',')]

        # Get the titles and dois from the other file
        #json_other_file = json.load(open('results.json', encoding="utf-8"))['result']['hits']['hit']
        #results_json = {row['info']['title'].strip().lower(): row['info']['doi'] for row in json_other_file if 'doi' in row['info']}

        # Loop through and split some strings into lists
        objs = []
        num_rows = len(rows)
        ctr = 1
        for row in rows:
            obj = {}
            print(f"({ctr}/{num_rows})\t{row['Title']}")
            ctr = ctr + 1
            for key, value in row.items():
                # If column is an array type, make it an array type
                if key in array_columns:
                    value = [x.strip() for x in value.split(',')]
                # Venue is special
                elif key == "Venue":
                    obj[key] = {}
                    obj[key]["isOld"] = True
                    obj[key]["value"] = value
                    continue
                elif key == "Authors":
                    value = [re.sub(r'\d+', '', x).strip() for x in value.split(',')]
                obj[key] = value


            paper_metadata = get_paper_metadata(obj["url"])
            obj["Abstract"] = paper_metadata["abstract"]
            obj["Authors"] = [re.sub(r'\d+', '', x).strip() for x in paper_metadata["authors"].split(',')]
            obj["Data Level Mechanisms"] = [re.sub(r'\d+', '', x).strip() for x in obj["Data Level Mechanisms"].split(',')]
            obj["Model Level Mechanisms"] = [re.sub(r'\d+', '', x).strip() for x in obj["Model Level Mechanisms"].split(',')]
            obj["Learning Level Mechanisms"] = [re.sub(r'\d+', '', x).strip() for x in obj["Learning Level Mechanisms"].split(',')]
            obj["IsOld"] = True
            objs.append(obj)

    return objs

if __name__ == "__main__":
    data = import_csv(path / "db.csv")
    with open(path / "db2.json", "w") as file:
        json.dump(data, file, indent=2)