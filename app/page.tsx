"use client";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./lib/firebase";

import { useEffect, useState } from "react";

export default function Home() {
  const [selected, setSelected] =
    useState("GAMBLIT");

  const [particles, setParticles] =
    useState<
      {
        id: number;
        left: number;
        size: number;
        duration: number;
        delay: number;
        opacity: number;
      }[]
    >([]);

    useEffect(() => {
  const q = query(
    collection(db, "leaderboard"),
    orderBy("rank", "asc")
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPlayers(data as any[]);
  });

  return () => unsub();
}, []);

   const [players, setPlayers] = useState<any[]>([
  {
    rank: 1,
    name: "Loading...",
    wager: "0",
    prize: "0",
  },
  {
    rank: 2,
    name: "Loading...",
    wager: "0",
    prize: "0",
  },
  {
    rank: 3,
    name: "Loading...",
    wager: "0",
    prize: "0",
  },
]);


  useEffect(() => {
    const generated = [...Array(35)].map(
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 30 + Math.random() * 45,
        duration: 15 + Math.random() * 18,
        delay: Math.random() * 6,
        opacity:
          0.03 + Math.random() * 0.08,
      })
    );

    setParticles(generated);
  }, []);
  const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

useEffect(() => {
  const updateTimer = () => {
    const now = new Date();

    const nextReset = new Date(now);

    const day = now.getDay();

    const daysUntilMonday =
      day === 0 ? 1 : 8 - day;

    nextReset.setDate(
      now.getDate() + daysUntilMonday
    );

    nextReset.setHours(0, 0, 0, 0);

    const diff =
      nextReset.getTime() - now.getTime();

    setTimeLeft({
      days: Math.floor(
        diff / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (diff / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (diff / 1000) % 60
      ),
    });
  };

  updateTimer();

  const interval = setInterval(
    updateTimer,
    1000
  );

  return () => clearInterval(interval);
}, []);


  return (
    <main className="page">
      {/* BACKGROUND */}
      <div className="background">
        <div className="bgGlow"></div>
        <div className="grid"></div>

        {particles.map((p) => (
          <img
            key={p.id}
            src="/bgl.png.png"
            alt=""
            className="floatingCoin"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="tabs">
          <button
            onClick={() =>
              setSelected("GAMBLIT")
            }
            className={`tab ${
              selected === "GAMBLIT"
                ? "active"
                : ""
            }`}
          >
            <img
              src="/gb.png"
              alt="gamblit"
            />
          </button>

          <button
            onClick={() =>
              setSelected("IMPORTANT")
            }
            className={`tab important-tab ${
              selected === "IMPORTANT"
                ? "important-active"
                : ""
            }`}
          >
            IMPORTANT
          </button>
        </div>
      </nav>

      

      {/* IMPORTANT PAGE */}
      {selected === "IMPORTANT" ? (
  <>
    <section className="importantPage">

      <div className="importantHero">

        <div className="importantGlow"></div>

        <h1 className="importantMainTitle">
          IMPORTANT
        </h1>

        <p className="importantSubtitle">
          READ EVERYTHING CAREFULLY BEFORE PARTICIPATING
        </p>

      </div>

      </section>

    {/* RULES */}
    <section className="rulesSection">

      <h2 className="rulesTitle">
        RULES
      </h2>

      <div className="rulesGrid">

        <div className="ruleCard">
          <span>1</span>

          <p>
            Rewards must be claimed within 24 hours.
          </p>
        </div>

        <div className="ruleCard">
          <span>2</span>

          <p>
            Affiliate code must be used.
          </p>
        </div>

        <div className="ruleCard">
          <span>3</span>

          <p>
            You must follow Gamblit rules.
          </p>
        </div>

        <div className="ruleCard">
          <span>4</span>

          <p>
            Username must be visible when claiming.
          </p>
        </div>

        <div className="ruleCard">
          <span>5</span>

          <p>
            One reward per person / household.
          </p>
        </div>

      </div>

    </section>
  </>
) : (
        <>
          {/* HERO */}
          {/* HERO */}
<section className="hero">
  <h1 className="title">
    GAMBLIT LEADERBOARD
  </h1>

  <p className="subtitle">
    TOP WEEKLY WAGER LEADERS
  </p>

  <div className="timerWrap">

  <div className="timerCard">
    <span>{timeLeft.days}</span>
    <small>DAYS</small>
  </div>

  <div className="timerDivider">:</div>

  <div className="timerCard">
    <span>
      {String(timeLeft.hours).padStart(2, "0")}
    </span>

    <small>HOURS</small>
  </div>

  <div className="timerDivider">:</div>

  <div className="timerCard">
    <span>
      {String(timeLeft.minutes).padStart(2, "0")}
    </span>

    <small>MINUTES</small>
  </div>

  <div className="timerDivider">:</div>

  <div className="timerCard">
    <span>
      {String(timeLeft.seconds).padStart(2, "0")}
    </span>

    <small>SECONDS</small>
  </div>

</div>

  {/* SOCIALS */}
<div className="heroSocials">

  <a
    href="https://discord.gg/26YnX6mRS"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/discord.png.png"
      alt="Discord"
    />
  </a>

  <a
    href="https://www.tiktok.com/@pasi6278291"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/tiktok.png"
      alt="TikTok"
    />
  </a>

  <a
    href="https://www.twitch.tv/olvertticsgo/clips?range=30d"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/twitch.png"
      alt="Twitch"
    />
  </a>

</div>
</section>

          {/* PODIUM */}
          <section className="podium">
            {/* SECOND */}
            <div className="podium-card second">
              <div className="podiumContent">
                <div className="rank">
                  #2
                </div>

                <div className="player-name">
                  {players[1]?.name}
                </div>

                <div className="wager">
                  WAGERED :
                </div>

                <div className="amount">
                  {players[1]?.wager}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>

                <div className="prize">
                  {players[1]?.prize}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* FIRST */}
            <div className="podium-card first">
              <div className="podiumContent">
                <div className="rank">
                  #1
                </div>

                <div className="player-name">
                  {players[0]?.name}
                </div>

                <div className="wager">
                  WAGERED :
                </div>

                <div className="amount">
                  {players[0]?.wager}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>

                <div className="prize">
                  {players[0]?.prize}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* THIRD */}
            <div className="podium-card third">
              <div className="podiumContent">
                <div className="rank">
                  #3
                </div>

                <div className="player-name">
                  {players[2]?.name}
                </div>

                <div className="wager">
                  WAGERED :
                </div>

                <div className="amount">
                  {players[2]?.wager}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>

                <div className="prize">
                  {players[2]?.prize}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>

          {/* LEADERBOARD */}
          <section className="leaderboard">
            <div className="leaderTitle">
              FULL LEADERBOARD
            </div>

            {players.map((player) => (
              <div
                className="leaderRow"
                key={player.rank}
              >
                <div className="left">
                  <span className="number">
                    #{player.rank}
                  </span>

                  <span className="name">
                    {player.name}
                  </span>
                </div>

                <div className="middle">
                  <span className="wagerLabel">
                    WAGERED :
                  </span>

                  <span className="wagerAmount">
                    {player.wager}
                  </span>

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>

                <div className="right">
                  Prize : {player.prize}

                  <img
                    src="/bgl.png.png"
                    alt=""
                  />
                </div>
              </div>
            ))}
          </section>

          {/* SOCIALS */}
          
        </>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial;
          overflow-x: hidden;
          background: #020617;
        }

        .page {
          min-height: 100vh;
          color: white;
          position: relative;
          overflow: hidden;
          padding-bottom: 120px;
        }

        .background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;

          background:
            radial-gradient(
              circle at top,
              #08172f,
              #030712 45%,
              #01030a 100%
            );
        }

        .bgGlow {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(0, 194, 255, 0.18),
              transparent 45%
            );
        }

        .grid {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.03)
                1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03)
                1px,
              transparent 1px
            );

          background-size: 60px 60px;
        }

        .floatingCoin {
          position: absolute;
          bottom: -120px;
          animation: float linear infinite;
        }

        .navbar {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: center;
          padding-top: 35px;
        }

        .tabs {
          display: flex;
          gap: 25px;
        }

        .tab {
          width: 260px;
          height: 100px;

          border-radius: 28px;

          background: rgba(
            255,
            255,
            255,
            0.05
          );

          border: 1px solid
            rgba(255, 255, 255, 0.08);

          backdrop-filter: blur(20px);

          display: flex;
          align-items: center;
          justify-content: center;

          transition: 0.35s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

.tab::before {
  content: "";

  position: absolute;
  inset: 0;

  border-radius: 28px;

  background:
    radial-gradient(
      circle,
      rgba(0,207,255,0.22),
      transparent 70%
    );

  opacity: 0;

  transition: 0.35s;

  filter: blur(18px);

  z-index: 0;
}

        .tab::after {
  content: "";

  position: absolute;
  inset: 2px;

  border-radius: 26px;

  background: rgba(
    5,
    15,
    35,
    0.95
  );

  z-index: 1;
}
        .tab img,
.tab span {
  position: relative;
  z-index: 5;
}


        .tab img {
          width: 150px;
          object-fit: contain;
        }

        .tab:hover {
          transform: translateY(-5px);
        }

      .active {
  border: 2px solid rgba(0,207,255,0.8);

  box-shadow:
    0 0 25px rgba(0,207,255,0.45),
    0 0 80px rgba(0,207,255,0.22);
}
.active::before {
  opacity: 1;
}

        
        .important-active::before {
          opacity: 1;

          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 310deg,
            #ff2f2f 330deg,
            #ffffff 340deg,
            #ff2f2f 350deg,
            transparent 360deg
          );
        }

        .hero {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 70px;
        }

        .title {
          font-size: 4.6rem;
          font-weight: 900;
          margin: 0;

          background:
            linear-gradient(
              90deg,
              #00cfff,
              white,
              #00cfff
            );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          text-shadow:
            0 0 25px
              rgba(0, 194, 255, 0.45);

          animation:
            glowTitle 3s ease-in-out infinite;
        }

        .subtitle {
          margin-top: 18px;

          color: #ff4da6;

          font-size: 1.2rem;
          font-weight: 900;

          letter-spacing: 5px;

          animation:
            pinkPulse 3s ease-in-out infinite;
        }

        .podium {
          position: relative;
          z-index: 2;

          margin-top: 70px;

          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 35px;
          flex-wrap: wrap;
        }

        .podium-card {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
        }

        .podium-card::before {
          content: "";

          position: absolute;
          inset: -220%;

          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 310deg,
            #00cfff 325deg,
            #ffffff 340deg,
            #00cfff 355deg,
            transparent 360deg
          );

          animation:
            spinBorder 3s linear infinite;
        }

        .podium-card::after {
          content: "";

          position: absolute;
          inset: 3px;

          border-radius: 30px;

          background:
            linear-gradient(
              180deg,
              rgba(8, 20, 45, 0.98),
              rgba(0, 0, 0, 0.98)
            );
        }

        .podiumContent {
          position: relative;
          z-index: 2;
          padding: 40px;
          text-align: center;
        }

        .first {
          width: 380px;
          min-height: 530px;
        }

        .second,
        .third {
          width: 320px;
          min-height: 450px;
        }

        .rank {
          font-size: 4rem;
          font-weight: 900;

          color: #8eeeff;

          text-shadow:
            0 0 18px
              rgba(0, 194, 255, 0.8);
        }

        .player-name {
          margin-top: 18px;

          font-size: 2.2rem;
          font-weight: 900;

          animation:
            whitePulse 3s ease-in-out
              infinite;
        }

        .wager {
          margin-top: 40px;

          color: #ff4da6;

          font-size: 1.2rem;
          font-weight: 900;

          letter-spacing: 2px;
        }

        .amount {
          margin-top: 15px;

          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;

          font-size: 2rem;
          font-weight: 900;
        }

        .amount img {
          width: 38px;
        }

        .prize {
          margin-top: 60px;

          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;

          font-size: 4.8rem;
          font-weight: 900;

          color: #00cfff;

          text-shadow:
            0 0 18px
              rgba(0, 194, 255, 0.9);
        }

        .prize img {
          width: 58px;
        }

        .leaderboard {
          position: relative;
          z-index: 2;

          max-width: 1280px;

          margin: 90px auto 0;

          border-radius: 30px;
          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              rgba(10, 20, 40, 0.96),
              rgba(0, 0, 0, 0.95)
            );

          border: 1px solid
            rgba(255, 255, 255, 0.08);
        }

        .leaderTitle {
          padding: 30px;

          text-align: center;

          font-size: 2rem;
          font-weight: 900;

          color: #8eeeff;

          letter-spacing: 4px;
        }

        .leaderRow {
          display: grid;

          grid-template-columns:
            1fr 1fr 1fr;

          align-items: center;

          padding: 30px 40px;

          border-bottom: 1px solid
            rgba(255, 255, 255, 0.05);

          transition: 0.3s;
        }

        .leaderRow:hover {
          background: rgba(
            255,
            255,
            255,
            0.03
          );
        }

        .left,
        .middle,
        .right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .middle {
          justify-content: center;
        }

        .right {
          justify-content: flex-end;
        }

        .number {
          color: #67e8f9;
          font-weight: 900;
          font-size: 1.3rem;
        }

        .name {
          font-size: 1.3rem;
          font-weight: 900;
        }

        .wagerLabel {
          color: #ff4da6;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .wagerAmount {
          font-size: 1.2rem;
          font-weight: 900;
        }

        .middle img,
        .right img {
          width: 28px;
        }

        .right {
          color: #00cfff;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .heroSocials {
  margin-top: 38px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;

  position: relative;
  z-index: 5;
}

