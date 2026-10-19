
/* ======================================
   RUDRAVAAX COMPACT MUSIC PLAYER
   Artwork: images/logo.jpeg
   Audio: songs/ folder
====================================== */

(() => {
  "use strict";

  const songs = [
    { title: "Mohobbatein", file: "mohobbatein.wav" },
    { title: "Raat Mein", file: "raat-mein.wav" },
    { title: "God Flow", file: "god-flow.wav" },
    { title: "Crazy Boy", file: "crazy-boy.wav" },
    { title: "Naaginn", file: "naaginn.wav" },
    { title: "Dynamite", file: "dynamite.wav" },
    { title: "C-O2", file: "c-o2.wav" },
    { title: "Ishq Bawaal", file: "ishq-bawaal.wav" },
    { title: "NGrrr", file: "ngrrr.wav" },
    { title: "Saari Rattiyaan", file: "saari-rattiyaan.wav" }
  ];

  const artwork = "images/logo.jpeg";

  function initPlayer() {
    if (!document.body) return;

    if (document.getElementById("rv-music-player")) return;

    /* ========== PLAYER CSS ========== */

    const css = document.createElement("style");

    css.textContent = `
      #rv-music-player {
        --rv-green: #1ed760;
        position: fixed !important;
        right: 16px !important;
        bottom: 16px !important;
        z-index: 2147483647 !important;
        font-family: Arial, sans-serif;
        color: #fff;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: max-content;
        max-width: calc(100vw - 20px);
        pointer-events: auto;
        isolation: isolate;
      }

      #rv-music-player,
      #rv-music-player * {
        box-sizing: border-box;
      }

      #rv-toggle {
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 50%;
        background: var(--rv-green);
        color: #000;
        display: grid !important;
        place-items: center;
        font-size: 23px;
        cursor: pointer;
        box-shadow: 0 4px 18px #0005;
        transition: transform .2s;
        padding: 0;
        line-height: 1;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto;
        -webkit-tap-highlight-color: transparent;
      }

      #rv-toggle:hover {
        transform: scale(1.06);
      }

      #rv-panel {
        position: absolute;
        right: 0;
        bottom: 54px;
        width: min(285px, calc(100vw - 24px));
        max-height: min(78vh, 520px);
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 12px;
        border-radius: 13px;
        background: #181818;
        border: 1px solid #333;
        box-shadow: 0 10px 35px #0008;
        display: none;
        scrollbar-width: thin;
        scrollbar-color: #555 #181818;
      }

      #rv-panel.rv-visible {
        display: block !important;
        animation: rv-appear .18s ease-out;
      }

      @keyframes rv-appear {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      #rv-music-player .rv-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        color: var(--rv-green);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.5px;
      }

      #rv-close {
        color: #aaa;
        background: none;
        border: none;
        font-size: 21px;
        cursor: pointer;
        padding: 0 3px;
      }

      #rv-music-player .rv-now-playing {
        display: flex;
        align-items: center;
        gap: 11px;
        margin-bottom: 9px;
      }

      #rv-cover {
        width: 68px;
        height: 68px;
        min-width: 68px;
        object-fit: cover;
        border-radius: 7px;
        background: #292929;
      }

      #rv-music-player .rv-track-info {
        min-width: 0;
      }

      #rv-title {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.4;
        overflow-wrap: anywhere;
        margin-bottom: 4px;
      }

      #rv-artist {
        color: #aaa;
        font-size: 11px;
      }

      #rv-status {
        color: #999;
        font-size: 10px;
        margin-top: 6px;
      }

      #rv-music-player .rv-time {
        display: flex;
        justify-content: space-between;
        color: #aaa;
        font-size: 10px;
        margin: 9px 0 3px;
      }

      #rv-seek,
      #rv-volume {
        width: 100%;
        accent-color: var(--rv-green);
        cursor: pointer;
        height: 15px;
        margin: 0;
      }

      #rv-music-player .rv-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 23px;
        margin: 8px 0 10px;
      }

      #rv-music-player .rv-control {
        border: none;
        background: transparent;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        padding: 4px;
      }

      #rv-music-player .rv-control:hover {
        color: var(--rv-green);
      }

      #rv-play {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: var(--rv-green);
        color: #000;
        font-size: 17px;
      }

      #rv-music-player .rv-volume-row {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #aaa;
        font-size: 10px;
      }

      #rv-music-player .rv-volume-row span {
        white-space: nowrap;
      }

      #rv-music-player .rv-library {
        border-top: 1px solid #333;
        margin-top: 11px;
        padding-top: 10px;
      }

      #rv-music-player .rv-library-heading {
        color: #aaa;
        font-size: 9px;
        letter-spacing: 1px;
        margin-bottom: 7px;
      }

      #rv-list {
        max-height: 145px;
        overflow-y: auto;
        overscroll-behavior: contain;
      }

      #rv-music-player .rv-song {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 9px;
        text-align: left;
        border: none;
        border-radius: 6px;
        padding: 6px;
        color: #eee;
        background: transparent;
        cursor: pointer;
        font-size: 11px;
      }

      #rv-music-player .rv-song:hover {
        background: #292929;
      }

      #rv-music-player .rv-song.rv-active {
        color: var(--rv-green);
        background: #1ed76012;
      }

      #rv-music-player .rv-song img {
        width: 32px;
        height: 32px;
        min-width: 32px;
        object-fit: cover;
        border-radius: 4px;
        background: #292929;
      }

      #rv-music-player .rv-song-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        #rv-music-player {
          position: fixed !important;
          right: 12px !important;
          bottom: 12px !important;
          z-index: 2147483647 !important;
          max-width: calc(100vw - 24px);
        }

        #rv-toggle {
          width: 44px;
          height: 44px;
          display: grid !important;
        }

        #rv-panel {
          width: min(285px, calc(100vw - 24px));
          max-height: 70dvh;
          bottom: 52px;
          right: 0;
        }
      }

      @media (max-width: 380px) {
        #rv-panel {
          width: calc(100vw - 24px);
          padding: 10px;
        }

        #rv-cover {
          width: 58px;
          height: 58px;
          min-width: 58px;
        }
      }
    `;

    document.head.appendChild(css);

    /* ========== PLAYER HTML ========== */

    const root = document.createElement("div");
    root.id = "rv-music-player";

    root.innerHTML = `
      <section id="rv-panel" aria-label="Rudravaax music player">
        <div class="rv-header">
          <span>RUDRAVAAX MUSIC</span>
          <button id="rv-close" aria-label="Close player">×</button>
        </div>

        <div class="rv-now-playing">
          <img id="rv-cover" src="${artwork}" alt="Rudravaax artwork">

          <div class="rv-track-info">
            <div id="rv-title">Mohobbatein</div>
            <div id="rv-artist">Rudravaax</div>
            <div id="rv-status">Ready to play</div>
          </div>
        </div>

        <div class="rv-time">
          <span id="rv-current">0:00</span>
          <span id="rv-duration">0:00</span>
        </div>

        <input id="rv-seek" type="range"
          min="0" max="1000" value="0"
          aria-label="Song progress">

        <div class="rv-controls">
          <button class="rv-control" id="rv-prev"
            aria-label="Previous song" title="Previous">|◀</button>

          <button class="rv-control" id="rv-play"
            aria-label="Play" title="Play or pause">▶</button>

          <button class="rv-control" id="rv-next"
            aria-label="Next song" title="Next">▶|</button>
        </div>

        <div class="rv-volume-row">
          <span>Volume</span>
          <input id="rv-volume" type="range"
            min="0" max="1" step="0.01" value="0.8"
            aria-label="Volume">
        </div>

        <div class="rv-library">
          <div class="rv-library-heading">
            YOUR PLAYLIST · ${songs.length} SONGS
          </div>
          <div id="rv-list"></div>
        </div>
      </section>

      <button id="rv-toggle"
        aria-label="Open music player"
        aria-expanded="false"
        title="Rudravaax Music">♫</button>

      <audio id="rv-audio" preload="metadata"></audio>
    `;

    /*
      Append directly to document.body so website sections
      are less likely to interfere with the fixed player.
    */
    document.body.appendChild(root);

    const $ = id => root.querySelector("#" + id);

    const audio = $("rv-audio");
    const panel = $("rv-panel");
    const toggle = $("rv-toggle");
    const playButton = $("rv-play");
    const seek = $("rv-seek");

    let currentIndex = 0;
    let seeking = false;

    audio.volume = 0.8;

    function timeFormat(seconds) {
      if (!Number.isFinite(seconds)) return "0:00";

      const minutes = Math.floor(seconds / 60);
      const remaining = Math.floor(seconds % 60);

      return `${minutes}:${String(remaining).padStart(2, "0")}`;
    }

    function updatePlayButton() {
      playButton.textContent = audio.paused ? "▶" : "Ⅱ";
      playButton.setAttribute(
        "aria-label",
        audio.paused ? "Play" : "Pause"
      );
    }

    function renderSongs() {
      const list = $("rv-list");
      list.replaceChildren();

      songs.forEach((song, index) => {
        const button = document.createElement("button");

        button.className =
          "rv-song" + (index === currentIndex ? " rv-active" : "");

        const img = document.createElement("img");
        img.src = artwork;
        img.alt = "";
        img.loading = "lazy";

        const name = document.createElement("span");
        name.className = "rv-song-name";
        name.textContent =
          (index === currentIndex && !audio.paused ? "♫  " : "") +
          song.title;

        button.append(img, name);

        button.addEventListener("click", () => {
          currentIndex = index;
          loadSong(true);
        });

        list.appendChild(button);
      });
    }

    function loadSong(autoplay = false) {
      const song = songs[currentIndex];

      audio.src = "songs/" + song.file;

      $("rv-title").textContent = song.title;
      $("rv-artist").textContent = "Rudravaax";
      $("rv-cover").src = artwork;
      $("rv-current").textContent = "0:00";
      $("rv-duration").textContent = "0:00";
      $("rv-status").textContent = "Ready to play";

      seek.value = 0;

      renderSongs();
      updatePlayButton();

      if (autoplay) playSong();
    }

    async function playSong() {
      try {
        await audio.play();
        $("rv-status").textContent = "Now playing";
      } catch (error) {
        $("rv-status").textContent =
          "Playback failed. Check the WAV file path.";
      }

      updatePlayButton();
      renderSongs();
    }

    function changeSong(direction) {
      currentIndex =
        (currentIndex + direction + songs.length) % songs.length;

      loadSong(true);
    }

    /* Open and close */

    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("rv-visible");

      toggle.setAttribute("aria-expanded", String(open));
    });

    $("rv-close").addEventListener("click", () => {
      panel.classList.remove("rv-visible");
      toggle.setAttribute("aria-expanded", "false");
    });

    /* Playback controls */

    playButton.addEventListener("click", () => {
      if (audio.paused) {
        playSong();
      } else {
        audio.pause();
      }
    });

    $("rv-prev").addEventListener("click", () => {
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
      } else {
        changeSong(-1);
      }
    });

    $("rv-next").addEventListener("click", () => {
      changeSong(1);
    });

    /* Volume */

    $("rv-volume").addEventListener("input", event => {
      audio.volume = Number(event.target.value);
    });

    /* Song progress */

    seek.addEventListener("input", () => {
      seeking = true;

      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime =
          (Number(seek.value) / 1000) * audio.duration;
      }
    });

    seek.addEventListener("change", () => {
      seeking = false;
    });

    audio.addEventListener("loadedmetadata", () => {
      $("rv-duration").textContent = timeFormat(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      $("rv-current").textContent = timeFormat(audio.currentTime);

      if (!seeking && Number.isFinite(audio.duration) && audio.duration > 0) {
        seek.value = Math.round(
          (audio.currentTime / audio.duration) * 1000
        );
      }
    });

    audio.addEventListener("play", () => {
      $("rv-status").textContent = "Now playing";
      updatePlayButton();
      renderSongs();
    });

    audio.addEventListener("pause", () => {
      updatePlayButton();
      renderSongs();
    });

    audio.addEventListener("ended", () => {
      changeSong(1);
    });

    audio.addEventListener("error", () => {
      $("rv-status").textContent =
        "File not found. Check songs folder and filename.";
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && panel.classList.contains("rv-visible")) {
        panel.classList.remove("rv-visible");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    /* Initial song */
    loadSong(false);
  }

  /*
    Wait for the page body if this script is loaded
    from the head or before the body exists.
  */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlayer, { once: true });
  } else {
    initPlayer();
  }
})();
