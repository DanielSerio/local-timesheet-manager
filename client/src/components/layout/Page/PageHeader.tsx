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
  id:
    | "/"
    | "/timesheets"
    | "/timesheets/create"
    | "/timesheets/$entryDate/$timesheetId"
    | "/timesheets/$entryDate";
  name: string;
  path: string;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Filter out empty strings

  return pathSegments.reduce((acc: Breadcrumb[], segment) => {
    const prevPath = acc.length > 0 ? acc[acc.length - 1].path : "";
    const currentPath = `${prevPath}/${segment}`;
    acc.push({
      name: segment === "create" ? "Create Timesheet" : segment,
      path: currentPath,
      id: currentPath as Breadcrumb["id"],
    });
    return acc;
  }, []);
}

export function PageHeader() {
  const state = useBreadcrumbs();
  console.info(state);
  return (
    <header
      id="pageHeader"
      className="border-y w-[calc(100%+16px)] translate-x-[-8px] px-2"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="py-1">
            <BreadcrumbLink asChild>
              <Link to="/" className="text-indigo-500 underline">
                Collections
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {state.map(({ name, id }) => (
            <Fragment key={id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="py-1">
                {id === "/timesheets" ? (
                  <span>{name}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={id} params={{ [id.replace(/[\/$]/g, "")]: name }}>
                      <span className="text-indigo-500 underline">{name}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
