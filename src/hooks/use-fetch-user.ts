import { useState, useEffect } from "react";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role: string;
  createdAt: string;
  company: string[];
}

export const useFetchUser = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`https://asc-cuhd.onrender.com/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: UserDetails) => {
        console.log(data);
        localStorage.setItem("organizationId", "");
        setUser(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, error, loading };
};