.heroSocials a {
  position: relative;

  width: 82px;
  height: 82px;

  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.03)
    );

  border: 1px solid rgba(255,255,255,0.1);

  backdrop-filter: blur(18px);

  transition: 0.35s;
}

.heroSocials a::before {
  content: "";

  position: absolute;
  inset: -180%;

  background:
    conic-gradient(
      from 0deg,
      transparent,
      rgba(0,207,255,0.9),
      transparent
    );

  animation:
    spinBorder 4s linear infinite;

  opacity: 0;
  transition: 0.35s;
}

.heroSocials a::after {
  content: "";

  position: absolute;
  inset: 2px;

  border-radius: 22px;

  background:
    linear-gradient(
      180deg,
      rgba(5,15,35,0.95),
      rgba(0,0,0,0.95)
    );
}

.heroSocials a:hover {
  transform:
    translateY(-8px)
    scale(1.06);

  box-shadow:
    0 0 35px rgba(0,207,255,0.45),
    0 0 80px rgba(0,207,255,0.18);
}

.heroSocials a:hover::before {
  opacity: 1;
}

.heroSocials img {
  position: relative;
  z-index: 2;

  width: 42px;
  height: 42px;

  object-fit: contain;

  filter:
    drop-shadow(0 0 10px rgba(255,255,255,0.45));
}

        .socialTitle {
          font-size: 1.7rem;
          font-weight: 900;

          color: #8eeeff;

          letter-spacing: 6px;

          animation:
            glowTitle 3s ease-in-out
              infinite;
        }

        .socials {
          margin-top: 35px;

          display: flex;
          justify-content: center;
          gap: 25px;
        }

        .socials a {
          width: 90px;
          height: 90px;

          border-radius: 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(
            255,
            255,
            255,
            0.05
          );

          border: 1px solid
            rgba(255, 255, 255, 0.08);

          transition: 0.35s;
        }

        .socials a:hover {
          transform: translateY(-8px);

          box-shadow:
            0 0 25px
              rgba(0, 194, 255, 0.4);
        }

        .socials img {
          width: 50px;
        }

        /* IMPORTANT PAGE */

        .importantPage {
          position: relative;
          z-index: 2;

          max-width: 1100px;
          margin: 80px auto 0;
        }

        .importantHeader {
          text-align: center;
        }

        .importantBadge {
          display: inline-block;

          padding: 14px 28px;

          border-radius: 999px;

          background: rgba(
            255,
            0,
            0,
            0.12
          );

          border: 1px solid
            rgba(255, 0, 0, 0.4);

          color: #ff5c5c;

          font-size: 1rem;
          font-weight: 900;

          letter-spacing: 5px;

          box-shadow:
            0 0 30px
              rgba(255, 0, 0, 0.25);

          animation:
            redGlow 2.8s ease-in-out
              infinite;
        }

        .importantHeader h1 {
          margin-top: 35px;

          font-size: 4.5rem;
          font-weight: 900;

          line-height: 1;

          background:
            linear-gradient(
              90deg,
              #ff3b3b,
              white,
              #ff3b3b
            );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          text-shadow:
            0 0 25px
              rgba(255, 0, 0, 0.4);

          animation:
            redGlow 3s ease-in-out
              infinite;
        }

        .importantHeader p {
          margin-top: 20px;

          color: #d1d5db;

          font-size: 1.2rem;

          letter-spacing: 1px;
        }

        .steps {
          margin-top: 70px;

          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .stepCard {
          display: flex;
          align-items: center;
          gap: 25px;

          padding: 30px;

          border-radius: 28px;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.06),
              rgba(255, 255, 255, 0.03)
            );

          border: 1px solid
            rgba(255, 255, 255, 0.08);

          transition: 0.35s;

          backdrop-filter: blur(20px);
        }

        .stepCard:hover {
          transform: translateY(-6px);

          box-shadow:
            0 0 35px
              rgba(255, 0, 0, 0.18);
        }

        .stepNumber {
          min-width: 80px;
          height: 80px;

          border-radius: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 2rem;
          font-weight: 900;

          background:
            linear-gradient(
              180deg,
              #ff2f2f,
              #7a0000
            );

          box-shadow:
            0 0 25px
              rgba(255, 0, 0, 0.45);
        }

        .stepText {
          font-size: 1.35rem;
          font-weight: 900;
        }

        .rulesSection {
          position: relative;
          z-index: 2;

          max-width: 1100px;
          margin: 90px auto 0;
        }

        .rulesTitle {
          text-align: center;

          font-size: 3.8rem;
          font-weight: 900;

          color: #ff5c5c;

          letter-spacing: 10px;

          animation:
            redGlow 3s ease-in-out
              infinite;
        }

        .rulesGrid {
          margin-top: 45px;

          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .ruleCard {
          display: flex;
          align-items: center;
          gap: 25px;

          padding: 30px;

          border-radius: 28px;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.06),
              rgba(255, 255, 255, 0.03)
            );

          border: 1px solid
            rgba(255, 255, 255, 0.08);

          transition: 0.35s;

          backdrop-filter: blur(20px);
        }

        .ruleCard:hover {
          transform: translateY(-6px);

          box-shadow:
            0 0 35px
              rgba(255, 0, 0, 0.18);
        }

        .ruleCard span {
          min-width: 80px;
          height: 80px;

          border-radius: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 2rem;
          font-weight: 900;

          background:
            linear-gradient(
              180deg,
              #ff2f2f,
              #7a0000
            );

          box-shadow:
            0 0 25px
              rgba(255, 0, 0, 0.45);
        }

        .ruleCard p {
          font-size: 1.3rem;
          font-weight: 900;
        }

        @keyframes spinBorder {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          from {
            transform:
              translateY(0px)
              rotate(0deg);
          }

          to {
            transform:
              translateY(-130vh)
              rotate(360deg);
          }
        }

        @keyframes glowTitle {
          0% {
            text-shadow:
              0 0 15px
                rgba(0, 194, 255, 0.3);
          }

          50% {
            text-shadow:
              0 0 35px
                rgba(0, 194, 255, 0.7);
          }

          100% {
            text-shadow:
              0 0 15px
                rgba(0, 194, 255, 0.3);
          }
        }

        @keyframes redGlow {
          0% {
            text-shadow:
              0 0 12px
                rgba(255, 0, 0, 0.25);
          }

          50% {
            text-shadow:
              0 0 28px
                rgba(255, 0, 0, 0.65);
          }

          100% {
            text-shadow:
              0 0 12px
                rgba(255, 0, 0, 0.25);
          }
        }

        @keyframes pinkPulse {
          0% {
            text-shadow:
              0 0 10px
                rgba(255, 77, 166, 0.3);
          }

          50% {
            text-shadow:
              0 0 25px
                rgba(255, 77, 166, 0.7);
          }

          100% {
            text-shadow:
              0 0 10px
                rgba(255, 77, 166, 0.3);
          }
        }

        @keyframes whitePulse {
          0% {
            text-shadow:
              0 0 10px
                rgba(255, 255, 255, 0.2);
          }

          50% {
            text-shadow:
              0 0 22px
                rgba(255, 255, 255, 0.5);
          }

          100% {
            text-shadow:
              0 0 10px
                rgba(255, 255, 255, 0.2);
          }
        }

        @media (max-width: 900px) {
          .title {
            font-size: 2.6rem;
          }

          .importantHeader h1 {
            font-size: 2.8rem;
          }

          .podium {
            align-items: center;
          }

          .first,
          .second,
          .third {
            width: 92%;
          }

          .leaderRow {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }

          .left,
          .middle,
          .right {
            justify-content: center;
          }

          .stepCard,
          .ruleCard {
            flex-direction: column;
            text-align: center;
          }

          .tabs {
            flex-direction: column;
          }
        }
          /* IMPORTANT HERO */

