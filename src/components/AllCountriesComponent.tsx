"use client";

import { FC } from "react";
import Image from "next/image";
import useSWR from "swr";
import Loading from "@/app/dashboard/loading";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const DataComponent: FC = () => {
  const { data } = useSWR("https://restcountries.com/v3.1/all", fetcher, {});

  if (!data) {
    return <Loading/>;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-6">
      {data.map((item: any, index: any) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          {/* Render the data from each object */}
          <Image
            className="w-full"
            src={item.flags.svg}
            alt="SVG Image"
            width={250}
            height={150}
          />
          <div className="px-6 py-4 grid">
            <div className="font-bold text-xl mb-2">{item.name.common}</div>
            <div className="text-gray-700 text-base">
              <p>Capital: {item.capital}</p>
              <p>Region: {item.region}</p>
              <p>Population: {item.population}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataComponent;
