import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Zap } from 'lucide-react';
import { sound } from '../../utils/audio';

type SeatState = 'available' | 'selected' | 'locked' | 'booked';

interface Seat {
  id: string;
  row: string;
  num: number;
  state: SeatState;
  holdExpires?: number;
}

const createInitialSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D'];

  rows.forEach((row) => {
    for (let num = 1; num <= 8; num += 1) {
      const isBooked = (row === 'A' && (num === 3 || num === 4)) || (row === 'C' && num === 7);
      const isLocked = row === 'B' && num === 5;
      const state: SeatState = isBooked ? 'booked' : isLocked ? 'locked' : 'available';

      seats.push({
        id: `${row}${num}`,
        row,
        num,
        state,
        holdExpires: isLocked ? 24 : undefined,
      });
    }
  });

  return seats;
};

export const InteractiveSeatMap: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>(createInitialSeats);

  const [wsLogs, setWsLogs] = useState<string[]>([
    'SYSTEM INIT: ASGI Daphne server active on wss://mtbs.engine/showtimes/104',
    'HANDSHAKE: Origin verified via AllowedHostsOrigin wrapper',
    'INITIAL FRAME: Full seat map snapshot received (32 seats)'
  ]);

  const [activeHoldTimer, setActiveHoldTimer] = useState<number | null>(null);
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);

  useEffect(() => {
    if (activeHoldTimer === null) return undefined;

    if (activeHoldTimer === 0) {
      setWsLogs((prev) => [
        '[30s SWEEPER PASS] Hold expired for selected seat -> released back to pool',
        ...prev.slice(0, 4),
      ]);
      setSeats((prev) => prev.map((seat) => (
        seat.id === selectedSeatId ? { ...seat, state: 'available' } : seat
      )));
      setSelectedSeatId(null);
      setActiveHoldTimer(null);
      return undefined;
    }

    const interval = setInterval(() => {
      setActiveHoldTimer((previous) => {
        if (previous === null) return null;
        return previous <= 1 ? 0 : previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeHoldTimer, selectedSeatId]);

  const handleSeatClick = (seatId: string) => {
    sound.playClick();
    const seat = seats.find((item) => item.id === seatId);
    if (!seat) return;

    if (seat.state === 'booked' || seat.state === 'locked') {
      sound.playKey();
      setWsLogs((logs) => [
        `[COLLISION PREVENTED] Seat ${seatId} is already locked by another worker! HTTP 409 Conflict`,
        ...logs.slice(0, 4),
      ]);
      return;
    }

    if (seat.state === 'selected') {
      setSeats((previous) => previous.map((item) => item.id === seatId ? { ...item, state: 'available' } : item));
      setSelectedSeatId(null);
      setActiveHoldTimer(null);
      setWsLogs((logs) => [
        `[RELEASE EVENT] User released seat ${seatId} -> Broadcasted full seat snapshot`,
        ...logs.slice(0, 4),
      ]);
      return;
    }

    if (selectedSeatId) {
      sound.playKey();
      setWsLogs((logs) => [
        `[HOLD ACTIVE] Seat ${selectedSeatId} is already held. Release it before selecting another seat.`,
        ...logs.slice(0, 4),
      ]);
      return;
    }

    sound.playSuccess();
    setSeats((previous) => previous.map((item) => item.id === seatId ? { ...item, state: 'selected' } : item));
    setSelectedSeatId(seatId);
    setActiveHoldTimer(30);
    setWsLogs((logs) => [
      `[WS BROADCAST] Row-level lock acquired for seat ${seatId} -> select_for_update() holding state for 30s`,
      ...logs.slice(0, 4),
    ]);
  };

  const resetSimulation = () => {
    sound.playClick();
    setActiveHoldTimer(null);
    setSelectedSeatId(null);
    setSeats(createInitialSeats());
    setWsLogs((logs) => [
      '[SWEEPER FLUSH] Re-synced full snapshot from durable database rows',
      ...logs.slice(0, 4)
    ]);
  };

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-[#0b0f19] p-3.5 sm:p-5 text-slate-100 max-w-full overflow-hidden">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b border-white/10 pb-3 sm:pb-4 mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <h4 className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-cyan-300 truncate">
              Interactive Concurrency & WebSocket Seat Simulator
            </h4>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-2">
            Test the real-time collision prevention engine built across Daphne + Django Channels
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors shrink-0"
          title="Reset Simulation"
        >
          <RefreshCw className="w-3 h-3 text-cyan-400" />
          <span>Reset</span>
        </button>
      </div>

      {/* Movie Screen Indicator */}
      <div className="mb-5 sm:mb-6 flex flex-col items-center">
        <div className="w-3/4 max-w-xs h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-slate-400 mt-1.5">
          Cinema Projection Screen
        </span>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-8 gap-1 sm:gap-2.5 max-w-[340px] sm:max-w-sm mx-auto mb-5 sm:mb-6">
        {seats.map((seat) => {
          let seatStyle = 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-cyan-400 hover:text-cyan-200';
          if (seat.state === 'selected') {
            seatStyle = 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-105';
          } else if (seat.state === 'locked') {
            seatStyle = 'bg-rose-950/80 border-rose-500/60 text-rose-300 cursor-not-allowed';
          } else if (seat.state === 'booked') {
            seatStyle = 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50';
          }

          return (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat.id)}
              aria-label={`Seat ${seat.id}, ${seat.state}`}
              aria-pressed={seat.state === 'selected'}
              className={`h-7 sm:h-9 sm:h-10 rounded border text-[10px] sm:text-xs font-mono flex items-center justify-center transition-all duration-200 select-none ${seatStyle}`}
              title={`Seat ${seat.id} (${seat.state})`}
            >
              {seat.id}
            </button>
          );
        })}
      </div>

      {/* Legend & Active Hold Status */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 p-2.5 sm:p-3 rounded-lg bg-slate-900/60 border border-white/5 text-[10px] sm:text-xs font-mono mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-slate-800 border border-slate-700" />
            <span className="text-slate-400 text-[10px] sm:text-[11px]">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-cyan-500 border border-cyan-300" />
            <span className="text-cyan-300 text-[10px] sm:text-[11px]">Hold</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-rose-950 border border-rose-500" />
            <span className="text-rose-400 text-[10px] sm:text-[11px]">Locked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-slate-900 border border-slate-800" />
            <span className="text-slate-500 text-[10px] sm:text-[11px]">Booked</span>
          </div>
        </div>

        {activeHoldTimer !== null && (
          <div className="flex items-center gap-1.5 text-amber-300 bg-amber-950/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-amber-500/40 text-[10px] sm:text-xs">
            <Clock className="w-3 h-3 animate-spin" />
            <span>Hold: {activeHoldTimer}s</span>
          </div>
        )}
      </div>

      {/* Simulated Live WebSocket Terminal Logs */}
      <div className="rounded-lg bg-black/80 border border-white/10 p-2.5 sm:p-3 font-mono text-[10px] sm:text-[11px] text-slate-300 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between text-slate-500 border-b border-white/5 pb-1 mb-1">
          <span className="flex items-center gap-1.5 truncate">
            <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">Channels Log Stream</span>
          </span>
          <span className="text-[9px] sm:text-[10px] text-emerald-400 shrink-0 ml-2">PUSH_SNAPSHOT</span>
        </div>
        {wsLogs.map((log, index) => (
          <div key={index} className="truncate flex items-start gap-1.5">
            <span className="text-cyan-500 select-none">&gt;</span>
            <span className={`truncate ${log.includes('COLLISION') ? 'text-rose-400 font-semibold' : log.includes('Row-level') ? 'text-emerald-300' : 'text-slate-300'}`}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
