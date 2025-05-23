"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpaceCard from "@/components/space/SpaceCard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// 서버에서 받는 데이터 타입
interface SpaceResponse {
  id: string;
  spaceName: string;
  description: string;
  address: string;
  price: number;
  mainImageUrl: string;
  maxCapacity: number;
  spaceRating: number;
  reviewCount: number;
}

export default function AllSpacesPage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<SpaceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/spaces`);
        if (!response.ok) {
          throw new Error("Failed to fetch spaces");
        }

        const data = await response.json();
        const spaceData = data.data || data;
        setSpaces(spaceData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch spaces");
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">모든 공간</h1>
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-800"
          >
            돌아가기
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              id={space.id}
              title={space.spaceName}
              location={space.address}
              capacity={`${space.maxCapacity}명`}
              price={space.price}
              rating={space.spaceRating}
              imageUrl={space.mainImageUrl}
            />
          ))}
        </div>

        {spaces.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            등록된 공간이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
