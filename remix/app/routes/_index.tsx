import type { MetaFunction } from "@remix-run/node";
import KnowledgeVisual from "~/components/KnowledgeVisual";

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
        <KnowledgeVisual />
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
              Semantic knowledge <span>graph AI</span> technology that helps your
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
        <div className="use-cases">
          <div className="use-case-container">
            <div className="use-case">
              <div className="use-case-text">
                <h3>Now:</h3>
                AI probabilistically recommends commonly mentioned
                <b>wrong</b> product
              </div>
              <div className="use-case-img">
                <div className="use-case-emotion">:-(</div>
                <img
                  src="images/powerup-chatgpt-original.png"
                  alt="PowerUp before using Pearls of Wisdom"
                  className="use-case-image"
                />
              </div>
            </div>
            <div className="use-case">
              <div className="use-case-text">
                <h3>With Pearls' Knowledge:</h3>
                AI reasons and recommends the <b>correct</b> product -- your
                product.
              </div>
              <div className="use-case-img">
                <img
                  src="images/powerup-chatgpt-prls.png"
                  alt="PowerUp after using Pearls of Wisdom"
                  className="use-case-image"
                />
              </div>
            </div>
            <div className="use-case">
              <div className="use-case-text">
                <h3>Now:</h3>
                The query asks for low-noise generator but the AI recommends
                louder (52dB) diesel generators.
              </div>
              <div className="use-case-img">
                <img
                  src="images/powerup-google-original.png"
                  alt="Google results before using Pearls of Wisdom"
                  className="use-case-image"
                />
              </div>
            </div>
            <div className="use-case">
              <div className="use-case-text">
                <h3>With Pearls' Knowledge:</h3>
                With Pearls, AI correctly recommends the quite (45dB) hydrogen
                generators. Help AI to be right.
              </div>
              <div className="use-case-img">
                <img
                  src="images/powerup-google-prls.png"
                  alt="Google results after using Pearls of Wisdom"
                  className="use-case-image"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="section-separator" />
        <div className="section-800">
          <h3>Pearl's Analytics analyzes the relative strength of competing brands.</h3>
          <div className="comparison-tables">
            <div className="use-case-before">
              <h4>Before:</h4>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Companies</th>
                    <th>Mentions %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Honda</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>Yamaha</td>
                    <td>16</td>
                  </tr>
                  <tr>
                    <td>WEN</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>deWalts</td>
                    <td>14</td>
                  </tr>
                  <tr>
                    <td>Generac</td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <td>Cummins</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Briggs &amp; Stratton</td>
                    <td>11</td>
                  </tr>
                  <tr className="highlight">
                    <td>PowerUP</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="use-case-after">
              <h4>After:</h4>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Companies</th>
                    <th>Mentions %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="highlight">
                    <td>PowerUP</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <td>Honda</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Yamaha</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <td>WEN</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>deWalts</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Generac</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>Cummins</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>Briggs &amp; Stratton</td>
                    <td>8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr className="section-separator" />
        <div className="section-800">
          <h3>Trusted by Our Customers</h3>
          <div className="customer-logos">
            <div className="customer-item">
              <a href="https://www.atmo.ai/">
                <img
                  src="atmo_ai/logo-atmo.webp"
                  alt="Logo of Atmo.ai"
                  className="customer-logo"
                />
              </a>
              <p>
                <a href="atmo_ai/1.html" className="customer-link">
                  Atmo's AI Knowledge
                </a>
              </p>
            </div>
            <div className="customer-item">
              <a href="https://powerup-tech.com/">
                <img
                  src="powerup-tech_com/powerup_primary_logo_horizontal_color.svg"
                  alt="Logo of PowerUP"
                  className="customer-logo"
                />
              </a>
              <p>
                <a href="powerup-tech_com/1.html" className="customer-link">
                  PowerUp's AI Knowledge
                </a>
              </p>
            </div>
            <div className="customer-item">
              <a href="https://bennudata.com/">
                <img
                  src="bennudata_com/logo-bennudata.svg"
                  alt="Logo of Bennudata"
                  className="customer-logo"
                />
              </a>
              <p>
                <a href="bennudata_com/1.html" className="customer-link">
                  Bennudata's AI Knowledge
                </a>
              </p>
            </div>
          </div>
        </div>
        <hr className="section-separator" />
        <div className="section-800">
          <div className="intro-section">
            <div className="contact-button">
              <button onClick={() => window.location.href='mailto:info@prls.co'}>
                <b>Contact</b>
              </button>
            </div>
            <div className="intro-text">
              <p>
                <b>Today</b>'s marketing content is designed for humans and search
                engines, but that's <b>not enough in the age of AI</b>. We help
                your brand and products
                <b> rank higher in ChatGPT and other LLMs</b> (Large Language
                Models). We do this using <b>AI knowledge graph technology</b> to
                create high-quality instruction-tuning datasets that enhance the
                relevance and understanding of your content. Our process leverages
                a hybrid AI-human system. Unlike HubSpot, we specialize in
                <b>
                  <span className="text-nowrap">AI assistants</span>, not search
                  engines
                </b>
              </p>
            </div>
          </div>
        </div>
        <hr className="section-separator" />
        <div className="section-800">
          <h3>Who Can Benefit from Pearls</h3>
          <ul>
            <li>
              <strong>Large Corporations:</strong> Optimize extensive digital
              content for AI platforms, ensuring accurate and effective
              communication of your brand's value.
            </li>
            <li>
              <strong>Growth-Stage Startups:</strong> Utilize cutting-edge
              technologies to enhance your visibility and inbound effectiveness,
              standing out in a competitive market.
            </li>
            <li>
              <strong>Digital Marketing Agencies:</strong> Elevate your client
              engagement with advanced AI tools that enhance content relevance and
              impact.
            </li>
          </ul>
        </div>
        <hr className="section-separator" />
        <div className="section-800">
          <h3>How Are We Different?</h3>
          <p>
            AI is changing how your customers discover you. Our mission is to help
            you be on the cutting edge of this change. Here is how we stand out:
          </p>
          <ul>
            <li>
              <strong>No Model Training:</strong> Unlike OpenAI (ChatGPT),
              Anthropic (Claude), and other model training companies, we don't
              build AI models. Our expertise lies in providing the high-quality
              data that fuels these models.
            </li>
            <li>
              <strong>Open-Source Data:</strong> Unlike clients of Scale.ai,
              SurgeHQ.ai, Toloka.ai, and other data-labeling companies who
              primarily provide data for model trainers, our clients are content
              creators. Therefore, the high-quality datasets that we create for
              you are not kept secret but freely available, pushing collective AI
              research and practical applications to the next level.
            </li>
            <li>
              <strong>LLM Focus:</strong> Unlike HubSpot, Salesforce, Marketo, and
              other companies that prioritize optimizing content for marketing and
              sales automation, our focus is on enhancing the capabilities of LLMs
              themselves.
            </li>
          </ul>
        </div>
        <hr className="section-separator" />
        <div className="section-800">
          <div className="intro-section">
            <div className="intro-text">
              <p>
                "You are what you eat" -- high-quality transparent AI starts with
                high-quality transparent data.
              </p>
              <ul>
                <li>
                  We are committed to building a future where AI is transparent,
                  trustworthy, and equitable for all.
                </li>
                <li>
                  AI will play an increasingly vital role in communicating your
                  brand's value to customers.
                </li>
                <li>
                  Our platform is continuously evolving to encompass a wider range
                  of knowledge beyond marketing.
                </li>
              </ul>
              <p>
                Join us in shaping a future where AI and human expertise work
                together.
              </p>
            </div>
            <div className="contact-button">
              <button onClick={() => window.location.href='mailto:info@prls.co'}>
                <b>Contact</b>
              </button>
            </div>
          </div>
        </div>
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
