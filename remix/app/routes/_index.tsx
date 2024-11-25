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
          <div className="pearl-container">
            <span className="pearl-symbol">༜</span>
          </div>
          <div className="logo">
            <div className="logo-title-short">
              <div className="title-short">
                <h2>SEO for LLMs</h2>
              </div>
            </div>
            <h3>
              Semantic knowledge <span>graph AI</span> technolodgy that helps your
              company rank in ChatGPT and <span>Google's AI answers</span>
            </h3>
          </div>
          <div className="hero-bullets">
            <ul>
              <li>
                When your ideal customer turns to ChatGPT, will your brand be the
                answer?
              </li>
              <li>
                Pearls' Knowledge ensures you're featured in AI responses, driving
                visibility and leads.
              </li>
              <li>
                Our AI analyzes your content and teaches ChatGPT about your
                products.
              </li>
              <li>The result? AI recommends your brand as the solution.</li>
            </ul>
          </div>
          <div className="contact-button">
            <button onClick={() => window.location.href='mailto:info@prls.co'}>
              <b>Contact</b>
            </button>
          </div>
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
