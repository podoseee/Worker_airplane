const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const flights = [
  { id: "fuk-01", city: "Fukuoka", country: "Japan", airport: "FUK", origin: "ICN", airline: "Air Seoul", depart: "Fri 19:40", arrive: "Fri 21:05", returnDepart: "Sun 20:10", returnArrive: "Sun 21:35", price: 218000, leave: 0, score: 96, mode: "balanced", category: ["weekend", "commuter", "monday", "deal"], tag: "No leave needed", gateBuffer: 48, commuteBuffer: 42, immigrationOut: 66, immigrationIn: 54, fatigue: "Low", image: "assets/img/portfolio/1.jpg" },
  { id: "tpe-02", city: "Taipei", country: "Taiwan", airport: "TPE", origin: "ICN", airline: "T'way Air", depart: "Fri 20:15", arrive: "Fri 22:05", returnDepart: "Mon 00:20", returnArrive: "Mon 03:55", price: 298000, leave: 0.5, score: 91, mode: "balanced", category: ["weekend", "commuter", "monday"], tag: "Monday half-day suggested", gateBuffer: 36, commuteBuffer: 31, immigrationOut: 72, immigrationIn: 58, fatigue: "Medium", image: "assets/img/portfolio/2.jpg" },
  { id: "osa-03", city: "Osaka", country: "Japan", airport: "KIX", origin: "GMP", airline: "Jeju Air", depart: "Sat 08:20", arrive: "Sat 10:05", returnDepart: "Sun 19:35", returnArrive: "Sun 21:25", price: 246000, leave: 0, score: 84, mode: "relaxed", category: ["weekend", "deal"], tag: "Weekend compact", gateBuffer: 75, commuteBuffer: 58, immigrationOut: 62, immigrationIn: 50, fatigue: "Low", image: "assets/img/portfolio/3.jpg" },
  { id: "dad-04", city: "Da Nang", country: "Vietnam", airport: "DAD", origin: "ICN", airline: "Vietjet Air", depart: "Thu 22:35", arrive: "Fri 01:25", returnDepart: "Sun 23:55", returnArrive: "Mon 06:10", price: 386000, leave: 1, score: 88, mode: "max", category: ["leave", "maxplay", "monday"], tag: "One leave day efficient", gateBuffer: 52, commuteBuffer: 46, immigrationOut: 84, immigrationIn: 70, fatigue: "High", image: "assets/img/portfolio/4.jpg" },
  { id: "bkk-05", city: "Bangkok", country: "Thailand", airport: "BKK", origin: "ICN", airline: "Jin Air", depart: "Fri 21:20", arrive: "Sat 01:10", returnDepart: "Mon 02:30", returnArrive: "Mon 10:05", price: 422000, leave: 1, score: 82, mode: "max", category: ["maxplay", "leave"], tag: "Long night flight", gateBuffer: 44, commuteBuffer: 34, immigrationOut: 92, immigrationIn: 88, fatigue: "High", image: "assets/img/portfolio/5.jpg" },
  { id: "sin-06", city: "Singapore", country: "Singapore", airport: "SIN", origin: "ICN", airline: "Scoot", depart: "Thu 23:10", arrive: "Fri 04:55", returnDepart: "Sun 22:40", returnArrive: "Mon 06:10", price: 512000, leave: 1, score: 79, mode: "balanced", category: ["leave", "monday"], tag: "City sprint", gateBuffer: 58, commuteBuffer: 47, immigrationOut: 78, immigrationIn: 64, fatigue: "Medium", image: "assets/img/portfolio/6.jpg" },
  { id: "hkg-07", city: "Hong Kong", country: "Hong Kong", airport: "HKG", origin: "ICN", airline: "HK Express", depart: "Fri 20:55", arrive: "Fri 23:45", returnDepart: "Sun 21:50", returnArrive: "Mon 02:25", price: 334000, leave: 0.5, score: 86, mode: "balanced", category: ["weekend", "commuter"], tag: "Late return", gateBuffer: 40, commuteBuffer: 30, immigrationOut: 80, immigrationIn: 60, fatigue: "Medium", image: "assets/img/portfolio/1.jpg" },
  { id: "nrt-08", city: "Tokyo", country: "Japan", airport: "NRT", origin: "ICN", airline: "ZIPAIR", depart: "Fri 18:55", arrive: "Fri 21:15", returnDepart: "Sun 18:20", returnArrive: "Sun 21:00", price: 289000, leave: 0, score: 90, mode: "balanced", category: ["weekend", "commuter", "monday"], tag: "Tight but clean", gateBuffer: 28, commuteBuffer: 24, immigrationOut: 68, immigrationIn: 55, fatigue: "Low", image: "assets/img/portfolio/2.jpg" },
  { id: "ngo-09", city: "Nagoya", country: "Japan", airport: "NGO", origin: "ICN", airline: "Korean Air", depart: "Sat 09:05", arrive: "Sat 10:55", returnDepart: "Mon 07:25", returnArrive: "Mon 09:35", price: 351000, leave: 0.5, score: 77, mode: "relaxed", category: ["monday", "relaxed"], tag: "Monday late start", gateBuffer: 82, commuteBuffer: 61, immigrationOut: 60, immigrationIn: 52, fatigue: "Medium", image: "assets/img/portfolio/3.jpg" },
  { id: "cebu-10", city: "Cebu", country: "Philippines", airport: "CEB", origin: "ICN", airline: "Cebu Pacific", depart: "Fri 22:10", arrive: "Sat 01:35", returnDepart: "Mon 01:20", returnArrive: "Mon 06:45", price: 372000, leave: 1, score: 81, mode: "max", category: ["maxplay", "leave"], tag: "Beach max time", gateBuffer: 49, commuteBuffer: 36, immigrationOut: 88, immigrationIn: 74, fatigue: "High", image: "assets/img/portfolio/4.jpg" },
  { id: "pvg-11", city: "Shanghai", country: "China", airport: "PVG", origin: "ICN", airline: "China Eastern", depart: "Fri 19:25", arrive: "Fri 20:40", returnDepart: "Sun 18:45", returnArrive: "Sun 21:55", price: 265000, leave: 0, score: 87, mode: "balanced", category: ["weekend", "commuter", "deal"], tag: "Short flight", gateBuffer: 45, commuteBuffer: 38, immigrationOut: 76, immigrationIn: 57, fatigue: "Low", image: "assets/img/portfolio/5.jpg" },
  { id: "mnl-12", city: "Manila", country: "Philippines", airport: "MNL", origin: "ICN", airline: "Philippine Airlines", depart: "Thu 21:50", arrive: "Fri 01:05", returnDepart: "Sun 23:10", returnArrive: "Mon 04:35", price: 398000, leave: 1, score: 76, mode: "max", category: ["leave", "maxplay"], tag: "One day leave", gateBuffer: 55, commuteBuffer: 40, immigrationOut: 90, immigrationIn: 85, fatigue: "High", image: "assets/img/portfolio/6.jpg" },
  { id: "sgn-13", city: "Ho Chi Minh", country: "Vietnam", airport: "SGN", origin: "ICN", airline: "VietJet Air", depart: "Fri 20:40", arrive: "Sat 00:05", returnDepart: "Mon 00:10", returnArrive: "Mon 07:25", price: 407000, leave: 1, score: 78, mode: "max", category: ["maxplay", "leave"], tag: "Food trip", gateBuffer: 38, commuteBuffer: 32, immigrationOut: 86, immigrationIn: 76, fatigue: "High", image: "assets/img/portfolio/1.jpg" },
  { id: "cts-14", city: "Sapporo", country: "Japan", airport: "CTS", origin: "ICN", airline: "Air Busan", depart: "Fri 17:45", arrive: "Fri 20:20", returnDepart: "Sun 17:30", returnArrive: "Sun 20:25", price: 318000, leave: 0.5, score: 73, mode: "relaxed", category: ["relaxed", "weekend"], tag: "Half-day safer", gateBuffer: 70, commuteBuffer: 64, immigrationOut: 65, immigrationIn: 52, fatigue: "Low", image: "assets/img/portfolio/2.jpg" },
  { id: "oka-15", city: "Okinawa", country: "Japan", airport: "OKA", origin: "ICN", airline: "Peach", depart: "Fri 21:00", arrive: "Fri 23:25", returnDepart: "Mon 07:10", returnArrive: "Mon 09:45", price: 377000, leave: 0.5, score: 83, mode: "balanced", category: ["weekend", "monday"], tag: "Morning return", gateBuffer: 43, commuteBuffer: 35, immigrationOut: 67, immigrationIn: 56, fatigue: "Medium", image: "assets/img/portfolio/3.jpg" },
  { id: "han-16", city: "Hanoi", country: "Vietnam", airport: "HAN", origin: "ICN", airline: "Vietnam Airlines", depart: "Fri 18:30", arrive: "Fri 21:25", returnDepart: "Sun 23:30", returnArrive: "Mon 05:40", price: 455000, leave: 0.5, score: 69, mode: "max", category: ["maxplay"], tag: "Risky clock-out", gateBuffer: 22, commuteBuffer: 18, immigrationOut: 85, immigrationIn: 69, fatigue: "High", image: "assets/img/portfolio/4.jpg" },
  { id: "kul-17", city: "Kuala Lumpur", country: "Malaysia", airport: "KUL", origin: "ICN", airline: "AirAsia X", depart: "Thu 22:20", arrive: "Fri 04:00", returnDepart: "Sun 23:35", returnArrive: "Mon 07:10", price: 462000, leave: 1, score: 75, mode: "balanced", category: ["leave", "monday"], tag: "One leave city break", gateBuffer: 60, commuteBuffer: 48, immigrationOut: 82, immigrationIn: 71, fatigue: "Medium", image: "assets/img/portfolio/5.jpg" },
  { id: "cju-18", city: "Jeju", country: "Korea", airport: "CJU", origin: "GMP", airline: "Eastar Jet", depart: "Fri 19:05", arrive: "Fri 20:15", returnDepart: "Sun 20:45", returnArrive: "Sun 21:55", price: 139000, leave: 0, score: 95, mode: "relaxed", category: ["weekend", "commuter", "deal", "relaxed"], tag: "Domestic reset", gateBuffer: 65, commuteBuffer: 54, immigrationOut: 30, immigrationIn: 24, fatigue: "Low", image: "assets/img/portfolio/6.jpg" },
  { id: "pus-19", city: "Busan", country: "Korea", airport: "PUS", origin: "GMP", airline: "Korean Air", depart: "Sat 07:40", arrive: "Sat 08:45", returnDepart: "Sun 19:20", returnArrive: "Sun 20:25", price: 128000, leave: 0, score: 89, mode: "relaxed", category: ["weekend", "deal", "relaxed"], tag: "Easy domestic", gateBuffer: 78, commuteBuffer: 63, immigrationOut: 28, immigrationIn: 22, fatigue: "Low", image: "assets/img/portfolio/1.jpg" },
  { id: "uln-20", city: "Ulaanbaatar", country: "Mongolia", airport: "UBN", origin: "ICN", airline: "MIAT", depart: "Fri 22:00", arrive: "Sat 00:40", returnDepart: "Mon 06:30", returnArrive: "Mon 10:50", price: 498000, leave: 1, score: 72, mode: "max", category: ["maxplay", "leave"], tag: "Adventure sprint", gateBuffer: 50, commuteBuffer: 42, immigrationOut: 82, immigrationIn: 66, fatigue: "High", image: "assets/img/portfolio/2.jpg" }
];

