window.addEventListener("DOMContentLoaded", () => {
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
  const card = flight => `<article class="col-lg-4 col-md-6 mb-4"><div class="card flight-card h-100"><img src="${flight.image}" class="card-img-top" alt="${flight.city}"><div class="card-body d-flex flex-column"><div class="d-flex justify-content-between gap-3"><h2 class="h5">${flight.city}</h2><span class="badge bg-primary">${flight.tag}</span></div><p class="text-muted">${flight.depart} 출발 / ${flight.returnDepart} 귀국</p><p>${flight.airline} · ${flight.origin} → ${flight.airport} · ${flight.fatigue} fatigue</p><div class="metric-row"><span>추천 점수</span><strong>${flight.score}점</strong></div><div class="metric-row"><span>최저가</span><strong>${money(flight.price)}</strong></div><div class="metric-row"><span>게이트 여유</span><strong>${flight.gateBuffer}분</strong></div><a href="flight_detail.html?id=${flight.id}" class="btn btn-primary w-100 mt-auto">상세 보기</a></div></div></article>`;

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
    personaSelect.innerHTML = personas.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
    const renderPersona = () => {
      const p = personas.find(item => item.id === personaSelect.value) || personas[0];
      personaNote.innerHTML = `<strong>${p.name}</strong><br><span>${p.role}</span><br><span>${p.leave} · 예산 ${money(p.budget)}</span>`;
    };
    personaSelect.addEventListener("change", renderPersona);
    renderPersona();
  }

  document.querySelectorAll("[data-persona-list]").forEach(target => {
    target.innerHTML = personas.map(p => `<div class="review-item"><strong>${p.name}</strong><p class="mb-1">${p.role}</p><small>${p.leave}</small></div>`).join("");
  });

  const detail = document.querySelector("[data-flight-detail]");
  if (detail) {
    const params = new URLSearchParams(location.search);
    const flight = flights.find(f => f.id === params.get("id")) || flights[0];
    detail.innerHTML = `<div class="row g-4"><div class="col-lg-8"><img class="detail-image" src="${flight.image}" alt="${flight.city}"><h1 class="mt-4">${flight.origin} to ${flight.city}</h1><p class="lead">${flight.depart} 출발, ${flight.returnDepart} 귀국. ${flight.tag} 항공권입니다.</p><div class="row g-3 my-4"><div class="col-md-4"><div class="stat"><span>추천 점수</span><strong>${flight.score}</strong></div></div><div class="col-md-4"><div class="stat"><span>총액</span><strong>${money(flight.price)}</strong></div></div><div class="col-md-4"><div class="stat"><span>연차</span><strong>${flight.leave}일</strong></div></div></div><div class="panel"><h2 class="h4">시뮬레이션 요약</h2><div class="metric-row"><span>회사-공항 여유</span><strong>${flight.commuteBuffer}분</strong></div><div class="metric-row"><span>게이트 여유</span><strong>${flight.gateBuffer}분</strong></div><div class="metric-row"><span>입국 후 공항 밖</span><strong>${flight.immigrationIn}분</strong></div></div></div><aside class="col-lg-4"><div class="panel sticky-lg-top"><h2 class="h4">다음 단계</h2><ul class="check-list"><li>출발 공항 내부 시간 포함</li><li>귀국 후 출근 가능성 표시</li><li>피로도: ${flight.fatigue}</li></ul><a href="immigration_simulator.html" class="btn btn-primary w-100 mb-2">입출국 시뮬레이션</a><a href="commute_simulator.html" class="btn btn-outline-primary w-100 mb-2">출퇴근 시뮬레이션</a><a href="booking_process.html" class="btn btn-outline-dark w-100">예약 확인</a></div></aside></div>`;
  }

  const immigration = document.querySelector("[data-immigration-timeline]");
  if (immigration) {
    immigration.innerHTML = [
      ["17:55", "공항 도착 권장", "체크인, 보안검색, 게이트 이동을 보수적으로 반영합니다."],
      ["18:20", "체크인 완료", "기내 수하물 기준이면 10분 단축됩니다."],
      ["18:47", "보안검색 통과", "혼잡도 보통 기준입니다."],
      ["19:12", "게이트 도착", "탑승 전 48분 여유가 남습니다."],
      ["21:59", "도착 공항 밖", "입국심사와 공항 밖 이동까지 포함합니다."]
    ].map(([time, title, text]) => `<li><time>${time}</time><div><h2>${title}</h2><p>${text}</p></div></li>`).join("");
  }

  const commute = document.querySelector("[data-commute-timeline]");
  if (commute) {
    commute.innerHTML = [
      ["18:30", "강남역 퇴근", "공항철도 환승 기준으로 ICN까지 이동합니다."],
      ["19:05", "공항 도착", "혼잡 시간대 이동 버퍼 12분 포함."],
      ["19:12", "게이트 도착 가능", "촉박하지만 탑승 가능 판정입니다."],
      ["22:20", "일요일 귀가", "월요일 09:30 출근 전 수면 시간이 남습니다."]
    ].map(([time, title, text]) => `<li><time>${time}</time><div><h2>${title}</h2><p>${text}</p></div></li>`).join("");
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
    ].map(([time, title, text]) => `<li><time>${time}</time><div><h2>${title}</h2><p>${text}</p></div></li>`).join("");
  }

  document.querySelectorAll("[data-destination-list]").forEach(target => {
    const seen = [...new Map(flights.map(f => [f.city, f])).values()].slice(0, 12);
    target.innerHTML = seen.map(f => `<article class="col-lg-4 col-md-6 mb-4"><a class="card flight-card h-100 text-decoration-none text-dark" href="destination_detail.html"><img src="${f.image}" class="card-img-top" alt="${f.city}"><div class="card-body"><h2 class="h5">${f.city}</h2><p class="text-muted">${f.country} · 최저 ${money(f.price)}</p><div class="metric-row"><span>짧은 여행 적합도</span><strong>${f.score}점</strong></div></div></a></article>`).join("");
  });

  const compare = document.querySelector("[data-compare-table]");
  if (compare) {
    const top = flights.slice().sort((a, b) => b.score - a.score).slice(0, 5);
    compare.innerHTML = `<thead><tr><th>목적지</th><th>가격</th><th>연차</th><th>게이트 여유</th><th>피로도</th><th>상세</th></tr></thead><tbody>${top.map(f => `<tr><td>${f.city}</td><td>${money(f.price)}</td><td>${f.leave}일</td><td>${f.gateBuffer}분</td><td>${f.fatigue}</td><td><a href="flight_detail.html?id=${f.id}">보기</a></td></tr>`).join("")}</tbody>`;
  }

  const toggler = document.querySelector(".navbar-toggler");
  document.querySelectorAll("#navbarResponsive .nav-link,#navbarResponsive .dropdown-item").forEach(link => {
    link.addEventListener("click", () => {
      if (toggler && getComputedStyle(toggler).display !== "none") toggler.click();
    });
  });
});
