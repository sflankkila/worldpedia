"use client";

import { FC } from "react";
import Image from "next/image";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const DataComponent: FC = () => {
  const { data, error } = useSWR(
    "https://restcountries.com/v3.1/name/Åland Islands?fullText=true",
    fetcher
  );

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const [response] = data;

  if (!response) {
    return <div>No data available</div>;
  }

  const { name } = response;
  const { flags } = response;
  const { official } = name;
  const { png: pngImage, svg: svgImage } = flags;

  return (
    <div>
      <h2>Official Name: {official}</h2>
      <Image src={pngImage} alt="SVG Image" width={250} height={150} />
    </div>
  );
};

export default DataComponent;
