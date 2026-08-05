const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((element) => revealObserver.observe(element));

function escHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

const DESK_BRIEFS = {
  '스킨케어': {
    kicker: 'SKINCARE', headline: '장벽이 곧 실력이다', subhead: 'Barrier care leads this week',
    brief: ['각질 관리 피로가 저자극·장벽 케어로의 회귀를 만들고 있습니다. 세라마이드, 판테놀처럼 익숙한 성분이 다시 조명받는 중입니다.', '새로운 성분보다 검증된 진정 성분에 대한 신뢰가 우선하는 흐름이 이어지고 있습니다.'],
    picks: [{ tag: '스킨 배리어', name: '세라마이드 리페어 크림', reason: '장벽 케어 카테고리 상승세를 이끄는 대표 제형' }, { tag: '저자극 앰플', name: '판테놀 진정 앰플', reason: '환절기 진정 수요와 함께 검색량 급등' }, { tag: '모공 케어', name: '약산성 모공 토너', reason: '모공 타이트닝 검색과 함께 언급 증가' }]
  },
  '메이크업': {
    kicker: 'MAKEUP', headline: '베이스가 곧 스킨케어다', subhead: 'Tone-up base redefines routine',
    brief: ['자외선 차단과 톤 정돈을 겸한 베이스가 데일리 루틴을 재편하고 있습니다.', '과한 하이라이트보다 은은한 광을 표현하는 제형이 재구매로 이어지는 경향을 보입니다.'],
    picks: [{ tag: '글로우 베이스', name: '윤광 톤업 선베이스', reason: '윤광 베이스 수요 상승, 자연스러운 광 표현' }, { tag: '쿠션', name: '저자극 톤업 쿠션', reason: '선케어 겸용 쿠션 검색 증가' }, { tag: '립', name: '저자극 틴트', reason: '가벼운 발색 선호 트렌드' }]
  },
  '성분·포뮬러': {
    kicker: 'FORMULA', headline: '레티놀의 대안이 뜬다', subhead: 'Bakuchiol leads formula shift',
    brief: ['레티놀의 효과는 원하지만 자극감 때문에 망설이던 소비자층이 대안 성분을 적극적으로 검색하고 있습니다.', '비건 포뮬러 역시 급등은 아니지만 꾸준히 순위를 유지하는 카테고리로 관찰됩니다.'],
    picks: [{ tag: '바쿠치올', name: '바쿠치올 나이트 세럼', reason: '레티놀 대안으로 부상하는 식물 유래 성분' }, { tag: '비건 포뮬러', name: '비건 인증 모이스처라이저', reason: '동물성 원료 배제 제형 관심 증가' }, { tag: '저자극', name: '무향 저자극 크림', reason: '장벽 케어와 함께 언급되는 제형' }]
  },
  '글로벌 K-뷰티': {
    kicker: 'GLOBAL', headline: '해외에서 먼저 반응하는 키워드', subhead: 'What global shoppers search first',
    brief: ['해외 소비자는 성분 효능과 사용 경험을 함께 확인하는 경향이 뚜렷합니다. 임상 근거와 루틴형 콘텐츠가 구매 전환에 중요한 역할을 합니다.', '한국 스킨케어 특유의 레이어링 루틴 자체가 하나의 콘텐츠로 소비되는 흐름도 계속되고 있습니다.'],
    picks: [{ tag: 'K-루틴', name: '수분 레이어링 세럼 세트', reason: '해외에서 루틴형 콘텐츠로 자주 언급' }, { tag: '글로벌 인기', name: '저자극 진정 토너', reason: '해외 리뷰에서 반복 언급되는 스테디셀러' }, { tag: '수출 신호', name: '톤업 선케어 베이스', reason: '해외 셀렉트샵 입점 문의 증가' }]
  }
};