const personas = [
  { id: "office", name: "금요일 저녁 퇴근형", role: "강남 18:30 퇴근, 월요일 09:30 출근", leave: "금요일 반차 불가, 월요일 반차 가능", budget: 400000, style: "balanced", recommended: "fuk-01" },
  { id: "nurse", name: "교대근무 회복형", role: "토요일 오전 출발 선호, 월요일 늦은 출근", leave: "일요일 밤 도착 선호", budget: 350000, style: "relaxed", recommended: "osa-03" },
  { id: "max", name: "짧아도 꽉 채우는 형", role: "목요일 밤 출발 가능, 연차 1일 사용", leave: "금요일 연차 가능", budget: 520000, style: "max", recommended: "dad-04" }
];

const pages = [
  ["index.html", "홈"],
  ["browse_all.html", "전체 항공권"],
  ["search_results.html", "검색 결과"],
  ["hot_deals.html", "땡처리 항공권"],
  ["weekend_trips.html", "주말 여행"],
  ["leave_saver.html", "연차 절약"],
  ["commuter_ready.html", "퇴근 후 출국"],
  ["monday_ready.html", "월요일 출근 가능"],
  ["relaxed_trips.html", "여유 일정"],
  ["max_playtime.html", "빡빡하게 오래 놀기"],
  ["filters.html", "상세 필터"],
  ["leave_calendar.html", "요일별 휴가 설정"],
  ["worker_profile.html", "출퇴근 정보"],
  ["travel_style.html", "여행 강도"],
  ["flight_detail.html", "항공권 상세"],
  ["immigration_simulator.html", "입출국 시뮬레이터"],
  ["commute_simulator.html", "출퇴근 시뮬레이터"],
  ["airport_flow.html", "공항 내부 동선"],
  ["simulator_input.html", "시뮬레이터 입력"],
  ["simulator_timeline.html", "여행 타임라인"],
  ["simulator_share.html", "일정 공유"],
  ["destination_list.html", "목적지 목록"],
  ["destination_detail.html", "목적지 상세"],
  ["compare_flights.html", "항공권 비교"],
  ["mypage_wishlist.html", "저장한 항공권"],
  ["booking_process.html", "예약 확인"],
  ["booking_confirm.html", "선택 완료"],
  ["about_service.html", "서비스 소개"]
];

