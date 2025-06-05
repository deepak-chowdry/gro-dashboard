"use client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}
