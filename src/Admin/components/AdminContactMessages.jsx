import React, { useEffect, useState } from "react";
import { db } from "./../../../configs";
import { contactMessages } from "./../../../configs/schema";
import { desc } from "drizzle-orm";
import { Loader } from "lucide-react";

function AdminContactInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const result = await db
        .select({
          id: contactMessages.id,
          firstName: contactMessages.firstName,
          lastName: contactMessages.lastName,
          email: contactMessages.email,
          phone: contactMessages.phone,
          message: contactMessages.message,
          createdAt: contactMessages.createdAt,
          userImageUrl: contactMessages.userImageUrl,
        })
        .from(contactMessages)
        .orderBy(desc(contactMessages.id));

      setMessages(result);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = (msg) => {
    setSelectedMessage(msg);
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          📬 Customer Messages
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader className="animate-spin mr-2" /> Loading...
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center">No messages yet. 🎉</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-gray-200 rounded-md shadow-sm hover:shadow-md transition cursor-pointer w-[300px] p-4"
                onClick={() => openMessage(msg)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={msg.userImageUrl || "https://via.placeholder.com/50"}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-lg">
                      {msg.firstName} {msg.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{msg.email}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
            <button
              onClick={closeMessage}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">
              {selectedMessage.firstName} {selectedMessage.lastName}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {selectedMessage.email} | {selectedMessage.phone || "N/A"}
            </p>
            <div className="text-gray-800">
              <strong>Message:</strong>
              <p className="mt-1">{selectedMessage.message}</p>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Sent on:{" "}
              {selectedMessage.createdAt
                ? new Date(selectedMessage.createdAt).toLocaleString()
                : "Unknown"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContactInbox;
