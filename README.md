# BankerBrief — Finance Intelligence Dashboard

A production-grade finance intelligence dashboard for Wall Street professionals. Features live market data, AI-curated finance news, economic calendar, earnings tracker, and BIS research analysis.

**Live dashboard:** [Deployed on Railway](https://daily-finance-digest.up.railway.app)

---

## Features

- **Macro Snapshot** — Fed Funds Rate, CPI, Core PCE, Unemployment, GDP, SOFR, and more via FRED API
- **Market Instruments** — S&P 500, Nasdaq, Dow, 10Y UST, VIX, WTI Crude, Gold via Yahoo Finance
- **Live Ticker Ribbon** — Scrolling real-time market prices
- **AI Top 10 Reads** — GPT-4o curated finance news from bank newsrooms, Reuters, CNBC, MarketWatch, and geopolitics sources
- **Economic Calendar** — FOMC decisions, CPI releases, PCE, GDP, Nonfarm Payrolls with countdown
- **Earnings Tracker** — Big Tech + Fortune 100 bank earnings with EPS estimates
- **BIS Research Intelligence** — Latest Bank for International Settlements papers with GPT-4o plain-English summaries and market impact analysis
- **Dark/Light Mode** — Premium terminal-style design

---

## Tech Stack

| Component | Tool |
|---|---|
| Framework | Next.js 14 + TypeScript |
| Styling | Tailwind CSS v4 |
| Macro data | FRED API (Federal Reserve) |
| Market data | Yahoo Finance (`yahoo-finance2`) |
| News curation | RSS feeds + OpenAI GPT-4o |
| BIS research | BIS RSS + GPT-4o analysis |
| Calendar | Seeded FOMC/CPI/PCE/GDP dates |
| Hosting | Railway |

---

## Setup

### 1. Install
```bash
npm install
```

### 2. Configure environment
Create a `.env.local` file:
```
OPENAI_API_KEY=your_openai_api_key
FRED_API_KEY=your_fred_api_key
```

### 3. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Railway
Push to GitHub and connect the repo on [railway.app](https://railway.app). Set the env vars in the Railway dashboard.

---

## Data Sources

- **FRED** — Federal Reserve Economic Data (free API key at https://fred.stlouisfed.org/docs/api/api_key.html)
- **Yahoo Finance** — Market quotes and historical data
- **RSS Feeds** — Morgan Stanley, Goldman Sachs, JPMorgan, Reuters, CNBC, MarketWatch, CFR, Foreign Affairs
- **BIS** — Bank for International Settlements research papers
- **OpenAI GPT-4o** — News curation, market summaries, BIS paper analysis

---

© 2025 BankerBrief
