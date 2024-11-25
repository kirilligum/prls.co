import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Pearls of Wisdom - SEO for LLMs" },
    { name: "description", content: "Semantic knowledge graph AI technology that helps your company rank in ChatGPT and Google's AI answers" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="main-header">
        <span className="header-pearl text-nowrap">
          <span className="header-symbol">༜</span>Pearls of Wisdom
        </span>
        <span className="header-links">
          Home | Pearls' Knowledge | Pearls' Analytics | Blog | About |{" "}
          <b>Contact</b> | App
        </span>
      </header>

      <div className="hero-container">
        <div className="knowledge-visual-container">
          <div className="knowledge-visual-img">
            <iframe
              src="cm/chatgpt_clone.html"
              style={{ width: '100%', height: '480px', border: 'none', display: 'block' }}
            />
          </div>
        </div>
        <div className="hero-content">
          {/* Rest of the hero content */}
        </div>
      </div>

      <main>
        {/* Rest of the main content */}
      </main>

      <footer>
        <p>
          &copy; 2024 Pearls of Wisdom |{" "}
          <a href="prls_co/1.html">AI Knowledge</a>
        </p>
      </footer>
    </>
  );
}