const navGroups = [
  ["탐색", [["홈", "index.html"], ["전체 항공권", "browse_all.html"], ["검색 결과", "search_results.html"], ["땡처리", "hot_deals.html"], ["목적지", "destination_list.html"]]],
  ["상황별 추천", [["주말 여행", "weekend_trips.html"], ["연차 절약", "leave_saver.html"], ["퇴근 후 출국", "commuter_ready.html"], ["월요일 출근 가능", "monday_ready.html"], ["여유 일정", "relaxed_trips.html"], ["오래 놀기", "max_playtime.html"]]],
  ["조건 설정", [["상세 필터", "filters.html"], ["요일별 휴가", "leave_calendar.html"], ["출퇴근 정보", "worker_profile.html"], ["여행 강도", "travel_style.html"]]],
  ["시뮬레이터", [["입출국", "immigration_simulator.html"], ["출퇴근", "commute_simulator.html"], ["공항 동선", "airport_flow.html"], ["입력", "simulator_input.html"], ["타임라인", "simulator_timeline.html"], ["비교", "compare_flights.html"]]],
  ["저장/예약", [["저장한 항공권", "mypage_wishlist.html"], ["예약 확인", "booking_process.html"], ["선택 완료", "booking_confirm.html"], ["서비스 소개", "about_service.html"]]]
];

function money(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

function head(title) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} - Worker Airplane</title>
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
  <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" />
  <link href="css/styles.css" rel="stylesheet" />
  <link href="css/worker-airplane.css" rel="stylesheet" />
