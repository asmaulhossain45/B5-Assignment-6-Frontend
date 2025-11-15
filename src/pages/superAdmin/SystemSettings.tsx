import CommissionTable from "@/components/table/CommissionTable";
import LimitTable from "@/components/table/LimitTable";

const SystemSettings = () => {
  return (
    <div className="space-y-4">
      <CommissionTable />
      <LimitTable />
    </div>
  );
};

export default SystemSettings;
