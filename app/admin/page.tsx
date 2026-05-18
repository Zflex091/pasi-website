"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  db,
  auth,
} from "../lib/firebase";

export default function AdminPage() {

 

  const [players, setPlayers] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

    const [user, setUser] =
  useState<any>(null);

const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

  const [heroTitle, setHeroTitle] =
    useState("");

  const [heroSubtitle, setHeroSubtitle] =
    useState("");

  const [
    leaderboardTitle,
    setLeaderboardTitle,
  ] = useState("");

useEffect(() => {
  loadPlayers();
  loadTexts();

  const unsub =
    onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

  return () => unsub();
}, []);


async function loadTexts() {
  const snap = await getDoc(
    doc(db, "settings", "texts")
  );

  if (snap.exists()) {
    const data = snap.data();

    setHeroTitle(
      data.heroTitle || ""
    );

    setHeroSubtitle(
      data.heroSubtitle || ""
    );

    setLeaderboardTitle(
      data.leaderboardTitle || ""
    );
  }
}

async function loadPlayers() {
    const snapshot = await getDocs(
      collection(db, "leaderboard")
    );

    const data = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    data.sort(
      (a: any, b: any) =>
        Number(a.rank) - Number(b.rank)
    );

    setPlayers(data);
  }

  function updatePlayer(
    index: number,
    field: string,
    value: string
  ) {
    const updated = [...players];

    updated[index][field] = value;

    setPlayers(updated);
  }
async function saveAll() {
  setSaving(true);

  try {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      await setDoc(
        doc(
          db,
          "leaderboard",
          player.id
        ),
        {
          name: player.name,
          wager: player.wager,
          prize: player.prize,
          rank: i + 1,
        }
      );
    }

    await setDoc(
      doc(db, "settings", "texts"),
      {
        heroTitle,
        heroSubtitle,
        leaderboardTitle,
      }
    );

    alert("Saved successfully");
  } catch (err) {
    console.log(err);

    alert("Error saving");
  }

  setSaving(false);
}
async function login() {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (err) {
    alert(
      "Wrong email or password"
    );
  }
}

