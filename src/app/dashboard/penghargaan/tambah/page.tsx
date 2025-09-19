"use client";
import { Role } from "@/models/user";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Award } from "lucide-react";
import Link from "next/link";

const TambahPenghargaanPage = () => {
  useEffect(() => {}, []);

  return (
    <main className="flex flex-col p-6 gap-8">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-accent-dark text-sm">
          <Link
            className="hover:underline hover:text-accent"
            href={"/dashboard/penghargaan"}
          >
            Penghargaan
          </Link>
          {" -> "}
          Tambah Penghargaan
        </h1>
        <div className="flex items-center gap-2 font-extrabold text-accent">
          <Award className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Tambah Penghargaan</h2>
        </div>
      </div>
    </main>
  );
};

export default TambahPenghargaanPage;


/**
 * id
 * Ada field icon / gambar
 * title
 * description
 * certificate
 * created_at
 * updated_at
*/