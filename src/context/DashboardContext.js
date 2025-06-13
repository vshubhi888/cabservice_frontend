import React, { createContext, useContext, useState, useCallback } from 'react';

const DashboardContext = createContext();

export function useDashboard() {
  return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
  const [cabs, setCabs] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllData = useCallback(() => {
    const token = localStorage.getItem('token');
    setLoading(true);

    fetch('http://localhost:8080/api/cabs/fetchCabs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setCabs(data.cabs || []))
      .finally(() => setLoading(false));

    fetch('http://localhost:8080/api/users/fetch?role=driver', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDrivers(data.users || []));

    fetch('http://localhost:8080/api/users/fetch?role=employee', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setEmployees(data.users || []));
  }, []);

  return (
    <DashboardContext.Provider value={{
      cabs, setCabs,
      drivers, setDrivers,
      employees, setEmployees,
      loading, setLoading,
      fetchAllData
    }}>
      {children}
    </DashboardContext.Provider>
  );
}