</head>`;
}

function nav(current) {
  const groups = navGroups.map(([label, items]) => {
    const links = items.map(([name, href]) => `<li><a class="dropdown-item${href === current ? " active" : ""}" href="${href}">${name}</a></li>`).join("");
    return `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${label}</a><ul class="dropdown-menu dropdown-menu-dark">${links}</ul></li>`;
  }).join("");
  return `<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav"><div class="container"><a class="navbar-brand text-uppercase" href="index.html">Worker Airplane</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive">Menu <i class="fas fa-bars ms-1"></i></button><div class="collapse navbar-collapse" id="navbarResponsive"><ul class="navbar-nav ms-auto py-4 py-lg-0">${groups}</ul></div></div></nav>`;
}

function foot() {
  return `<footer class="footer py-4"><div class="container"><div class="row align-items-center gy-3"><div class="col-lg-4 text-lg-start">Worker Airplane prototype 2026</div><div class="col-lg-4 text-center"><a class="btn btn-dark btn-social mx-2" href="simulator_timeline.html"><i class="fas fa-route"></i></a><a class="btn btn-dark btn-social mx-2" href="mypage_wishlist.html"><i class="fas fa-heart"></i></a><a class="btn btn-dark btn-social mx-2" href="about_service.html"><i class="fas fa-circle-info"></i></a></div><div class="col-lg-4 text-lg-end"><a class="link-dark text-decoration-none me-3" href="compare_flights.html">비교</a><a class="link-dark text-decoration-none" href="booking_process.html">예약 확인</a></div></div></div></footer><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script><script src="js/data.js"></script><script src="js/scripts.js"></script>`;
}

function page(current, title, body, klass = "inner-page") {
  return `${head(title)}<body id="page-top">${nav(current)}<main class="${klass}">${body}</main>${foot()}</body></html>`;
}

function hero() {
  return `${head("홈")}<body id="page-top">${nav("index.html")}<header class="masthead worker-hero"><div class="container"><p class="eyebrow">가볍게 둘러보고, 현실적으로 떠나기</p><h1 class="masthead-heading text-uppercase">Worker Airplane</h1><p class="hero-copy">날짜와 목적지를 정하지 않아도 됩니다. 연차 요일, 퇴근 시간, 공항 이동, 게이트 여유까지 계산해 갈 수 있는 항공권을 먼저 보여줍니다.</p><div class="hero-actions"><a class="btn btn-primary btn-xl" href="browse_all.html">항공권 둘러보기</a><a class="btn btn-outline-light btn-xl" href="simulator_input.html">내 일정 시뮬레이션</a></div></div></header><main><section class="page-section search-band"><div class="container"><div class="row g-4 align-items-center"><div class="col-lg-5"><h2>검색창은 가볍게, 조건은 선택적으로.</h2><p class="text-muted">시연용 페르소나를 고르면 검색 결과와 시뮬레이터에서 추천 흐름을 바로 설명할 수 있습니다.</p></div><div class="col-lg-7"><div class="panel"><div class="row g-3"><div class="col-md-6"><label class="form-label">시연 페르소나</label><select class="form-select" id="personaSelect"></select></div><div class="col-md-6"><label class="form-label">출발 공항</label><select class="form-select"><option>인천 ICN</option><option>김포 GMP</option><option>부산 PUS</option></select></div><div class="col-12"><label class="form-label fw-bold">예산 <span id="budgetValue">400,000</span>원</label><input id="budgetRange" type="range" class="form-range" min="120000" max="550000" step="10000" value="400000"></div><div class="col-12"><div class="persona-note" id="personaNote"></div></div><div class="col-md-6"><a class="btn btn-primary w-100" href="search_results.html">추천 결과 보기</a></div><div class="col-md-6"><a class="btn btn-outline-primary w-100" href="leave_calendar.html">요일별 휴가 설정</a></div></div></div></div></div></div></section><section class="page-section"><div class="container"><div class="text-center mb-5"><h2 class="section-heading text-uppercase">추천 카드 미리보기</h2><p class="section-subheading text-muted">Template 6의 카드형 섹션을 항공권 탐색 UI로 바꾼 화면입니다.</p></div><div class="row" data-flight-list data-limit="6"></div></div></section></main>${foot()}</body></html>`;
}

function listing(title, subtitle, filter, current) {
  return page(current, title, `<section class="page-section"><div class="container"><div class="hot-head mb-4"><div><h1>${title}</h1><p class="text-muted">${subtitle}</p></div><a class="btn btn-outline-primary" href="filters.html">필터 조정</a></div><div class="row g-4"><aside class="col-lg-3"><div class="panel sticky-lg-top"><h2 class="h5">빠른 조건</h2><label class="form-label">정렬</label><select class="form-select"><option>추천 점수순</option><option>가격 낮은순</option><option>게이트 여유순</option></select><label class="form-label mt-3">여행 강도</label><div class="form-check"><input class="form-check-input" checked type="checkbox"><label class="form-check-label">균형 있게</label></div><div class="form-check"><input class="form-check-input" type="checkbox"><label class="form-check-label">빡빡해도 오래</label></div><a class="btn btn-primary w-100 mt-4" href="simulator_input.html">시뮬레이터로 검증</a></div></aside><div class="col-lg-9"><div class="row" data-flight-list data-filter="${filter}"></div></div></div></div></section>`);
}

function simple(title, subtitle, content, current) {
  return page(current, title, `<section class="page-section"><div class="container"><div class="text-center mb-5"><h1>${title}</h1><p class="text-muted">${subtitle}</p></div>${content}</div></section>`);
}

const files = new Map();

files.set("index.html", hero());
files.set("browse_all.html", listing("전체 항공권 둘러보기", "20개의 가상 항공권을 카드 UI로 빠르게 훑어봅니다.", "all", "browse_all.html"));
files.set("search_results.html", listing("검색 결과", "금요일 퇴근 후 출발, 40만원 안팎, 월요일 출근 가능성을 기준으로 정렬했습니다.", "search", "search_results.html"));
files.set("hot_deals.html", listing("땡처리 항공권", "가격은 낮지만 공항 이동과 게이트 여유가 무너지지 않는 상품만 골랐습니다.", "deal", "hot_deals.html"));
files.set("weekend_trips.html", listing("주말 여행 항공권", "연차 없이 금요일 밤부터 일요일 밤까지 가능한 짧은 여행입니다.", "weekend", "weekend_trips.html"));
files.set("leave_saver.html", listing("연차 적게 쓰는 여행", "반차 또는 하루 연차로 체류 시간을 늘릴 수 있는 항공권입니다.", "leave", "leave_saver.html"));
files.set("commuter_ready.html", listing("퇴근 후 출국 가능 항공권", "회사에서 공항까지 이동한 뒤 게이트까지 도달하는 시간을 보수적으로 계산했습니다.", "commuter", "commuter_ready.html"));
files.set("monday_ready.html", listing("월요일 출근 가능 항공권", "귀국 후 수면과 이동 시간을 고려해 월요일 출근 가능성을 보여줍니다.", "monday", "monday_ready.html"));
files.set("relaxed_trips.html", listing("여유로운 일정 항공권", "공항에 일찍 도착하고 귀국 후 회복 시간이 남는 보수적 추천입니다.", "relaxed", "relaxed_trips.html"));
files.set("max_playtime.html", listing("빡빡하지만 오래 노는 항공권", "연차 1일을 쓰더라도 현지 체류 시간을 최대화하는 선택지입니다.", "maxplay", "max_playtime.html"));

files.set("filters.html", simple("상세 필터", "항공권 검색 사이트의 기본 필터를 유지하되, 일정 현실성 기준을 더합니다.", `<div class="row g-4"><div class="col-lg-4"><div class="panel"><h2 class="h5">항공권 조건</h2><label class="form-label">출발 공항</label><select class="form-select"><option>ICN</option><option>GMP</option><option>PUS</option></select><label class="form-label mt-3">예산</label><input class="form-range" type="range"></div></div><div class="col-lg-4"><div class="panel"><h2 class="h5">휴가 조건</h2><div class="badge-grid"><span>금요일 반차</span><span>월요일 반차</span><span>연차 1일</span><span>연차 없음</span></div></div></div><div class="col-lg-4"><div class="panel"><h2 class="h5">현실성 조건</h2><div class="form-check"><input class="form-check-input" checked type="checkbox"><label class="form-check-label">게이트 여유 30분 이상</label></div><div class="form-check"><input class="form-check-input" checked type="checkbox"><label class="form-check-label">월요일 피로도 표시</label></div><a class="btn btn-primary w-100 mt-4" href="search_results.html">적용</a></div></div></div>`, "filters.html"));

files.set("leave_calendar.html", simple("요일별 휴가 설정", "단순 일수가 아니라 요일 기준으로 반차와 연차 가능성을 받습니다.", `<div class="panel"><div class="row g-3 text-center">${["월", "화", "수", "목", "금", "토", "일"].map((d, i) => `<div class="col-md"><div class="choice"><strong>${d}</strong><select class="form-select mt-2"><option>${i < 5 ? "근무" : "휴무"}</option><option>오전 반차</option><option>오후 반차</option><option>연차</option></select></div></div>`).join("")}</div><div class="text-center mt-4"><a class="btn btn-primary" href="worker_profile.html">출퇴근 정보로 이어가기</a></div></div>`, "leave_calendar.html"));

files.set("worker_profile.html", simple("출퇴근 정보", "직장인 페르소나에게만 선택적으로 받는 회사 위치와 출퇴근 시간입니다.", `<div class="row g-4"><div class="col-lg-7"><div class="panel"><label class="form-label">회사 위치</label><input class="form-control" value="서울 강남역"><div class="row g-3 mt-1"><div class="col-md-6"><label class="form-label">퇴근 시간</label><input class="form-control" value="18:30"></div><div class="col-md-6"><label class="form-label">다음 출근 시간</label><input class="form-control" value="09:30"></div></div><label class="form-label mt-3">선호 이동</label><select class="form-select"><option>공항철도 + 택시</option><option>리무진 버스</option><option>자가용</option></select><a class="btn btn-primary mt-4" href="commute_simulator.html">출퇴근 시뮬레이션</a></div></div><div class="col-lg-5"><div class="panel"><h2 class="h5">시연 페르소나</h2><div data-persona-list></div></div></div></div>`, "worker_profile.html"));

files.set("travel_style.html", simple("여행 강도 설정", "같은 항공권도 여유/균형/최대 체류 기준에 따라 추천 순서가 달라집니다.", `<div class="row g-4"><div class="col-md-4"><div class="feature"><i class="fas fa-mug-hot"></i><h2>여유롭게</h2><p>공항과 귀국 후 회복 시간을 넉넉히 잡습니다.</p></div></div><div class="col-md-4"><div class="feature"><i class="fas fa-scale-balanced"></i><h2>균형 있게</h2><p>가격, 체류 시간, 피로도를 함께 봅니다.</p></div></div><div class="col-md-4"><div class="feature"><i class="fas fa-bolt"></i><h2>오래 놀기</h2><p>촉박함을 감수하고 현지 시간을 늘립니다.</p></div></div></div>`, "travel_style.html"));

files.set("flight_detail.html", page("flight_detail.html", "항공권 상세", `<section class="page-section"><div class="container" data-flight-detail></div></section>`));
files.set("immigration_simulator.html", simple("입출국 시뮬레이터", "출발 공항 도착부터 도착 공항 밖으로 나가기까지의 시간을 계산합니다.", `<div class="row g-4"><div class="col-lg-8"><ol class="wa-timeline" data-immigration-timeline></ol></div><div class="col-lg-4"><div class="panel"><h2 class="h5">기준 항공권</h2><p>ICN - FUK, 금요일 19:40 출발</p><div class="metric-row"><span>공항 도착 권장</span><strong>17:55</strong></div><div class="metric-row"><span>게이트 여유</span><strong>48분</strong></div><a class="btn btn-primary w-100" href="flight_detail.html">상세로 돌아가기</a></div></div></div>`, "immigration_simulator.html"));
files.set("commute_simulator.html", simple("출퇴근 시뮬레이터", "회사에서 공항, 귀국 후 집 또는 회사까지의 시간을 이어 붙입니다.", `<div class="row g-4"><div class="col-lg-8"><ol class="wa-timeline" data-commute-timeline></ol></div><div class="col-lg-4"><div class="panel"><h2 class="h5">판정</h2><div class="metric-row"><span>퇴근 후 탑승</span><strong>가능</strong></div><div class="metric-row"><span>월요일 출근</span><strong>가능</strong></div><div class="metric-row"><span>리스크</span><strong>중간</strong></div><a class="btn btn-primary w-100" href="simulator_timeline.html">전체 타임라인</a></div></div></div>`, "commute_simulator.html"));
files.set("airport_flow.html", simple("공항 내부 동선", "출발/도착 공항에서 체크인, 보안검색, 게이트까지의 평균 시간을 보여줍니다.", `<div class="row g-4"><div class="col-md-6"><div class="panel"><h2 class="h5">출발 공항 ICN</h2><div class="metric-row"><span>체크인</span><strong>25분</strong></div><div class="metric-row"><span>보안검색</span><strong>18분</strong></div><div class="metric-row"><span>게이트 이동</span><strong>15분</strong></div></div></div><div class="col-md-6"><div class="panel"><h2 class="h5">도착 공항 FUK</h2><div class="metric-row"><span>입국심사</span><strong>22분</strong></div><div class="metric-row"><span>수하물</span><strong>18분</strong></div><div class="metric-row"><span>공항 밖 이동</span><strong>14분</strong></div></div></div></div>`, "airport_flow.html"));
files.set("simulator_input.html", simple("시뮬레이터 입력", "입출국 시간과 출퇴근 정보를 선택적으로 합쳐 현실적인 여행 가능성을 계산합니다.", `<div class="row g-4"><div class="col-lg-6"><div class="panel"><h2 class="h5">항공권 선택</h2><select class="form-select"><option>Fukuoka Fri 19:40</option><option>Taipei Fri 20:15</option><option>Da Nang Thu 22:35</option></select><label class="form-label mt-3">수하물</label><select class="form-select"><option>기내 수하물만</option><option>위탁 수하물 있음</option></select></div></div><div class="col-lg-6"><div class="panel"><h2 class="h5">개인 조건</h2><input class="form-control mb-3" value="강남역 18:30 퇴근"><input class="form-control" value="월요일 09:30 출근"><a class="btn btn-primary mt-4 w-100" href="simulator_timeline.html">타임라인 생성</a></div></div></div>`, "simulator_input.html"));
files.set("simulator_timeline.html", simple("여행 타임라인", "Template 6의 타임라인 섹션을 항공권 시뮬레이터 화면으로 전환했습니다.", `<ol class="wa-timeline" data-travel-timeline></ol><div class="text-center mt-5"><a class="btn btn-primary" href="simulator_share.html">저장하고 공유</a></div>`, "simulator_timeline.html"));
files.set("simulator_share.html", simple("일정 공유", "친구나 동료에게 보낼 수 있는 일정 요약 카드입니다.", `<div class="share-card narrow mx-auto"><p class="eyebrow">공유용 요약</p><h2>금요일 퇴근 후 후쿠오카</h2><p>퇴근 18:30, 공항 도착 19:05, 게이트 여유 48분, 일요일 22:20 귀가 예상.</p><div class="badge-grid"><span>연차 0일</span><span>피로도 낮음</span><span>총액 218,000원</span><span>월요일 출근 가능</span></div></div>`, "simulator_share.html"));

files.set("destination_list.html", simple("목적지 목록", "짧은 여행에 맞는 도시를 카드로 둘러봅니다.", `<div class="row" data-destination-list></div>`, "destination_list.html"));
files.set("destination_detail.html", simple("목적지 상세", "후쿠오카를 예시로 짧은 여행 적합도와 추천 항공권을 보여줍니다.", `<div class="row g-4"><div class="col-lg-7"><img class="detail-image" src="assets/img/portfolio/1.jpg" alt="Fukuoka"><h2 class="mt-4">Fukuoka</h2><p>짧은 비행, 빠른 입국, 도심 접근성 덕분에 퇴근 후 출국 시연에 가장 적합한 목적지입니다.</p></div><div class="col-lg-5"><div class="panel"><h2 class="h5">목적지 지표</h2><div class="metric-row"><span>주말 적합도</span><strong>96점</strong></div><div class="metric-row"><span>도심 접근</span><strong>빠름</strong></div><div class="metric-row"><span>추천 항공권</span><strong>3개</strong></div><a class="btn btn-primary w-100" href="search_results.html">항공권 보기</a></div></div></div>`, "destination_detail.html"));
files.set("compare_flights.html", simple("항공권 비교", "가격뿐 아니라 연차, 게이트 여유, 월요일 피로도를 나란히 비교합니다.", `<div class="table-responsive"><table class="table compare-table" data-compare-table></table></div>`, "compare_flights.html"));
files.set("mypage_wishlist.html", simple("저장한 항공권", "시연 중 마음에 든 항공권을 저장하고 비교 페이지로 넘깁니다.", `<div class="row" data-flight-list data-filter="saved"></div>`, "mypage_wishlist.html"));
files.set("booking_process.html", simple("예약 확인", "실제 결제 대신 선택한 항공권과 시뮬레이션 결과를 확인하는 프로토타입 화면입니다.", `<div class="row g-4"><div class="col-lg-7"><div class="panel"><h2 class="h5">선택 항공권</h2><div class="metric-row"><span>노선</span><strong>ICN - FUK</strong></div><div class="metric-row"><span>출국</span><strong>Fri 19:40</strong></div><div class="metric-row"><span>귀국</span><strong>Sun 20:10</strong></div><div class="metric-row"><span>총액</span><strong>218,000원</strong></div></div></div><div class="col-lg-5"><div class="panel"><h2 class="h5">예약 전 확인</h2><ul class="check-list"><li>게이트 여유 48분</li><li>연차 0일</li><li>월요일 출근 가능</li></ul><a class="btn btn-primary w-100" href="booking_confirm.html">선택 완료</a></div></div></div>`, "booking_process.html"));
files.set("booking_confirm.html", simple("선택 완료", "프로토타입이므로 실제 결제 대신 일정 저장 완료로 마무리합니다.", `<div class="success-box text-center narrow mx-auto"><i class="fas fa-circle-check"></i><h2>후쿠오카 일정이 저장되었습니다.</h2><p class="text-muted">시연에서는 이 화면에서 저장 항공권, 공유 카드, 타임라인으로 이동할 수 있습니다.</p><a class="btn btn-primary" href="mypage_wishlist.html">저장한 항공권 보기</a></div>`, "booking_confirm.html"));
files.set("about_service.html", simple("서비스 소개", "조건 검색의 부담을 줄이고, 공항과 출퇴근 시간을 포함해 현실적인 여행 가능성을 보여주는 항공권 탐색 서비스입니다.", `<div class="row g-4"><div class="col-md-4"><div class="feature"><i class="fas fa-table-cells-large"></i><h2>카드형 탐색</h2><p>목적지를 정하지 않아도 20개 가상 항공권을 둘러봅니다.</p></div></div><div class="col-md-4"><div class="feature"><i class="fas fa-person-walking-luggage"></i><h2>입출국 계산</h2><p>게이트, 보안검색, 입국심사 시간을 시뮬레이션합니다.</p></div></div><div class="col-md-4"><div class="feature"><i class="fas fa-briefcase"></i><h2>출퇴근 연결</h2><p>직장인 조건을 선택적으로 받아 공항 이동까지 계산합니다.</p></div></div></div><div class="panel mt-5"><h2 class="h5">페이지 구성</h2><p>현재 HTML 페이지는 28개이며, 한 페이지 스크롤 템플릿을 기능별 독립 페이지로 분해했습니다.</p></div>`, "about_service.html"));

const dataJs = `window.flightData = ${JSON.stringify(flights, null, 2)};
window.personaData = ${JSON.stringify(personas, null, 2)};
`;

const scriptsJs = `window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#mainNav");
  const shrink = () => nav && nav.classList.toggle("navbar-shrink", window.scrollY !== 0);
  shrink();
  document.addEventListener("scroll", shrink);

  const budget = document.getElementById("budgetRange");
  const budgetValue = document.getElementById("budgetValue");
  if (budget && budgetValue) {
    const renderBudget = () => budgetValue.textContent = Number(budget.value).toLocaleString("ko-KR");
    budget.addEventListener("input", renderBudget);
    renderBudget();
  }

  const flights = window.flightData || [];
  const personas = window.personaData || [];
  const money = value => value.toLocaleString("ko-KR") + "원";
  const card = flight => \`<article class="col-lg-4 col-md-6 mb-4"><div class="card flight-card h-100"><img src="\${flight.image}" class="card-img-top" alt="\${flight.city}"><div class="card-body d-flex flex-column"><div class="d-flex justify-content-between gap-3"><h2 class="h5">\${flight.city}</h2><span class="badge bg-primary">\${flight.tag}</span></div><p class="text-muted">\${flight.depart} 출발 / \${flight.returnDepart} 귀국</p><p>\${flight.airline} · \${flight.origin} → \${flight.airport} · \${flight.fatigue} fatigue</p><div class="metric-row"><span>추천 점수</span><strong>\${flight.score}점</strong></div><div class="metric-row"><span>최저가</span><strong>\${money(flight.price)}</strong></div><div class="metric-row"><span>게이트 여유</span><strong>\${flight.gateBuffer}분</strong></div><a href="flight_detail.html?id=\${flight.id}" class="btn btn-primary w-100 mt-auto">상세 보기</a></div></div></article>\`;

  document.querySelectorAll("[data-flight-list]").forEach(target => {
    const filter = target.dataset.filter || "all";
    const limit = Number(target.dataset.limit || 0);
    let list = flights.slice();
    if (filter === "search") list = list.filter(f => f.price <= 430000 && f.score >= 80);
    else if (filter === "saved") list = list.filter(f => ["fuk-01", "tpe-02", "dad-04"].includes(f.id));
    else if (filter !== "all") list = list.filter(f => f.category.includes(filter) || f.mode === filter);
    list.sort((a, b) => b.score - a.score);
    if (limit) list = list.slice(0, limit);
    target.innerHTML = list.map(card).join("");
  });

  const personaSelect = document.getElementById("personaSelect");
  const personaNote = document.getElementById("personaNote");
  if (personaSelect && personaNote) {
    personaSelect.innerHTML = personas.map(p => \`<option value="\${p.id}">\${p.name}</option>\`).join("");
    const renderPersona = () => {
      const p = personas.find(item => item.id === personaSelect.value) || personas[0];
      personaNote.innerHTML = \`<strong>\${p.name}</strong><br><span>\${p.role}</span><br><span>\${p.leave} · 예산 \${money(p.budget)}</span>\`;
    };
    personaSelect.addEventListener("change", renderPersona);
    renderPersona();
  }

  document.querySelectorAll("[data-persona-list]").forEach(target => {
    target.innerHTML = personas.map(p => \`<div class="review-item"><strong>\${p.name}</strong><p class="mb-1">\${p.role}</p><small>\${p.leave}</small></div>\`).join("");
  });

  const detail = document.querySelector("[data-flight-detail]");
  if (detail) {
    const params = new URLSearchParams(location.search);
    const flight = flights.find(f => f.id === params.get("id")) || flights[0];
    detail.innerHTML = \`<div class="row g-4"><div class="col-lg-8"><img class="detail-image" src="\${flight.image}" alt="\${flight.city}"><h1 class="mt-4">\${flight.origin} to \${flight.city}</h1><p class="lead">\${flight.depart} 출발, \${flight.returnDepart} 귀국. \${flight.tag} 항공권입니다.</p><div class="row g-3 my-4"><div class="col-md-4"><div class="stat"><span>추천 점수</span><strong>\${flight.score}</strong></div></div><div class="col-md-4"><div class="stat"><span>총액</span><strong>\${money(flight.price)}</strong></div></div><div class="col-md-4"><div class="stat"><span>연차</span><strong>\${flight.leave}일</strong></div></div></div><div class="panel"><h2 class="h4">시뮬레이션 요약</h2><div class="metric-row"><span>회사-공항 여유</span><strong>\${flight.commuteBuffer}분</strong></div><div class="metric-row"><span>게이트 여유</span><strong>\${flight.gateBuffer}분</strong></div><div class="metric-row"><span>입국 후 공항 밖</span><strong>\${flight.immigrationIn}분</strong></div></div></div><aside class="col-lg-4"><div class="panel sticky-lg-top"><h2 class="h4">다음 단계</h2><ul class="check-list"><li>출발 공항 내부 시간 포함</li><li>귀국 후 출근 가능성 표시</li><li>피로도: \${flight.fatigue}</li></ul><a href="immigration_simulator.html" class="btn btn-primary w-100 mb-2">입출국 시뮬레이션</a><a href="commute_simulator.html" class="btn btn-outline-primary w-100 mb-2">출퇴근 시뮬레이션</a><a href="booking_process.html" class="btn btn-outline-dark w-100">예약 확인</a></div></aside></div>\`;
  }

  const immigration = document.querySelector("[data-immigration-timeline]");
  if (immigration) {
    immigration.innerHTML = [
      ["17:55", "공항 도착 권장", "체크인, 보안검색, 게이트 이동을 보수적으로 반영합니다."],
      ["18:20", "체크인 완료", "기내 수하물 기준이면 10분 단축됩니다."],
      ["18:47", "보안검색 통과", "혼잡도 보통 기준입니다."],
      ["19:12", "게이트 도착", "탑승 전 48분 여유가 남습니다."],
      ["21:59", "도착 공항 밖", "입국심사와 공항 밖 이동까지 포함합니다."]
    ].map(([time, title, text]) => \`<li><time>\${time}</time><div><h2>\${title}</h2><p>\${text}</p></div></li>\`).join("");
  }

  const commute = document.querySelector("[data-commute-timeline]");
  if (commute) {
    commute.innerHTML = [
      ["18:30", "강남역 퇴근", "공항철도 환승 기준으로 ICN까지 이동합니다."],
      ["19:05", "공항 도착", "혼잡 시간대 이동 버퍼 12분 포함."],
      ["19:12", "게이트 도착 가능", "촉박하지만 탑승 가능 판정입니다."],
      ["22:20", "일요일 귀가", "월요일 09:30 출근 전 수면 시간이 남습니다."]
    ].map(([time, title, text]) => \`<li><time>\${time}</time><div><h2>\${title}</h2><p>\${text}</p></div></li>\`).join("");
  }

  const travel = document.querySelector("[data-travel-timeline]");
  if (travel) {
    travel.innerHTML = [
      ["Fri 18:30", "퇴근", "회사에서 공항으로 바로 이동합니다."],
      ["Fri 19:12", "게이트 도착", "탑승 전 여유 48분."],
      ["Fri 21:05", "후쿠오카 도착", "입국 후 22:00 전후 도심 이동 가능."],
      ["Sat 10:00", "주요 일정", "텐진, 오호리, 하카타를 한 동선으로 묶습니다."],
      ["Sun 20:10", "귀국편 탑승", "집 도착 예상 22:20."],
      ["Mon 09:30", "출근 가능", "수면 시간이 확보되는 보수적 추천입니다."]
    ].map(([time, title, text]) => \`<li><time>\${time}</time><div><h2>\${title}</h2><p>\${text}</p></div></li>\`).join("");
  }

  document.querySelectorAll("[data-destination-list]").forEach(target => {
    const seen = [...new Map(flights.map(f => [f.city, f])).values()].slice(0, 12);
    target.innerHTML = seen.map(f => \`<article class="col-lg-4 col-md-6 mb-4"><a class="card flight-card h-100 text-decoration-none text-dark" href="destination_detail.html"><img src="\${f.image}" class="card-img-top" alt="\${f.city}"><div class="card-body"><h2 class="h5">\${f.city}</h2><p class="text-muted">\${f.country} · 최저 \${money(f.price)}</p><div class="metric-row"><span>짧은 여행 적합도</span><strong>\${f.score}점</strong></div></div></a></article>\`).join("");
  });

  const compare = document.querySelector("[data-compare-table]");
  if (compare) {
    const top = flights.slice().sort((a, b) => b.score - a.score).slice(0, 5);
    compare.innerHTML = \`<thead><tr><th>목적지</th><th>가격</th><th>연차</th><th>게이트 여유</th><th>피로도</th><th>상세</th></tr></thead><tbody>\${top.map(f => \`<tr><td>\${f.city}</td><td>\${money(f.price)}</td><td>\${f.leave}일</td><td>\${f.gateBuffer}분</td><td>\${f.fatigue}</td><td><a href="flight_detail.html?id=\${f.id}">보기</a></td></tr>\`).join("")}</tbody>\`;
  }

  const toggler = document.querySelector(".navbar-toggler");
  document.querySelectorAll("#navbarResponsive .nav-link,#navbarResponsive .dropdown-item").forEach(link => {
    link.addEventListener("click", () => {
      if (toggler && getComputedStyle(toggler).display !== "none") toggler.click();
    });
  });
});
`;

