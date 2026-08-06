import { useState, useParams } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  //   const { doctorId, patientId } = useParams();

  //   console.log('Doctor:', doctorId);
  //   console.log('Patient:', patientId);

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Doctor - Patient Chat</h2>
      </div>

      {/* Messages */}
      <div className="border h-[500px] p-4 overflow-y-auto bg-gray-50">
        <div className="mb-3 flex justify-start">
          <div className="bg-white px-4 py-2 rounded shadow">Hello Doctor 👋</div>
        </div>

        <div className="mb-3 flex justify-end">
          <div className="bg-blue-500 text-white px-4 py-2 rounded shadow">Hello, How are you?</div>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-5 rounded">Send</button>
      </div>
    </div>
  );
}
