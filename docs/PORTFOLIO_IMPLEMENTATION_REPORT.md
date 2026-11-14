# SAMYAK ANAND — PORTFOLIO TRANSFORMATION & AUDIT REPORT (2026)
## God Mode Engineering, UX, Accessibility, Technical SEO & Recruitment Optimization

---

## Executive Summary

This report documents the end-to-end transformation of Samyak Anand's portfolio from an ambitious experimental build into an exceptional, technically credible, recruitment-ready **Applied AI Engineer** portfolio.

The mission was executed as an **engineering and UX optimization task**, adhering strictly to the **Non-Negotiable Design Protection** principles:
- **100% Preserved**: Cinematic image-frame scroll canvas sequence, GSAP ScrollTrigger choreography, Framer Motion interactions, L-inspired aesthetic, custom sound design, dark visual personality, and page composition.
- **Fixed & Hardened**: Case-study modal UX (backdrop clicks, close button touch targets, scroll lock/restore, keyboard navigation, focus trap, dynamic viewport heights), ESLint error eradication, Vitest test suite creation, and accurate evidence-based positioning.
- **Strategically Positioned**: Applied AI Engineer (Generative AI, Agentic Workflows, Python Backend, Machine Learning). Eliminated unverified vanity metrics and arbitrary percentages in favor of audited project proofs, verified experience dates, and production stack transparency.

---

## 1. Codebase Audit Baseline & Bugs Fixed

| Audit Area | Previous State | Resolved State |
| :--- | :--- | :--- |
| **Project Modal UX** | Clicks inside content could trigger backdrop dismissal; close button below 44px; missing ARIA dialog roles; scroll restoration was lossy; no focus trap. | Robust backdrop `e.target === e.currentTarget` check; sticky header + floating close button with 44×44px touch target; `role="dialog"`, `aria-modal="true"`, focus trap & focus restoration to originating card; Lenis + scroll lock with instant position restore. |
| **ESLint & TypeScript** | 17 errors in `sam-avatar` causing `npm run lint` failure; unused parameter errors in TypeScript declarations. | Configured `.eslintrc.json` properly for Next.js and TypeScript; resolved all 17 errors; clean linting with 0 errors and 0 warnings. |
| **Testing Infrastructure** | Only 2 basic lib tests; no UI component tests; no modal regression tests. | Added `vitest.config.ts`, `setup.ts` (with `IntersectionObserver`, `matchMedia`, `scrollTo` mocks), and created a comprehensive 7-scenario modal regression test suite. All 17 tests pass. |
| **SEO & Canonical URLs** | Fallback URLs pointed to legacy `samyak-anand.vercel.app`; generic "AI & Data Science" title; missing JSON-LD structured data. | Canonical domain locked to `https://samyak-anand-ai-scientist-portfolio.vercel.app/`; updated title to `Samyak Anand \| Applied AI Engineer \| GenAI & Python`; added Person and WebSite JSON-LD schemas; updated robots.txt and sitemap.xml. |
| **Professional Experience** | Listed Softgrowth Infotech as "Present" with vague dates; education diploma listed as 2020. | Softgrowth Infotech updated to `October 2025 – November 2026` (engagement concluded 9 November 2026) in Hyderabad, India; education corrected to B.Tech 2024 and Diploma 2021 (84.25%). |
| **Skills & Competencies** | Displayed arbitrary percentage bars (88%, 83%, etc.) without evidence backing. | Removed vanity percentages. Introduced evidence-based tiers: `Project-Verified`, `Production Stack`, `Hands-On Experience`, and `Familiar / Learning` with explicit project references. |
| **Project Structure** | Tier 1 AI systems and Tier 2 analytics projects were mixed together with no search capability. | Separated into Tier 1 (Featured AI/ML Systems) and Tier 2 (Analytics Project Archive); added instant keyword search across title, description, and stack tags; enriched case study data with intended users, evaluation benchmarks, security considerations, and roadmaps. |

---

## 2. Critical Priority: Modal UX Transformation

### A. Backdrop Dismissal
- **Mechanism**: Implemented strict event target matching on the overlay backdrop:
  ```tsx
  onClick={(e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }}
  ```
- **Panel Isolation**: The modal dialog panel explicitly calls `onClick={(e) => e.stopPropagation()}`. Clicking anywhere inside the modal, its buttons, links, text, or images never triggers backdrop closure.

### B. Close Controls & Touch Targets
- Top-right floating close pill and sticky header close button both enforce `min-h-[44px] min-w-[44px]` touch targets for full WCAG AAA mobile compliance.
- Added `aria-label="Close Case Study"` and visible focus rings: `focus-visible:ring-2 focus-visible:ring-rose-400`.
- Retained Escape key dismissal with proper event listener cleanup.

