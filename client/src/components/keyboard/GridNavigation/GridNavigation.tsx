import {
  Children,
  cloneElement,
  useEffect,
  useRef,
  type DetailedReactHTMLElement,
  type KeyboardEvent,
  type PropsWithChildren,
} from "react";

interface Command {
  key: string;
  rid: number;
  cid: number;
  rowCount: number;
  columnCount: number;
}

function selectControl(nextRow: Element, nextCid: number) {
  const getSelectorString = (elm: string) => `[data-cid="${nextCid}"] ${elm}`;

  const input = nextRow.querySelector(
    getSelectorString("input")
  ) as HTMLInputElement | null;
  const select = nextRow.querySelector(
    getSelectorString("select")
  ) as HTMLSelectElement | null;
  const button = nextRow.querySelector(
    getSelectorString("button")
  ) as HTMLButtonElement | null;
  const anchor = nextRow.querySelector(
    getSelectorString("a")
  ) as HTMLButtonElement | null;
  const textarea = nextRow.querySelector(
    getSelectorString("textarea")
  ) as HTMLTextAreaElement | null;

  return button || select || input || textarea || anchor;
}

function hasControl(row: Element): boolean {
  console.info(row);
  const foundInput = row.querySelector("input");
  const foundSelect = row.querySelector("select");
  const foundTextarea = row.querySelector("textarea");
  const foundButton = row.querySelector("button");
  const foundAnchor = row.querySelector("a");

  return (
    !!foundTextarea ||
    !!foundInput ||
    !!foundSelect ||
    !!foundButton ||
    !!foundAnchor
  );
}

function attachGridAttributes(nodes: HTMLCollection) {
  let rid = 1;

  for (const rowNode of nodes) {
    if (hasControl(rowNode as HTMLElement)) {
      const cellNodes = rowNode.childNodes;
      let cid: number = 1;

      (rowNode as HTMLElement).dataset.rid = `${rid}`;

      for (const cellNode of cellNodes) {
        const elm = cellNode as HTMLElement;

        if (hasControl(elm)) {
          elm.dataset.cid = `${cid}`;

          cid += 1;
        }
      }

      rid += 1;
    }
  }
}

function applyGridNavigation(rootEl: HTMLElement) {
  attachGridAttributes(rootEl.children);
}

function handleDirection({
  edgeCondition,
  handleEdge,
  handleDefault,
  ...cmd
}: Command & {
  edgeCondition: boolean;
  handleDefault: (cmd: Command) => [number, number];
  handleEdge: (cmd: Command) => [number, number];
}) {
  const command = { ...cmd };

  if (edgeCondition) {
    return handleEdge(command);
  }

  return handleDefault(command);
}

const handleUp = (cmd: Command): [number, number] =>
  handleDirection({
    ...cmd,
    edgeCondition: cmd.rid === 1,
    handleEdge({ rowCount, cid }) {
      return [rowCount, cid];
    },
    handleDefault({ rid, cid }) {
      return [rid - 1, cid];
    },
  });

const handleDown = (cmd: Command): [number, number] =>
  handleDirection({
    ...cmd,
    edgeCondition: cmd.rid === cmd.rowCount,
    handleEdge({ cid }) {
      return [1, cid];
    },
    handleDefault({ rid, cid }) {
      return [rid + 1, cid];
    },
  });

const handleLeft = (cmd: Command): [number, number] =>
  handleDirection({
    ...cmd,
    edgeCondition: cmd.cid === 1,
    handleEdge({ rid, columnCount }) {
      return [rid, columnCount];
    },
    handleDefault({ rid, cid }) {
      return [rid, cid - 1];
    },
  });
const handleRight = (cmd: Command): [number, number] =>
  handleDirection({
    ...cmd,
    edgeCondition: cmd.cid === cmd.columnCount,
    handleEdge({ rid }) {
      return [rid, 1];
    },
    handleDefault({ rid, cid }) {
      return [rid, cid + 1];
    },
  });

function selectAdjacent(command: Command) {
  switch (command.key) {
    case "ArrowUp":
      return handleUp(command);
    case "ArrowDown":
      return handleDown(command);
    case "ArrowLeft":
      return handleLeft(command);
    case "ArrowRight":
      return handleRight(command);
    default:
      return [command.rid, command.cid] as const;
  }
}

export function GridNavigation({ children }: PropsWithChildren) {
  const childRef = useRef<HTMLElement>(null);

  const childWithRef = cloneElement(
    Children.only(children) as DetailedReactHTMLElement<any, any>,
    {
      ref: childRef,
      onKeyDown: (ev: KeyboardEvent<HTMLElement>) => {
        const validDirs = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
        const key = ev.code;
        if (!validDirs.includes(key)) {
          return;
        }
        ev.preventDefault();
        const currentElm = ev.target as HTMLElement;
        const columnElm = currentElm.closest("[data-cid]") as HTMLElement;
        const rowElm = columnElm.closest("[data-rid]") as HTMLElement;
        const parent = rowElm.parentElement!;
        const rows = parent.querySelectorAll("[data-rid]") ?? [];
        const rowCount = rows.length;
        const cols = Array.from(rowElm.childNodes);
        const columnCount = Array.from(cols).filter(
          (node) => (node as HTMLElement).dataset?.cid !== undefined
        ).length;

        const rid = +rowElm.dataset.rid!;
        const cid = +columnElm.dataset.cid!;

        const [nextRid, nextCid] = selectAdjacent({
          rid,
          cid,
          key,
          columnCount,
          rowCount,
        });

        const nextRow = parent.querySelector(`[data-rid="${nextRid}"]`);

        if (nextRow) {
          const control = selectControl(nextRow, nextCid);
          control?.focus?.();
        }
      },
    }
  );

  useEffect(() => {
    if (childRef.current) {
      applyGridNavigation(childRef.current);
    }
  }, [children]);

  return <>{childWithRef}</>;
}
