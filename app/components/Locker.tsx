// components/StyledLockers.tsx (komponent kliencki)
"use client"; // Musi to być wkomponowane, aby zrozumiał, że to komponent kliencki

import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { LockerType } from "./Lockers";

export default function LockerItem({ locker }: { locker: LockerType }) {
  const [isHidden, setHidden] = useState<boolean>(true);
  const showAction = () => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 8000);
  };

  return (
    <Locker>
      <Light $isOpen={locker.is_available} />
      <LockerDoor $isOpen={locker.is_available}>
        <div>
          <p>Szafka {locker.id}</p>
          <p>{locker.is_available ? "Otwarta" : "Zamknięta"}</p>
        </div>

        {/* Przykładowy kod QR */}
        {isHidden ? (
          <ShowButton $isOpen={locker.is_available} onClick={showAction}>
            Pokaż QR
          </ShowButton>
        ) : (
          <QRCodeSVG value={`id=${locker.id}`} />
        )}
      </LockerDoor>
    </Locker>
  );
}

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

const ShowButton = styled.button<{ $isOpen?: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? "#4caf50" : "#f12917")};
  color: white; /* Biały kolor tekstu */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $isOpen }) =>
      $isOpen ? "#45a049" : "#e10e0e"}; /* Ciemniejszy zielony na hover */
  }
  &:focus {
    outline: none; /* Usuwamy domyślną obramowanie focus */
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