.importantHero {
  position: relative;

  margin-top: 60px;
  margin-bottom: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;
}

.importantGlow {
  position: absolute;

  width: 500px;
  height: 500px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(255,0,0,0.22),
      transparent 70%
    );

  filter: blur(60px);

  animation:
    pulseRedGlow 4s ease-in-out infinite;
}

.importantMainTitle {
  position: relative;

  font-size: 7rem;
  font-weight: 900;

  margin: 0;

  letter-spacing: 14px;

  text-transform: uppercase;

  color: white;

  z-index: 2;

  text-shadow:
    0 0 12px rgba(255,255,255,0.3),
    0 0 35px rgba(255,0,0,0.8),
    0 0 90px rgba(255,0,0,0.45);

  animation:
    importantTitlePulse 3s ease-in-out infinite;
}

.importantSubtitle {
  position: relative;

  margin-top: 20px;

  color: #ff8f8f;

  font-size: 1.1rem;
  font-weight: 800;

  letter-spacing: 4px;

  text-transform: uppercase;

  z-index: 2;

  text-shadow:
    0 0 14px rgba(255,0,0,0.45);

  animation:
    redTextPulse 2.5s ease-in-out infinite;
}

/* IMPORTANT TAB GLOW */

.important-tab {
  position: relative;

  overflow: hidden;

  width: 260px;
  height: 100px;

  border-radius: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      180deg,
      rgba(255,0,0,0.16),
      rgba(255,0,0,0.06)
    );

  border: 2px solid rgba(255,0,0,0.45);

  backdrop-filter: blur(20px);

  color: #ffffff !important;

  font-size: 1.7rem;

  font-weight: 1000;

  letter-spacing: 2px;

  text-transform: uppercase;

  -webkit-text-fill-color: white !important;

  text-shadow:
    0 0 5px #ffffff,
    0 0 10px #ffffff,
    0 0 25px rgba(255,0,0,1),
    0 0 55px rgba(255,0,0,0.95);

  box-shadow:
    0 0 25px rgba(255,0,0,0.28);

  transition: 0.35s;

  z-index: 2;
}