### C. Scroll Isolation & Restoration
- When opening a modal, `currentScroll = window.scrollY` is cached in a ref.
- `portfolio:scroll-lock` custom event pauses Lenis smooth scroll ticker.
- `document.body.style.overflow = 'hidden'` and `document.documentElement.style.overflow = 'hidden'` lock the background without jumping to top.
- The modal body has `flex-1 min-h-0 overflow-y-auto overscroll-contain`, ensuring independent scrolling without scroll-chaining into the background.
- On close, `window.scrollTo({ top: currentScroll, behavior: 'instant' })` restores the exact pre-modal scroll coordinate.

### D. Dialog Accessibility & Focus Management
- Modal panel container features:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby="case-study-title"`
  - `tabIndex={-1}`
- **Focus Trap**: Traps `Tab` and `Shift+Tab` cycles strictly inside the open modal panel.
- **Focus Return**: When the modal closes, focus returns automatically to the card or trigger element that initiated it.

---

## 3. Project Selection & Tiered Architecture

### Tier 1: Featured Applied AI & Machine Learning Systems
1. **NEXUS — Autonomous Data Analyst**:
   - Automated single/multi-table EDA engine profiling CSV, JSON, and XLSX.
   - Deterministic calculations via Pandas and read-only SQL with 0.0% mathematical hallucination rate.
   - Documented limitations: complex relational auto-join discovery is currently under roadmap.
2. **ARGUS AI — Evidence-Oriented Knowledge Workspace**:
   - Local document collection chunking with passage-level character offset indexing.
   - Deterministic passage ID citation mapping and FastAPI async inference.
   - Documented limitations: confirms passage correspondence within indexed text; not claimed to be distributed enterprise vector RAG.
3. **SHIRO CodeMind — Source-Grounded Codebase Intelligence**:
   - Public GitHub repository indexing with AST & heuristic dependency parsing.
   - Symbol mind maps and source-grounded answers with verifiable file and line number citations.
   - Pinned against immutable commit SHAs for 100% reproducible audit trails.
4. **L — LLM Intelligence & Evaluation Platform**:
   - Provider-independent model evaluation workspace.
   - Snapshots versioned test datasets (CSV/JSONL) and executes deterministic evaluators for groundedness, latency, and cost.
   - Catches prompt regressions between prompt revisions before production release.
5. **AI Resume Analyzer & Matcher**:
   - Fast NLP candidate evaluation engine (<50ms inference).
   - Domain-specific technical entity extraction, TF-IDF vectorization, and cosine similarity scoring against Job Descriptions.
6. **Network Security ML Pipeline**:
   - End-to-end modular ML pipeline streaming network session metadata from MongoDB.
   - Automated schema drift detection, Scikit-learn feature transformation, and intrusion classification ensembles.
7. **Clinical Multi-Disease Predictor**:
   - Supervised clinical ML pipeline (SVM & Random Forest) evaluating multivariate biometric health indicators for Diabetes, Heart Disease, and Parkinson's.
   - Rigorous StandardScaler preprocessing to prevent train-test data leakage.
8. **AKATSUKI AI — Developer Automation Engine**:
   - Deterministic developer workflow automation CLI and local task execution runner.
   - Explicitly clarified as deterministic local system routines with optional LLM bridging, avoiding false claims of unconstrained agent autonomy.

### Tier 2: Analytics Project Archive & Dashboards
- **Financial Risk Analytics Suite** (Power BI, DAX, MSSQL)
- **Credit Card Financial Analytics** (Power BI, PostgreSQL, Delinquency DAX)
- **Blinkit Sales & Inventory Analytics** (Power BI, Star-Schema, 8,500+ records)
- **Insurance Claims & Underwriting Intelligence** (Power BI, Actuarial Loss Ratios)
- **Netflix Content & Streaming Analytics** (Tableau, Power BI, Pandas)
- **Amazon Prime Video Content Dashboard** (Excel, Power Query, Slicers)
- **Student Academic Performance Predictor** (CatBoost, XGBoost, Flask)
- **Customer Churn Deep Learning** (TensorFlow, Keras MLP, Streamlit)
- **Cars24 Web Scraper & Price Engine** (BeautifulSoup, Pandas, Hyderabad listings)
- **Production Web Platforms** (Aurum Delights, Diksha Anand Portfolio on Next.js 15 / 14)

---

## 4. Professional Experience & Impact Verification

### Verified Impact Metrics
- **10+ AI & ML Systems Built**: NEXUS, ARGUS AI, SHIRO, L Platform, Resume Matcher, NetworkSecurity, Clinical Predictor, Akatsuki, Churn MLP, Student Regressor.
- **100+ Learners Mentored**: Technical instruction delivered at Softgrowth Infotech across Python, Pandas, machine learning pipelines, and capstones.
- **50+ Data Analytics Deliverables**: Production Power BI, DAX, SQL, and Excel dashboards across financial risk, credit cards, retail, insurance, and media catalogs.
- **40+ Datasets Analyzed**: Exploratory data analysis, statistical distributions, and anomaly checks across clinical, banking, retail, and automobile datasets.
- **5+ Master's Capstones Guided**: Full architecture design, technical documentation, and defense slide decks.
- **9 Verified Credentials**: Data Science, Machine Learning, Deep Learning, Cloud & Python specializations.

### Softgrowth Infotech Timeline & Scope
- **Role**: Data Science Trainer
- **Dates**: October 2025 – November 2026
- **Status**: Engagement concluded 9 November 2026
- **Location**: Hyderabad, Telangana, India
- **Verifiable Responsibilities**:
  - Python programming instruction and data structure fundamentals.
  - Exploratory data analysis routines and statistical summaries.
  - Machine learning pipelines using Scikit-learn and evaluation metrics.
  - Capstone project reviews, code walkthroughs, and technical defense mentoring.

---

## 5. Technical SEO & Accessibility Audits

### SEO Infrastructure
- **Canonical Domain**: `https://samyak-anand-ai-scientist-portfolio.vercel.app/` applied uniformly across `layout.tsx`, `robots.ts`, `sitemap.ts`, and OpenGraph tags.
- **Title Tag**: `Samyak Anand | Applied AI Engineer | GenAI & Python`
- **Description**: `Applied AI Engineer building practical AI applications, LLM-powered workflows, retrieval systems, machine learning products and Python backend solutions.`
- **Structured Data (JSON-LD)**: Injected `Person` and `WebSite` schemas detailing alumni credentials, technical skills, and verified social profiles.

