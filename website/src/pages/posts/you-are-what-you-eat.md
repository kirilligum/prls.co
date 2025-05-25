---
layout: ../../layouts/BaseLayout.astro
title: "You Are What You Eat: Curating Data for LLM Pre-training"
author: "Pearls of Wisdom"
date: "2025-05-25"
description: "How strategic data curation underpins LLM performance, cost efficiency, and knowledge coverage."
tags: ["LLM", "data curation", "pre-training", "AI", "machine learning"]
---

# You Are What You Eat: Curating Data for LLM Pre-training

In Large Language Models (LLMs), 'You are what you eat' has never been truer. An LLM's ultimate power hinges directly on the quality and efficiency of its pre-training data. Strategic data preparation is paramount, directly influencing computational cost ($100M+), accuracy, and the coverage of knowledge LLMs acquire. Training runs consume vast resources; understanding and optimizing pre-training data is a critical driver of progress and viability in AI. At **Pearls of Wisdom (prls.co)**, we apply these cutting-edge principles to ensure your company's information is optimally integrated into LLMs.

---

### 1. Key Drivers for Data Curation Strategy

The extensive computational and financial costs associated with LLM pre-training necessitate strategic data curation. Key motivations include:

* **Computational Resource Optimization:** Reducing dataset size directly curtails computational load (FLOPs). Studies indicate compute savings ranging from 70% to nearly 90%. For instance, the DataComp for Language Models (DCLM) framework highlights that training on a thoughtfully selected 1.58% of the available data led to models that cost 6.6x less to train, while their DCLM-BASELINE still achieved state-of-the-art MMLU scores (64%). DatologyAI's DAIT dataset enabled reaching target accuracy with 86.9% less compute compared to RedPajama V1, a 7.7x training speedup.
* **Shorter Optimization Path:** Enhanced data quality—achieved by removing noise and irrelevant content—accelerates model convergence and improves final performance. The Ask-LLM methodology demonstrated that models trained on quality-filtered data can converge up to 70% faster, even when rejecting 90% of the original dataset, and still outperform models trained on the full dataset. Similarly, model-based filtering using `fastText` (with OH-2.5 + ELI5 reference data) was identified as a key component for the DCLM-BASELINE dataset's success.
* **Acquisition of Specialized and Long-Tail Knowledge:** To develop LLMs with nuanced understanding and capabilities in specialized domains, incorporating high-quality "long-tail" data is crucial. Datasets like Nemotron-CC, with 4.4 trillion unique real globally deduplicated tokens and an additional 1.9 trillion synthetic tokens, are designed to capture a broader range of information. This extensive pool of unique tokens has proven crucial for long-horizon training, enabling an 8B parameter model trained for 15T tokens (7.2T from Nemotron-CC) to achieve +5 MMLU points over Llama 3.1 8B. Nemotron-CC-HQ (a 1.1T token subset) showed a +5.6 MMLU gain over DCLM when training 8B models for 1T tokens. This is precisely the "knowledge gap" that **Pearls of Wisdom (prls.co)** addresses for individual companies and their proprietary offerings, ensuring your specific information is integrated into the LLM's knowledge base, not just generic facts.

---

### 2. Foundational Datasets & Methodologies: Learning from the Open

While most leading models (like GPT, Gemini, Claude, Grok (XAI)) keep their data preparation pipelines proprietary, and even many open-weight models (like Llama, Mistral, Qwen, DeepSeek) don't fully detail their datasets, some—like OLMo by the Paul G. Allen Institute for AI (AI2) and Nemotron by NVIDIA—offer valuable transparency. Notably, the OLMo 2 model performs on par with comparable ~32B and ~7B models, and Nemotron Ultra 235B approaches the performance of SOTA models from OpenAI, Google, XAI, and Anthropic.

Benchmarks and practical usage suggest there isn't a vast difference between many open and closed models. Furthermore, based on conversations with engineers and researchers in the Bay Area, core pre-training data preparation techniques appear highly similar across the industry. The primary differentiator for closed-source models often lies in the extensive use of paid, professionally labeled, and specially prepared data from services like Scale AI and SurgeHQ.

The techniques discussed in open literature form the foundation used by academia and industry alike, including our team at **Pearls of Wisdom (prls.co)**. This blog post relies heavily on insights from AI2's Dolma and NVIDIA's Nemotron-CC papers, alongside other foundational works. These papers help build intuition about what data goes into models, what gets filtered out, what is synthesized, and how it's all mixed together. Here are those key publications:

