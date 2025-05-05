import { Button } from "@/components/ui/button";
import { AccessibilityIcon } from "lucide-react";
import Image from "next/image";

const OrderServices = (props: Services.Service) => {
  return (
    <div className="rounded-lg shadow-md border p-4 hover:shadow-lg transition-shadow duration-300">
      <Image
        src="https://console.emcvietnam.vn:9000/requestmanager-object/images/1.png"
        alt="Service/Image"
        width={1000}
        height={1000}
        className="rounded-lg w-full"
      />
      <h2 className="mt-2 ">Ứng dụng: {props.label}</h2>
      <p className="text-sm text-[#979797]">
        {(props.price * 1000).toLocaleString() + " VNĐ / 1000 người dùng"}
      </p>
      <Button className="text-sm w-full mt-2 flex items-center justify-center gap-2">
        <AccessibilityIcon className="h-4 w-4" /> Đăng ký sử dụng
      </Button>

      <div className="flex gap-2 mt-2">
        <Button className="text-sm flex-1 flex items-center justify-center gap-2 bg-[#E3E3E3] hover:bg-[#D1D1D1]">
          <AccessibilityIcon className="h-4 w-4" /> Hướng dẫn sử dụng
        </Button>
        <Button className="text-sm flex-1 flex items-center justify-center gap-2">
          <AccessibilityIcon className="h-4 w-4" /> Đăng ký sử dụng
        </Button>
      </div>
    </div>
  );
};

export default OrderServices;
