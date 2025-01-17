"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { User } from "@prisma/client";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/user?clerkId=${user?.id}`);

      if (response.status === 200) {
        setCurrentUser(response.data.data);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return { currentUser };
};

export default useCurrentUser;