.important-tab * {
  color: white !important;

  -webkit-text-fill-color: white !important;

  text-shadow:
    0 0 5px #ffffff,
    0 0 15px rgba(255,0,0,1);
}

.important-tab::before {
  content: "";

  position: absolute;
  inset: -180%;

  background:
    conic-gradient(
      from 0deg,
      transparent,
      rgba(255,0,0,1),
      transparent
    );

  animation:
    spinBorder 4s linear infinite;

  opacity: 0;

  transition: 0.35s;

  z-index: -1;
}

.important-tab:hover {
  transform: translateY(-6px);

  box-shadow:
    0 0 35px rgba(255,0,0,0.45),
    0 0 90px rgba(255,0,0,0.18);
}

.important-active {
  border: 2px solid rgba(255,0,0,0.85);

  box-shadow:
    0 0 40px rgba(255,0,0,0.65),
    0 0 100px rgba(255,0,0,0.3);
}

.important-active::before {
  opacity: 1;
}

.important-tab::before {
  content: "";
  z-index: -1;
  position: absolute;
  inset: -180%;

  background:
    conic-gradient(
      from 0deg,
      transparent,
      rgba(255,0,0,0.9),
      transparent
    );

  animation:
    spinBorder 4s linear infinite;

  opacity: 0;

  transition: 0.35s;
}

