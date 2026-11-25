/* 비 오는 날 아이랑 · 雨の日キッズ — 앱 로직 (1단계) */
(function () {
  "use strict";

  var PLACES = window.RKM_PLACES || [];
  var DATA_DATE = "2026-11-25";

  /* ─────────── 문구 ─────────── */
  var T = {
    ko: {
      appTitle: "비 오는 날 아이랑",
      appSub: "인천·부천·김포·서울 실내 나들이",
      searchPh: "장소·동네·키워드 검색",
      searchClear: "검색 지우기",
      filter: "필터",
      reset: "초기화",
      ageLabel: "연령", costLabel: "비용", tagLabel: "상황",
      agesRow: "추천 연령",
      today: "오늘 문 여는 곳만",
      count: function (n) { return n + "곳"; },
      emptyTitle: "조건에 맞는 곳이 없어요",
      emptyBody: "필터를 하나씩 풀거나 검색어를 지워보세요.",
      list: "목록",
      map: "지도",
      regions: [
        ["all", "전체"], ["seoul", "서울"], ["songdo", "송도·연수"], ["oldtown", "원도심"],
        ["north", "계양·부평·검단"], ["yeongjong", "영종"], ["bucheon", "부천"], ["gimpo", "김포"]
      ],
      seoulRegions: [
        ["seoul", "서울 전체"], ["seoul-gangnam", "강남·서초·송파·강동"],
        ["seoul-downtown", "종로·중구·성동·광진"], ["seoul-seobuk", "마포·용산·서대문·은평"],
        ["seoul-seonam", "영등포·양천·강서·구로·관악"], ["seoul-dongbuk", "노원·성북·도봉·강북·중랑·동대문"]
      ],
      ages: [["all", "전체"], ["infant", "0~2세 영아"], ["toddler", "3~5세 유아"], ["kid", "6세+·초등"]],
      costs: [["all", "전체"], ["free", "무료"], ["low", "1만원 이하"], ["high", "유료 (1만원 초과)"]],
      tags: [["rain", "주차 직통·우천편리"], ["reserve", "사전예약 필수"], ["baby", "수유실·기저귀"], ["stroller", "유모차 편함"], ["hidden", "숨은 명소"]],
      hours: "운영시간", closed: "휴관일", fee: "입장료", reserve: "예약", parking: "주차",
      baby: "영아·유모차", tip: "한 줄 팁", caution: "주의",
      closedToday: "오늘 휴관",
      naver: "네이버지도", kakao: "카카오맵", google: "구글맵",
      subNaver: "한국", subKakao: "한국", subGoogle: "일본어",
      official: "공식 홈페이지", reserveLink: "예약 페이지", copy: "주소 복사", copied: "복사했어요",
      legendFree: "무료", legendLow: "1만원 이하", legendHigh: "유료",
      updatedNote: "정보 확인 " + DATA_DATE + " · 방문 전 공식 안내를 다시 확인하세요.",
      coordNote: "지도 좌표는 도로명주소 기준 근사 위치입니다. 길찾기는 지도 앱 링크를 이용하세요.",
      close: "닫기"
    },
    ja: {
      appTitle: "雨の日キッズ",
      appSub: "仁川・富川・金浦・ソウル 屋内スポット",
      searchPh: "場所・エリア・キーワード",
      searchClear: "検索を消す",
      filter: "絞り込み",
      reset: "リセット",
      ageLabel: "年齢",
      costLabel: "料金",
      tagLabel: "状況",
      agesRow: "おすすめ年齢",
      today: "今日営業中のみ",
      count: function (n) { return n + "か所"; },
      emptyTitle: "条件に合う場所がありません",
      emptyBody: "絞り込みを一つずつ解除するか、検索語を消してみてください。",
      list: "リスト",
      map: "地図",
      regions: [
        ["all", "すべて"], ["seoul", "ソウル"], ["songdo", "松島・延寿"], ["oldtown", "旧市街（開港場）"],
        ["north", "桂陽・富平・検丹"], ["yeongjong", "永宗"], ["bucheon", "富川"], ["gimpo", "金浦"]
      ],
      seoulRegions: [
        ["seoul", "ソウル全体"], ["seoul-gangnam", "江南・瑞草・松坡・江東"],
        ["seoul-downtown", "鍾路・中区・城東・広津"], ["seoul-seobuk", "麻浦・龍山・西大門・恩平"],
        ["seoul-seonam", "永登浦・陽川・江西・九老・冠岳"], ["seoul-dongbuk", "蘆原・城北・道峰・江北・中浪・東大門"]
      ],
      ages: [["all", "すべて"], ["infant", "0〜2歳"], ["toddler", "3〜5歳"], ["kid", "6歳以上（小学生）"]],
      costs: [["all", "すべて"], ["free", "無料"], ["low", "1万ウォン以下"], ["high", "有料（1万ウォン超）"]],
      tags: [["rain", "駐車場直結・雨に便利"], ["reserve", "事前予約必須"], ["baby", "授乳室・おむつ"], ["stroller", "ベビーカー快適"], ["hidden", "穴場"]],
      hours: "営業時間", closed: "休館日", fee: "料金", reserve: "予約", parking: "駐車場",
      baby: "乳幼児・ベビーカー", tip: "ひとこと", caution: "注意",
      closedToday: "本日休館",
      naver: "Naverマップ", kakao: "Kakaoマップ", google: "Googleマップ",
      subNaver: "韓国", subKakao: "韓国", subGoogle: "日本語",
      official: "公式サイト", reserveLink: "予約ページ", copy: "住所をコピー", copied: "コピーしました",
      legendFree: "無料", legendLow: "1万ウォン以下", legendHigh: "有料",
      updatedNote: "情報確認 " + DATA_DATE + "・訪問前に公式案内をご確認ください。",
      coordNote: "地図の座標は住所によるおおよその位置です。経路は地図アプリのリンクをご利用ください。",
      close: "閉じる"
    }
  };

  var REGION_JA = {};
  T.ja.regions.forEach(function (r) { REGION_JA[r[0]] = r[1]; });

  /* ─────────── 상태 ─────────── */
  var state = {
    lang: "ko",
    region: "all",
    age: "all",
    cost: "all",
    tags: [],
    q: "",
    todayOnly: false,
    selected: null,
    view: "list"
  };

  try {
    var savedLang = localStorage.getItem("rkm.lang");
    if (savedLang === "ko" || savedLang === "ja") state.lang = savedLang;
  } catch (e) { /* 저장소를 못 쓰는 환경(일부 file://)은 기본 한국어 */ }

  var t = function () { return T[state.lang]; };
  var today = new Date().getDay(); // 0=일 … 6=토

  function isClosedToday(p) {
    return (p.closedDays || []).indexOf(today) !== -1;
  }

  /* ─────────── 유틸 ─────────── */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pick(obj) {
    return obj ? (obj[state.lang] || obj.ko || "") : "";
  }

  function regionLabel(id) {
    var lists = [t().seoulRegions, t().regions];
    for (var k = 0; k < lists.length; k++) {
      for (var i = 0; i < lists[k].length; i++) {
        if (lists[k][i][0] === id) return lists[k][i][1];
      }
    }
    return id;
  }

  function costLabel(id) {
    var map = { free: "free", low: "low", high: "high" };
    var arr = t().costs;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] === map[id]) return arr[i][1];
    }
    return id;
  }

  function tagLabel(id) {
    var arr = t().tags;
    for (var i = 0; i < arr.length; i++) if (arr[i][0] === id) return arr[i][1];
    return id;
  }

  var $ = function (id) { return document.getElementById(id); };

  /* ─────────── 필터링 ─────────── */
  function matches(p) {
    if (state.region !== "all") {
      if (state.region === "seoul") {
        if (p.region.indexOf("seoul") !== 0) return false;
      } else if (p.region !== state.region) {
        return false;
      }
    }
    if (state.age !== "all" && (p.ages || []).indexOf(state.age) === -1) return false;
    if (state.cost !== "all" && p.cost !== state.cost) return false;
    for (var i = 0; i < state.tags.length; i++) {
      if ((p.tags || []).indexOf(state.tags[i]) === -1) return false;
    }
    if (state.todayOnly && isClosedToday(p)) return false;
    if (state.q) {
      var q = state.q.toLowerCase();
      var hay = [
        p.name.ko, p.name.ja, p.addr.ko, p.addr.ja,
        (p.tags || []).map(tagLabel).join(" "),
        p.desc ? p.desc.ko + " " + p.desc.ja : "",
        regionLabel(p.region)
      ].join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function visiblePlaces() {
    return PLACES.filter(matches);
  }

  function activeFilterCount() {
    var n = state.tags.length;
    if (state.age !== "all") n++;
    if (state.cost !== "all") n++;
    if (state.todayOnly) n++;
    return n;
  }

  /* ─────────── 칩 렌더 ─────────── */
  function chipRow(container, items, current, onPick, disabledIds) {
    container.innerHTML = "";
    items.forEach(function (item) {
      var id = item[0], label = item[1];
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (current === id ? " is-active" : "");
      b.textContent = label;
      b.setAttribute("data-value", id);
      if (disabledIds && disabledIds.indexOf(id) !== -1) {
        b.disabled = true;
        b.title = state.lang === "ja" ? "フェーズ2で追加予定" : "2단계에서 추가됩니다";
      } else {
        b.addEventListener("click", function () { onPick(id); });
      }
      container.appendChild(b);
    });
  }

  function renderChips() {
    chipRow($("regionChips"), t().regions, state.region, function (id) {
      state.region = id; renderChips(); render();
    });

    // 서울을 고르면 권역(5개) 칩이 한 줄 더 열린다
    var sub = $("regionSubChips");
    var showSub = state.region.indexOf("seoul") === 0;
    sub.hidden = !showSub;
    if (showSub) {
      chipRow(sub, t().seoulRegions, state.region, function (id) {
        state.region = id; renderChips(); render();
      });
    } else {
      sub.innerHTML = "";
    }

    chipRow($("ageChips"), t().ages, state.age, function (id) {
      state.age = id; renderChips(); render();
    });

    chipRow($("costChips"), t().costs, state.cost, function (id) {
      state.cost = id; renderChips(); render();
    });

    chipRow($("tagChips"), t().tags,
      state.tags.length === 0 ? null : "__multi__",
      function (id) {
        var i = state.tags.indexOf(id);
        if (i === -1) state.tags.push(id); else state.tags.splice(i, 1);
        renderChips(); render();
      });

    // 다중 선택 태그의 활성 표시
    Array.prototype.forEach.call($("tagChips").children, function (b) {
      if (state.tags.indexOf(b.getAttribute("data-value")) !== -1) b.classList.add("is-active");
    });

    var badge = $("filterBadge");
    var n = activeFilterCount();
    badge.hidden = n === 0;
    badge.textContent = n;
  }

  /* ─────────── 카드 ─────────── */
  function renderCards(list) {
    var box = $("results");
    box.innerHTML = "";

    if (!list.length) {
      var e = document.createElement("div");
      e.className = "empty";
      e.innerHTML = "<strong>" + esc(t().emptyTitle) + "</strong>" + esc(t().emptyBody);
      box.appendChild(e);
      return;
    }

    var frag = document.createDocumentFragment();
    list.forEach(function (p, i) {
      var closed = isClosedToday(p);
      var card = document.createElement("article");
      card.className = "card" + (closed ? " is-closed-today" : "") +
        (state.selected === p.id ? " is-active" : "");
      card.setAttribute("data-id", p.id);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", pick(p.name));

      var tags = [];
      if (closed) tags.push('<span class="tag tag--closed">' + esc(t().closedToday) + "</span>");
      tags.push('<span class="tag tag--' + p.cost + '">' + esc(costLabel(p.cost)) + "</span>");
      (p.tags || []).slice(0, 3).forEach(function (tg) {
        tags.push('<span class="tag">' + esc(tagLabel(tg)) + "</span>");
      });

      card.innerHTML =
        '<span class="card__num" data-cost="' + esc(p.cost) + '">' + (i + 1) + "</span>" +
        '<div class="card__main">' +
          '<h3 class="card__title">' + esc(pick(p.name)) + "</h3>" +
          '<p class="card__meta">' + esc(regionLabel(p.region)) + "</p>" +
          '<p class="card__hours">' + esc(pick(p.hours)) + "</p>" +
          '<div class="card__tags">' + tags.join("") + "</div>" +
        "</div>";

      card.addEventListener("click", function () { openModal(p.id, true); });
      card.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openModal(p.id, true); }
      });
      frag.appendChild(card);
    });
    box.appendChild(frag);
  }

  /* ─────────── 지도: 카카오맵 SDK 기본 + OSM Leaflet 자동 폴백 ─────────── */
  /* 카카오 JavaScript 키(appkey)는 index.html의 SDK 태그에서만 쓴다(5319f5b0184334165a52b3413de7b6d8) */
  var HOME = { lat: 37.545, lng: 126.86 };               // 인천·서울을 함께 담는 기본 중심
  var HOME_ZOOM = 10;                                    // Leaflet 기준 (카카오 레벨 9와 같은 정도)
  var COST_COLOR = { free: "#60754f", low: "#9a6f45", high: "#9d4a36" };
  var KAKAO_CLUSTER_MINLEVEL = 7;                        // 이 레벨 이상: 클러스터 / 미만: 개별 핀

  var mapKind = null;                                    // 'kakao' | 'leaflet'
  var mapReady = false;
  var lastList = [];
  var needsFit = false, fitted = false;

  /* 카카오맵 상태 */
  var kMap = null, kClusterer = null, kMarkers = {}, kPinNo = {}, kPinCache = {};

  /* Leaflet 폴백 상태 */
  var lMap = null, lLayer = null, lMarkers = {}, lShown = 0, tileSwitched = false;

  var OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  function mapEl() { return $("map"); }
  function mapHasSize() {
    var el = mapEl();
    return !!el && el.clientWidth > 2 && el.clientHeight > 2;
  }
  function byId(id) {
    for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === id) return PLACES[i];
    return null;
  }

  /* ============ 1) 카카오맵 ============ */

  /* 비용 색 + 목록 번호가 보이는 핀 (선택·오늘 휴관 상태까지 그림에 담는다) */
  function kPinUri(p, no, active, closed) {
    var key = p.cost + "|" + no + "|" + (active ? 1 : 0) + "|" + (closed ? 1 : 0);
    if (kPinCache[key]) return kPinCache[key];
    var color = COST_COLOR[p.cost] || "#8a6247";
    var r = active ? 12 : 10;
    var fs = active ? 12 : 11;
    var fill = active ? color : "#ffffff";
    var txt = active ? "#ffffff" : color;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">' +
        (active ? '<circle cx="17" cy="17" r="15.2" fill="' + color + '" opacity="0.18"/>' : "") +
        '<circle cx="17" cy="18.2" r="' + r + '" fill="rgba(58,40,28,0.16)"/>' +
        '<circle cx="17" cy="17" r="' + r + '" fill="' + fill + '" stroke="' + color + '" stroke-width="2"' +
          (closed ? ' stroke-dasharray="3.2 2.6" opacity="0.72"' : "") + '/>' +
        '<text x="17" y="' + (17 + fs * 0.36).toFixed(1) + '" text-anchor="middle" ' +
          'font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" ' +
          'font-size="' + fs + '" font-weight="800" fill="' + txt + '">' + no + "</text>" +
      "</svg>";
    kPinCache[key] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    return kPinCache[key];
  }

  function kPinImage(p, no, active, closed) {
    return new kakao.maps.MarkerImage(kPinUri(p, no, active, closed),
      new kakao.maps.Size(34, 34), { offset: new kakao.maps.Point(17, 17) });
  }

  /* 웜 그레이지 · 코코아 브라운 클러스터 버블 (핀과 헷갈리지 않게 더 진한 코코아 + 크림 테두리) */
  function kClusterStyle(size, fs) {
    return {
      width: size + "px", height: size + "px",
      background: "#5c3f2e", color: "#fff",
      textAlign: "center", lineHeight: (size - 4) + "px",
      borderRadius: "50%",
      border: "2px solid #fff",
      fontSize: fs + "px", fontWeight: "800",
      boxShadow: "0 0 0 2px rgba(250,246,240,.85), 0 0 0 3px rgba(138,98,71,.34), 0 4px 12px rgba(58,40,28,.38)"
    };
  }

  function kSyncSelection() {
    Object.keys(kMarkers).forEach(function (id) {
      var p = byId(id), m = kMarkers[id];
      if (!p || !m) return;
      m.setImage(kPinImage(p, kPinNo[id], state.selected === id, isClosedToday(p)));
      if (m.setZIndex) m.setZIndex(state.selected === id ? 10 : 1);
    });
  }

  function kFit(list) {
    if (!kMap || !list.length) return;
    if (!mapHasSize()) { needsFit = true; return; }
    if (list.length === 1) {
      kMap.setLevel(5, { animate: false });
      kMap.panTo(new kakao.maps.LatLng(list[0].lat, list[0].lng));
    } else {
      var b = new kakao.maps.LatLngBounds();
      list.forEach(function (p) { b.extend(new kakao.maps.LatLng(p.lat, p.lng)); });
      kMap.setBounds(b, 46, 46, 46, 46);
      if (kMap.getLevel() < 5) kMap.setLevel(5, { animate: false });   /* 너무 당겨지지 않게 */
    }
    needsFit = false;
    fitted = true;
  }

  function kRender(list, fit) {
    if (!kMap) return;
    if (kClusterer) { try { kClusterer.clear(); } catch (e) { /* 무시 */ } kClusterer = null; }
    Object.keys(kMarkers).forEach(function (id) {
      try { kMarkers[id].setMap(null); } catch (e) { /* 무시 */ }
    });
    kMarkers = {}; kPinNo = {};

    var arr = [];
    list.forEach(function (p, i) {
      var m = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(p.lat, p.lng),
        image: kPinImage(p, i + 1, state.selected === p.id, isClosedToday(p)),
        title: pick(p.name),
        clickable: true,
        zIndex: state.selected === p.id ? 10 : 1
      });
      kakao.maps.event.addListener(m, "click", function () { openModal(p.id, false); });
      kMarkers[p.id] = m;
      kPinNo[p.id] = i + 1;
      arr.push(m);
    });

    if (arr.length) {
      kClusterer = new kakao.maps.MarkerClusterer({
        map: kMap,
        markers: arr,
        gridSize: 58,
        averageCenter: true,
        minLevel: KAKAO_CLUSTER_MINLEVEL,
        minClusterSize: 2,
        disableClickZoom: false,
        calculator: [10, 30, 70],
        styles: [kClusterStyle(34, 11.5), kClusterStyle(40, 12), kClusterStyle(47, 13), kClusterStyle(55, 14)]
      });
    }
    if (fit) kFit(list);
  }

  /* 지도에 실제 타일이 한 장이라도 그려졌는지 (도메인 미허용·앱키 오류 판별) */
  function kakaoTilesLoaded() {
    var box = mapEl();
    if (!box) return false;
    var imgs = box.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var s = imgs[i].getAttribute("src") || "";
      if (s.indexOf("/tile/") === -1) continue;      /* 로고·교통 아이콘은 제외하고 타일만 */
      if (imgs[i].complete && imgs[i].naturalWidth > 0) return true;
    }
    return false;
  }

  function buildKakaoMap() {
    if (mapReady) return;
    var box = mapEl();
    box.innerHTML = "";
    kMap = new kakao.maps.Map(box, {
      center: new kakao.maps.LatLng(HOME.lat, HOME.lng),
      level: 9,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false
    });
    try { kMap.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT); } catch (e) { /* 무시 */ }
    mapKind = "kakao";
    mapReady = true;
    document.body.classList.add("engine-kakao");
    document.body.classList.remove("engine-leaflet");
    exposeMapDebug();
    renderMarkers(lastList, true);
  }

  function destroyKakao() {
    if (kClusterer) { try { kClusterer.clear(); } catch (e) { /* 무시 */ } kClusterer = null; }
    Object.keys(kMarkers).forEach(function (id) {
      try { kMarkers[id].setMap(null); } catch (e) { /* 무시 */ }
    });
    kMarkers = {}; kPinNo = {}; kMap = null;
    if (mapKind === "kakao") { mapKind = null; mapReady = false; }
    document.body.classList.remove("engine-kakao");
    var box = mapEl();
    if (box) box.innerHTML = "";
  }

  function kakaoUsable() {
    return !window.__kakaoFailed && !window.__rkmKakaoOff &&
      typeof window.kakao !== "undefined" && window.kakao &&
      window.kakao.maps && typeof window.kakao.maps.load === "function";
  }

  function initKakaoMap() {
    function fallback(reason) {
      if (mapKind === "leaflet") return;
      window.__rkmKakaoOff = true;
      window.__rkmFallbackReason = String(reason || "unknown");
      destroyKakao();
      initLeafletMap();
    }
    var guard = setTimeout(function () { if (!mapReady) fallback("sdk-timeout"); }, 7000);
    try {
      kakao.maps.load(function () {
        clearTimeout(guard);
        try {
          buildKakaoMap();
        } catch (e) {
          fallback(e && e.message ? e.message : String(e));
          return;
        }
        /* 로컬 file:// 이거나 등록되지 않은 도메인이면 타일이 한 장도 오지 않는다 */
        setTimeout(function () { if (!kakaoTilesLoaded()) fallback("no-tiles"); }, 4000);
      });
    } catch (e) {
      clearTimeout(guard);
      fallback(e && e.message ? e.message : String(e));
    }
  }

  /* ============ 2) Leaflet + OpenStreetMap 폴백 ============ */

  function osmBase() {
    return L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: OSM_ATTR
    });
  }

  function lSyncSelection() {
    Object.keys(lMarkers).forEach(function (id) {
      var m = lMarkers[id];
      var el = m.getElement ? m.getElement() : null;
      if (!el) return;
      var pin = el.querySelector(".pin");
      if (!pin) return;
      if (id === state.selected) pin.classList.add("is-active");
      else pin.classList.remove("is-active");
    });
  }

  function lRender(list, fit) {
    if (!lMap) return;
    lLayer.clearLayers();
    lMarkers = {};
    var bounds = [];

    var items = list.map(function (p, i) { return { p: p, i: i }; });
    var placed = declutter(items);

    placed.forEach(function (item) {
      var p = item.p, i = item.i;
      var closed = isClosedToday(p);
      var isCluster = item.kind === "cluster";
      var icon = L.divIcon({
        className: "pin-wrap",
        html: isCluster
          ? '<div class="pin pin--cluster" data-count="' + item.members.length + '">' + item.members.length + "</div>"
          : '<div class="pin' + (state.selected === p.id ? " is-active" : "") +
            (closed ? " is-closed" : "") + '" data-cost="' + esc(p.cost) + '">' + (i + 1) + "</div>",
        iconSize: isCluster ? [34, 30] : [25, 25],
        iconAnchor: isCluster ? [17, 15] : [12, 12]
      });
      var m = L.marker(item.ll, {
        icon: icon,
        title: isCluster ? (item.members.length + " " + (state.lang === "ja" ? "か所" : "곳")) : pick(p.name),
        keyboard: true
      });
      m.on("click", function () {
        if (isCluster) {
          var b = L.latLngBounds(item.members.map(function (mm) { return [mm.p.lat, mm.p.lng]; }));
          lMap.fitBounds(b, { padding: [70, 70], maxZoom: 16 });
        } else {
          openModal(p.id, false);
        }
      });
      m.addTo(lLayer);
      if (!isCluster) lMarkers[p.id] = m;
      item.members.forEach(function (mm) { bounds.push([mm.p.lat, mm.p.lng]); });
    });
    lShown = list.length;

    if (fit && bounds.length) {
      if (!lMap.getSize().x) {
        needsFit = true;
      } else if (bounds.length === 1) {
        lMap.setView(bounds[0], 14);
        needsFit = false; fitted = true;
      } else {
        lMap.fitBounds(L.latLngBounds(bounds), { padding: [36, 36], maxZoom: 13 });
        needsFit = false; fitted = true;
      }
    }
    lSyncSelection();
  }

  function initLeafletMap() {
    if (mapReady) return;
    var box = mapEl();
    box.innerHTML = "";
    if (typeof window.L === "undefined") {
      $("mapwrap").style.display = "none";
      return;
    }
    lMap = L.map(box, {
      center: [HOME.lat, HOME.lng],
      zoom: HOME_ZOOM,
      zoomControl: true,
      scrollWheelZoom: true
    });

    var base = osmBase().addTo(lMap);
    var baseGroup = base;

    // 타일 제공자가 막히면 OSM France 타일로 자동 전환
    base.on("tileerror", function () {
      if (tileSwitched) return;
      tileSwitched = true;
      lMap.removeLayer(baseGroup);
      L.tileLayer("https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: OSM_ATTR
      }).addTo(lMap);
    });

    lLayer = L.layerGroup().addTo(lMap);
    lMap.on("zoomend", function () {
      if (lastList.length) lRender(lastList, false);
    });

    mapKind = "leaflet";
    mapReady = true;
    document.body.classList.add("engine-leaflet");
    document.body.classList.remove("engine-kakao");
    exposeMapDebug();
    renderMarkers(lastList, true);
  }

  /* ============ 3) 엔진 선택 · 공통 진입점 ============ */

  function initMap() {
    if (mapReady) return;
    if (!mapHasSize()) { needsFit = true; return; }   /* 모바일 목록 화면: 지도 탭에서 초기화 */
    if (kakaoUsable()) initKakaoMap();
    else initLeafletMap();
  }

  /* 필터·검색·언어가 바뀔 때마다 마커/클러스터를 다시 구성한다 */
  function renderMarkers(list, fit) {
    lastList = list;
    if (!mapReady) { needsFit = true; return; }
    if (mapKind === "kakao") kRender(list, fit !== false);
    else lRender(list, fit !== false);
  }

  function countClusters() {
    var box = mapEl();
    if (!box) return 0;
    if (mapKind === "kakao") {
      var n = 0, ds = box.querySelectorAll("div");
      for (var i = 0; i < ds.length; i++) {
        var d = ds[i];
        if (d.children.length || !/^\d+$/.test((d.textContent || "").trim())) continue;
        var r = d.getBoundingClientRect();
        if (r.width > 0 && r.width <= 64 && r.height >= 22) n++;
      }
      return n;
    }
    return box.querySelectorAll(".pin--cluster").length;
  }

  function exposeMapDebug() {
    window.__RKM = {
      engine: mapKind,
      map: mapKind === "kakao" ? kMap : lMap,
      state: state,
      places: PLACES,
      level: function () {
        if (mapKind === "kakao") return kMap ? kMap.getLevel() : null;
        return lMap ? 19 - lMap.getZoom() : null;
      },
      markerCount: function () {
        return mapKind === "kakao" ? Object.keys(kMarkers).length : lShown;
      },
      clusterCount: countClusters,
      pinUri: function (id) {
        var p = byId(id);
        if (!p || mapKind !== "kakao" || !kPinNo[id]) return "";
        return kPinUri(p, kPinNo[id], state.selected === id, isClosedToday(p));
      },
      relayout: function () {
        if (mapKind === "kakao" && kMap) kMap.relayout();
        else if (lMap) lMap.invalidateSize();
      }
    };
  }

  function syncMarkerSelection() {
    if (mapKind === "kakao") kSyncSelection();
    else if (mapKind === "leaflet") lSyncSelection();
  }

  function focusPlaceOnMap(p) {
    if (!mapReady) return;
    if (mapKind === "kakao" && kMap) {
      if (kMap.getLevel() >= KAKAO_CLUSTER_MINLEVEL) kMap.setLevel(5, { animate: true });
      kMap.panTo(new kakao.maps.LatLng(p.lat, p.lng));
      return;
    }
    if (mapKind === "leaflet" && lMap) {
      if (lMarkers[p.id]) lMap.panTo(lMarkers[p.id].getLatLng(), { animate: true });
      else lMap.setView([p.lat, p.lng], Math.max(lMap.getZoom(), 14));
    }
  }

  /* 가까이 붙은 핀은 개수 배지로 묶는다. 배지를 누르면 그 지역으로 확대된다. (Leaflet 폴백 전용) */
  function declutter(items) {
    var zoom = lMap.getZoom();
    var R = 32;
    var groups = [];

    items.forEach(function (item) {
      var pt = lMap.project([item.p.lat, item.p.lng], zoom);
      var g = null;
      for (var k = 0; k < groups.length; k++) {
        if (groups[k].center.distanceTo(pt) < R) { g = groups[k]; break; }
      }
      if (!g) {
        g = { center: pt, members: [], sum: L.point(0, 0) };
        groups.push(g);
      }
      g.members.push({ p: item.p, i: item.i, pt: pt });
      g.sum = g.sum.add(pt);
      g.center = g.sum.multiplyBy(1 / g.members.length);
    });

    // 그룹 중심이 서로 가까우면 합쳐 배지가 겹치지 않게 한다
    var merged = true;
    while (merged) {
      merged = false;
      outer:
      for (var a = 0; a < groups.length; a++) {
        for (var b = a + 1; b < groups.length; b++) {
          if (groups[a].center.distanceTo(groups[b].center) < R) {
            groups[a].members = groups[a].members.concat(groups[b].members);
            groups[a].sum = groups[a].sum.add(groups[b].sum);
            groups[a].center = groups[a].sum.multiplyBy(1 / groups[a].members.length);
            groups.splice(b, 1);
            merged = true;
            break outer;
          }
        }
      }
    }

    var out = [];
    groups.forEach(function (g) {
      var n = g.members.length;
      if (n === 1) {
        var m = g.members[0];
        out.push({ kind: "single", p: m.p, i: m.i, ll: [m.p.lat, m.p.lng], members: g.members });
      } else {
        out.push({ kind: "cluster", p: g.members[0].p, i: g.members[0].i,
                   ll: lMap.unproject(g.center, zoom), members: g.members });
      }
    });
    return out;
  }

  /* ─────────── 렌더 ─────────── */
  function render(fit) {
    var list = visiblePlaces();
    $("count").textContent = t().count(list.length);
    $("headerCount").textContent = t().count(list.length);
    renderCards(list);
    renderMarkers(list, fit !== false);
    syncTexts();
  }

  function syncTexts() {
    document.documentElement.lang = state.lang;
    document.title = (state.lang === "ja"
      ? "雨の日キッズ｜仁川・富川・金浦・ソウルの屋内スポット"
      : "비 오는 날 아이랑 | 인천·부천·김포·서울 실내 나들이");
    $("appTitle").textContent = t().appTitle;
    $("appSub").textContent = t().appSub;
    $("searchInput").placeholder = t().searchPh;
    $("searchInput").setAttribute("aria-label", t().searchPh);
    $("searchClear").setAttribute("aria-label", t().searchClear);
    $("filterToggleLabel").textContent = t().filter;
    $("resetBtn").textContent = t().reset;
    $("lblAge").textContent = t().ageLabel;
    $("lblCost").textContent = t().costLabel;
    $("lblTag").textContent = t().tagLabel;
    $("lblToday").textContent = t().today;
    $("tabList").textContent = t().list;
    $("tabMap").textContent = t().map;
    $("updatedNote").textContent = t().updatedNote;
    $("coordNote").textContent = t().coordNote;
    $("modalClose").setAttribute("aria-label", t().close);
    $("mapLegend").innerHTML =
      '<span><i class="dot dot--free"></i>' + esc(t().legendFree) + "</span>" +
      '<span><i class="dot dot--low"></i>' + esc(t().legendLow) + "</span>" +
      '<span><i class="dot dot--high"></i>' + esc(t().legendHigh) + "</span>";
    Array.prototype.forEach.call(document.querySelectorAll(".lang__btn"), function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === state.lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    });
  }

  /* ─────────── 상세 모달 ─────────── */
  var lastFocus = null;

  function mapLinks(p) {
    var qKo = encodeURIComponent(p.name.ko + " " + p.addr.ko);
    return {
      naver: "https://map.naver.com/p/search/" + qKo,
      kakao: "https://map.kakao.com/?q=" + qKo,
      google: "https://www.google.com/maps/search/?api=1&query=" + p.lat + "," + p.lng
    };
  }

  function row(label, value, sub) {
    if (!value) return "";
    return "<div class=\"dl__row\"><dt>" + esc(label) + "</dt><dd>" + esc(value) +
      (sub ? "<span class=\"sub\">" + esc(sub) + "</span>" : "") + "</dd></div>";
  }

  function buildModal(p) {
    var l = mapLinks(p);
    var closed = isClosedToday(p);
    var tr = t();
    var pills = [];
    if (closed) pills.push('<span class="tag tag--closed">' + esc(tr.closedToday) + "</span>");
    pills.push('<span class="tag">' + esc(costLabel(p.cost)) + "</span>");
    (p.tags || []).forEach(function (tg) {
      pills.push('<span class="tag">' + esc(tagLabel(tg)) + "</span>");
    });

    var reserveText = pick(p.reserve && p.reserve.note);
    var reserveSub = p.reserve && p.reserve.req
      ? (state.lang === "ja" ? "事前予約が必要です" : "사전 예약이 필요합니다")
      : "";

    var ageText = (p.ages || []).map(function (a) {
      for (var i = 0; i < tr.ages.length; i++) if (tr.ages[i][0] === a) return tr.ages[i][1];
      return a;
    }).filter(Boolean).join(" · ");

    var html =
      '<div class="mh">' +
        '<div class="mh__lang" role="group" aria-label="Language">' +
          '<button type="button" class="mh__langbtn' + (state.lang === "ko" ? " is-active" : "") + '" data-lang="ko">KR</button>' +
          '<button type="button" class="mh__langbtn' + (state.lang === "ja" ? " is-active" : "") + '" data-lang="ja">JP</button>' +
        "</div>" +
        '<span class="mh__region">' + esc(regionLabel(p.region)) + "</span>" +
        "<h2 id=\"modalTitle\">" + esc(pick(p.name)) + "</h2>" +
        '<p class="mh__addr">' + esc(pick(p.addr)) + "</p>" +
        '<div class="mh__pills">' + pills.join("") + "</div>" +
      "</div>" +
      '<div class="mb">' +
        '<p class="mb__desc">' + esc(pick(p.desc)) + "</p>" +
        '<div class="tipbox"><span class="tipbox__ico" aria-hidden="true">💡</span><p>' + esc(pick(p.tip)) + "</p></div>" +
        (p.caution ? '<div class="warnbox"><span class="tipbox__ico" aria-hidden="true">⚠️</span><p>' + esc(pick(p.caution)) + "</p></div>" : "") +
        '<dl class="dl">' +
          row(tr.hours, pick(p.hours)) +
          row(tr.agesRow, ageText) +
          row(tr.closed, pick(p.closed)) +
          row(tr.fee, pick(p.fee)) +
          row(tr.reserve, reserveText, reserveSub) +
          row(tr.parking, pick(p.parking)) +
          row(tr.baby, pick(p.baby)) +
        "</dl>" +
        '<div class="maplinks">' +
          '<a href="' + l.naver + '" target="_blank" rel="noopener noreferrer">' + esc(tr.naver) + "</a>" +
          '<a href="' + l.kakao + '" target="_blank" rel="noopener noreferrer">' + esc(tr.kakao) + "</a>" +
          '<a href="' + l.google + '" target="_blank" rel="noopener noreferrer">' + esc(tr.google) + "</a>" +
        "</div>" +
        '<div class="actions">' +
          (p.reserve && p.reserve.url && p.reserve.req
            ? '<a class="btn btn--primary" href="' + esc(p.reserve.url) + '" target="_blank" rel="noopener noreferrer">' + esc(tr.reserveLink) + "</a>"
            : "") +
          '<a class="btn" href="' + esc(p.official) + '" target="_blank" rel="noopener noreferrer">' + esc(tr.official) + "</a>" +
          '<button class="btn" type="button" id="copyAddr" data-copy="' + esc(p.addr.ko) + '">' + esc(tr.copy) + "</button>" +
        "</div>" +
        '<p class="mb__foot">' + esc(tr.updatedNote) + "</p>" +
      "</div>";

    return html;
  }

  function openModal(id, fromList) {
    var p = null;
    for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === id) p = PLACES[i];
    if (!p) return;

    state.selected = id;
    lastFocus = document.activeElement;

    var body = $("modalBody");
    body.innerHTML = buildModal(p);

    var modal = $("modal");
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    $("modalClose").focus();

    // 목록에서 열면 카드 강조 + 스크롤
    Array.prototype.forEach.call(document.querySelectorAll(".card"), function (c) {
      var on = c.getAttribute("data-id") === id;
      c.classList.toggle("is-active", on);
      if (on) c.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    syncMarkerSelection();
    focusPlaceOnMap(p);

    Array.prototype.forEach.call(document.querySelectorAll(".mh__langbtn"), function (b) {
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        setLang(b.getAttribute("data-lang"));
      });
    });

    var copyBtn = document.getElementById("copyAddr");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var text = copyBtn.getAttribute("data-copy");
        var done = function () {
          copyBtn.textContent = t().copied;
          setTimeout(function () { copyBtn.textContent = t().copy; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else { done(); }
      });
    }
  }

  function closeModal() {
    var modal = $("modal");
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    state.selected = null;
    Array.prototype.forEach.call(document.querySelectorAll(".card.is-active"), function (c) {
      c.classList.remove("is-active");
    });
    syncMarkerSelection();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ─────────── 보기 전환 ─────────── */
  function setView(v) {
    state.view = v;
    document.body.classList.toggle("view-map", v === "map");
    document.body.classList.toggle("view-list", v !== "map");
    $("tabList").classList.toggle("is-active", v !== "map");
    $("tabMap").classList.toggle("is-active", v === "map");
    $("tabList").setAttribute("aria-selected", v !== "map" ? "true" : "false");
    $("tabMap").setAttribute("aria-selected", v === "map" ? "true" : "false");
    if (v === "map") {
      setTimeout(function () {
        if (!mapReady) initMap();
        else if (mapKind === "kakao" && kMap) kMap.relayout();
        else if (lMap) lMap.invalidateSize();
        if (mapReady && (needsFit || !fitted)) renderMarkers(lastList, true);
      }, 120);
    }
  }

  /* ─────────── 언어 ─────────── */
  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem("rkm.lang", lang); } catch (e) { /* 무시 */ }
    renderChips();
    render(false);
    if (!$("modal").hidden && state.selected) {
      var p = null;
      for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === state.selected) p = PLACES[i];
      if (p) $("modalBody").innerHTML = buildModal(p);
    }
  }

  /* ─────────── 이벤트 ─────────── */
  function bind() {
    var search = $("searchInput");
    var timer = null;

    search.addEventListener("input", function () {
      $("searchClear").hidden = !search.value;
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.q = search.value.trim();
        render(true);
      }, 120);
    });

    $("searchClear").addEventListener("click", function () {
      search.value = "";
      $("searchClear").hidden = true;
      state.q = "";
      render(true);
      search.focus();
    });

    $("filterToggle").addEventListener("click", function () {
      var panel = $("filters");
      var open = panel.classList.toggle("is-open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });

    $("resetBtn").addEventListener("click", function () {
      state.region = "all"; state.age = "all"; state.cost = "all";
      state.tags = []; state.q = ""; state.todayOnly = false;
      $("searchInput").value = "";
      $("searchClear").hidden = true;
      $("todayOnly").checked = false;
      renderChips();
      render(true);
      setTimeout(function () { if (lastList.length) renderMarkers(lastList, true); }, 30);
    });

    $("todayOnly").addEventListener("change", function () {
      state.todayOnly = this.checked;
      render(true);
    });

    Array.prototype.forEach.call(document.querySelectorAll(".lang__btn"), function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });

    $("tabList").addEventListener("click", function () { setView("list"); });
    $("tabMap").addEventListener("click", function () { setView("map"); });

    $("modalClose").addEventListener("click", closeModal);
    $("modal").addEventListener("click", function (ev) {
      if (ev.target.getAttribute("data-close")) closeModal();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !$("modal").hidden) closeModal();
    });

    window.addEventListener("resize", function () {
      syncLayoutHeights();
      if (!mapReady) { if (mapHasSize()) initMap(); return; }
      if (mapKind === "kakao" && kMap) kMap.relayout();
      else if (lMap) lMap.invalidateSize();
      if (!fitted || needsFit) renderMarkers(lastList, true);
    });
  }

  /* 모바일 탭 바 높이를 CSS 변수에 넣어 지도가 화면 밖으로 넘치지 않게 한다 */
  function syncLayoutHeights() {
    var tabs = document.querySelector(".mobile-tabs");
    var h = 0;
    if (tabs) {
      var cs = window.getComputedStyle(tabs);
      if (cs.display !== "none") h = Math.round(tabs.getBoundingClientRect().height);
    }
    document.documentElement.style.setProperty("--tabs-h", h + "px");
  }

  /* ─────────── 시작 ─────────── */
  function start() {
    syncLayoutHeights();
    // 모바일 기본 필터 접힘
    if (window.matchMedia("(max-width: 879px)").matches) {
      $("filters").classList.remove("is-open");
      $("filterToggle").setAttribute("aria-expanded", "false");
    } else {
      $("filters").classList.add("is-open");
      $("filterToggle").setAttribute("aria-expanded", "true");
    }

    initMap();
    renderChips();
    render(true);
    bind();
    setView("list");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
