"use client";

import SearchBar from "@/components/search-bar";
import { useCustomersRefetch } from "@/store/refetchStates";
import { User } from "@prisma/client";
import React, { useEffect, useState, useTransition } from "react";
import SortDropdown from "./_components/sort-dopdown";
import axios from "axios";
import CustomersRows from "./_components/customers-rows";

const Customers = () => {
  const [loading, start] = useTransition();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("desc");

  const { refetch, offRefetch } = useCustomersRefetch();

  useEffect(() => {
    start(async () => {
      const response = await axios.get(
        `/api/user?search=${search}&sort=${sort}`
      );

      if (response.status === 200) {
        setUsers(response.data.data);
        offRefetch();
      }
    });
  }, [search, sort, refetch, offRefetch]);

  return (
    <section>
      <div>
        <div className="mb-8 flex max-sm:flex-wrap sm:justify-between items-center gap-2">
          <SearchBar search={search} setSearch={setSearch} />
          <SortDropdown setSort={setSort} />
        </div>

        <CustomersRows loading={loading} users={users} />
      </div>
    </section>
  );
};

export default Customers;
