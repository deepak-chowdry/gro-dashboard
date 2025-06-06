"use client";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for different roles - you can replace this with actual API calls later
const mockDataByRole = {
  SSPO: {
    noAction: 8,
    closed: 8,
    waitingForDoc: 4,
  },
  DPO: {
    noAction: 5,
    closed: 12,
    waitingForDoc: 3,
  },
  CPO: {
    noAction: 10,
    closed: 7,
    waitingForDoc: 7,
  },
  SPO: {
    noAction: 3,
    closed: 9,
    waitingForDoc: 2,
  },
  Secretary: {
    noAction: 3,
    closed: 6,
    waitingForDoc: 2,
  },
  CPMG: {
    noAction: 3,
    closed: 9,
    waitingForDoc: 2,
  },
  PMG: {
    noAction: 3,
    closed: 9,
    waitingForDoc: 2,
  },
  PostMaster: {
    noAction: 2,
    closed: 21,
    waitingForDoc: 2,
  },
  SubPostMaster: {
    noAction: 3,
    closed: 9,
    waitingForDoc: 2,
  },
  BPM: {
    noAction: 3,
    closed: 9,
    waitingForDoc: 3,
  },
};

type Role = "SSPO" | "DPO" | "CPO" | "SPO" | "Secretary" | "CPMG" | "PMG" | "PostMaster" | "SubPostMaster" | "BPM";

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState<Role>("SSPO");
  const [statusData, setStatusData] = useState(mockDataByRole.SSPO);

  useEffect(() => {
    // Update data when role changes
    setStatusData(mockDataByRole[selectedRole]);
  }, [selectedRole]);

  // Data for the chart with specific colors for each status
  const chartData = [
    { name: "No Action", value: statusData.noAction, fill: "#8BB0E0" }, // blue-100
    { name: "Closed", value: statusData.closed, fill: "#7DBC84" }, // green-100
    {
      name: "Waiting for Doc",
      value: statusData.waitingForDoc,
      fill: "#F6E38F",
    }, // yellow-100
  ];

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard ({selectedRole})</h1>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Selected Role:</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-50">
              {selectedRole} <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRoleChange("Secretary")}>
                Secretary
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("CPMG")}>
                CPMG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("PMG")}>
                PMG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("SSPO")}>
                SSPO
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("PostMaster")}>
                Post Master
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("SubPostMaster")}>
                Sub-Post Master
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("BPM")}>
                Branch Post Master
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-100 p-6 text-center">
          <h2 className="text-3xl font-bold">{statusData.noAction}</h2>
          <p className="text-gray-700">No Action</p>
        </Card>

        <Card className="bg-green-100 p-6 text-center">
          <h2 className="text-3xl font-bold">{statusData.closed}</h2>
          <p className="text-gray-700">Closed</p>
        </Card>

        <Card className="bg-yellow-100 p-6 text-center">
          <h2 className="text-3xl font-bold">{statusData.waitingForDoc}</h2>
          <p className="text-gray-700">Waiting for Extra Document</p>
        </Card>
      </div>

      {/* Grievance Status Overview Chart */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Grievance Status Overview
        </h2>
        <div className="mx-auto w-1/2 h-96 bg-white p-4 rounded-lg border border-gray-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
