"use client";

import { useEffect, useState } from "react";

import {
  doc,
  setDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { db, auth } from "../lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [players, setPlayers] =
    useState<any[]>([]);

  useEffect(() => {
    const unsubAuth =
      onAuthStateChanged(auth, (u) => {
        setUser(u);
      });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      collection(db, "leaderboard"),
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        data.sort(
          (a: any, b: any) =>
            Number(a.rank) -
            Number(b.rank)
        );

        setPlayers(data);
      }
    );

    return () => unsub();
  }, [user]);

  const updatePlayer = async (
    player: any
  ) => {
    await setDoc(
      doc(db, "leaderboard", player.id),
      player
    );
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch {
      alert("Wrong login");
    }
  };

  if (!user) {
    return (
      <main className="loginPage">
        <div className="loginBox">
          <h1>ADMIN LOGIN</h1>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={login}>
            LOGIN
          </button>
        </div>

        <style jsx>{`
          .loginPage {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background:
              radial-gradient(
                circle at top,
                #08172f,
                #020617
              );
          }

          .loginBox {
            width: 400px;
            padding: 40px;
            border-radius: 30px;
            background: rgba(
              255,
              255,
              255,
              0.05
            );
            border: 1px solid
              rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
          }

          h1 {
            color: white;
            text-align: center;
            margin-bottom: 30px;
          }

          input {
            width: 100%;
            height: 55px;
            margin-bottom: 20px;
            border-radius: 15px;
            border: none;
            padding: 0 20px;
            font-size: 1rem;
          }

          button {
            width: 100%;
            height: 55px;
            border: none;
            border-radius: 15px;
            background: #00cfff;
            color: black;
            font-weight: 900;
            cursor: pointer;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="adminPage">
      <div className="topbar">
        <h1>ADMIN PANEL</h1>

        <button
          onClick={() => signOut(auth)}
        >
          LOGOUT
        </button>
      </div>

      <div className="players">
        {players.map((player, index) => (
          <div
            className="card"
            key={player.id}
          >
            <div className="rank">
              #{index + 1}
            </div>

            <input
              value={player.name}
              onChange={(e) => {
                const updated = [
                  ...players,
                ];

                updated[index].name =
                  e.target.value;

                setPlayers(updated);
              }}
            />

            <input
              value={player.wager}
              onChange={(e) => {
                const updated = [
                  ...players,
                ];

                updated[index].wager =
                  e.target.value;

                setPlayers(updated);
              }}
            />

            <input
              value={player.prize}
              onChange={(e) => {
                const updated = [
                  ...players,
                ];

                updated[index].prize =
                  e.target.value;

                setPlayers(updated);
              }}
            />

            <button
              onClick={() =>
                updatePlayer(player)
              }
            >
              SAVE
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .adminPage {
          min-height: 100vh;
          padding: 40px;
          background:
            radial-gradient(
              circle at top,
              #08172f,
              #020617
            );
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        h1 {
          color: white;
        }

        .topbar button {
          width: 140px;
          height: 50px;
          border: none;
          border-radius: 15px;
          background: #ff3b3b;
          color: white;
          font-weight: 900;
          cursor: pointer;
        }

        .players {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(320px, 1fr)
            );
          gap: 25px;
        }

        .card {
          padding: 25px;
          border-radius: 25px;
          background: rgba(
            255,
            255,
            255,
            0.05
          );
          border: 1px solid
            rgba(255, 255, 255, 0.08);
        }

        .rank {
          color: #00cfff;
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          height: 50px;
          margin-bottom: 15px;
          border-radius: 12px;
          border: none;
          padding: 0 15px;
        }

        .card button {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 12px;
          background: #00cfff;
          color: black;
          font-weight: 900;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}