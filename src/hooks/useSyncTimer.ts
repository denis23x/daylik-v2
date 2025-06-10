import { useEffect, useRef, useState } from 'react';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useTimer } from './useTimer';

export const useSyncTimer = (syncTeammate: SyncTeammate) => {
  const { team, setDone } = useSyncLiveStore();
  const teamSyncTimerRef = useRef<number>((team?.sync.timer ?? 0) * 1000);
  const [progress, setProgress] = useState(100);
  const intervalProgressRef = useRef<NodeJS.Timeout | null>(null);
  const timer = useTimer({ duration: teamSyncTimerRef.current });

  useEffect(() => {
    if (syncTeammate.sync.status === 'active') {
      timer.start();
    }
    if (syncTeammate.sync.status === 'done') {
      timer.stop();
    }
  }, [syncTeammate.sync.status, timer]);

  useEffect(() => {
    intervalProgressRef.current = setInterval(() => {
      const remainingTime = timer.getRemainingMS();
      const elapsedTime = timer.getElapsedMS();
      const pausedTime = timer.getPausedMS();
      const totalTime = timer.getTotalMS();

      console.log('t', totalTime.toFixed(), 'e', elapsedTime.toFixed(), 'p', pausedTime.toFixed());

      if (remainingTime) {
        setProgress((remainingTime / teamSyncTimerRef.current) * 100);
      } else {
        setProgress(0);
      }
    }, 500);

    return () => {
      clearInterval(intervalProgressRef.current!);
    };
  }, [timer]);

  return {
    timer,
    progress,
    overtime: 0,
  };
};

// import { useEffect, useRef, useState } from 'react';
// import type { SyncTeammate } from '@/types/syncTeammate.type';
// import { useSyncLiveStore } from '@/store/useSyncLiveStore';

// export const useSyncTimer = (syncTeammate: SyncTeammate) => {
//   const { team, setDone } = useSyncLiveStore();
//   const [running, setRunning] = useState(false);
//   const [progress, setProgress] = useState(100);
//   const [overtime, setOvertime] = useState(0);

//   const timerRef = useRef<number>(team?.sync.timer ?? 0);
//   const startedRef = useRef<number | null>(null);
//   const elapsedRef = useRef<number>(0);
//   const overtimeRef = useRef<number>(0);
//   const intervalProgressRef = useRef<NodeJS.Timeout | null>(null);
//   const intervalOvertimeRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     overtimeRef.current = overtime;
//   }, [overtime]);

//   useEffect(() => {
//     if (running) {
//       if (startedRef.current === null) {
//         startedRef.current = Date.now() - elapsedRef.current;
//       }

//       intervalProgressRef.current = setInterval(() => {
//         const elapsed = Date.now() - (startedRef.current ?? 0);
//         const remaining = timerRef.current * 1000 - elapsed;

//         // Save elapsed time to handle pause and resume
//         elapsedRef.current = elapsed;

//         if (remaining <= 0) {
//           clearInterval(intervalProgressRef.current!);
//           intervalProgressRef.current = null;

//           startedRef.current = null;
//           elapsedRef.current = 0;

//           setProgress(0);
//           setRunning(false);
//         } else {
//           setProgress((remaining / (timerRef.current * 1000)) * 100);
//         }
//       }, 50);
//     }

//     return () => {
//       clearInterval(intervalProgressRef.current!);
//       intervalProgressRef.current = null;
//       startedRef.current = null;
//     };
//   }, [running]);

//   useEffect(() => {
//     if (progress === 0 && syncTeammate.sync.status === 'active') {
//       const overtimeStart = Date.now();

//       intervalOvertimeRef.current = setInterval(() => {
//         const elapsed = Date.now() - overtimeStart;
//         const ratio = elapsed / (timerRef.current * 1000);

//         setOvertime(ratio);
//       }, 100);
//     }

//     return () => {
//       clearInterval(intervalOvertimeRef.current!);
//       intervalOvertimeRef.current = null;
//     };
//   }, [progress, syncTeammate.sync.status]);

//   useEffect(() => {
//     if (syncTeammate.sync.status === 'active') {
//       setRunning(true);
//     } else if (syncTeammate.sync.status === 'done') {
//       setRunning(false);
//     }
//   }, [syncTeammate.sync.status]);

//   useEffect(() => {
//     if (syncTeammate.sync.status === 'done') {
//       const timer = timerRef.current;
//       const elapsed = elapsedRef.current / 1000 || timer + timer * overtimeRef.current;

//       const e = parseInt(elapsed.toFixed());
//       const o = parseFloat(overtimeRef.current.toFixed(1));

//       // Set done with elapsed and overtime
//       setDone(syncTeammate.UUID, e, o);

//       clearInterval(intervalProgressRef.current!);
//       clearInterval(intervalOvertimeRef.current!);

//       intervalProgressRef.current = null;
//       intervalOvertimeRef.current = null;

//       setOvertime(0);
//       setProgress(100);
//       startedRef.current = null;
//       elapsedRef.current = 0;
//     }
//   }, [syncTeammate.sync.status, syncTeammate.UUID, setDone]);

//   return {
//     running,
//     setRunning,
//     progress,
//     overtime,
//   };
// };
