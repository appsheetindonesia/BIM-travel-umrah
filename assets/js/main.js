/* ==========================================================================
   BIM TRAVEL — main.js
   Interaksi: header, drawer mobile, scrollspy, reveal, countdown,
   lightbox galeri, embed video click-to-load.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Konfigurasi konten dinamis -----------------------------------
     Isi NEXT_DEPARTURE dengan tanggal keberangkatan aktif yang telah
     disetujui (format ISO, contoh: "2026-12-27T09:00:00+07:00").
     Biarkan null -> kartu menampilkan status "jadwal disiapkan".          */
  var NEXT_DEPARTURE = null;

  /* ---------- Header: gelas saat scroll ----------------------------------- */
  var header = document.querySelector("[data-header]");
  var onScrollHeader = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Drawer mobile ------------------------------------------------ */
  var toggle = document.querySelector("[data-navtoggle]");
  var drawer = document.querySelector("[data-navmobile]");
  var lastFocused = null;

  function setDrawer(open) {
    drawer.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocused = document.activeElement;
      var firstLink = drawer.querySelector("a");
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else if (lastFocused) {
      lastFocused.focus({ preventScroll: true });
    }
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("is-open"));
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) setDrawer(false);
    });
    window.matchMedia("(min-width: 1081px)").addEventListener("change", function (e) {
      if (e.matches) setDrawer(false);
    });
  }

  /* ---------- Scrollspy ----------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-navlink]"));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- Countdown pemberangkatan --------------------------------------- */
  var cd = document.querySelector("[data-countdown]");
  if (cd && NEXT_DEPARTURE) {
    var target = new Date(NEXT_DEPARTURE).getTime();
    var pending = cd.querySelector(".countdown-pending");
    var live = cd.querySelector(".countdown-live");
    if (!isNaN(target) && target > Date.now()) {
      cd.classList.remove("is-pending");
      pending.hidden = true;
      live.hidden = false;
      var els = {
        d: live.querySelector('[data-cd="d"]'),
        h: live.querySelector('[data-cd="h"]'),
        m: live.querySelector('[data-cd="m"]'),
        s: live.querySelector('[data-cd="s"]')
      };
      var pad = function (n) { return String(n).padStart(2, "0"); };
      var tick = function () {
        var diff = Math.max(0, target - Date.now());
        els.d.textContent = pad(Math.floor(diff / 86400000));
        els.h.textContent = pad(Math.floor(diff / 3600000) % 24);
        els.m.textContent = pad(Math.floor(diff / 60000) % 60);
        els.s.textContent = pad(Math.floor(diff / 1000) % 60);
        if (diff === 0) window.clearInterval(timer);
      };
      tick();
      var timer = window.setInterval(tick, 1000);
    }
  }

  /* ---------- Lightbox galeri ------------------------------------------------- */
  var gallery = document.querySelector("[data-gallery]");
  var lb = document.querySelector("[data-lightbox]");
  if (gallery && lb) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll(".galeri-item"));
    var lbImg = lb.querySelector("[data-lbimg]");
    var lbCap = lb.querySelector("[data-lbcap]");
    var lbCount = lb.querySelector("[data-lbcount]");
    var current = 0;
    var lbLastFocus = null;

    function render(i) {
      current = (i + items.length) % items.length;
      var item = items[current];
      var img = item.querySelector("img");
      lbImg.src = item.getAttribute("data-full");
      lbImg.alt = img ? img.alt : "";
      lbCap.textContent = item.getAttribute("data-caption") || "";
      lbCount.textContent = current + 1 + " / " + items.length;
    }
    function openLb(i) {
      lbLastFocus = document.activeElement;
      render(i);
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add("is-open"); });
      document.body.style.overflow = "hidden";
      lb.querySelector("[data-lbclose]").focus({ preventScroll: true });
    }
    function closeLb() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      window.setTimeout(function () { lb.hidden = true; }, reduceMotion ? 0 : 240);
      if (lbLastFocus) lbLastFocus.focus({ preventScroll: true });
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function () { openLb(i); });
    });
    lb.querySelector("[data-lbclose]").addEventListener("click", closeLb);
    lb.querySelector("[data-lbprev]").addEventListener("click", function () { render(current - 1); });
    lb.querySelector("[data-lbnext]").addEventListener("click", function () { render(current + 1); });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") render(current - 1);
      if (e.key === "ArrowRight") render(current + 1);
      if (e.key === "Tab") {
        var focusables = lb.querySelectorAll("button");
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Preload tetangga saat idle
    window.addEventListener("load", function () {
      window.setTimeout(function () {
        items.forEach(function (item) {
          var im = new Image();
          im.src = item.getAttribute("data-full");
        });
      }, 2500);
    });
  }

  /* ---------- Video click-to-load (YouTube privacy-enhanced) ------------------ */
  document.querySelectorAll("[data-video]").forEach(function (slot) {
    var playBtn = slot.querySelector(".video-play");
    if (!playBtn) return;
    playBtn.addEventListener("click", function () {
      var id = slot.getAttribute("data-video-id");
      if (!id) return;
      // Hentikan video lain yang sedang diputar
      document.querySelectorAll("[data-video] iframe").forEach(function (f) {
        var w = f.contentWindow;
        if (w && w.postMessage) w.postMessage(JSON.stringify({ event: "command", func: "pauseVideo" }), "*");
      });
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
        "?autoplay=1&rel=0&enablejsapi=1";
      iframe.title = "Video dokumentasi BIM Travel";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      var embed = document.createElement("div");
      embed.className = "video-embed";
      embed.appendChild(iframe);
      slot.appendChild(embed);
      playBtn.remove();
      var thumb = slot.querySelector("img");
      if (thumb) thumb.remove();
    });
  });

  /* ---------- Tahun footer ------------------------------------------------------ */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
