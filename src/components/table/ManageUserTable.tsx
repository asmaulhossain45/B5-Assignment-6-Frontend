/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApprovalStatus, Roles, UserStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";
import type { IAccount } from "@/types/IAccount";
import type { IMetaResponse } from "@/types/IMeta";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import AgentApprovalModal from "../modal/AgentApprovalModal";
import UserDeleteModal from "../modal/UserDeleteModal";
import UserUpdateModal from "../modal/UserUpdateModal";
import UserViewModal from "../modal/UserViewModal";
import FilterDrawer, {
  type FilterConfig,
  type FilterValue,
} from "./controll/FilterDrawer";
import SearchControll from "./controll/SearchControll";
import SortControl from "./controll/SortControl";
import TablePagination from "./controll/TablePagination";
import { ListTable, type SortOption } from "./ListTable";

type Props = {
  role?: Roles;
  data: IAccount[];
  meta: IMetaResponse;
  isLoading: boolean;
  isFetching: boolean;
  searchInput: string;
  setSearchInput: (value: string) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  order: "asc" | "desc";
  setSort: (value: string) => void;
  setOrder: (value: "asc" | "desc") => void;
  setPage: (page: number) => void;
};

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

const filterConfig: FilterConfig[] = [
  {
    label: "Gender",
    field: "gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "User Status",
    field: "status",
    type: "radio",
    options: [
      { label: "Active", value: UserStatus.ACTIVE },
      { label: "Inactive", value: UserStatus.INACTIVE },
      { label: "Blocked", value: UserStatus.BLOCKED },
      { label: "Deleted", value: UserStatus.DELETED },
      { label: "Suspended", value: UserStatus.SUSPENDED },
    ],
  },
  {
    label: "Verification Status",
    field: "isVerified",
    type: "radio",
    options: [
      { label: "Verified", value: true },
      { label: "Not Verified", value: false },
    ],
  },
];

const filterSchema = z.object({
  gender: z.string().optional(),
  status: z.string().optional(),
  isVerified: z.string().optional(),
});

const ManageUserTable = ({
  role = Roles.USER,
  data,
  meta,
  isLoading,
  isFetching,
  searchInput,
  setSearchInput,
  setFilters,
  setPage,
  order,
  setSort,
  setOrder,
}: Props) => {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  const columns: ColumnDef<IAccount>[] = [
    {
      header: "Serial",
      cell: ({ row }) => (
        <span>{(meta.page - 1) * (meta.limit ?? 10) + (row.index + 1)}</span>
      ),
    },
    {
      header: () => (
        <span>
          Name <span className="text-xs">(Verified)</span>
          <br />
          <span className="text-xs text-muted-foreground">Email Address</span>
        </span>
      ),
      accessorKey: "name",
      cell: ({ row }) => (
        <span>
          <span className="flex items-center gap-2">
            {row.original.name}
            <CircleCheckBig
              size={16}
              className={cn(
                row.original.isVerified ? "text-success" : "text-destructive"
              )}
            />
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </span>
      ),
    },
    ...(role === Roles.AGENT
      ? [
          {
            header: () => (
              <span>
                Business Name
                <br />
                <span className="text-xs text-muted-foreground">
                  Approval Status
                </span>
              </span>
            ),
            accessorKey: "businessName",
            cell: ({ row }: any) => {
              const businessName = row.original.businessName ?? "Not Provided";
              const approvalStatus = row.original.approvalStatus;
              return (
                <span>
                  {businessName} <br />
                  <span
                    className={cn(
                      "text-xs text-muted-foreground capitalize",
                      approvalStatus === ApprovalStatus.APPROVED &&
                        "text-success",
                      approvalStatus === ApprovalStatus.REJECTED &&
                        "text-destructive",
                      approvalStatus === ApprovalStatus.PENDING &&
                        "text-warning"
                    )}
                  >
                    {approvalStatus}
                  </span>
                </span>
              );
            },
          },
          {
            header: () => (
              <span>
                Reviewed By
                <br />
                <span className="text-xs text-muted-foreground">
                  Email Address
                </span>
              </span>
            ),
            accessorKey: "reviewedBy",
            cell: ({ row }: any) => {
              const adminName = row.original?.reviewedBy?.name;
              const adminEmail = row.original?.reviewedBy?.email;

              if (!adminEmail)
                return (
                  <span className="text-muted-foreground italic">
                    Not Reviewed
                  </span>
                );

              return (
                <span>
                  {adminName} <br />
                  <span className="text-xs text-muted-foreground">
                    {adminEmail}
                  </span>
                </span>
              );
            },
          },
        ]
      : []),
    {
      header: "Status",
      accessorKey: "status",
      meta: { className: "capitalize" },
      cell: ({ row }) => {
        const userStatus = row.original.status;

        return (
          <span
            className={cn(
              "capitalize",
              userStatus === UserStatus.ACTIVE && "text-chart-2",
              userStatus === UserStatus.INACTIVE && "text-chart-1",
              userStatus === UserStatus.BLOCKED && "text-chart-3",
              userStatus === UserStatus.SUSPENDED && "text-chart-4",
              userStatus === UserStatus.DELETED && "text-chart-5"
            )}
          >
            {row.original.status}
          </span>
        );
      },
    },
    {
      header: "Action",
      meta: { className: "capitalize text-center" },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center justify-center gap-2">
            <UserViewModal user={user} />
            {role === Roles.AGENT && <AgentApprovalModal agent={user} />}
            <UserUpdateModal user={user} />
            <UserDeleteModal user={user} />
          </div>
        );
      },
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <SearchControll
          placeholder="name / email / phone"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <div className="flex items-center justify-between gap-2">
          <FilterDrawer
            form={form}
            filterConfig={filterConfig}
            setFilters={setFilters}
            setPage={setPage}
          />

          <SortControl
            order={order}
            setSort={setSort}
            setOrder={setOrder}
            isFetching={isFetching}
            sortOptions={sortOptions}
          />
        </div>
      </div>

      <ListTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <TablePagination meta={meta} isFetching={isFetching} setPage={setPage} />
    </section>
  );
};

export default ManageUserTable;
