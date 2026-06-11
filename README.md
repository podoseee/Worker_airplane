# Worker Airplane - 사회인 맞춤 항공권 검색 서비스

## 프로젝트 개요

**Worker Airplane**은 바쁜 직장인들을 위한 맞춤형 항공권 검색 서비스입니다. 기존의 목적지 중심 항공권 검색과 달리, 사용자의 **퇴근 시간과 가용 시간을 우선으로** 고려하여 현실적인 여행 일정을 제안합니다.

### 핵심 가치

- **시간 효율**: 퇴근 후 바로 출발 가능한 항공권 매칭
- **예산 맞춤**: 숨은 수수료까지 포함한 최종 가격 제시
- **월요일 피로도 고려**: 귀국 시간을 고려한 안전한 일정 제안
- **커뮤니티**: 다른 직장인들의 여행 경험 공유

---

## 페이지 구성 (총 20개)

### 1. 핵심 서비스 페이지 (8개)

| 페이지 | 파일명 | 설명 |
|--------|--------|------|
| 메인 | `index.html` | 예산/시간 슬라이더 입력, 추천 항공권 카드 |
| 검색 결과 | `search_results.html` | 필터링된 항공권 목록 (카드형) |
| 항공권 상세 | `flight_detail.html` | 선택한 항공권의 상세 정보 및 가격 분석 |
| 시뮬레이터 설정 | `simulator_input.html` | 퇴근 시간, 출발일, 선호 계절 입력 |
| 시뮬레이터 타임라인 | `simulator_timeline.html` | 시간대별 여행 일정 시뮬레이션 |
| 시뮬레이터 공유 | `simulator_share.html` | 생성된 일정 공유 및 저장 |
| 예약 진행 | `booking_process.html` | 승객 정보 입력 및 좌석 선택 |
| 예약 완료 | `booking_confirm.html` | 예약 성공 메시지 및 확인 번호 |

### 2. 사용자 계정 페이지 (6개)

| 페이지 | 파일명 | 설명 |
|--------|--------|------|
| 로그인 | `login.html` | 이메일/비밀번호 인증 |
| 회원가입 | `signup.html` | 신규 계정 생성 |
| 마이페이지 | `mypage_main.html` | 관심목록, 구매내역, 포인트 대시보드 |
| 관심 목록 | `mypage_wishlist.html` | 찜한 항공권 및 일정 관리 |
| 구매 내역 | `mypage_history.html` | 과거 예약 및 이용 완료 내역 |
| 회원 정보 수정 | `mypage_profile.html` | 개인정보 및 알림 설정 변경 |

### 3. 커뮤니티 및 지원 페이지 (6개)

| 페이지 | 파일명 | 설명 |
|--------|--------|------|
| 초특가 추천 | `hot_deals.html` | 현재 가장 저렴한 항공권 목록 |
| 여행 후기 목록 | `community_list.html` | 다른 사용자들의 여행 후기 리스트 |
| 여행 후기 상세 | `community_detail.html` | 특정 후기 상세 내용 및 댓글 |
| 자주 묻는 질문 | `support_faq.html` | 서비스 이용 방법 및 정책 안내 |
| 1:1 문의 | `support_contact.html` | 고객 건의 및 문의 작성 폼 |
| 서비스 소개 | `about_service.html` | 회사 비전 및 팀 소개 |

---

## 기술 스택

- **Frontend**: HTML5, CSS3, Bootstrap 5.2.3
- **JavaScript**: Vanilla JS (jQuery 미사용)
- **Font Awesome**: 아이콘 라이브러리 v6.3.0
- **Google Fonts**: Montserrat, Roboto Slab

---

## 파일 구조

```
worker_airplane/
├── index.html                    # 메인 페이지
├── search_results.html           # 검색 결과
├── flight_detail.html            # 항공권 상세
├── simulator_input.html          # 시뮬레이터 설정
├── simulator_timeline.html       # 시뮬레이터 타임라인
├── simulator_share.html          # 시뮬레이터 공유
├── booking_process.html          # 예약 진행
├── booking_confirm.html          # 예약 완료
├── login.html                    # 로그인
├── signup.html                   # 회원가입
├── mypage_main.html              # 마이페이지
├── mypage_wishlist.html          # 관심 목록
├── mypage_history.html           # 구매 내역
├── mypage_profile.html           # 회원 정보 수정
├── hot_deals.html                # 초특가 추천
├── community_list.html           # 여행 후기 목록
├── community_detail.html         # 여행 후기 상세
├── support_faq.html              # FAQ
├── support_contact.html          # 1:1 문의
├── about_service.html            # 서비스 소개
├── css/
│   └── styles.css                # 메인 스타일시트
├── js/
│   ├── scripts.js                # 공통 스크립트
│   └── data.js                   # 가상 데이터 (JSON)
└── assets/
    ├── favicon.ico
    └── img/
        ├── navbar-logo.svg
        ├── portfolio/             # 항공권 이미지
        ├── about/                 # 타임라인 이미지
        └── team/                  # 팀 멤버 이미지
```

---

## 주요 기능

### 1. 동적 슬라이더 입력
메인 페이지의 예산/시간 슬라이더는 실시간으로 값을 업데이트합니다.

```javascript
// js/scripts.js에 구현됨
budgetRange.addEventListener('input', (e) => {
    budgetValue.textContent = Number(e.target.value).toLocaleString();
});
```

### 2. 가상 데이터 관리
`js/data.js`에서 항공권 및 타임라인 데이터를 JSON 형식으로 관리합니다.

