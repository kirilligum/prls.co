import json

def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def generate_aik_html(company_name, faqs):
    with open('template.html', 'r') as template_file:
        template_content = template_file.read()

    faq_items = ''.join(
        f"<li><h4>{faq['question']}</h4><p>{faq['answer']}</p></li>" for faq in faqs
    )

    html_content = template_content.replace('{{company_name}}', company_name).replace('{{faq_items}}', faq_items)
    return html_content

def main():
    company_data = load_json('company_name.json')
    faqs_data = load_json('aik.json')

    company_name = company_data['company_name']
    faqs = faqs_data

    html_content = generate_aik_html(company_name, faqs)

    with open('aik.html', 'w') as file:
        file.write(html_content)

if __name__ == "__main__":
    main()
