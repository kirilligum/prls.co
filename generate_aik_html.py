import json
import os
import argparse
from jinja2 import Environment, FileSystemLoader


def load_json(file_path):
    with open(file_path, "r") as file:
        return json.load(file)


def generate_aik_html(company_name, faqs):
    env = Environment(loader=FileSystemLoader("."))
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
            faq_items=faq_items,
            current_page=page + 1,
            total_pages=total_pages,
        )

        with open(f"aik_page_{page + 1}.html", "w") as file:
            file.write(page_content)
    for file in os.listdir("."):
        if file.startswith("aik_page_") and file.endswith(".html"):
            os.remove(file)
    env = Environment(loader=FileSystemLoader("."))
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
            faq_items=faq_items,
            current_page=page + 1,
            total_pages=total_pages,
        )

        with open(f"aik_page_{page + 1}.html", "w") as file:
            file.write(page_content)


def generate_sitemap(total_pages):
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap_content += (
        "  <url>\n    <loc>http://www.prls.co/index.html</loc>\n  </url>\n"
    )

    for page in range(1, total_pages + 1):
        sitemap_content += f"  <url>\n    <loc>http://www.prls.co/aik_page_{page}.html</loc>\n  </url>\n"

    sitemap_content += "</urlset>"

    with open("sitemap.xml", "w") as file:
        file.write(sitemap_content)



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate AIK HTML pages and sitemap.")
    parser.add_argument("--items-per-page", type=int, default=5, help="Number of items per page")
    args = parser.parse_args()

    company_data = load_json("company_name.json")
    faqs_data = load_json("aik.json")

    company_name = company_data["company_name"]
    faqs = faqs_data
    items_per_page = 5
    total_pages = (len(faqs) + items_per_page - 1) // items_per_page

    remove_existing_pages()
    generate_aik_html(company_name, faqs)
    generate_sitemap(total_pages)