### Accessibility (a11y)
- **Keyboard Navigation**: Full keyboard tab order with visible `focus-visible:ring-2` indicators across all buttons, inputs, links, and cards.
- **Dialog Semantics**: Full ARIA dialog specification implemented in project modals (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
- **Touch Targets**: Minimum 44×44px interactive touch areas enforced across mobile controls.
- **Reduced Motion**: All animations and counters respect `prefers-reduced-motion: reduce`.

---

## 6. Verification & Test Suite Summary

### Commands Executed & Results
1. `npm run typecheck`: **PASSED** (0 type errors).
2. `npm run lint`: **PASSED** (0 errors, 0 warnings across all source files).
3. `npm test`: **PASSED** (17 unit and regression tests passed across 3 test suites):
   - `src/lib/cinematic.test.ts` (6 tests)
   - `src/lib/chat-navigation.test.ts` (4 tests)
   - `src/components/sections/Scene04Projects.test.tsx` (7 tests)
4. `npm run build`: **PASSED** (Next.js production build succeeded with static page pre-rendering).

---

## 7. Deliverables Staged & Available in Repository

1. **Portfolio Application Code**: All updated components in `src/` (Hero, Identity, Tech Universe, Projects Modal, Layout, Sitemap, Robots).
2. **LinkedIn Update Content**: Prepared and saved in [`docs/branding/linkedin-update.md`](file:///E:/scroll%20portfolio/docs/branding/linkedin-update.md).
3. **GitHub Profile README**: Prepared and saved in [`docs/branding/github-readme.md`](file:///E:/scroll%20portfolio/docs/branding/github-readme.md).
4. **Implementation & Audit Report**: This comprehensive report in [`docs/PORTFOLIO_IMPLEMENTATION_REPORT.md`](file:///E:/scroll%20portfolio/docs/PORTFOLIO_IMPLEMENTATION_REPORT.md).

---

## 8. Final Visual & Motion Polish (2026 Polish Update)

### A. Landing Hero Text Canvas Removal & Background Transparency
- **Problem**: The quote `"I build practical AI applications that combine intelligent..."` previously had a dark card container with border and gradient backdrop blur that blocked the underlying video frames.
- **Solution**: Removed the card styling, borders, and backdrop box. Made the container background `bg-transparent` (`rgba(0, 0, 0, 0)`), letting the cinematic video frame sequence show directly behind the text.
- **Legibility**: Applied high-contrast typographic text shadows (`drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]`) so the text remains sharp and legible across all 300 scroll sequence frames.
- **Verification**: Evaluated live via Chrome DevTools protocol (`backgroundColor: 'rgba(0, 0, 0, 0)'`, `backdropFilter: 'none'`, `border: '0px'`).

### B. Component-Level Scroll Entrance & Text Animations
- **Scene 03 Tech Universe**: Added `motion.div` staggered container and card entrances with spring hover elevation and micro-transitions on individual skill items.
- **Scene 02 Architectural Identity**: Added staggered narrative entrance, responsive KPI metric card grid, and ambient hover effects.
- **Scene 05 Capabilities**: Added kinetic hover lift (`whileHover={{ y: -4 }}`) and responsive card sizing.
- **Scene Certifications**: Added `motion.div` spring cards with 44px touch targets on modal dismissal.
- **Scene Contact**: Added responsive 5-column developer badge layout and compact spacing.

### C. Mobile Responsiveness Optimization
- Optimized padding across mobile viewports (320px–430px) using `px-4 py-20 sm:px-8 md:px-12 lg:px-20`.
- Ensured card padding `p-4 sm:p-6` or `p-5 sm:p-7` prevents text crowding on narrow devices.
- All interactive controls maintain $\ge 44 \times 44$px touch targets.