```javascript
const flights = [
    { id: 1, destination: "도쿄/나리타", price: 320000, ... },
    ...
];
```

### 3. 페이지 간 네비게이션
모든 페이지의 상단 네비게이션 바를 통해 주요 페이지로 이동 가능합니다.

```html
<li class="nav-item"><a class="nav-link" href="hot_deals.html">초특가 추천</a></li>
<li class="nav-item"><a class="nav-link" href="community_list.html">커뮤니티</a></li>
<li class="nav-item"><a class="nav-link" href="mypage_main.html">마이페이지</a></li>
<li class="nav-item"><a class="nav-link" href="login.html">로그인</a></li>
```

### 4. 반응형 디자인
Bootstrap 5를 활용한 완전한 반응형 레이아웃으로 모바일, 태블릿, 데스크톱에서 최적화됩니다.

---

## 페이지별 특징

### 메인 페이지 (index.html)
- 슬라이더를 통한 예산 및 평일 자유시간 입력
- 서비스의 3가지 핵심 가치 소개 (예산 맞춤, 시간 효율, 이성적 탈출)
- 현재 인기 있는 항공권 추천 카드 (3개)

### 검색 결과 (search_results.html)
- 좌측 필터 패널 (가격, 출발 시간, 항공사)
- 우측 항공권 카드 목록
- 동적으로 `data.js`의 항공권 데이터를 렌더링

### 시뮬레이터 (simulator_input.html → simulator_timeline.html)
- 사용자의 퇴근 시간, 출발 요일, 선호 계절 입력
- 시간대별 여행 일정을 타임라인 형식으로 시각화
- 공유 기능으로 생성된 일정을 SNS에 공유 가능

### 마이페이지 (mypage_main.html)
- 사용자 프로필 정보 표시
- 관심목록, 구매내역, 포인트 카드 대시보드
- 각 섹션으로 이동 가능한 버튼

### 커뮤니티 (community_list.html)
- 다른 사용자들의 여행 후기 카드 형식 표시
- 인기 목적지 사이드바
- 각 후기 클릭 시 상세 페이지로 이동

---

## AI 도구 사용 안내

### 사용 여부
**Yes** - 본 프로젝트는 AI 도구(ChatGPT, Claude 등)를 활용하여 개발되었습니다.

### AI를 사용한 부분
1. **페이지 구조 및 레이아웃**: 각 페이지의 기본 HTML 구조와 Bootstrap 컴포넌트 배치
2. **폼 디자인**: 로그인, 회원가입, 문의 폼 등의 입력 요소 구성
3. **동적 콘텐츠 생성**: JavaScript를 통한 항공권 카드 및 타임라인 렌더링
4. **스타일링 제안**: CSS 클래스 조합 및 반응형 디자인 가이드

### 본인이 직접 수정한 부분
1. **프로젝트 기획**: PDF 기획안 분석 및 20개 페이지 구조 설계
2. **데이터 구조**: 항공권 및 타임라인 데이터 JSON 스키마 정의
3. **페이지 콘텐츠**: 각 페이지의 구체적인 텍스트, 라벨, 설명 작성
4. **네비게이션 로직**: 모든 페이지 간 링크 연결 및 사용자 흐름 설계
5. **슬라이더 기능**: 메인 페이지의 실시간 값 업데이트 JavaScript 구현
6. **페이지 차별화**: 각 페이지가 고유한 목적과 콘텐츠를 가지도록 설계

### 최종적으로 본인이 판단하고 결정한 부분
1. **서비스 콘셉트**: 직장인 중심의 시간 효율 항공권 검색이라는 차별화된 가치 제안
2. **페이지 분류**: 핵심 서비스(8개), 사용자 계정(6개), 커뮤니티(6개)로 체계적 구분
3. **사용자 흐름**: 메인 → 검색 → 상세 → 예약 또는 메인 → 로그인 → 마이페이지 등 다양한 경로 설계
4. **데이터 관리**: 실제 API 대신 JSON 가상 데이터 사용으로 프론트엔드 중심 개발
5. **디자인 일관성**: Bootstrap 5를 기반으로 모든 페이지에 통일된 시각 언어 적용
6. **기능 우선순위**: 평가 기준(20개 페이지, 각 페이지 목적 구분, 네비게이션 연결)을 충족하도록 구현 순서 결정

---

## 로컬 실행 방법

1. 레포지토리 클론
```bash
git clone https://github.com/podoseee/Worker_airplane.git
cd Worker_airplane
```

2. 로컬 웹 서버 실행 (Python 3)
```bash
python3 -m http.server 8000
```

3. 브라우저에서 접속
```
http://localhost:8000
```

---

## 향후 개선 사항

- [ ] 실제 항공권 API 연동 (Skyscanner, Amadeus 등)
- [ ] 사용자 인증 시스템 (JWT 토큰)
- [ ] 데이터베이스 연동 (사용자 정보, 예약 내역 저장)
- [ ] 결제 시스템 통합 (결제 게이트웨이)
- [ ] 실시간 알림 기능 (가격 변동, 예약 확인)
- [ ] 모바일 앱 개발 (React Native)
- [ ] 다국어 지원 (영어, 일본어, 중국어)

---

## 팀 정보

- **Product Manager**: 김주은 (20223866)
- **Lead Developer**: 이서연 (20224057)

---

## 라이선스

MIT License

---

**마지막 업데이트**: 2024년 6월 11일
