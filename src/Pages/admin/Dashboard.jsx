import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get('/dashboard/stats');

      setStats({
        patients: res.data?.patients || 0,

        doctors: res.data?.doctors || 0,

        appointments: res.data?.appointments || 0,
      });
    } catch (error) {
      console.log('Dashboard Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: 'Total Patients',
      value: stats.patients,
      color: 'text-blue-600',
    },

    {
      title: 'Total Doctors',
      value: stats.doctors,
      color: 'text-green-600',
    },

    {
      title: "Today's Appointments",
      value: stats.appointments,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Hospital Dashboard</h2>

      {loading ? (
        <div className="text-center">Loading Dashboard...</div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-xl
                shadow-md
                p-6
                hover:shadow-lg
                transition
                "
            >
              <h3
                className="
                  text-gray-500
                  text-sm
                  font-medium
                "
              >
                {card.title}
              </h3>

              <p
                className={`
                  text-3xl
                  font-bold
                  mt-2
                  ${card.color}
                `}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
