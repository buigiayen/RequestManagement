import { menu } from "./data.menu.navbar";
import CardNavbar from "./dropdown.navbar";

const MenuNavbar = () => {
  return (
    <div className="bg-[#2A3042] text-[white] text-[16px] justify-center h-[70.037px] relative">
      <div className="flex space-x-[18px] items-center justify-start h-full p-5">
        {menu.map((item) => (
          <div
            key={item.label}
            className="group flex flex-col items-center text-[#979797] hover:text-white cursor-pointer relative p-[4px]"
            onClick={() => {
              window.location.href = item.link ?? "/";
            }}
          >
            <svg
              width={item.icon?.width || 20}
              height={item.icon?.height || 20}
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mb-1"
              viewBox="0 0 24 24"
              fill="none"
            >
              {Array.isArray(item.icon?.path) ? (
                item.icon?.path.map((path, index) => (
                  <path
                    key={index}
                    d={path.d}
                    fill={path.fill}
                    className="fill-[#979797] group-hover:fill-white"
                  />
                ))
              ) : (
                <path
                  d={item.icon?.path}
                  className="fill-[#979797] group-hover:fill-white"
                />
              )}
            </svg>
            <span className="text-[12px]">{item.label}</span>
            {item.Children && (
              <div className="hidden group-hover:block absolute top-[50px] left-0">
                <CardNavbar data={item}></CardNavbar>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuNavbar;
