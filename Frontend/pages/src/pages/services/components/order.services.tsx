import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const OrderServices = (props: Services.Service) => {
  return (
    <div>
      <h1 className="text-[24px] font-semibold  text-bold mb-[10px]">
        {props.label.toUpperCase()}
      </h1>
      <div className="flex items-center gap-2 text-[15px]">
        <p>
          <strong>Mã đăng ký:</strong> {props.id}
        </p>
        <span>|</span>
        <p>
          <strong>Đánh giá:</strong> {props.id}
        </p>
      </div>
      <Button
        variant="outline"
        className="text-xs w-full mt-2 flex items-center justify-center gap-1 bg-[#182650] text-white py-1"
      >
        <Check className="h-3 w-3" /> Cài đặt chương trình
      </Button>
    </div>
  );
};

export default OrderServices;
