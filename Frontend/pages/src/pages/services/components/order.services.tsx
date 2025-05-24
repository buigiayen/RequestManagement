import { Button } from "@/components/ui/button";
import { CalculatorIcon, Check, HelpCircle } from "lucide-react";
import Image from "next/image";

const OrderServices = (props: Services.Service) => {
  return (
    <div className="rounded-sm shadow-md border w-64 h-64 flex flex-col">
      <div className="p-3 flex flex-col flex-grow">
        <h2>{props.label}</h2>
        <p className="text-xs text-[#979797] mb-auto" suppressHydrationWarning>
          {(props.price * 1000).toLocaleString() + " VNĐ / 1000 người dùng"}
        </p>
        <Button
          variant="outline"
          className="text-xs w-full mt-2 flex items-center justify-center gap-1 bg-[#182650] text-white py-1"
        >
          <Check className="h-3 w-3" /> Cài đặt chương trình
        </Button>
      </div>
    </div>
  );
};

export default OrderServices;
