import json
import os
import argparse
import glob
from jinja2 import Environment, FileSystemLoader
from xml.etree import ElementTree as ET


def load_json(file_path):
    with open(file_path, "r") as file:
        return json.load(file)


def remove_existing_pages():
    for file in glob.glob("*.html"):
        if file[:-5].isdigit():  # Check if the filename (excluding .html) is all digits
            os.remove(file)


def generate_aik_html(company_name, company_url, company_id, faqs):
    env = Environment(loader=FileSystemLoader(".."))
    template = env.get_template("aik_template.html.jinja")

    items_per_page = args.items_per_page
    total_pages = (len(faqs) + items_per_page - 1) // items_per_page

    for page in range(total_pages):
        start = page * items_per_page
        end = start + items_per_page
        faq_items = "".join(
            f"<li><h4>{faq['question']}</h4><p>{faq['answer']}</p></li>"
            for faq in faqs[start:end]
        )

        page_content = template.render(
            company_name=company_name,
            company_url=company_url,
            company_id=company_id,
            faq_items=faq_items,
            current_page=page + 1,
            total_pages=total_pages,
        )

        with open(f"{page + 1}.html", "w") as file:
            file.write(page_content)


def generate_sitemap(company_id, total_pages):
    # Update the main sitemap
    sitemap_path = "../sitemap.xml"
    tree = ET.parse(sitemap_path)
    root = tree.getroot()

    # Remove existing entries for the company_id
    for url in root.findall("url"):
        loc = url.find("loc").text
        if f"https://www.prls.co/{company_id}/" in loc:
            root.remove(url)

    for page in range(1, total_pages + 1):
        url_element = ET.Element("url")
        loc_element = ET.Element("loc")
        loc_element.text = f"https://www.prls.co/{company_id}/{page}.html"
        url_element.append(loc_element)
        root.append(url_element)

    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)

    # Create client-specific sitemap
    client_sitemap_path = "sitemap.xml"
    client_root = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for page in range(1, total_pages + 1):
        url_element = ET.Element("url")
        loc_element = ET.Element("loc")
        loc_element.text = f"https://www.prls.co/{company_id}/{page}.html"
        url_element.append(loc_element)
        client_root.append(url_element)

    client_tree = ET.ElementTree(client_root)
    client_tree.write(client_sitemap_path, encoding="utf-8", xml_declaration=True)

    # Update sitemap-index.xml
    sitemap_index_path = "../sitemap-index.xml"
    index_tree = ET.parse(sitemap_index_path)
    index_root = index_tree.getroot()

    # Remove existing sitemap entry for the company_id
    for sitemap in index_root.findall("sitemap"):
        loc = sitemap.find("loc").text
        if f"https://www.prls.co/{company_id}/sitemap.xml" in loc:
            index_root.remove(sitemap)

    # Add new sitemap entry for the company_id
    sitemap_element = ET.Element("sitemap")
    loc_element = ET.Element("loc")
    loc_element.text = f"https://www.prls.co/{company_id}/sitemap.xml"
    sitemap_element.append(loc_element)
    index_root.append(sitemap_element)

    index_tree.write(sitemap_index_path, encoding="utf-8", xml_declaration=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate AIK HTML pages and sitemap.")
    parser.add_argument(
        "--items-per-page", type=int, default=5, help="Number of items per page"
    )
    args = parser.parse_args()

    company_data = load_json("company_info.json")
    faqs_data = load_json("aik.json")

    company_name = company_data["company_name"]
    company_url = company_data["company_url"]
    company_id = os.path.basename(os.getcwd())
    faqs = faqs_data
    items_per_page = 5
    total_pages = (len(faqs) + items_per_page - 1) // items_per_page

    remove_existing_pages()
    generate_aik_html(company_name, company_url, company_id, faqs)
    generate_sitemap(company_id, total_pages)