const chips = document.querySelectorAll('.chip');
let deskCategory = document.querySelector('.chip.on')?.dataset.cat || Object.keys(DESK_BRIEFS)[0];

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('on'));
    chip.classList.add('on');
    deskCategory = chip.dataset.cat;
  });
});

const runButton = document.querySelector('#run');
const deskStage = document.querySelector('#deskStage');

function renderDeskBrief(data) {
  const picksHtml = data.picks.map((p) => `<div class="desk-pick"><span class="tag">${escHtml(p.tag)}</span><span class="name">${escHtml(p.name)}</span><span class="reason">${escHtml(p.reason)}</span></div>`).join('');
  const bodyHtml = data.brief.map((paragraph) => `<p>${escHtml(paragraph)}</p>`).join('');
  return `<div class="desk-art"><span class="desk-kicker">${escHtml(data.kicker)}</span><h3>${escHtml(data.headline)}</h3><div class="desk-subhead">${escHtml(data.subhead)}</div>${bodyHtml}<div class="desk-picks-title">이번 주 트렌드 픽</div><div class="desk-picks">${picksHtml}</div></div>`;
}

if (runButton && deskStage) {
  runButton.addEventListener('click', () => {
    runButton.disabled = true;
    deskStage.innerHTML = `<div class="loading"><span class="dot"></span><span class="dot"></span><span class="dot"></span>AI 에디터가 <b>${escHtml(deskCategory)}</b> 트렌드를 정리 중…</div>`;
    window.setTimeout(() => {
      const data = DESK_BRIEFS[deskCategory] || DESK_BRIEFS[Object.keys(DESK_BRIEFS)[0]];
      deskStage.innerHTML = renderDeskBrief(data);
      runButton.disabled = false;
    }, 700);
  });
}

