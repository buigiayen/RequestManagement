import { Button } from "@/components/ui/button";
import { CalculatorIcon, Check, HelpCircle } from "lucide-react";
import Image from "next/image";

const OrderServices = (props: Services.Service) => {
  return (
    <div className="rounded-lg shadow-md border p-4 hover:shadow-lg  ">
      <Image
        src={props.imageUrl!}
        alt="Service/Image"
        width={1000}
        height={1000}
        className="rounded-lg w-full duration-300 transition-all  transform hover:scale-105"
      />
      <h2 className="mt-2 ">Ứng dụng: {props.label}</h2>
      <p className="text-sm text-[#979797]" suppressHydrationWarning>
        {(props.price * 1000).toLocaleString() + " VNĐ / 1000 người dùng"}
      </p>
      <Button
        variant="outline"
        className="text-sm w-full mt-2 flex items-center justify-center gap-2"
      >
        <Check className="h-4 w-4" /> Sử dụng
      </Button>

      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          className="text-sm flex-1 flex items-center justify-center gap-2 "
        >
          <HelpCircle className="h-4 w-4" /> Hướng dẫn sử dụng
        </Button>
        <Button
          variant="outline"
          className="text-sm flex-1 flex items-center justify-center gap-2"
        >
          <CalculatorIcon className="h-4 w-4" /> Mua thêm người dùng
        </Button>
      </div>
    </div>
  );
};

export default OrderServices;