.important-tab:hover {
  transform: translateY(-6px);

  box-shadow:
    0 0 25px rgba(255,0,0,0.3),
    0 0 60px rgba(255,0,0,0.12);
}

.important-active {
  border: 1px solid rgba(255,0,0,0.65);

  box-shadow:
    0 0 30px rgba(255,0,0,0.45),
    0 0 80px rgba(255,0,0,0.18);
}

.important-active::before {
  opacity: 1;
}

/* FIX TEXT VISIBILITY */

.guideTitle {
  color: white !important;

  text-shadow:
    0 0 12px rgba(255,255,255,0.3),
    0 0 28px rgba(0,194,255,0.35);
}

.stepCard p {
  color: #ffffff !important;

  opacity: 1 !important;
}

.ruleCard p {
  color: #ffffff !important;

  opacity: 1 !important;
}

/* ANIMATIONS */

@keyframes importantTitlePulse {
  0% {
    transform: scale(1);

    text-shadow:
      0 0 12px rgba(255,255,255,0.25),
      0 0 25px rgba(255,0,0,0.45);
  }

  50% {
    transform: scale(1.03);

    text-shadow:
      0 0 18px rgba(255,255,255,0.55),
      0 0 50px rgba(255,0,0,0.9),
      0 0 110px rgba(255,0,0,0.45);
  }

  100% {
    transform: scale(1);

    text-shadow:
      0 0 12px rgba(255,255,255,0.25),
      0 0 25px rgba(255,0,0,0.45);
  }
}

