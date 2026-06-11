// 가상 항공권 데이터
const flights = [
    {
        id: 1,
        destination: "도쿄/나리타",
        price: 320000,
        badge: "퇴근 후 출발 가능",
        img: "assets/img/portfolio/1.jpg",
        description: "금요일 19:00 출발로 연차 없이 떠나는 도쿄 여행"
    },
    {
        id: 2,
        destination: "후쿠오카",
        price: 290000,
        badge: "반차 승인 필요",
        img: "assets/img/portfolio/2.jpg",
        description: "금요일 14:00 출발, 짧지만 알찬 후쿠오카 먹방 여행"
    },
    {
        id: 3,
        destination: "홍콩",
        price: 210000,
        badge: "월요 피로곰",
        img: "assets/img/portfolio/3.jpg",
        description: "일요일 심야 귀국으로 월요일 출근이 조금 힘들 수 있는 초특가"
    },
    {
        id: 4,
        destination: "오사카",
        price: 350000,
        badge: "퇴근 후 출발 가능",
        img: "assets/img/portfolio/4.jpg",
        description: "간사이 공항 직항, 퇴근 후 바로 떠나는 오사카 쇼핑"
    },
    {
        id: 5,
        destination: "타이베이",
        price: 280000,
        badge: "반차 승인 필요",
        img: "assets/img/portfolio/5.jpg",
        description: "대만 야시장 투어, 금요일 오후 출발 최적화 일정"
    },
    {
        id: 6,
        destination: "다낭",
        price: 420000,
        badge: "연차 1일 필요",
        img: "assets/img/portfolio/6.jpg",
        description: "목요일 밤 출발, 월요일 새벽 도착으로 꽉 찬 다낭 휴양"
    }
];

// 시뮬레이터 타임라인 데이터
const timelines = [
    {
        time: "18:30",
        event: "회사 퇴근",
        detail: "업무 마무리 후 공항철도 이동",
        icon: "fas fa-briefcase"
    },
    {
        time: "19:40",
        event: "인천공항 도착",
        detail: "모바일 체크인으로 빠른 수속",
        icon: "fas fa-plane-arrival"
    },
    {
        time: "21:15",
        event: "비행기 이륙",
        detail: "나리타행 항공기 탑승",
        icon: "fas fa-plane-departure"
    },
    {
        time: "23:45",
        event: "도쿄 숙소 도착",
        detail: "신주쿠 근처 호텔 체크인 및 야식",
        icon: "fas fa-hotel"
    }
];

window.flightData = flights;
window.timelineData = timelines;
