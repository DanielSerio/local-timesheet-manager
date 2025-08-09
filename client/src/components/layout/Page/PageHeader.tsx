import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

interface Breadcrumb {
  id: "/" | "/$entryDate/$timesheetId" | "/$entryDate";
  name: string;
  path: string;
}

function countOccurrences(text: string, charToCount: string = "/") {
  const regex = new RegExp(charToCount, "g");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Filter out empty strings

  return pathSegments.reduce((acc: Breadcrumb[], segment) => {
    const prevPath = acc.length > 0 ? acc[acc.length - 1].path : "";
    const currentPath = `${prevPath}/${segment}`;
    acc.push({
      name: segment,
      path: currentPath,
      id:
        countOccurrences(currentPath) > 1
          ? "/$entryDate/$timesheetId"
          : "/$entryDate",
    });
    return acc;
  }, []);
}

export function PageHeader() {
  const state = useBreadcrumbs();

  return (
    <header
      id="pageHeader"
      className="border-y w-[calc(100%+16px)] translate-x-[-8px] px-2"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="py-1">
            <BreadcrumbLink asChild>
              <Link to="/">Dates</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {state.map(({ name, id }) => (
            <Fragment key={id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="py-1">
                <BreadcrumbLink asChild>
                  <Link to={id} params={{ [id.replace(/[\/$]/g, "")]: name }}>
                    {name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
