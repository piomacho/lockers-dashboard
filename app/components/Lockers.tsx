// components/StyledLockers.tsx (komponent kliencki)
"use client"; // Musi to być wkomponowane, aby zrozumiał, że to komponent kliencki

import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchLockers } from "./helper";
import LockerItem from "./Locker";

export interface LockerType {
  id: number;
  is_available: boolean;
}

function isLockerArray(data: unknown): data is LockerType[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.id === "number" && typeof item.is_available === "boolean"
    )
  );
}
export default function StyledLockers() {
  const [lockersLive, setLockers] = useState<LockerType[]>([]);
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data: LockerType[] = await fetchLockers();
      setLockers(data);
    };

    fetchData();
  }, []);
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
        {lockersLive.map((locker) => (
          <LockerItem key={locker.id} locker={locker} />
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
