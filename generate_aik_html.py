import json
from jinja2 import Environment, FileSystemLoader


def load_json(file_path):
    with open(file_path, "r") as file:
        return json.load(file)


def generate_aik_html(company_name, faqs):
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template("aik_template.html.jinja")

    items_per_page = 5
    total_pages = (len(faqs) + items_per_page - 1) // items_per_page

    for page in range(total_pages):
        start = page * items_per_page
        end = start + items_per_page
        faq_items = "".join(
            f"<li><h4>{faq['question']}</h4><p>{faq['answer']}</p></li>" for faq in faqs[start:end]
        )

        page_content = template.render(
            company_name=company_name,
            faq_items=faq_items,
            current_page=page + 1,
            total_pages=total_pages
        )

        with open(f"aik_page_{page + 1}.html", "w") as file:
            file.write(page_content)


def main():
    company_data = load_json("company_name.json")
    faqs_data = load_json("aik.json")

    company_name = company_data["company_name"]
    faqs = faqs_data

    generate_aik_html(company_name, faqs)


if __name__ == "__main__":
    main()
