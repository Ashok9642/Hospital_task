import React from 'react';

function About() {
  const services = [
    {
      title: 'Ambulance',
      description: '24/7 emergency ambulance services for immediate patient care.',
      color: 'text-blue-600',
    },

    {
      title: 'Emergency',
      description: 'Fast and reliable emergency medical support with expert doctors.',
      color: 'text-red-600',
    },

    {
      title: 'Checkups',
      description: 'Regular health checkups and preventive healthcare services.',
      color: 'text-green-600',
    },
  ];
  // throw new Error('Something went wrong!');

  return (
    <section className="text-center px-10 py-16 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Services</h2>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        {services.map((service, index) => (
          <div key={index} className="p-6 border rounded-lg shadow hover:shadow-lg transition w-72">
            <h3 className={`font-semibold text-xl mb-3 ${service.color}`}>{service.title}</h3>

            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      <div class="relative border w-40 h-40">
        Parenttt
        <div class="absolute top-0 right-0 ">Child</div>
      </div>
    </section>
  );
}

export default About;
