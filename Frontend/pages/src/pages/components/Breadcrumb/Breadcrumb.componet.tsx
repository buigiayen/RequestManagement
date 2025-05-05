import React from "react";
import { useRouter } from "next/router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BeakerIcon, HomeIcon } from "lucide-react";

const BreadcrumbWrapper: React.FC = () => {
  const router = useRouter();

  // Generate breadcrumb items based on the current route
  const generateBreadcrumbItems = () => {
    const pathSegments = router.asPath.split("/").filter((segment) => segment);
    const breadcrumbItems = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      };
    });

    return [
      { label: <HomeIcon className="size-4" />, href: "/" },
      ...breadcrumbItems,
    ];
  };

  const breadcrumbItems = generateBreadcrumbItems();
  console.log(breadcrumbItems);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbWrapper;
