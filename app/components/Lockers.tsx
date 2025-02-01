// components/StyledLockers.tsx (komponent kliencki)
"use client"; // Musi to być wkomponowane, aby zrozumiał, że to komponent kliencki

import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { fetchLockers } from "./helper";

interface Locker {
  id: number;
  is_available: boolean;
}

interface LockersProps {
  lockers: Locker[];
}
function isLockerArray(data: unknown): data is Locker[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.id === "number" && typeof item.is_available === "boolean"
    )
  );
}
export default function StyledLockers({ lockers }: LockersProps) {
  const [lockersLive, setLockers] = useState(lockers);
  // const [socket, setSocket] = useState<WebSocket | null>(null);

  // useEffect(() => {
  //   // Utwórz połączenie WebSocket
  //   const newSocket = new WebSocket(
  //     "ws://piomacho999.pythonanywhere.com/ws/lockers"
  //   );
  //   newSocket.onopen = () => {
  //     console.log("WebSocket połączenie otwarte");
  //   };

  //   newSocket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);

  //     // Check if data.data is an array of Locker
  //     if (isLockerArray(data.data)) {
  //       setLockers(data.data);
  //     } else {
  //       console.error("Invalid data format received:", data);
  //     }
  //   };

  //   newSocket.onclose = () => {
  //     console.log("WebSocket połączenie zamknięte");
  //   };

  //   setSocket(newSocket);

  //   // Zamknij połączenie przy odmontowaniu komponentu
  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await fetchLockers();
      if (isLockerArray(data)) {
        setLockers(data);
      } else {
        console.error("Invalid data format received:", data);
      }
    }, 3500); // Polling every 3 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <Dashboard>
      <Overlay />
      <LockersContainer>
        {lockersLive.map((locker, index) => (
          <Locker key={index} onClick={() => console.log(index)}>
            <Light $isOpen={locker.is_available} />
            <LockerDoor $isOpen={locker.is_available}>
              <p>Szafka {locker.id}</p>
              <p>{locker.is_available ? "Otwarta" : "Zamknięta"}</p>
              {/* Przykładowy kod QR */}
              <QRCodeSVG value={`id=${locker.id}`} />
            </LockerDoor>
          </Locker>
        ))}
      </LockersContainer>
    </Dashboard>
  );
}

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url("/gym-background.jpg") no-repeat center center;
  background-size: cover;
  color: #fff;
  padding: 20px;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
`;

const LockersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Automatyczne dopasowanie liczby kolumn */
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  justify-items: center; /* Wyśrodkowanie elementów w kontenerze */

  /* Media Query dla ekranów powyżej 1024px (desktop) */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* 4 szafki w rzędzie na desktopie */
  }
`;

const Locker = styled.div<{ $isOpen?: boolean }>`
  position: relative;
  width: 180px; /* Zwiększenie szerokości */
  height: 250px; /* Zwiększenie wysokości */
  background: #2c3e50;
  border-radius: 5px;
  border: 2px solid #34495e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: #3b4c62;
  }
`;

const Light = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  background: ${({ $isOpen }) => ($isOpen ? "#27ae60" : "#c0392b")};
  border-radius: 50%;
  box-shadow: 0 0 10px ${({ $isOpen }) => ($isOpen ? "#2ecc71" : "#e74c3c")};
  border: 1px solid #fff;
`;

const LockerDoor = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%; /* Zwiększenie wysokości, aby było więcej miejsca na kod QR */
  background: ${({ $isOpen }) => ($isOpen ? "#2ecc71" : "#FA5F55")};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background 0.3s ease;
  border-top: 2px solid #34495e;
  padding-bottom: 10px;
`;