@keyframes pulseRedGlow {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.15);
  }

  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

@keyframes redTextPulse {
  0% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

@media (max-width: 900px) {

  .importantMainTitle {
    font-size: 3.8rem;

    letter-spacing: 6px;
  }

  .importantSubtitle {
    font-size: 0.8rem;

    text-align: center;
  }

  .importantGlow {
    width: 300px;
    height: 300px;
  }
}
  /* TIMER */

.timerWrap {
  margin-top: 34px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  flex-wrap: wrap;

  position: relative;
  z-index: 5;
}

.timerCard {
  min-width: 110px;

  padding: 18px 16px;

  border-radius: 24px;

  position: relative;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.03)
    );

  border: 1px solid rgba(255,255,255,0.08);

  backdrop-filter: blur(20px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 0 25px rgba(0,207,255,0.12);
}

.timerCard::before {
  content: "";

  position: absolute;
  inset: -180%;

  background:
    conic-gradient(
      from 0deg,
      transparent,
      rgba(0,207,255,0.8),
      transparent
    );

  animation:
    spinBorder 5s linear infinite;

  opacity: 0.7;
}

.timerCard::after {
  content: "";

  position: absolute;
  inset: 2px;

  border-radius: 22px;

  background:
    linear-gradient(
      180deg,
      rgba(5,15,35,0.96),
      rgba(0,0,0,0.96)
    );
}

