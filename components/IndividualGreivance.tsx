"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Mail, MapPin, Phone, User2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Notify from "./Notify";

type Grievance = {
  cpgrams_category: string;
  created_at: string;
  description: string;
  grievance_received_date: string;
  id: string;
  priority: string;
  reformed_flag: boolean;
  status: string;
  title: string;
  updated_at: string;
  user_id: { id: string };
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
};

// User type based on your API response
type User = {
  id: string;
  Name: string;
  Mobile?: string;
  Email?: string;
  District?: string;
  State?: string;
  [key: string]: string | undefined;
};

// API response structure
type GrievanceDetails = {
  grievance: Grievance;
  user: User;
};

const documents = [
  {
    id: 1,
    name: "Employment Contract.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "30 Mar 2025",
    uploadedBy: "Neha Suri",
  },
  {
    id: 2,
    name: "Performance Review 2024.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "30 Mar 2025",
    uploadedBy: "Neha Suri",
  },
  {
    id: 3,
    name: "Promotion Policy.docx",
    type: "DOCX",
    size: "856 KB",
    uploadDate: "31 Mar 2025",
    uploadedBy: "Legal Team",
  },
];

function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Loading skeleton components
const OverviewSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-start justify-between">
      <Skeleton className="h-8 w-64" />
    </div>

    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-16 w-full" />
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const DocsSkeleton = () => (
  <Card className="p-0">
    <CardContent className="p-0">
      <div className="divide-y divide-gray-200">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-5 h-5" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ResolutionSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-24" />
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full md:w-48" />
        <Skeleton className="h-10 w-20" />
      </div>
    </CardContent>
  </Card>
);

