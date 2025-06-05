"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ChevronLeft, ChevronRight, Folder, Grid3X3, List, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// Grievance type definition
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

export default function GrievancesDashboard() {
    const [grievances, setGrievances] = useState<Grievance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [statuses, setStatuses] = useState<string[]>([]);
    const router = useRouter()

    // Fetch grievances from API
    useEffect(() => {
        const fetchGrievances = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/get-greivances");
                if (!res.ok) throw new Error("Failed to fetch grievances");
                const data = await res.json();
                console.log(data);

                const grievancesData = Array.isArray(data) ? data : data.grievances || [];
                setGrievances(grievancesData);

                // Extract unique statuses from the data
                const uniqueStatuses = Array.from(
                    new Set(grievancesData.map((g: Grievance) => g.status).filter(Boolean))
                ).sort();
                setStatuses(
                    uniqueStatuses.filter((status): status is string => typeof status === "string")
                );

            } catch (err) {
                setError("Could not load grievances");
                console.error("Error fetching grievances:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrievances();
    }, []);

    // Priority sorting helper function
    const getPriorityOrder = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return 1;
            case 'medium': return 2;
            case 'low': return 3;
            default: return 4;
        }
    };

    // Filter and search logic with priority sorting
    const filteredGrievances = useMemo(() => {
        return grievances
            .filter(grievance => {
                const matchesSearch = grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    grievance.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = selectedStatus === "all" || grievance.status === selectedStatus;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                // Sort by priority first (high priority first)
                const priorityDiff = getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
                if (priorityDiff !== 0) return priorityDiff;
                
                // If priorities are equal, sort by creation date (newest first)
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
    }, [grievances, searchTerm, selectedStatus]);

    // Pagination logic
    const totalPages = Math.ceil(filteredGrievances.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentGrievances = filteredGrievances.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedStatus]);

    const handleCaseClick = (grievanceId: string) => {
        router.push(`/greivances/${grievanceId}`)
    };

    const GridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {currentGrievances.map((grievanceItem) => (
                <div
                    onClick={() => handleCaseClick(grievanceItem.id)}
                    key={grievanceItem.id}
                    className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-3 cursor-pointer"
                >
                    {/* Case Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">
                                {grievanceItem.title.slice(0, 44)}...
                            </span>
                            {grievanceItem.status === 'urgent' && <AlertCircle className="w-4 h-4 text-red-500" />}
                            {grievanceItem.reformed_flag && <Folder className="w-4 h-4 text-yellow-600" />}
                        </div>

                    </div>

                    {/* Case Description */}
                    <h3 className="font-light text-xs text-gray-900 mb-4 line-clamp-2">
                        {grievanceItem.description}
                    </h3>

                    {/* Case Details */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-normal text-blue-600">
                                {grievanceItem.cpgrams_category.slice(0, 32)}...
                            </span>
                            <span className="text-xs text-gray-500">
                                {formatDate(grievanceItem.created_at)}
                            </span>
                        </div>
                        {/* Status indicator */}
                        <div className="flex items-center justify-between">

                            <p className={`text-xs rounded-full capitalize `}>
                                Status: {grievanceItem.status.replace('_', ' ')}
                            </p>
                            <p className={`text-xs font-normal py-1 rounded-md capitalize`}>
                                Priority: <span className={` ${grievanceItem.priority === 'high' ? 'text-red-700' :
                                    grievanceItem.priority === 'medium' ? 'text-yellow-700' :
                                        'text-green-700'
                                    }`}>{grievanceItem.priority}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const ListView = () => (
        <div className="space-y-2">
            {currentGrievances.map((grievanceItem) => (
                <div
                    onClick={() => handleCaseClick(grievanceItem.id)}
                    key={grievanceItem.id}
                    className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium text-gray-900">{grievanceItem.title}</h3>
                                {grievanceItem.status === 'urgent' && <AlertCircle className="w-4 h-4 text-red-500" />}
                                {grievanceItem.reformed_flag && <Folder className="w-4 h-4 text-yellow-600" />}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{grievanceItem.description}</p>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-blue-600">{grievanceItem.cpgrams_category}</span>
                                <span className="text-sm text-gray-500">{formatDate(grievanceItem.created_at)}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${grievanceItem.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                    grievanceItem.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                        grievanceItem.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {grievanceItem.status.replace('_', ' ')}
                                </span>

                            </div>
                        </div>
                        <span className={`text-xs font-normal py-1 px-3 rounded-md capitalize ${grievanceItem.priority === 'high' ? 'bg-red-100 text-red-700' :
                            grievanceItem.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                            }`}>
                            {grievanceItem.priority}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-white px-6 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Grievances</h1>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Find Cases"
                                className="pl-10 w-80 bg-gray-50 border-gray-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-40 bg-gray-50 border-gray-200">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {statuses.map(status => (
                                        <SelectItem key={status} value={status}>
                                            {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 border border-gray-200 rounded-md p-1">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                size="sm"
                                className="p-1.5"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                size="sm"
                                className="p-1.5"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {loading ? (
                    <div className="text-center text-gray-500 py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        Loading cases...
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-12">{error}</div>
                ) : filteredGrievances.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        {searchTerm || selectedStatus !== "all" ?
                            "No cases match your search criteria." :
                            "No cases found."
                        }
                    </div>
                ) : (
                    <>
                        {/* Results Summary */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Showing {startIndex + 1} - {Math.min(endIndex, filteredGrievances.length)} of {filteredGrievances.length} cases
                                {searchTerm && ` for "${searchTerm}"`}
                                {selectedStatus !== "all" && ` with status "${selectedStatus.replace('_', ' ')}"`}
                            </p>
                        </div>

                        {/* Cases Display */}
                        {viewMode === 'grid' ? <GridView /> : <ListView />}
                    </>
                )}

                {/* Pagination */}
                {filteredGrievances.length > 0 && (
                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                            {startIndex + 1} - {Math.min(endIndex, filteredGrievances.length)} of {filteredGrievances.length} Items
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                            </Button>
                            <span className="text-sm text-gray-600 px-3">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}