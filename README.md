# Worker Airplane

Worker Airplane is a static web prototype for worker-friendly flight search. It adapts the Start Bootstrap Agency template into a service that considers clock-out time, leave-day limits, budget, and next-day fatigue.

## Page List

The project contains 20 HTML pages. Every page is reachable from the top navigation or in-page buttons.

| Page | File | Purpose |
|---|---|---|
| Home | index.html | Search flights by budget, work hours, and next-day fatigue. |
| Search Results | search_results.html | Compare flight cards with worker-friendly filters. |
| Flight Detail | flight_detail.html | Review schedule, cost, and work-life fit before booking. |
| Schedule Simulator Setup | simulator_input.html | Enter office location, clock-out time, and leave options. |
| Schedule Timeline | simulator_timeline.html | View a realistic travel timeline from office to return home. |
| Share Schedule | simulator_share.html | Save and share a generated weekend travel plan. |
| Booking Process | booking_process.html | Enter passenger details and review payment conditions. |
| Booking Confirmed | booking_confirm.html | Show booking number and next recommended actions. |
| Login | login.html | Sign in to manage alerts and saved flights. |
| Sign Up | signup.html | Create an account with travel preferences. |
| My Page | mypage_main.html | Summarize saved flights, alerts, and bookings. |
| Wishlist | mypage_wishlist.html | Manage saved flights and price alerts. |
| Purchase History | mypage_history.html | Review past bookings and receipts. |
| Profile Settings | mypage_profile.html | Edit office location, default airport, and alerts. |
| Hot Deals | hot_deals.html | Show time-safe discount flights for workers. |
| Community Reviews | community_list.html | Browse short-trip reviews from workers. |
| Review Detail | community_detail.html | Read one review with schedule tips. |
| FAQ | support_faq.html | Answer common service and booking questions. |
| Contact Support | support_contact.html | Submit booking, alert, or partnership questions. |
| About Service | about_service.html | Explain the service concept and AI usage note. |

## Tech Stack

- HTML5
- CSS3 / Bootstrap 5 template base
- Vanilla JavaScript
- Font Awesome icons

## AI Tool Usage

- AI tool used: Yes
- AI-assisted parts: HTML structure drafts, shared navigation, Bootstrap UI composition, and README organization
- Directly edited parts: Service concept, page purpose, worker-specific conditions, sample flight data, and navigation flow
- Final decisions: The 20 pages were separated into search, detail, simulator, booking, account, community, and support screens so they are not simple text swaps

## Run

Open index.html in a browser, or run a local static server:

```bash
python -m http.server 8000
```
