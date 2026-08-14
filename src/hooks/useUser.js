import { useState, useEffect } from 'react';

export function useUser() {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('facom_points');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [scannedCodes, setScannedCodes] = useState(() => {
    const saved = localStorage.getItem('facom_scanned_codes');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const saved = localStorage.getItem('facom_completed_challenges');
    return saved ? JSON.parse(saved) : [];
  });

  const [mascot, setMascot] = useState(() => {
    const saved = localStorage.getItem('facom_mascot');
    return saved ? saved : 'blue'; // blue = teko, purple = weeka
  });

  useEffect(() => {
    localStorage.setItem('facom_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('facom_scanned_codes', JSON.stringify(scannedCodes));
  }, [scannedCodes]);

  useEffect(() => {
    localStorage.setItem('facom_completed_challenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  useEffect(() => {
    localStorage.setItem('facom_mascot', mascot);
  }, [mascot]);

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const hasScannedCode = (code) => {
    return scannedCodes.includes(code);
  };

  const registerCodeScan = (data, amount = 5) => {
    let codeStr = data;
    let scannedProfile = null;
    
    // Check if it's JSON from a user profile
    try {
      const decoded = decodeURIComponent(data);
      if (decoded.startsWith('{') && decoded.endsWith('}')) {
        const parsed = JSON.parse(decoded);
        if (parsed.username) {
          scannedProfile = parsed;
          codeStr = `user_${parsed.username}`;
        }
      }
    } catch (e) {
      try {
        if (data.startsWith('{') && data.endsWith('}')) {
          const parsed = JSON.parse(data);
          if (parsed.username) {
            scannedProfile = parsed;
            codeStr = `user_${parsed.username}`;
          }
        }
      } catch (e2) {}
    }

    if (!hasScannedCode(codeStr)) {
      setScannedCodes(prev => [...prev, codeStr]);
      addPoints(amount);
      
      let unlockedChallenges = [];

      // Networking missions automated validation
      if (scannedProfile) {
        const myProfileStr = localStorage.getItem('facom_user_profile');
        const myProfile = myProfileStr ? JSON.parse(myProfileStr) : null;
        
        // network_first
        if (!hasCompletedChallenge('network_first')) {
          setCompletedChallenges(prev => {
            if (!prev.includes('network_first')) return [...prev, 'network_first'];
            return prev;
          });
          addPoints(10);
          unlockedChallenges.push('network_first');
        }

        if (myProfile) {
          // network_course
          if (myProfile.course && scannedProfile.course && myProfile.course.toLowerCase() !== scannedProfile.course.toLowerCase()) {
            if (!hasCompletedChallenge('network_course')) {
              setCompletedChallenges(prev => {
                if (!prev.includes('network_course')) return [...prev, 'network_course'];
                return prev;
              });
              addPoints(15);
              unlockedChallenges.push('network_course');
            }
          }
          
          // network_type
          if (scannedProfile.participantType && scannedProfile.participantType !== 'Aluno da UFU') {
            if (!hasCompletedChallenge('network_type')) {
              setCompletedChallenges(prev => {
                if (!prev.includes('network_type')) return [...prev, 'network_type'];
                return prev;
              });
              addPoints(15);
              unlockedChallenges.push('network_type');
            }
          }

          // network_period
          if (scannedProfile.period === 1) {
            if (!hasCompletedChallenge('network_period')) {
              setCompletedChallenges(prev => {
                if (!prev.includes('network_period')) return [...prev, 'network_period'];
                return prev;
              });
              addPoints(15);
              unlockedChallenges.push('network_period');
            }
          }
        }
      }

      // Check for specific hardcoded mission QR codes
      if (data === 'kanastra_code' || data === 'sponsor_visit') {
        if (!hasCompletedChallenge('sponsor_visit')) {
          setCompletedChallenges(prev => {
            if (!prev.includes('sponsor_visit')) return [...prev, 'sponsor_visit'];
            return prev;
          });
          addPoints(15);
          unlockedChallenges.push('sponsor_visit');
        }
      }

      if (data === 'secret_qr_code') {
        if (!hasCompletedChallenge('secret_qr')) {
          setCompletedChallenges(prev => {
            if (!prev.includes('secret_qr')) return [...prev, 'secret_qr'];
            return prev;
          });
          addPoints(40);
          unlockedChallenges.push('secret_qr');
        }
      }

      return { success: true, unlockedChallenges, isProfile: !!scannedProfile, scannedProfile };
    }
    return { success: false };
  };

  const completeChallenge = (challengeId, amount) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId]);
      addPoints(amount);
      return true;
    }
    return false;
  };

  const hasCompletedChallenge = (challengeId) => {
    return completedChallenges.includes(challengeId);
  };

  return {
    points,
    scannedCodes,
    completedChallenges,
    mascot,
    setMascot,
    registerCodeScan,
    completeChallenge,
    hasScannedCode,
    hasCompletedChallenge
  };
}