export default function IndividualGreivancePage({
  greivanceId,
}: {
  greivanceId: string;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [details, setDetails] = useState<GrievanceDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolution, setResolution] = useState({
    status: "",
    resolution_notes: "",
    officer_closed_by: "",
    final_status: "",
    grievance_closing_date: Date.now(),
  });

  const fetchGreivanceDetails = useCallback(async () => {
    if (!greivanceId) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching grievance details...");
      const response = await fetch(
        `/api/grievances-details?id=${greivanceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch grievance details: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.error("Error fetching grievance details:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load grievance details"
      );
    } finally {
      setLoading(false);
    }
  }, [greivanceId]);

  const updateResolution = async () => {
    if (!greivanceId) return;
    console.log(resolution);
    setUpdating(true);

    try {
      const response = await fetch(`/api/update-grievance?id=${greivanceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resolution),
      });

      if (!response.ok) {
        throw new Error(`Failed to update resolution: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating resolution:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update resolution"
      );
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchGreivanceDetails();
  }, [greivanceId, fetchGreivanceDetails]);

  // Error state
  if (error && !loading) {
    return (
      <div className="min-h-screen p-6">
        <Card className="max-w-md mx-auto mt-20">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Error Loading Grievance
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchGreivanceDetails} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="p-6 space-y-6">
        {loading ? (
          <Skeleton className="h-5 w-96" />
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/grievances">Grievances</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/grievances/${details?.grievance?.id}`}>
                    Grievance of {details?.user?.Name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {loading ? (
            <Skeleton className="h-10 w-96" />
          ) : (
            <TabsList className="grid w-full grid-cols-4 lg:w-96">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
              <TabsTrigger value="resolution">Resolution</TabsTrigger>
              <TabsTrigger value="notify">Notify</TabsTrigger>
            </TabsList>
          )}

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            {loading ? (
              <OverviewSkeleton />
            ) : (
              <div className="space-y-6">
                {/* Case Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold">
                      {details?.grievance?.title}
                    </h1>
                  </div>
                </div>

                {/* Case Description */}
                <Card>
                  <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <CardTitle className="text-lg font-semibold">
                      Grievance details
                    </CardTitle>
                    <Badge className="font-normal" variant="outline">
                      ID: {details?.grievance?.id}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="font-semibold text-sm">Category:</label>
                      {details?.grievance?.cpgrams_category && (
                        <span className="text-sm flex flex-wrap items-center gap-1">
                          {details.grievance?.cpgrams_category
                            ?.split(">")
                            .map((part, idx, arr) => {
                              const colors = [
                                "text-red-400",
                                "text-blue-400",
                                "text-green-400",
                                "text-yellow-400",
                                "text-purple-400",
                                "text-pink-400",
                                "text-teal-400",
                                "text-orange-400",
                                "text-indigo-400",
                                "text-emerald-400",
                                "text-fuchsia-400",
                                "text-cyan-400",
                              ];
                              const color = colors[idx % colors.length];
                              return (
                                <span
                                  key={idx}
                                  className={color + " font-normal"}
                                >
                                  {part.trim()}
                                  {idx < arr.length - 1 && (
                                    <span className="mx-1 text-gray-400">
                                      &gt;
                                    </span>
                                  )}
                                </span>
                              );
                            })}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="font-semibold text-sm">
                        Registered Date:
                      </label>
                      <p className="text-sm">
                        {details?.grievance?.grievance_received_date
                          ? formatDate(
                              details.grievance.grievance_received_date
                            )
                          : "-"}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-6 text-sm">
                      {details?.grievance?.description}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="font-semibold text-sm">Status:</label>
                      <p className="text-sm capitalize">
                        {details?.grievance?.status}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* User Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>User details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
                      <div className="flex items-center gap-2">
                        <User2 className="w-4 h-4" />
                        <p className="text-sm">{details?.user?.Name}</p>
                      </div>
                      {details?.user?.Mobile && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <p className="text-sm">{details.user?.Mobile}</p>
                        </div>
                      )}
                      {details?.user?.Email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <p className="text-sm">{details.user?.Email}</p>
                        </div>
                      )}
                      {details?.user?.District && details?.user?.State && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <p className="text-sm">
                            {details.user?.District}, {details.user?.State}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="docs" className="mt-6">
            <div className="space-y-6">
              {loading ? (
                <DocsSkeleton />
              ) : (
                <Card className="p-0">
                  <CardContent className="p-0">
                    {documents.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText
                                  className="size-5 text-blue-500 mb-2.5 hidden md:block"
                                  strokeWidth={1.5}
                                />
                                <div className="space-y-1">
                                  <h3 className="font-medium text-sm text-gray-900">
                                    {doc.name}
                                  </h3>
                                  <div className="text-xs text-muted-foreground space-x-3.5 hidden md:block">
                                    <span>{doc.type}</span>
                                    <span>{doc.size}</span>
                                    <span>Uploaded on {doc.uploadDate}</span>
                                    <span>by {doc.uploadedBy}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p>No documents uploaded yet</p>
                        <p className="text-sm">
                          Upload your first document to get started
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notify" className="mt-6">
            <Notify greivanceId={greivanceId} />
          </TabsContent>

          <TabsContent value="resolution" className="mt-6">
            <div className="space-y-6">
              {loading ? (
                <ResolutionSkeleton />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Resolution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <Textarea
                          value={resolution.resolution_notes}
                          onChange={(e) =>
                            setResolution({
                              ...resolution,
                              resolution_notes: e.target.value,
                            })
                          }
                          placeholder="Enter resolution"
                          disabled={updating}
                        />
                      </div>
                      <Select
                        value={resolution.status}
                        onValueChange={(value) =>
                          setResolution({ ...resolution, status: value })
                        }
                        disabled={updating}
                      >
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Tender Issued">
                              Tender Issued
                            </SelectItem>
                            <SelectItem value="Closed with resolution">
                              Closed with resolution
                            </SelectItem>
                            <SelectItem value="Closed without resolution">
                              Closed without resolution
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button onClick={updateResolution} disabled={updating}>
                        {updating && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {updating ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
