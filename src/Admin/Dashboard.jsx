import React from "react";
import {
    Package,
    FolderKanban,
    Wrench,
    Users,
    ArrowUpRight,
    MoreHorizontal,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
} from "recharts";

const chartData = [
    { month: "Jan", visitors: 180 },
    { month: "Feb", visitors: 240 },
    { month: "Mar", visitors: 210 },
    { month: "Apr", visitors: 320 },
    { month: "May", visitors: 380 },
    { month: "Jun", visitors: 450 },
    { month: "Jul", visitors: 520 },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
};

const stats = [
    {
        title: "Total Products",
        value: "25",
        change: "+12.5%",
        icon: Package,
    },
    {
        title: "Total Projects",
        value: "18",
        change: "+8.2%",
        icon: FolderKanban,
    },
    {
        title: "Total Services",
        value: "12",
        change: "+5.4%",
        icon: Wrench,
    },
    {
        title: "Total Users",
        value: "148",
        change: "+18.7%",
        icon: Users,
    },
];

const recentProjects = [
    {
        name: "Solar Farm Gujarat",
        client: "Green Energy Ltd.",
        status: "Completed",
        date: "Sep 18, 2026",
    },
    {
        name: "Residential Solar",
        client: "Patel Residence",
        status: "Active",
        date: "Sep 16, 2026",
    },
    {
        name: "Rooftop Solar System",
        client: "Sunshine Homes",
        status: "Pending",
        date: "Sep 14, 2026",
    },
    {
        name: "Commercial Solar Plant",
        client: "Eco Power Ltd.",
        status: "Completed",
        date: "Sep 12, 2026",
    },
];

const Dashboard = () => {
    return (
        <div className="space-y-6">

            {/* =========================================
          PAGE HEADER
      ========================================= */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Dashboard
                    </h1>

                    <p className="text-sm text-slate-500">
                        Here's what's happening with your solar business today.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                >
                    Add New Project
                    <ArrowUpRight size={16} />
                </button>
            </div>

            {/* =========================================
          STAT CARDS
      ========================================= */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title} className="border-slate-200 shadow-sm">
                            <CardContent className="p-5">

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                            {stat.value}
                                        </h2>

                                        <p className="mt-2 text-xs font-medium text-green-600">
                                            {stat.change} from last month
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                        <Icon size={21} />
                                    </div>

                                </div>

                            </CardContent>
                        </Card>
                    );
                })}

            </div>

            {/* =========================================
          CHART + QUICK SUMMARY
      ========================================= */}

            <div className="grid gap-6 xl:grid-cols-3">

                <Card className="xl:col-span-2 border-slate-200 shadow-sm">

                    <CardHeader>
                        <CardTitle>Website Activity</CardTitle>

                        <CardDescription>
                            Website visitors during the last 7 months
                        </CardDescription>
                    </CardHeader>

                    <CardContent>

                        <ChartContainer
                            config={chartConfig}
                            className="h-[300px] w-full"
                        >
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid vertical={false} />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />

                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                />

                                <Area
                                    dataKey="visitors"
                                    type="monotone"
                                    fill="var(--color-primary)"
                                    fillOpacity={0.15}
                                    stroke="var(--color-primary)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>

                    </CardContent>

                </Card>

                {/* =========================================
            QUICK SUMMARY
        ========================================= */}

                <Card className="border-slate-200 shadow-sm">

                    <CardHeader>
                        <CardTitle>Quick Summary</CardTitle>

                        <CardDescription>
                            Current website statistics
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    Active Projects
                                </p>

                                <p className="text-xs text-slate-500">
                                    Currently running
                                </p>
                            </div>

                            <span className="text-xl font-bold text-slate-900">
                                8
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    New Messages
                                </p>

                                <p className="text-xs text-slate-500">
                                    Need your attention
                                </p>
                            </div>

                            <span className="text-xl font-bold text-slate-900">
                                14
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    Completed Projects
                                </p>

                                <p className="text-xs text-slate-500">
                                    Total completed
                                </p>
                            </div>

                            <span className="text-xl font-bold text-slate-900">
                                10
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    Customer Satisfaction
                                </p>

                                <p className="text-xs text-slate-500">
                                    Average rating
                                </p>
                            </div>

                            <span className="text-xl font-bold text-slate-900">
                                4.9/5
                            </span>
                        </div>

                    </CardContent>

                </Card>

            </div>

            {/* =========================================
          RECENT PROJECTS
      ========================================= */}

            <Card className="border-slate-200 shadow-sm">

                <CardHeader className="flex flex-row items-center justify-between">

                    <div>
                        <CardTitle>Recent Projects</CardTitle>

                        <CardDescription>
                            Recently added solar projects
                        </CardDescription>
                    </div>

                    <button
                        type="button"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <MoreHorizontal size={20} />
                    </button>

                </CardHeader>

                <CardContent>

                    <div className="overflow-x-auto">

                        <Table>

                            <TableHeader>
                                <TableRow>

                                    <TableHead>Project</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">
                                        Action
                                    </TableHead>

                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {recentProjects.map((project) => (

                                    <TableRow key={project.name}>

                                        <TableCell>
                                            <div className="flex items-center gap-3">

                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback>
                                                        {project.name
                                                            .split(" ")
                                                            .slice(0, 2)
                                                            .map((word) => word[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <span className="font-medium text-slate-900">
                                                    {project.name}
                                                </span>

                                            </div>
                                        </TableCell>

                                        <TableCell className="text-slate-500">
                                            {project.client}
                                        </TableCell>

                                        <TableCell>

                                            <Badge
                                                variant={
                                                    project.status === "Completed"
                                                        ? "default"
                                                        : project.status === "Active"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {project.status}
                                            </Badge>

                                        </TableCell>

                                        <TableCell className="text-slate-500">
                                            {project.date}
                                        </TableCell>

                                        <TableCell className="text-right">

                                            <button
                                                type="button"
                                                className="text-sm font-medium text-green-600 hover:text-green-700"
                                            >
                                                View
                                            </button>

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
};

export default Dashboard;