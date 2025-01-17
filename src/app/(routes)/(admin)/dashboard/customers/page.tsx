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
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);

  const { refetch, offRefetch } = useCustomersRefetch();

  useEffect(() => {
    const fetchCustomers = () => {
      start(async () => {
        const response = await axios.get(
          `/api/user?search=${search}&sort=${sort}&limit=${limit}&offset=${offset}`
        );

        if (response.status === 200) {
          setUsers(response.data.data);
          offRefetch();
          console.log(response);
        }
      });
    };

    fetchCustomers();
  }, [search, sort, limit, offset, refetch]);

  return (
    <section>
      <div>
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <SearchBar search={search} setSearch={setSearch} />
          <SortDropdown setSort={setSort} />
        </div>

        <CustomersRows loading={loading} users={users} />
      </div>
    </section>
  );
};

export default Customers;
