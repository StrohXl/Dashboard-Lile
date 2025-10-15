// hooks/useResendTimer.js
import { useState, useEffect, useCallback } from "react";

const useResendTimer = (initialTime = 60) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startTimer = useCallback(
    (time = initialTime) => {
      setTimeLeft(time);
      setIsActive(true);
    },
    [initialTime]
  );

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    setIsActive(false);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
    timeLeft,
    isActive,
    startTimer,
    resetTimer,
    formatTime,
    canResend: !isActive && timeLeft === 0,
  };
};

export default useResendTimer;