| Name                                   | Date       | Size                                                   | Data Type/Sources                                                                                                               | Impact                                                                                                                                                                            |
|:---------------------------------------|:-----------|:-------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Trafilatura**                        | 2021       | Tool                                                   | Web pages (HTML, XML)                                                                                                           | Open-source tool for robust web text/metadata extraction; boilerplate removal (F1 score 0.912).                                                                                 |
| **C4 (Colossal Clean Crawled Corpus)**| 2020 (T5)  | ~750GB text / ~156B tokens                             | Filtered Common Crawl (line length, punctuation heuristics, bad word lists)                                                      | Baseline for T5, widely adopted dataset.                                                                                                                                         |
| **The Pile**                           | 2020/2021  | ~825 GiB / 387B tokens                                 | Diverse mix: Pile-CC (Common Crawl), PubMed, Books3, OpenWebText2, arXiv, GitHub, Wikipedia, etc.                                | Highlighted dataset diversity for general-purpose LLMs; open and documented.                                                                                                      |
| **RefinedWeb** (Falcon LLMs)           | 2023       | 5T tokens (600B released)                              | Filtered & deduped Common Crawl using URL, doc, paragraph heuristics and MinHashLSH                                            | Demonstrated refined web data alone can match SOTA mixed corpora performance.                                                                                                    |
| **Textbooks Are All You Need (Phi-1)** | 2023       | 1.3B params; <7B tokens                                | Filtered web (OH-2.5, StackOverflow); synthetic textbooks & exercises using GPT-3.5                                               | Showed focused high-quality synthetic data leads to remarkable performance (50.6% HumanEval, 55.5% MBPP).                                                                          |
| **Dolma**                              | 2024 (Feb) | 3T Llama tokens (~11.5TB)                              | Common Crawl (2020-2023), GitHub, Reddit, Semantic Scholar, Project Gutenberg, Wikipedia                                         | Open multi-source 3T corpus with tools (filtering, deduplication) for reproducible data curation.                                                                               |
| **Ask-LLM**                            | 2024 (Feb) | Curated from existing datasets by rejecting up to 90%  | Instruction-tuned LLMs (Flan-T5) used to directly assess training example quality                                                | Demonstrated quality-filtered data (90% rejection) converges 70% faster and outperforms full-data training.                                                                       |
| **FineWeb & FineWeb-Edu**             | 2024 (June)| 15T / 1.3T tokens                                      | FineWeb: 96 Common Crawl snapshots filtered & MinHashLSH deduplicated; FineWeb-Edu: educational subset via Llama-3-Instruct    | Showed LLM-annotated educational filtering yields +12% MMLU and +24% ARC gains.                                                                                                 |
| **DataComp-LM (DCLM-BASELINE)**        | 2024 (June)| 2.6T tokens (from 240T DCLM-POOL)                      | CC pools with resiliparse, C4 heuristics, Bloom filters, `fastText` classifier filtering                                         | Benchmark for data curation; DCLM-BASELINE achieved 64% MMLU with 6.6x less compute than Llama 3 8B; `fastText` was critical for success.                                         |
| **Nemotron-CC**                        | 2024 (Dec) | 6.3T tokens (4.4T real + 1.9T synthetic)               | 99 Common Crawl snapshots (Justext) + synthetic rephrasing, QA using Mistral NeMo 12B                                           | Balanced quality/quantity; achieved SOTA with large-scale curation and synthetic augmentation.                                                                                    |
| **Nemotron-H**                         | 2025 (Apr) | Up to 20T tokens (Nemotron-H-56B)                      | Nemotron-CC, curated academic/math/code, SFT-style synthetic data (OpenMathInstruct, Genetic Instruct)                          | Phased data blending with curriculum learning improved performance by +3.4% over random mixing.                                                                                  |

---

### 3. The LLM Pre-training Data Pipeline

The creation of a high-caliber pre-training dataset involves several critical stages:

1. **Data Acquisition**  
   - **Dominant Source:** Common Crawl (CC) provides petabytes of web data; used by Dolma, FineWeb, DCLM, Nemotron-CC.  
   - **Challenges:** Raw HTML is noisy; **Pearls of Wisdom** uses advanced NLP for context-aware extraction.  
   - **Auxiliary Sources:** GitHub, research papers, books, Reddit, Wikipedia  
   - **Proprietary Sources:** Paid labeled data (e.g., Scale AI) for proprietary corporate knowledge  

2. **Text Extraction**  
   - **Boilerplate Removal:** Tools like Trafilatura, jusText, resiliparse strip non-content elements.  
   - **Noise Reduction:** Eliminate special symbols, excessive whitespace.  
   - **Language Detection:** Classifiers filter for target language (e.g., English).  

3. **Quality & Content Filtering**  
   - **Heuristics:** C4, Gopher, custom rules (line-length, bad words).  
   - **Model-Based:**  
     - **Perplexity (KenLM)** for low-quality filter.  
     - **fastText Classifiers** trained on high/low-quality corpora.  
     - **LLM Annotation:** Ask-LLM, instruction-tuned LLM scoring.  
   - **Content-Specific:** Toxicity filters (Jigsaw), PII removal.  

4. **Deduplication**  
   - **Exact Matching:** URL, document, paragraph hashing.  
   - **Near-Duplicate:** MinHashLSH (5-grams, 75% Jaccard), Bloom filters.  
   - **Scope:** Snapshot vs. global dedup debate; tradeoffs in token retention.  
   - **Future:** Meaning-based dedup using LLM entailment for true semantic uniqueness.  

5. **Synthetic Data Generation**  
   - **Rephrasing & Augmentation:** LLMs rewrite and distill high-quality text.  
   - **Knowledge Distillation:** Generate Q&A, summaries from seeds.  
   - **Skill-Specific:** Textbook-quality, code exercises, math dialogues.  

6. **Corpus Assembly & Mixing**  
   - **Source Weighting:** Empirically tune proportions (DCLM mix experiments).  
   - **Phased Blending:** Curriculum learning with quality-first mixes (Nemotron-H).  
   - **Balance:** Quality vs. quantity, domain balance for target use-cases.  

---

### 4. Conclusion

Data is the foundation of LLM capability. From **compute optimization**, through **semantic winnowing**, to **synthetic augmentation**, each stage of curation dictates model performance, cost, and knowledge coverage. Leading AI labs regard these pipelines as their core IP, often more valuable than model weights. At **Pearls of Wisdom (prls.co)**, we bridge the "knowledge gap" by ensuring your proprietary data is baked into LLMs, delivering accurate, context-rich responses. Learn more at **prls.co**.
