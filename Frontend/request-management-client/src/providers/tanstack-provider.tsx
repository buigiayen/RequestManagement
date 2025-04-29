"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Optional: Prevents automatic retries
        staleTime: 1000 * 60 * 5, // Giữ cache trong 5 phút
        retryDelay: 2, // Thử lại 2 lần nếu request lỗi
        enabled: true, // Bật chế độ tự động refetch khi có kết nối lại
        refetchOnWindowFocus: true, // Tự động refetch khi cửa sổ được lấy lại tiêu điểm
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