const articles = {
  'idx-barrier': { number: '01', kicker: 'INDEX / SKIN BARRIER', title: '스킨 배리어, 이번 주 지수 1위', lead: '주간 지수 94.2, 전주 대비 +6.1 상승 — 장벽 케어가 게시판 최상단으로 다시 올라왔습니다.', stat: '94.2', statLabel: '주간 지수 · WEEK 32', paragraphs: ['검색·판매 신호를 종합한 지수가 94.2를 기록하며 2주 연속 게시판 1위를 지켰습니다. 저자극 진정 성분에 대한 검색이 함께 늘어난 것이 특징입니다.', '과도한 각질 관리와 고자극 시술에 대한 피로감이 회복 지향적인 소비로 옮겨가고 있다는 신호로 해석할 수 있습니다.'], list: ['전주 대비 +6.1 상승', '세라마이드·판테놀 언급 동반 증가', '저자극·진정 카테고리 동반 상승', '2주 연속 지수 상위권 유지'] },
  'idx-tonesun': { number: '02', kicker: 'INDEX / SUNCARE', title: '톤업 선케어, 지수 88.7로 2위', lead: '전주 대비 +4.3 상승 — 자외선 차단과 톤 보정을 동시에 원하는 수요가 순위를 끌어올렸습니다.', stat: '88.7', statLabel: '주간 지수 · WEEK 32', paragraphs: ['자외선 차단제 단독 사용보다 톤 정돈 기능을 겸한 베이스형 선케어 검색이 늘고 있습니다. 데일리 루틴을 한 단계 줄이려는 소비 흐름과 맞닿아 있습니다.', '메이크업 베이스와 선케어의 경계가 흐려지면서 겸용 제품에 대한 재구매 신호도 함께 관찰됩니다.'], list: ['전주 대비 +4.3 상승', '겸용(선케어+톤업) 검색 증가', '데일리 루틴 단순화 수요', '재구매 신호 동반'] },
  'idx-bakuchiol': { number: '03', kicker: 'INDEX / FORMULA', title: '바쿠치올, 전주 대비 +7.8 최대 상승폭', lead: '지수 81.5, 이번 주 게시판에서 가장 큰 폭으로 상승한 키워드입니다.', stat: '+7.8', statLabel: '전주 대비 변화', paragraphs: ['레티놀 대비 자극이 적다고 알려진 식물 유래 성분에 대한 검색이 빠르게 늘고 있습니다. 순한 제형을 찾는 수요가 상승폭을 키운 주요 요인입니다.', '표시·광고 범위를 벗어나지 않는 선에서 성분의 기원과 제형 특성을 안내하는 콘텐츠가 반응을 얻고 있습니다.'], list: ['이번 주 최대 상승폭', '레티놀 대안 성분으로 언급', '순한 제형 수요와 연결', '표시광고 범위 내 소개 필요'] },
  'idx-vegan': { number: '04', kicker: 'INDEX / FORMULA', title: '비건 포뮬러, 지수 79.0으로 4위 안착', lead: '전주 대비 +2.2 — 급등은 아니지만 꾸준히 순위를 유지하는 카테고리입니다.', stat: '79.0', statLabel: '주간 지수 · WEEK 32', paragraphs: ['동물성 원료를 배제한 제형에 대한 관심이 특정 이슈에 기대지 않고 완만하게 유지되고 있습니다. 성분표를 직접 확인하는 소비자가 늘어난 영향으로 보입니다.', '급등형 키워드보다 체류 기간이 길다는 점에서 브랜드 입장에서는 장기 포지셔닝에 유리한 신호입니다.'], list: ['전주 대비 +2.2 완만한 상승', '성분표 직접 확인 소비자 증가', '급등보다 체류 기간이 긴 키워드', '장기 포지셔닝에 유리'] },
  'idx-pore': { number: '05', kicker: 'INDEX / SKINCARE', title: '모공 타이트닝, 지수 74.6으로 5위', lead: '전주 대비 +1.4 — 게시판 하단에서 조용히 순위를 올리는 키워드입니다.', stat: '74.6', statLabel: '주간 지수 · WEEK 32', paragraphs: ['땀과 유분이 늘어나는 계절 변화와 함께 모공 관리 관련 검색이 소폭 증가했습니다. 단일 이벤트보다는 계절성 신호에 가깝습니다.', '토너, 에센스 위주로 언급되며 아직 특정 제형으로 쏠림 현상은 나타나지 않았습니다.'], list: ['전주 대비 +1.4 상승', '계절성 신호에 가까움', '토너·에센스 위주 언급', '특정 제형 쏠림 없음'] },
  'idx-glass': { number: '06', kicker: 'INDEX / SKINCARE', title: '글라스 스킨, 지수 68.3으로 하락', lead: '전주 대비 −3.5 — 이번 주 게시판에서 유일하게 하락한 키워드입니다.', stat: '−3.5', statLabel: '전주 대비 변화', paragraphs: ['한동안 상위권을 지켰던 글라스 스킨 키워드는 장벽·저자극 케어로 관심이 이동하며 순위가 밀렸습니다. 트렌드 자체가 사라졌다기보다 우선순위가 뒤로 밀린 것으로 보입니다.', '광택 중심 마무리보다 피부 컨디션 회복을 우선하는 흐름이 당분간 이어질 가능성이 있습니다.'], list: ['전주 대비 −3.5 하락', '장벽 케어로 관심 이동', '트렌드 소멸보다 우선순위 이동', '광택보다 컨디션 회복 우선'] },
  'story-barrier': { number: '07', kicker: 'TREND / SKIN BARRIER', title: "'피부 장벽'이 다시 왕좌에 오른 이유", lead: '과한 각질 관리의 피로가 저자극·장벽 케어로의 회귀를 만들고 있습니다.', stat: '94.2', statLabel: '주간 지수 1위', paragraphs: ['고강도 각질 관리와 시술 트렌드가 이어진 뒤, 피부가 예민해졌다고 느끼는 소비자가 늘면서 장벽 회복을 우선하는 루틴으로 관심이 옮겨가고 있습니다.', '세라마이드, 판테놀처럼 익숙한 성분이 다시 조명받는 것도 특징입니다. 새로운 성분보다 검증된 진정 성분에 대한 신뢰가 우선하는 흐름입니다.'], list: ['각질 관리 피로도 상승', '세라마이드·판테놀 재조명', '저자극 제형 선호', '루틴 단순화와 동반'] },
  'story-tonesun': { number: '08', kicker: 'TREND / SUNCARE', title: '선케어의 다음 문법, 톤업', lead: '자외선 차단과 톤 정돈을 겸하는 베이스가 데일리 루틴을 재편하고 있습니다.', stat: '88.7', statLabel: '주간 지수 2위', paragraphs: ['자외선 차단제를 별도로 바르고 그 위에 베이스 메이크업을 더하던 순서가, 두 기능을 겸한 한 단계로 줄어드는 흐름이 뚜렷해지고 있습니다.', '가벼운 발림성과 자연스러운 광, 두 가지를 동시에 만족시키는 제형이 재구매로 이어지는 경향을 보입니다.'], list: ['선케어+톤업 겸용 확산', '루틴 단계 축소', '가벼운 발림성 선호', '재구매 신호 관찰'] },
  'story-bakuchiol': { number: '09', kicker: 'TREND / FORMULA', title: '레티놀의 대안, 바쿠치올의 부상', lead: '자극 없이 결을 정돈하려는 수요가 식물 유래 성분으로 이동하고 있습니다.', stat: '+7.8', statLabel: '이번 주 최대 상승폭', paragraphs: ['레티놀의 효과는 원하지만 자극감 때문에 사용을 망설이던 소비자층이 대안 성분을 적극적으로 검색하고 있습니다. 바쿠치올은 그 대표 키워드로 떠올랐습니다.', '성분의 효능을 과장하지 않고 제형과 사용 경험 중심으로 설명하는 콘텐츠가 신뢰를 얻는 모습입니다.'], list: ['레티놀 대안 검색 증가', '자극감에 대한 우려 반영', '식물 유래 성분 선호', '과장 없는 제형 설명이 핵심'] },
  routine: { number: '10', kicker: 'ROUTINE / 3 STEPS', title: '장벽·수분·톤업을 위한 이주의 루틴', lead: '게시판 상위 키워드인 장벽 진정, 수분 채움, 톤업 마무리를 실제 사용 순서로 번역한 3단계 케어입니다.', stat: '3 STEP', statLabel: 'PREP · TREAT · SEAL', paragraphs: ['첫 단계에서는 자극을 덜고 결을 다독이는 저자극 토너로 피부 컨디션을 정돈합니다.', '두 번째 단계에서는 세라마이드·판테놀 세럼을 얇게 레이어링해 수분과 장벽을 채우고, 마지막 단계에서는 자외선 차단과 톤 정돈을 겸한 베이스로 마무리합니다.'], list: ['STEP 1 저자극 진정 토너', 'STEP 2 세라마이드·판테놀 세럼', 'STEP 3 톤업 선케어 베이스', '순서를 바꾸지 않는 것이 핵심'] },
  'pick-ceramide': { number: '11', kicker: 'PICK / SKIN BARRIER', title: '세라마이드 리페어 크림', lead: '장벽 케어 카테고리 상승세를 이끄는 대표 제형입니다.', stat: '94.2', statLabel: '연관 키워드 지수 · 스킨 배리어', paragraphs: ['게시판 1위 키워드인 스킨 배리어와 가장 밀접하게 언급되는 제형입니다. 세라마이드 함량과 사용감을 중심으로 검색되는 경향이 있습니다.', '트렌드 지수가 상승 중인 카테고리 안에서, 검증된 진정 성분 위주로 큐레이션했습니다.'], list: ['연관 키워드: 스킨 배리어', '세라마이드 중심 제형', '진정·보습 동시 검색', '광고가 아닌 트렌드 큐레이션'] },
  'pick-panthenol': { number: '12', kicker: 'PICK / SOOTHING', title: '판테놀 진정 앰플', lead: '환절기 진정 수요와 함께 검색량이 급등한 키워드입니다.', stat: '↑', statLabel: '환절기 진정 수요', paragraphs: ['계절이 바뀌는 시기에 판테놀 성분에 대한 검색이 함께 늘어나는 패턴이 반복적으로 관찰됩니다. 저자극 진정 카테고리 상승과 같은 흐름입니다.', '앰플 형태는 가벼운 사용감을 원하는 소비자에게 특히 자주 언급됩니다.'], list: ['환절기 반복 상승 패턴', '저자극 진정 카테고리 연관', '가벼운 사용감 선호', '판테놀 성분 중심 검색'] },
  'pick-bakuchiol': { number: '13', kicker: 'PICK / FORMULA', title: '바쿠치올 나이트 세럼', lead: '레티놀 대안으로 부상하는 식물 유래 성분입니다.', stat: '+7.8', statLabel: '이번 주 최대 상승폭', paragraphs: ['이번 주 게시판에서 가장 큰 폭으로 상승한 키워드와 직접 연결된 제형입니다. 자극에 대한 우려 없이 밤에 사용할 수 있는 제품을 찾는 검색이 늘고 있습니다.', '효능을 과장하지 않고 성분 기원과 사용법을 명확히 안내하는 것이 중요합니다.'], list: ['연관 키워드: 바쿠치올 +7.8', '레티놀 대안으로 언급', '나이트 케어 루틴 연결', '과장 없는 설명 필수'] },
  'pick-glowbase': { number: '14', kicker: 'PICK / SUNCARE', title: '윤광 톤업 선베이스', lead: '윤광 베이스 수요 상승 속에서 자연스러운 광 표현을 원하는 검색이 늘고 있습니다.', stat: '88.7', statLabel: '연관 키워드 지수 · 톤업 선케어', paragraphs: ['게시판 2위 키워드인 톤업 선케어와 함께 언급되는 제형입니다. 자외선 차단과 톤 보정, 광 표현을 한 번에 원하는 소비자가 많습니다.', '과한 하이라이트보다 은은한 광을 표현하는 제형이 재구매로 이어지는 경향을 보입니다.'], list: ['연관 키워드: 톤업 선케어', '차단+톤보정+광 표현 겸용', '은은한 광 표현 선호', '재구매 신호 관찰'] },
  'market-guide': { number: '15', kicker: 'GUIDE / MARKET', title: '진입 시장을 고르는 데이터 읽기', lead: '국가별 성장률만 보는 대신 점유율, 성장 속도, 유통 채널, 경쟁 강도를 함께 봐야 합니다.', stat: '4 AXIS', statLabel: '성장률 · 규모 · 채널 · 경쟁', paragraphs: ['성장률이 높아도 시장 규모가 작을 수 있고, 규모가 커도 진입 비용이 높을 수 있습니다.', '따라서 브랜드의 가격대와 제품 강점에 맞는 국가를 우선순위로 정하는 것이 핵심입니다.'], list: ['시장 규모', '성장 속도', '유통 구조', '브랜드 적합성'] },
  'product-guide': { number: '16', kicker: 'GUIDE / PRODUCT', title: '트렌드에서 제품 방향을 좁히는 법', lead: '키워드의 검색량만 보지 않고 어떤 고민과 사용 상황에서 등장하는지 확인해야 합니다.', stat: '3 LAYERS', statLabel: '성분 · 제형 · 루틴', paragraphs: ['같은 성분도 제형과 사용 단계에 따라 소비자가 느끼는 가치가 달라집니다.', '트렌드 키워드를 성분, 제형, 루틴의 세 층으로 분해하면 제품 콘셉트가 구체화됩니다.'], list: ['핵심 성분', '선호 제형', '사용 단계', '차별화 근거'] },
  'data-guide': { number: '17', kicker: 'GUIDE / DATA', title: '데이터 인테그리티와 편집 원칙', lead: '공개 통계와 검색·판매 신호를 구분하고, 수치와 해석 사이의 경계를 명확히 합니다.', stat: 'UPDATE', statLabel: '정기 갱신', paragraphs: ['시장 데이터는 발표 시점과 기준 단위가 다르기 때문에 동일한 기간과 통화 기준으로 비교해야 합니다.', '트렌드 신호는 절대적인 사실이 아니라 변화의 방향을 보여주는 보조 지표로 사용합니다.'], list: ['출처와 기준 명시', '동일 기간 비교', '수치와 해석 분리', '정기 업데이트'] },
  export: { number: '18', kicker: 'MARKET / EXPORT', title: '화장품 수출액, 역대 상반기 최대', lead: '2022년 40.5에서 2026년 70.0으로 이어지는 상승 흐름은 K-뷰티의 시장 기반이 특정 국가를 넘어 확장되고 있음을 보여줍니다.', stat: '70.0', statLabel: '2026 상반기 수출 지수', paragraphs: ['제공된 인덱스에 따르면 2026년 상반기 수출은 전년 동기 대비 27.3% 상승했습니다. 5년 누적 흐름으로 보면 40.5에서 70.0까지 약 73% 확대된 모습입니다.', '수출 증가를 단일 히트 제품의 결과로 보기보다는 스킨케어, 세럼, 홈 뷰티 디바이스 등 여러 카테고리의 동시 성장으로 해석할 필요가 있습니다.'], list: ['미국 시장의 가파른 성장', '중국 의존도 축소', '일본 시장 3위 유지', '품목별 포트폴리오 다변화'] },
  balance: { number: '19', kicker: 'MARKET / TRADE', title: '무역수지 흑자, 사상 첫 100억 달러 돌파', lead: '수출 확대와 시장 다변화가 동시에 진행되며 K-뷰티 산업의 외형뿐 아니라 수익 구조도 개선되는 신호가 포착됩니다.', stat: '$101억', statLabel: '무역수지 흑자', paragraphs: ['무역수지 흑자는 산업의 수출 경쟁력을 압축해 보여주는 지표입니다. 제공된 레퍼런스에서는 사상 처음으로 100억 달러 선을 넘어선 것으로 소개합니다.', '다만 실제 사업 판단에는 품목별 원가, 환율, 유통 수수료를 함께 살펴야 하며, 총액의 상승이 모든 브랜드의 수익성 향상을 의미하지는 않습니다.'], list: ['수출 총액 확대', '고부가가치 스킨케어 비중 증가', '시장별 유통 전략 차별화', '환율과 물류비 점검 필요'] },
  quarter: { number: '20', kicker: 'MARKET / QUARTER', title: '2분기 수출 39억 달러, 성장세 지속', lead: '상반기 총액뿐 아니라 분기 단위에서도 25.8% 상승 신호가 이어지며 성장 모멘텀이 유지되고 있습니다.', stat: '+25.8%', statLabel: '2분기 수출 증가율', paragraphs: ['분기 데이터는 연간 합계보다 시장의 속도를 빠르게 보여줍니다. 2분기 수출 증가율은 신규 시장의 주문 확대와 재구매 흐름을 함께 점검할 수 있는 지표입니다.', '다음 분기에는 국가별 성장률과 세부 품목 구성을 분리해 보는 것이 중요합니다.'], list: ['분기 성장세 유지', '미국 중심 주문 확대', '세럼·디바이스 카테고리 주목', '재고 회전율 동시 점검'] },
  japan: { number: '21', kicker: 'MARKET / JAPAN', title: '일본, 수출국 점유율 3위 유지', lead: '일본은 8.3%의 점유율을 유지하며 미국과 중국 다음의 핵심 시장으로 자리하고 있습니다.', stat: '8.3%', statLabel: '2026 상반기 점유율', paragraphs: ['일본 시장은 트렌드 수용 속도가 빠르면서도 제품 완성도와 브랜드 신뢰를 중시합니다. 단기 바이럴보다 반복 구매를 만드는 세밀한 현지화가 중요합니다.', '제형, 패키지 문구, 후기 콘텐츠의 현지 적합성이 성과를 좌우할 가능성이 큽니다.'], list: ['3위 시장 지위 유지', '민감성·저자극 수요', '오프라인 체험 중요', '현지 리뷰 신뢰도'] },
  usa: { number: '22', kicker: 'GLOBAL / UNITED STATES', title: '미국 수출 +41.5%, 성장의 중심축 이동', lead: '미국은 가장 강한 상승 신호를 보이며 K-뷰티 수출 지형의 중심으로 이동하고 있습니다.', stat: '+41.5%', statLabel: '미국 수출 증가', paragraphs: ['미국 소비자는 성분 효능과 사용 경험을 동시에 확인합니다. 임상 근거, 전후 비교, 루틴형 콘텐츠가 구매 전환에 중요한 역할을 합니다.', '스킨케어에 대한 관심이 높아지면서 세럼, 선케어, 장벽 케어와 홈 디바이스가 함께 성장할 가능성이 있습니다.'], list: ['성분 중심 커뮤니케이션', '세럼·선케어 강세', '소셜 리뷰 영향력', '리테일 채널 다변화'] },
  china: { number: '23', kicker: 'GLOBAL / CHINA', title: '중국 수출 −6.6%, 의존도는 14.4%로', lead: '중국 시장의 비중이 과거 46.5%에서 14.4%까지 낮아지며 K-뷰티의 수출 구조가 빠르게 분산되고 있습니다.', stat: '14.4%', statLabel: '2026 상반기 점유율', paragraphs: ['점유율 하락은 단순한 수요 감소뿐 아니라 현지 브랜드 성장, 유통 구조 변화, 규제 환경 등 여러 요인이 복합적으로 작용한 결과로 읽어야 합니다.', '중국 시장은 여전히 큰 규모를 갖고 있지만, 단일 시장 의존도를 낮추는 포트폴리오 전략이 중요해졌습니다.'], list: ['중국 의존도 축소', '현지 브랜드 경쟁 심화', '채널별 성과 편차', '시장 다변화 필요'] }
};