async function logout() {
  await signOut(auth);
}
if (!user) {
  return (
    <main className="adminPage">

      <div className="bgGlow"></div>

      <div className="loginWrap">

        <div className="loginCard">

          <div className="loginTop">

            <div className="loginLogo">
              G
            </div>

            <h1>
              GAMBLIT ADMIN
            </h1>

            <p>
              Secure leaderboard management
            </p>

          </div>

          <div className="inputGroup">

            <label>
              EMAIL
            </label>

            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          <div className="inputGroup">

            <label>
              PASSWORD
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

          </div>

          <button
            className="loginBtn"
            onClick={login}
          >
            LOGIN
          </button>

        </div>

      </div>
    </main>
  );
}
  return (
    <main className="adminPage">
      <div className="container">

        <div className="settingsCard">

          <h1>
            ADMIN LOGIN
          </h1>

          <div className="inputGroup">
            <label>
              EMAIL
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <div className="inputGroup">
            <label>
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
          </div>

          <button
            className="saveBtn"
            onClick={login}
          >
            LOGIN
          </button>

        </div>

      </div>
    </main>
  );
}

  return (
    <main className="adminPage">
      <div className="bgGlow"></div>

      <div className="container">

        <div className="topBar">
          <div>
            <h1>
              ADMIN PANEL
            </h1>

            <p>
              Manage leaderboard live
            </p>
          </div>

          <button
            onClick={saveAll}
            disabled={saving}
            className="saveBtn"
          >
            {saving
              ? "SAVING..."
              : "SAVE ALL"}
          </button>
          <button
  onClick={logout}
  className="saveBtn"
>
  LOGOUT
</button>
        </div>
<div className="settingsCard">

  <div className="inputGroup">
    <label>
      HERO TITLE
    </label>

    <input
      value={heroTitle}
      onChange={(e) =>
        setHeroTitle(
          e.target.value
        )
      }
    />
  </div>

  <div className="inputGroup">
    <label>
      HERO SUBTITLE
    </label>

    <input
      value={heroSubtitle}
      onChange={(e) =>
        setHeroSubtitle(
          e.target.value
        )
      }
    />
  </div>

  <div className="inputGroup">
    <label>
      LEADERBOARD TITLE
    </label>

    <input
      value={leaderboardTitle}
      onChange={(e) =>
        setLeaderboardTitle(
          e.target.value
        )
      }
    />
  </div>

</div>
        <div className="playersGrid">

          {players.map(
            (player, index) => (
              <div
                className="playerCard"
                key={player.id}
              >
                <div className="rankBadge">
                  #{index + 1}
                </div>

                <div className="inputGroup">
                  <label>
                    PLAYER NAME
                  </label>

                  <input
                    value={player.name}
                    onChange={(e) =>
                      updatePlayer(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="inputGroup">
                  <label>
                    WAGERED
                  </label>

                  <input
                    value={player.wager}
                    onChange={(e) =>
                      updatePlayer(
                        index,
                        "wager",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="inputGroup">
                  <label>
                    PRIZE
                  </label>

                  <input
                    value={player.prize}
                    onChange={(e) =>
                      updatePlayer(
                        index,
                        "prize",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        .adminPage {
          min-height: 100vh;

          background:
            linear-gradient(
              180deg,
              #020617,
              #000000
            );

          color: white;

          padding: 50px 30px;

          position: relative;

          overflow: hidden;
        }

        .bgGlow {
          position: absolute;
          top: -200px;
          left: 50%;

          transform: translateX(-50%);

          width: 700px;
          height: 700px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(0,207,255,0.18),
              transparent 70%
            );

          filter: blur(70px);
        }

        .container {
          position: relative;
          z-index: 2;

          max-width: 1400px;

          margin: auto;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 50px;

          flex-wrap: wrap;

          gap: 20px;
        }

        h1 {
          margin: 0;

          font-size: 4rem;
          font-weight: 900;

          background:
            linear-gradient(
              90deg,
              #00cfff,
              white
            );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          color: #94a3b8;

          margin-top: 10px;

          font-size: 1.1rem;
        }

        .saveBtn {
          border: none;

          height: 70px;

          padding: 0 40px;

          border-radius: 22px;

          font-size: 1rem;
          font-weight: 900;

          background:
            linear-gradient(
              90deg,
              #00cfff,
              #0099ff
            );

          color: white;

          cursor: pointer;

          transition: 0.3s;
        }

        .saveBtn:hover {
          transform: translateY(-4px);

          box-shadow:
            0 0 30px
              rgba(0,207,255,0.45);
        }

        .playersGrid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(320px, 1fr)
            );

          gap: 28px;
        }

        .playerCard {
          position: relative;

          padding: 30px;

          border-radius: 28px;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0.03)
            );

          border: 1px solid
            rgba(255,255,255,0.08);

          backdrop-filter: blur(20px);

          overflow: hidden;
        }

        .playerCard::before {
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
            spin 5s linear infinite;

          opacity: 0.2;
        }

        .playerCard::after {
          content: "";

          position: absolute;
          inset: 2px;

          border-radius: 26px;

          background:
            linear-gradient(
              180deg,
              rgba(5,15,35,0.98),
              rgba(0,0,0,0.98)
            );
        }

        .playerCard * {
          position: relative;
          z-index: 2;
        }

        .rankBadge {
          width: 70px;
          height: 70px;

          border-radius: 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 1.8rem;
          font-weight: 900;

          background:
            linear-gradient(
              180deg,
              #00cfff,
              #0077ff
            );

          margin-bottom: 25px;

          box-shadow:
            0 0 25px
              rgba(0,207,255,0.45);
        }

        .inputGroup {
          margin-bottom: 20px;
        }

        label {
          display: block;

          margin-bottom: 10px;

          color: #67e8f9;

          font-size: 0.9rem;
          font-weight: 900;

          letter-spacing: 2px;
        }

        input {
          width: 100%;

          height: 58px;

          border: 1px solid
            rgba(255,255,255,0.08);

          border-radius: 16px;

          background:
            rgba(255,255,255,0.04);

          padding: 0 18px;

          color: white;

          font-size: 1rem;
          font-weight: 700;

          outline: none;

          transition: 0.3s;
        }

        input:focus {
          border-color: #00cfff;

          box-shadow:
            0 0 18px
              rgba(0,207,255,0.35);
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 900px) {
          h1 {
            font-size: 2.5rem;
          }

          .topBar {
            flex-direction: column;
            align-items: flex-start;
          }

          .saveBtn {
            width: 100%;
          }
        }
          .loginWrap {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 2;
}

.loginCard {
  width: 100%;
  max-width: 480px;

  padding: 45px;

  border-radius: 32px;

  position: relative;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.03)
    );

  border: 1px solid
    rgba(255,255,255,0.08);

  backdrop-filter: blur(24px);

  box-shadow:
    0 0 60px rgba(0,207,255,0.12);
}

.loginCard::before {
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
    spin 5s linear infinite;

  opacity: 0.25;
}

.loginCard::after {
  content: "";

  position: absolute;
  inset: 2px;

  border-radius: 30px;

  background:
    linear-gradient(
      180deg,
      rgba(5,15,35,0.98),
      rgba(0,0,0,0.98)
    );
}

.loginCard * {
  position: relative;
  z-index: 2;
}

.loginTop {
  text-align: center;

  margin-bottom: 35px;
}

.loginLogo {
  width: 90px;
  height: 90px;

  margin: 0 auto 20px;

  border-radius: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.6rem;
  font-weight: 900;

  background:
    linear-gradient(
      180deg,
      #00cfff,
      #0077ff
    );

  box-shadow:
    0 0 35px rgba(0,207,255,0.45);
}

.loginTop h1 {
  margin: 0;

  font-size: 2.4rem;
  font-weight: 900;

  background:
    linear-gradient(
      90deg,
      #00cfff,
      white
    );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.loginTop p {
  margin-top: 12px;

  color: #94a3b8;

  font-size: 1rem;
}

.loginBtn {
  width: 100%;

  height: 64px;

  margin-top: 10px;

  border: none;

  border-radius: 20px;

  font-size: 1rem;
  font-weight: 900;

  background:
    linear-gradient(
      90deg,
      #00cfff,
      #0077ff
    );

  color: white;

  cursor: pointer;

  transition: 0.3s;
}

.loginBtn:hover {
  transform: translateY(-4px);

  box-shadow:
    0 0 35px rgba(0,207,255,0.45);
}

@media (max-width: 600px) {

  .loginCard {
    padding: 28px;
  }

  .loginTop h1 {
    font-size: 1.8rem;
  }

}
          .settingsCard {
  margin-bottom: 40px;

  padding: 30px;

  border-radius: 28px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.03)
    );

  border: 1px solid
    rgba(255,255,255,0.08);
}
      `}</style>
    </main>
  );
}