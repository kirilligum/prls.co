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
    for file in glob.glob("powerup-tech_aik_page_*.html"):
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

        with open(f"powerup-tech_aik_page_{page + 1}.html", "w") as file:
            file.write(page_content)


def generate_sitemap(company_id, total_pages):
    sitemap_path = "../sitemap.xml"
    tree = ET.parse(sitemap_path)
    root = tree.getroot()

    for page in range(1, total_pages + 1):
        url_element = ET.Element("url")
        loc_element = ET.Element("loc")
        loc_element.text = f"https://www.prls.co/{company_id}/powerup-tech_aik_page_{page}.html"
        url_element.append(loc_element)
        root.append(url_element)

    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)


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
