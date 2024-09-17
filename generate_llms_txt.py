import openai
import os

def generate_llms_txt():
    # Set your OpenAI API key
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Define the prompt based on the llms-text_index.qmd specifications
    prompt = """
    Create an llms.txt file for a client directory. The file should include:
    - An H1 with the name of the project or site.
    - A blockquote with a short summary of the project.
    - Sections with detailed information and file lists with URLs.
    """

    # Call the OpenAI API to generate the content
    response = openai.Completion.create(
        engine="gpt-4o",
        prompt=prompt,
        max_tokens=500,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Get the generated text
    llms_txt_content = response.choices[0].text.strip()

    # Write the content to llms.txt in the current directory
    with open("llms.txt", "w") as file:
        file.write(llms_txt_content)

if __name__ == "__main__":
    generate_llms_txt()
