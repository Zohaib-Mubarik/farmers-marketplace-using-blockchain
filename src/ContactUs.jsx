import React, { useState } from "react";
import { db } from "./../configs";
import { contactMessages } from "./../configs/schema";
import { toast } from "sonner";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const { isLoaded, user } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Ensure user is loaded and fetch image at submit time
      const userImageUrl = isLoaded && user?.imageUrl 
        ? user.imageUrl 
        : "https://via.placeholder.com/150";

      await db.insert(contactMessages).values({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: new Date(),
        userImageUrl, // ✅ store the correct profile image URL
      });

      toast.success("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user session...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen flex flex-col items-center">
        <div className="w-full bg-gray-200 h-[600px] shadow p-8 rounded">
          <h2 className="text-3xl font-bold mb-6 w-[170px]">Contact Us</h2>
          <div className="md:flex md:gap-8">
            <div className="md:w-1/2 space-y-4">
              <p className="w-[470px]">
                If you have any questions, feedback, or suggestions, feel free
                to reach out to us using the form. Our team will get back to you
                as soon as possible — usually within 24 hours. Your thoughts
                help us improve and serve you better.
              </p>

              <p>
                <Link to="/" className="text-black font-sans underline">
                  About Us
                </Link>
              </p>

              <div className="flex">
                <div className="w-150">
                  <p className="text-black font-bold">Customer Support</p>
                  <p className="w-[240px]">
                    Our support team is available around the clock to address
                    any concerns or queries you may have.
                  </p>
                </div>

                <div>
                  <p className="text-black font-bold">Feedback and Suggestions</p>
                  <p className="w-[240px]">
                    We welcome your feedback and suggestions to improve our
                    services. Please share your thoughts with us!
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="md:w-1/2 space-y-4 bg-white p-4 rounded-3xl shadow h-[450px]"
            >
              <h3 className="text-xl font-semibold">Get in Touch</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="border rounded w-1/2 p-2"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="border rounded w-1/2 p-2"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="border rounded w-full p-2"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="border rounded w-full p-2"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                maxLength={300}
                className="border rounded w-full p-2 h-20"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
