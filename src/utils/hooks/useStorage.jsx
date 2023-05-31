import { useState, useEffect } from 'react';

export const useStorageUser = (key, initialState) => {
  const [state, setState] = useState(() => {
    const localState = localStorage.getItem(key);
    return JSON.parse(localState) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

export const useStorageMeals = (keys, initialStates) => {
  const [state, setState] = useState(() => {
    const localState = localStorage.getItem(keys);
    return JSON.parse(localState) || initialStates;
  });

  useEffect(() => {
    localStorage.setItem(keys, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

export const useStoragedrinksToken = (keyss, initialStatess) => {
  const [state, setState] = useState(() => {
    const localState = localStorage.getItem(keyss);
    return JSON.parse(localState) || initialStatess;
  });

  useEffect(() => {
    localStorage.setItem(keyss, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

// deixamos aqui nosso agrecimento ao colega Miguel que disponibilizou esse hook, para utilizarmos.
