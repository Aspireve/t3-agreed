"use client";

import * as React from "react";
import { useState } from "react";
import axios from "axios";
import * as moment from "moment-timezone"; // Import moment-timezone
import type { UserAuth } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

interface SignupFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  picture: string;
  timezone: string;
}

const SignupPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<SignupFormValues>({
    name: "",
    email: "",
    phone: "",
    password: "",
    picture: "",
    timezone: "",
  });

  // Get a list of all timezones
  const timezones = moment.tz.names();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    axios
      .post<UserAuth>(
        "https://asc-cuhd.onrender.com/v1/auth/register",
        formValues,
      )
      .then(({ data }) => {
        toast({
          title: "Login Successfull ",
          description: "User login was successful",
        });
        localStorage.setItem("usertoken", JSON.stringify(data.token));
        localStorage.setItem("userData", JSON.stringify(data.user));
        setLoading(false);
        navigate.push("/login");
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Signup Failed ",
          description: "User signup failed, contact the admin",
        });
      });
  };

  return (
    <div className="font-dm-sans relative h-screen w-full overflow-hidden bg-gray-900">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover opacity-50"
        src={"/bgv.mp4"}
        autoPlay
        loop
        muted
      />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-gray-900 via-gray-800 to-transparent" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 rounded-xl border border-gray-600 bg-opacity-70 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8 shadow-2xl backdrop-blur-lg"
        >
          <h2 className="mb-6 text-center text-3xl font-extrabold text-white">
            Create an Account
          </h2>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="+1234567890"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="timezone"
              className="block text-sm font-semibold text-gray-300"
            >
              Time Zone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={formValues.timezone}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Time Zone
              </option>
              {timezones.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full transform rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-blue-400 hover:text-blue-500"
            >
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
