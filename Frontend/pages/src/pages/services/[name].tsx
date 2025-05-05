import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { mockServices } from "@/data/mockData";
import MarkdownRenderer from "./components/markdown.services";
import BreadcrumbWrapper from "../components/Breadcrumb/Breadcrumb.componet";
import OrderServices from "./components/order.services";

export const getServerSideProps: GetServerSideProps<Services.Service> = async (
  context
) => {
  const slug = context.params?.name;
  const data = mockServices.find((item) => item.slug === slug);
  return {
    props: data!,
  };
};

export default function PageServices(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div className="flex flex-col items-start  pt-2 pl-2 pr-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="30"
            viewBox="0 0 34 30"
            fill="none"
          >
            <rect width="34" height="30" rx="6" fill="#E3E3E3" />
            <path
              d="M25.6457 9.87565L18.1107 6.18278C17.641 5.94044 17.7396 5.9389 17.2736 6.17926L9.6932 9.84247C9.22728 10.0828 9.2303 10.4741 9.70002 10.7165L11.5013 11.5874C10.7036 12.6891 10.6519 13.8346 10.6412 15.1628C10.3329 15.3321 10.1141 15.758 10.1141 16.2571C10.1141 16.7154 10.2987 17.112 10.5675 17.3049C10.4397 18.6544 10.0741 20.1961 9 22.0228C9.53134 22.6091 9.80559 22.8045 10.2169 23C11.7185 22.081 11.5359 19.6373 11.4191 17.207C11.6253 16.9939 11.7595 16.648 11.7595 16.2571C11.7595 15.8381 11.6053 15.4707 11.3734 15.2633C11.4001 13.9619 11.599 12.7976 12.2816 12.0444C12.2872 12.0245 12.303 12.0062 12.3325 11.9893L17.5124 9.00525C17.7045 8.89548 17.9227 9.02846 17.9997 9.30231L18.0066 9.32649C18.0836 9.60032 17.9903 9.91129 17.7982 10.021L13.4206 12.5154L17.3379 14.4094C17.8076 14.6517 17.709 14.6533 18.1749 14.4129L25.6526 10.7496C26.1185 10.5093 26.1154 10.1179 25.6457 9.87565ZM17.326 15.8263L12.5842 13.5353V15.2583C12.8321 15.582 12.9689 16.0464 12.9689 16.5625C12.9689 17.0265 12.8552 17.4485 12.6631 17.7643C12.7259 18.0349 12.8354 18.2993 12.9917 18.3825C15.7513 20.5569 19.5657 20.5324 22.6337 18.1627C22.8613 17.8926 23.0373 17.5582 23.0373 17.2343V13.4392L18.1666 15.8298C17.7007 16.0702 17.7957 16.0687 17.326 15.8263Z"
              fill="#41548D"
            />
          </svg>
          <div>
            <span>{props.label}</span>
            <p className="text-[10px] text-[#979797]">
              {props.description?.split(" ").slice(0, 20).join(" ")}
              {props.description && props.description.split(" ").length > 20
                ? "..."
                : ""}
            </p>
          </div>
        </div>
        <BreadcrumbWrapper></BreadcrumbWrapper>
      </div>
      <br></br>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 4, // Increased from 1 to make it larger relative to last div
            padding: "1rem",
            borderRight: "1px solid #ccc",
          }}
        >
          <MarkdownRenderer markdown={props.description!}></MarkdownRenderer>
        </div>
        <div style={{ flex: 1, padding: "1rem" }}>
          <OrderServices {...props}></OrderServices>
        </div>
      </div>
    </div>
  );
}
