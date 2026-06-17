# Worker Airplane v02

Worker Airplane v02 is a static prototype for a lightweight flight search service. The site keeps the familiar shape of a flight search website, but its main difference is that it recommends flights by realistic travel feasibility: leave days by weekday, office commute time, airport gate buffer, immigration time, and Monday work readiness.

## Prototype Scope

- 28 HTML pages, split from the original one-page Template 6 style into feature-specific pages.
- 20 virtual flight records in `js/data.js`.
- 3 demo personas for presentation flow.
- Card-based flight browsing and timeline-based simulators.
- No real booking, payment, maps, or live airline data.

## Demo Personas

| Persona | Use case | Good demo path |
|---|---|---|
| 금요일 저녁 퇴근형 | Office worker leaving Gangnam at 18:30 | Home -> Search Results -> Flight Detail -> Immigration Simulator -> Commute Simulator |
| 교대근무 회복형 | Wants a slower Saturday start and low fatigue | Home -> Weekend Trips -> Relaxed Trips -> Timeline |
| 짧아도 꽉 채우는 형 | Can use one leave day and wants maximum stay | Home -> Max Playtime -> Compare Flights -> Booking Confirm |

## Page Count

The project intentionally has more than 20 pages and fewer than 30 pages. Pages are separated by function so the prototype does not feel like a single scrolling landing page.

## Run

Open `index.html` directly, or serve the folder with a static server.