.timerCard span,
.timerCard small {
  position: relative;
  z-index: 2;
}

.timerCard span {
  font-size: 2.2rem;
  font-weight: 900;

  color: white;

  text-shadow:
    0 0 18px rgba(0,207,255,0.75);
}

.timerCard small {
  margin-top: 6px;

  font-size: 0.72rem;
  font-weight: 900;

  letter-spacing: 3px;

  color: #67e8f9;
}

.timerDivider {
  font-size: 2rem;
  font-weight: 900;

  color: #00cfff;

  text-shadow:
    0 0 18px rgba(0,207,255,0.8);
}

@media (max-width: 900px) {

  .timerWrap {
    gap: 8px;
  }

  .timerCard {
    min-width: 82px;

    padding: 14px 10px;
  }

  .timerCard span {
    font-size: 1.5rem;
  }

  .timerDivider {
    font-size: 1.2rem;
  }
}.tab::before {
/* ========================================
   MOBILE RESPONSIVE FIXES
======================================== */

@media (max-width: 768px) {

  .page {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 80px;
  }

  /* NAVBAR */

  .navbar {
    padding-top: 20px;
  }

  .tabs {
    width: 100%;

    flex-direction: row;
    justify-content: center;

    gap: 12px;
  }

  .tab,
  .important-tab {
    width: 48%;
    height: 72px;

    border-radius: 20px;
  }

  .tab img {
    width: 90px;
  }

  .important-tab {
    font-size: 1rem;
    letter-spacing: 1px;
  }

  /* HERO */

  .hero {
    margin-top: 40px;
    padding: 0 5px;
  }

  .title {
    font-size: 2.1rem;
    line-height: 1.1;

    text-align: center;
  }

  .subtitle {
    margin-top: 14px;

    font-size: 0.78rem;

    letter-spacing: 2px;

    padding: 0 10px;

    line-height: 1.5;
  }

  /* TIMER */

  .timerWrap {
    margin-top: 24px;

    gap: 6px;
  }

  .timerCard {
    min-width: 70px;

    padding: 10px 8px;

    border-radius: 18px;
  }

  .timerCard span {
    font-size: 1.1rem;
  }

  .timerCard small {
    font-size: 0.52rem;

    letter-spacing: 1px;
  }

  .timerDivider {
    font-size: 1rem;
  }

  /* SOCIALS */

  .heroSocials {
    margin-top: 26px;

    gap: 12px;
  }

  .heroSocials a {
    width: 62px;
    height: 62px;

    border-radius: 18px;
  }

  .heroSocials img {
    width: 28px;
    height: 28px;
  }

  /* PODIUM */

  .podium {
    margin-top: 40px;

    gap: 18px;

    flex-direction: column;
    align-items: center;
  }

  .first,
  .second,
  .third {
    width: 100%;
    min-height: auto;
  }

  .podiumContent {
    padding: 24px 18px;
  }

  .rank {
    font-size: 2.5rem;
  }

  .player-name {
    margin-top: 10px;

    font-size: 1.5rem;

    word-break: break-word;
  }

  .wager {
    margin-top: 22px;

    font-size: 0.9rem;
  }

  .amount {
    margin-top: 10px;

    font-size: 1.2rem;

    gap: 8px;

    flex-wrap: wrap;
  }

  .amount img {
    width: 22px;
  }

  .prize {
    margin-top: 30px;

    font-size: 2.3rem;

    gap: 8px;

    flex-wrap: wrap;
  }

  .prize img {
    width: 28px;
  }

  /* LEADERBOARD */

  .leaderboard {
    margin-top: 45px;

    border-radius: 22px;
  }

  .leaderTitle {
    padding: 20px;

    font-size: 1.2rem;

    letter-spacing: 2px;
  }

  .leaderRow {
    display: flex;
    flex-direction: column;

    gap: 14px;

    padding: 18px 14px;

    text-align: center;
  }

  .left,
  .middle,
  .right {
    width: 100%;

    justify-content: center;

    flex-wrap: wrap;
  }

  .number {
    font-size: 1rem;
  }

  .name {
    font-size: 1rem;

    word-break: break-word;
  }

  .wagerLabel,
  .wagerAmount,
  .right {
    font-size: 0.95rem;
  }

  .middle img,
  .right img {
    width: 18px;
  }

  /* IMPORTANT PAGE */

  .importantPage {
    margin-top: 40px;
  }

  .importantMainTitle {
    font-size: 3rem;

    letter-spacing: 4px;

    text-align: center;
  }

  .importantSubtitle {
    margin-top: 12px;

    font-size: 0.7rem;

    letter-spacing: 1px;

    text-align: center;

    line-height: 1.5;

    padding: 0 20px;
  }

  .importantGlow {
    width: 240px;
    height: 240px;
  }

  .rulesSection {
    margin-top: 50px;
  }

  .rulesTitle {
    font-size: 2rem;

    letter-spacing: 3px;
  }

  .rulesGrid {
    margin-top: 25px;

    gap: 14px;
  }

  .ruleCard {
    flex-direction: column;

    text-align: center;

    padding: 20px 16px;

    gap: 14px;

    border-radius: 22px;
  }

  .ruleCard span {
    min-width: 58px;
    height: 58px;

    font-size: 1.2rem;

    border-radius: 16px;
  }

  .ruleCard p {
    font-size: 0.95rem;

    line-height: 1.5;
  }

  /* BACKGROUND COINS */

  .floatingCoin {
    opacity: 0.03 !important;
  }
}

@media (max-width: 420px) {

  .title {
    font-size: 1.7rem;
  }

  .subtitle {
    font-size: 0.65rem;
  }

  .timerCard {
    min-width: 60px;
  }

  .timerCard span {
    font-size: 0.95rem;
  }

  .heroSocials a {
    width: 54px;
    height: 54px;
  }

  .heroSocials img {
    width: 24px;
    height: 24px;
  }

  .importantMainTitle {
    font-size: 2.3rem;
  }
}
      `}</style>
      
    </main>
  );
}