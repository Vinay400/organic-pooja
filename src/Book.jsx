import { FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Background Image Section */}
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{ 
          backgroundImage: "url('/img/pooja 2.png')",
          backgroundSize: 'cover', // Ensure image covers the container
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat' // Prevent image from repeating
        }}
      >
        {/* Background Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Container for Form & Contact Information */}
      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Information Section */}
        <div className="flex flex-col justify-center w-full p-8 text-white lg:w-1/2 lg:justify-start lg:pt-24 lg:pb-24 lg:px-12">
          <h2 className="mb-6 text-4xl font-bold">Contact Information</h2>
          <p className="mb-6 text-lg">We are here to help! Please contact us or book an appointment below.</p>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-xl" />
              <p className="text-base">#762 JanakPuri, Bareilly 243122</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaClock className="text-xl" />
              <p className="text-base">Mon-Sun, 9 AM - 8 PM</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-xl" />
              <p className="text-base">info@organicbypooja.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex flex-col justify-center w-full p-8 rounded-lg lg:w-1/2 bg-white/10 backdrop-blur-md">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-white">Book Your Appointment</h1>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-6"
            >
              <input
                type="hidden"
                name="access_key"
                value="43891102-fecf-4b69-8f17-4362fc2e9d1c"
              />

              <div className="grid grid-cols-1 gap-6">
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="name" className="block text-gray-700"></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="email" className="block text-gray-700"></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your Email"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <label htmlFor="phone" className="block text-gray-700"></label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>

                {/* Treatment Select */}
                <div className="relative">
                  <label htmlFor="treatment" className="block text-gray-700"></label>
                  <select
                    id="treatment"
                    name="treatment"
                    className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="Select Treatment">Select Treatment</option>
                    
                    {/* Skin Treatments Group */}
                    <optgroup label="Skin Treatments">
                      <option value="Laser Hair Treatment">Laser Hair Treatment</option>
                      <option value="Thermage Treatment">Thermage Treatment</option>
                      <option value="HIFU Treatment">HIFU Treatment</option>
                      <option value="Dermal Fillers Treatment">Dermal Fillers Treatment</option>
                      <option value="Chemical Peel Treatment">Chemical Peel Treatment</option>
                      <option value="Q-Switch Laser Treatment">Q-Switch Laser Treatment</option>
                      <option value="Skin Brightening and Lightening Treatment">Skin Brightening and Lightening Treatment</option>
                      <option value="Ageing Skin">Ageing Skin</option>
                      <option value="Acne Scars">Acne Scars</option>
                      <option value="Dull Skin">Dull Skin</option>
                      <option value="IV Drips For Skin">IV Drips For Skin</option>
                    </optgroup>

                    {/* Hair Treatments Group */}
                    <optgroup label="Hair Treatments">
                      <option value="PRP GF Treatment">PRP GF Treatment</option>
                      <option value="Hair Thread Treatment">Hair Thread Treatment</option>
                      <option value="Biocell Therapy">Biocell Therapy</option>
                      <option value="Hair Loss In Women">Hair Loss In Women</option>
                      <option value="IV Drips For Hair">IV Drips For Hair</option>
                      <option value="Hair Loss Concern">Hair Loss Concern</option>
                    </optgroup>

                    {/* Makeup Services Group */}
                    <optgroup label="Make Up">
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Party Makeup">Party Makeup</option>
                      {/* Add more makeup options if needed */}
                    </optgroup>
                  </select>
                </div>

                {/* Date & Time Inputs */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="date" className="block text-gray-700">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Select a date"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="time" className="block text-gray-700">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Select a time"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label htmlFor="message" className="block text-gray-700"></label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full p-4 text-black bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your Message For Us"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-4 font-bold text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