const css = `:root{--wa-ink:#172033;--wa-muted:#697386;--wa-line:#e8edf5;--wa-sun:#ffc800;--wa-bg:#f5f7fb}body{color:var(--wa-ink);letter-spacing:0}#mainNav{background-color:#172033}#mainNav .navbar-brand{color:var(--wa-sun);letter-spacing:0}#mainNav .nav-link,#mainNav .dropdown-item{letter-spacing:0;text-transform:none}.worker-hero{min-height:84vh;display:flex;align-items:center;background-image:linear-gradient(rgba(23,32,51,.52),rgba(23,32,51,.78)),url('../assets/img/header-bg.jpg');background-size:cover;background-position:center}.worker-hero .container{max-width:980px}.eyebrow{font-weight:700;color:var(--wa-sun);text-transform:uppercase;margin-bottom:1rem}.hero-copy{max-width:760px;margin:0 auto 2rem;font-size:1.22rem}.hero-actions{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap}.inner-page{padding-top:5rem}.panel,.feature,.share-card,.success-box,.stat{border:1px solid var(--wa-line);border-radius:8px;background:#fff;padding:1.5rem;box-shadow:0 12px 30px rgba(23,32,51,.06)}.feature{height:100%;text-align:center}.feature i{font-size:2.1rem;color:var(--wa-sun);margin-bottom:1rem}.feature h2,.feature h3{font-size:1.2rem}.search-band{background:var(--wa-bg)}.flight-card{border-radius:8px;overflow:hidden;border-color:var(--wa-line)}.flight-card img{aspect-ratio:16/10;object-fit:cover}.metric-row{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid var(--wa-line);padding:.82rem 0}.metric-row:first-of-type{border-top:0}.detail-image{width:100%;max-height:420px;object-fit:cover;border-radius:8px}.stat span{display:block;color:var(--wa-muted)}.stat strong{font-size:1.45rem}.check-list{padding-left:1.2rem}.check-list li{margin-bottom:.65rem}.badge-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}.badge-grid span,.choice{border:1px solid var(--wa-line);border-radius:8px;padding:.75rem;background:#f8fafc;text-align:center;font-weight:700}.wa-timeline{list-style:none;padding:0;max-width:860px;margin:0 auto}.wa-timeline li{display:grid;grid-template-columns:130px 1fr;gap:1.5rem;border-left:4px solid var(--wa-sun);padding:0 0 2rem 1.5rem}.wa-timeline time{font-weight:700;color:var(--wa-muted)}.share-card{background:#172033;color:#fff}.share-card .badge-grid span{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2)}.narrow{max-width:820px}.success-box i{font-size:3rem;color:#198754;margin-bottom:1rem}.hot-head{display:flex;justify-content:space-between;gap:1rem;align-items:end}.review-item{display:block;border:1px solid var(--wa-line);border-radius:8px;padding:1.1rem;margin-bottom:1rem;text-decoration:none;color:var(--wa-ink);background:#fff}.persona-note{border:1px solid var(--wa-line);border-radius:8px;background:#f8fafc;padding:1rem}.compare-table th{white-space:nowrap}.btn,.card,.form-control,.form-select{border-radius:8px}@media(max-width:767px){.worker-hero{min-height:78vh}.worker-hero .masthead-heading{font-size:2.35rem;line-height:1.1}.hot-head{display:block}.wa-timeline li{grid-template-columns:1fr;gap:.5rem}.badge-grid{grid-template-columns:1fr}}`;

const readme = `# Worker Airplane v02

Worker Airplane v02 is a static prototype for a lightweight flight search service. The site keeps the familiar shape of a flight search website, but its main difference is that it recommends flights by realistic travel feasibility: leave days by weekday, office commute time, airport gate buffer, immigration time, and Monday work readiness.

## Prototype Scope

- 28 HTML pages, split from the original one-page Template 6 style into feature-specific pages.
- 20 virtual flight records in \`js/data.js\`.
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

Open \`index.html\` directly, or serve the folder with a static server.
`;

fs.mkdirSync(path.join(root, "tools"), { recursive: true });
for (const [file, html] of files) {
  fs.writeFileSync(path.join(root, file), html, "utf8");
}
fs.writeFileSync(path.join(root, "js", "data.js"), dataJs, "utf8");
fs.writeFileSync(path.join(root, "js", "scripts.js"), scriptsJs, "utf8");
fs.writeFileSync(path.join(root, "css", "worker-airplane.css"), css, "utf8");
fs.writeFileSync(path.join(root, "README.md"), readme, "utf8");

console.log(`Generated ${files.size} HTML pages with ${flights.length} flights and ${personas.length} personas.`);