const modal = document.querySelector('#articleModal');
const modalKicker = document.querySelector('#modalKicker');
const modalNumber = document.querySelector('#modalNumber');
const modalTitle = document.querySelector('#modalTitle');
const modalLead = document.querySelector('#modalLead');
const modalBody = document.querySelector('#modalBody');
let lastFocusedElement = null;

function openArticle(articleId) {
  const article = articles[articleId];
  if (!article || !modal) return;
  lastFocusedElement = document.activeElement;
  modalKicker.textContent = article.kicker;
  modalNumber.textContent = article.number;
  modalTitle.textContent = article.title;
  modalLead.textContent = article.lead;
  modalBody.innerHTML = `
    <div>
      ${article.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
    </div>
    <aside>
      <div class="modal-stat"><strong>${article.stat}</strong><span>${article.statLabel}</span></div>
      <h3>KEY NOTES</h3>
      <ul class="modal-list">${article.list.map((item, index) => `<li><b>0${index + 1}</b><span>${item}</span></li>`).join('')}</ul>
    </aside>`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}

function closeArticle() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus();
}

document.querySelectorAll('.article-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => openArticle(trigger.dataset.article));
  trigger.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && trigger.getAttribute('role') === 'button') {
      event.preventDefault();
      openArticle(trigger.dataset.article);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeArticle));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeArticle();
});
